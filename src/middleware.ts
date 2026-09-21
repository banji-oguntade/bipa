import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  generateSessionId,
  isValidSessionId,
} from "@/lib/session";

export function middleware(request: NextRequest) {
  const existingCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (existingCookie && isValidSessionId(existingCookie)) {
    // Valid session cookie exists -> reuse it; no Set-Cookie header needed
    return NextResponse.next();
  }

  // Missing or invalid session cookie -> issue a new UUID
  const newSessionId = generateSessionId();

  // Forward cookie in request headers for downstream server components
  const requestHeaders = new Headers(request.headers);
  const currentCookieHeader = request.headers.get("cookie") ?? "";
  const sessionCookieStr = `${SESSION_COOKIE_NAME}=${newSessionId}`;
  const updatedCookieHeader = currentCookieHeader
    ? `${currentCookieHeader}; ${sessionCookieStr}`
    : sessionCookieStr;
  requestHeaders.set("cookie", updatedCookieHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Issue httpOnly cookie to browser
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: newSessionId,
    ...SESSION_COOKIE_OPTIONS,
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static asset files (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
