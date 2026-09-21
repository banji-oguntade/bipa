import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";
import { SESSION_COOKIE_NAME } from "@/lib/session";

vi.mock("next/headers", () => {
  return {
    cookies: vi.fn(),
  };
});

import { cookies } from "next/headers";

describe("GET /api/session", () => {
  it("confirms cookie presence with { hasSession: true } without echoing the UUID", async () => {
    const rawUuid = crypto.randomUUID();
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockImplementation((name: string) => {
        if (name === SESSION_COOKIE_NAME) {
          return { name, value: rawUuid };
        }
        return undefined;
      }),
    } as unknown as Awaited<ReturnType<typeof cookies>>);

    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ hasSession: true });

    // The UUID must never be returned in the body
    expect(JSON.stringify(body)).not.toContain(rawUuid);

    // The UUID must never be returned in headers
    for (const [, value] of response.headers.entries()) {
      expect(value).not.toContain(rawUuid);
    }
  });

  it("returns { hasSession: false } when session cookie is missing", async () => {
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    } as unknown as Awaited<ReturnType<typeof cookies>>);

    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ hasSession: false });
  });

  it("returns { hasSession: false } when session cookie is invalid/malformed", async () => {
    vi.mocked(cookies).mockResolvedValue({
      get: vi.fn().mockReturnValue({ name: SESSION_COOKIE_NAME, value: "not-a-valid-uuid" }),
    } as unknown as Awaited<ReturnType<typeof cookies>>);

    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ hasSession: false });
  });
});
