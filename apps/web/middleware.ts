import { NextRequest, NextResponse } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";

/*
  NOTE: Below are the public routes that do not require authentication
        If you want to add more public routes, add them to the publicRoutes array

        protectedRoutes are commented out as they are not currently used
        If you want to use protected routes, uncomment the line below

        const protectedRoutes = ['/maps']
*/

const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    if (isPublicRoute) return NextResponse.next();

    const token = req.headers.get("Authorization");
    if (!token) return NextResponse.redirect(new URL("/login", req.nextUrl));

    jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return NextResponse.next();
  } catch (error) {
    console.log("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
