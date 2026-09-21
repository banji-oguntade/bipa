import { describe, expect, it, vi } from "vitest";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  generateSessionId,
  hasValidSession,
  isValidSessionId,
} from "./session";

// Mock next/headers
vi.mock("next/headers", () => {
  return {
    cookies: vi.fn(),
  };
});

import { cookies } from "next/headers";

describe("session lib", () => {
  describe("isValidSessionId", () => {
    it("validates standard UUIDs correctly", () => {
      expect(isValidSessionId("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
      expect(isValidSessionId("a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d")).toBe(true);
      expect(isValidSessionId(crypto.randomUUID())).toBe(true);
    });

    it("rejects invalid formats and non-strings", () => {
      expect(isValidSessionId("")).toBe(false);
      expect(isValidSessionId("not-a-uuid")).toBe(false);
      expect(isValidSessionId("123e4567-e89b-12d3-a456")).toBe(false);
      expect(isValidSessionId("123e4567-e89b-62d3-a456-426614174000")).toBe(false); // invalid version
      expect(isValidSessionId(null)).toBe(false);
      expect(isValidSessionId(undefined)).toBe(false);
      expect(isValidSessionId(12345)).toBe(false);
      expect(isValidSessionId({})).toBe(false);
    });
  });

  describe("generateSessionId", () => {
    it("generates a valid UUID", () => {
      const id = generateSessionId();
      expect(typeof id).toBe("string");
      expect(isValidSessionId(id)).toBe(true);
    });

    it("generates distinct UUIDs across invocations", () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("SESSION_COOKIE_OPTIONS", () => {
    it("has httpOnly enabled to prevent client JS access", () => {
      expect(SESSION_COOKIE_OPTIONS.httpOnly).toBe(true);
    });

    it("uses SameSite=lax and root path", () => {
      expect(SESSION_COOKIE_OPTIONS.sameSite).toBe("lax");
      expect(SESSION_COOKIE_OPTIONS.path).toBe("/");
    });
  });

  describe("hasValidSession", () => {
    it("returns true when cookie exists and is a valid UUID without echoing the ID", async () => {
      const validUuid = crypto.randomUUID();
      vi.mocked(cookies).mockResolvedValue({
        get: vi.fn().mockImplementation((name: string) => {
          if (name === SESSION_COOKIE_NAME) {
            return { name, value: validUuid };
          }
          return undefined;
        }),
      } as unknown as Awaited<ReturnType<typeof cookies>>);

      const result = await hasValidSession();
      expect(result).toBe(true);
      // Ensure the return is strictly boolean, not exposing the UUID
      expect(typeof result).toBe("boolean");
      expect(result).not.toEqual(validUuid);
    });

    it("returns false when session cookie is missing", async () => {
      vi.mocked(cookies).mockResolvedValue({
        get: vi.fn().mockReturnValue(undefined),
      } as unknown as Awaited<ReturnType<typeof cookies>>);

      const result = await hasValidSession();
      expect(result).toBe(false);
    });

    it("returns false when session cookie value is not a valid UUID", async () => {
      vi.mocked(cookies).mockResolvedValue({
        get: vi.fn().mockReturnValue({ name: SESSION_COOKIE_NAME, value: "malformed-id" }),
      } as unknown as Awaited<ReturnType<typeof cookies>>);

      const result = await hasValidSession();
      expect(result).toBe(false);
    });
  });
});
