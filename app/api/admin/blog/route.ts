import { validateAuth } from "@/utils/auth";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (!validateAuth(req)) return NextResponse.json({ error: "invalid_auth", message: "you aren't authorized to do this! make sure you are logged in." }, { status: 401 });
  if (!body.path || (body.path as string).trim().length < 1) return NextResponse.json({ error: "missing_path", message: "'path' is missing, please send a unique path attribute!" }, { status: 400 });
  if (!body.title || (body.title as string).trim().length < 1) return NextResponse.json({ error: "missing_title", message: "'title' is missing, please send a title!" }, { status: 400 });
  if ((await db.select().from(blogTable).where(eq(blogTable.path, body.path as string))).length !== 0) return NextResponse.json({ error: "already_used_path", message: "your 'path' has already been used!" }, { status: 400 });
  const post = await db.insert(blogTable).values({ path: body.path as string, title: body.title as string, blurb: (body.blurb ? body.blurb as string : ""), body: (body.body ? body.body as string : ""), published: (body.published ? body.published as boolean : false), publishedAt: (body.publishedAt ? new Date(body.publishedAt as string) : new Date()) }).returning();
  return NextResponse.json(post);
}
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (!validateAuth(req)) return NextResponse.json({ error: "invalid_auth", message: "you aren't authorized to do this! make sure you are logged in." }, { status: 401 });
  if (!body.path || (body.path as string).trim().length < 1) return NextResponse.json({ error: "missing_path", message: "'path' is missing, please send a valid path attribute!" }, { status: 400 });
  if ((await db.select().from(blogTable).where(eq(blogTable.path, body.path as string))).length === 0) return NextResponse.json({ error: "not_found", message: "your 'path' does not resolve to any post!" }, { status: 404 });
  const updatedData: { title?: string, blurb?: string, body?: string, published?: boolean, publishedAt?: Date } = {};
  if (body.title) updatedData.title = body.title as string;
  if (body.blurb) updatedData.blurb = body.blurb as string;
  if (body.body) updatedData.body = body.body as string;
  if (body.published !== undefined) updatedData.published = (body.published ? true : false);
  if (body.publishedAt) updatedData.publishedAt = new Date(body.publishedAt as string);
  if (JSON.stringify(updatedData) === "{}") return NextResponse.json({ success: true });
  try {
    await db.update(blogTable).set(updatedData).where(eq(blogTable.path, body.path));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
}