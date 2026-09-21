import { NextResponse } from "next/server";
import { hasValidSession } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Server-only check confirming session cookie presence without echoing the UUID.
 * The UUID is never sent in body, query, or custom header.
 */
export async function GET() {
  const hasSession = await hasValidSession();
  return NextResponse.json({ hasSession });
}
