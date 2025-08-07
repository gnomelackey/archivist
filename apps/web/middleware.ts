import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/*
  NOTE: Below are the public routes that do not require authentication
        If you want to add more public routes, add them to the publicRoutes array

        protectedRoutes are commented out as they are not currently used
        If you want to use protected routes, uncomment the line below

        const protectedRoutes = ['/maps']
*/

const publicRoutes = ["/login", "/register", "/"];
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    if (isPublicRoute) return NextResponse.next();

    const token = req.cookies.get("token")?.value;
    console.log("Token from cookies:", token);
    if (!token) return NextResponse.redirect(new URL("/login", req.nextUrl));

    console.log("jwt secret:", process.env.JWT_SECRET);
    await jwtVerify(token, secret, { algorithms: ["HS256"] });

    return NextResponse.next();
  } catch (error) {
    console.log("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
