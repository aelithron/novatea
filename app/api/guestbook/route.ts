import db from "@/utils/db";
import { guestbookTable } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (!body.name || (body.name as string).trim().length < 1) return NextResponse.json({ error: "missing_name", message: "'name' is missing, please input your name/username!" }, { status: 400 });
  if (!body.email || (body.email as string).trim().length < 1) return NextResponse.json({ error: "missing_email", message: "'email' is missing, please input your email address!" }, { status: 400 });
  if (!body.body || (body.body as string).trim().length < 1) return NextResponse.json({ error: "missing_body", message: "'body' is missing, please fill in the message you want to send!" }, { status: 400 });
  try {
    await db.insert(guestbookTable).values({ name: body.name as string, email: body.email as string, body: body.body as string, url: (body.url ? body.url as string : null), visible: false });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}