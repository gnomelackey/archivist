import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/*
  NOTE: Below are the public routes that do not require authentication
        If you want to add more public routes, add them to the publicRoutes array

        protectedRoutes are commented out as they are not currently used
        If you want to use protected routes, uncomment the line below

        const protectedRoutes = ['/maps']
*/

const APP_ROUTE = "/app/dashboard";
const LOGIN_ROUTE = "/login";
const PUBLIC_ROUTES = ["/register", "/"];

const JWT_COOKIE_NAME = "token";
const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret";
const SECRET = new TextEncoder().encode(JWT_SECRET);

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isLoginRoute = path === LOGIN_ROUTE;
    const token = req.cookies.get(JWT_COOKIE_NAME)?.value;

    if (isLoginRoute) {
      if (token) return NextResponse.redirect(new URL(APP_ROUTE, req.nextUrl));
      else return NextResponse.next();
    }

    const isPublicRoute = PUBLIC_ROUTES.includes(path);

    if (isPublicRoute) return NextResponse.next();
    if (!token) return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));

    await jwtVerify(token, SECRET, { algorithms: ["HS256"] });

    return NextResponse.next();
  } catch (error) {
    console.log("Authentication error:", error);
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
