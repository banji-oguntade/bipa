import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "session_id";
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_COOKIE_MAX_AGE,
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidSessionId(id: unknown): id is string {
  if (typeof id !== "string") {
    return false;
  }
  return UUID_REGEX.test(id);
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

/**
 * Server-only helper to verify whether the incoming request has a valid session cookie.
 * Confirms cookie presence without echoing or leaking the raw UUID.
 */
export async function hasValidSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    return Boolean(sessionCookie?.value && isValidSessionId(sessionCookie.value));
  } catch {
    return false;
  }
}
