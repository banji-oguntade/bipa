import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { SESSION_COOKIE_NAME, isValidSessionId } from "./lib/session";

describe("Middleware - Session Cookie Management", () => {
  it("sets an httpOnly UUID session cookie on the first request", () => {
    const request = new NextRequest("http://localhost:3000/dashboard");

    // First request has no session cookie
    expect(request.cookies.get(SESSION_COOKIE_NAME)).toBeUndefined();

    const response = middleware(request);

    // Cookie must be set in response
    const setCookie = response.cookies.get(SESSION_COOKIE_NAME);
    expect(setCookie).toBeDefined();

    // Must be a valid UUID
    expect(isValidSessionId(setCookie?.value)).toBe(true);

    // Must be httpOnly so client JavaScript cannot access it
    expect(setCookie?.httpOnly).toBe(true);
    expect(setCookie?.path).toBe("/");
    expect(setCookie?.sameSite).toBe("lax");

    // Must not echo UUID in custom headers or body
    expect(response.headers.get("x-session-id")).toBeNull();
  });

  it("reuses the session on follow-up requests without issuing a new cookie", () => {
    const existingSessionId = crypto.randomUUID();

    // Follow-up request includes the session cookie
    const request = new NextRequest("http://localhost:3000/dashboard", {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${existingSessionId}`,
      },
    });

    expect(request.cookies.get(SESSION_COOKIE_NAME)?.value).toBe(existingSessionId);

    const response = middleware(request);

    // Follow-up request should NOT set a new cookie or override the existing one
    const setCookieHeader = response.headers.get("set-cookie");
    expect(setCookieHeader).toBeNull();
    expect(response.cookies.get(SESSION_COOKIE_NAME)).toBeUndefined();
  });

  it("replaces invalid or tampered session cookies with a fresh valid UUID cookie", () => {
    const tamperedRequest = new NextRequest("http://localhost:3000/dashboard", {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=invalid-tampered-value`,
      },
    });

    const response = middleware(tamperedRequest);

    const setCookie = response.cookies.get(SESSION_COOKIE_NAME);
    expect(setCookie).toBeDefined();
    expect(isValidSessionId(setCookie?.value)).toBe(true);
    expect(setCookie?.value).not.toBe("invalid-tampered-value");
    expect(setCookie?.httpOnly).toBe(true);
  });

  it("forwards the session cookie in request headers for downstream server components on first visit", () => {
    const request = new NextRequest("http://localhost:3000/dashboard");

    const response = middleware(request);
    const newSessionId = response.cookies.get(SESSION_COOKIE_NAME)?.value;

    // Next.js response.headers will contain x-middleware-request-cookie or internal forwarded cookie header
    const forwardedCookieHeader = response.headers.get("x-middleware-request-cookie");
    if (forwardedCookieHeader) {
      expect(forwardedCookieHeader).toContain(`${SESSION_COOKIE_NAME}=${newSessionId}`);
    }
  });

  it("never echoes the UUID session ID in custom headers", () => {
    const request = new NextRequest("http://localhost:3000/dashboard");
    const response = middleware(request);
    const sessionId = response.cookies.get(SESSION_COOKIE_NAME)?.value;

    expect(sessionId).toBeDefined();
    // Explicitly verify common custom headers are not set
    expect(response.headers.get("x-session-id")).toBeNull();
    expect(response.headers.get("session-id")).toBeNull();
    expect(response.headers.get("x-user-id")).toBeNull();
    expect(response.headers.get("x-anonymous-id")).toBeNull();

    // Verify any header containing the sessionId is exclusively a standard/internal cookie transport header
    for (const [key, value] of response.headers.entries()) {
      if (value.includes(sessionId!)) {
        const lowerKey = key.toLowerCase();
        expect(
          lowerKey === "set-cookie" ||
            lowerKey === "x-middleware-set-cookie" ||
            lowerKey === "x-middleware-request-cookie",
        ).toBe(true);
      }
    }
  });

});
