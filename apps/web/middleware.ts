import { NextRequest, NextResponse } from "next/server";

/*
  NOTE: Below are the public routes that do not require authentication
        If you want to add more public routes, add them to the publicRoutes array

        protectedRoutes are commented out as they are not currently used
        If you want to use protected routes, uncomment the line below

        const protectedRoutes = ['/maps']
*/

const APP_ROUTE = "/app/dashboard";
const LOGIN_ROUTE = "/login";
const PUBLIC_ROUTES = [LOGIN_ROUTE, "/register", "/"];
const API_URL = process.env.API_SERVER_URL || "http://api-server:4001";
const SESSION_COOKIE_NAME = "session";
const CACHE_TTL = 30 * 1000;

const sessionCache = new Map<string, { valid: boolean; expires: number }>();

function isSessionCached(sessionId: string): boolean | null {
  const cached = sessionCache.get(sessionId);

  if (!cached) return null;

  if (Date.now() > cached.expires) {
    sessionCache.delete(sessionId);
    return null;
  }

  return cached.valid ?? null;
}

function cacheSession(sessionId: string, isValid: boolean): void {
  sessionCache.set(sessionId, {
    valid: isValid,
    expires: Date.now() + CACHE_TTL,
  });
}

export default async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isLoginRoute = path === LOGIN_ROUTE;
    const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (isLoginRoute && sessionId) {
      return NextResponse.redirect(new URL(APP_ROUTE, req.nextUrl));
    }

    const isPublicRoute = PUBLIC_ROUTES.includes(path);

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (!sessionId) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
    }

    const cachedResult = isSessionCached(sessionId);

    if (cachedResult !== null) {
      return NextResponse.next();
    }

    const response = await fetch(`${API_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        Cookie: `${SESSION_COOKIE_NAME}=${sessionId}`,
        "Content-Type": "application/json",
      },
    });

    const isValid = response.ok;

    if (!isValid) throw new Error("Invalid session");

    cacheSession(sessionId, isValid);

    return NextResponse.next();
  } catch (error) {
    console.log("Authentication error:", error);
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
