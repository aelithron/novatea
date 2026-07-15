import { validateAuth } from "@/utils/auth";
import db from "@/utils/db";
import { rateLimit } from "@/utils/ratelimit";
import { guestbookTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (req.headers.get('x-forwarded-for') !== null && rateLimit(req.headers.get('x-forwarded-for')!)) return NextResponse.json({ success: false, error: "rate_limited", message: "you are rate limited, please slow down!" }, { status: 429 });
  if (!validateAuth(req)) return NextResponse.json({ error: "invalid_auth", message: "you aren't authorized to do this! make sure you are logged in." }, { status: 401 });
  if (!body.id || isNaN(Number.parseInt(body.id))) return NextResponse.json({ error: "missing_id", message: "'id' is missing, please send a valid id attribute!" }, { status: 400 });
  if (!body.visible || (body.visible !== true && body.visible !== false)) NextResponse.json({ error: "missing_visible", message: "'visible' is missing or invalid, please send a valid boolean visible attribute!" }, { status: 400 });
  try {
    if ((await db.select().from(guestbookTable).where(eq(guestbookTable.id, Number.parseInt(body.id as string)))).length === 0) return NextResponse.json({ error: "not_found", message: "your 'id' does not resolve to any guestbook entry!" }, { status: 404 });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "read_failure", message: "an error occured while reading from the database!" }, { status: 500 });
  }
  try {
    await db.update(guestbookTable).set({ visible: body.visible as boolean }).where(eq(guestbookTable.id, Number.parseInt(body.id as string)));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (req.headers.get('x-forwarded-for') !== null && rateLimit(req.headers.get('x-forwarded-for')!)) return NextResponse.json({ success: false, error: "rate_limited", message: "you are rate limited, please slow down!" }, { status: 429 });
  if (!validateAuth(req)) return NextResponse.json({ error: "invalid_auth", message: "you aren't authorized to do this! make sure you are logged in." }, { status: 401 });
  if (!body.id || isNaN(Number.parseInt(body.id))) return NextResponse.json({ error: "missing_id", message: "'id' is missing, please send a valid id attribute!" }, { status: 400 });
  try {
    await db.delete(guestbookTable).where(eq(guestbookTable.id, Number.parseInt(body.id as string)));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
}