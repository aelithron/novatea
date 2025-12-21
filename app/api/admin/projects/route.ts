import { validateAuth } from "@/utils/auth";
import db from "@/utils/db";
import { projectTable } from "@/utils/schema";
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
  if (!body.title || (body.title as string).trim().length < 1) return NextResponse.json({ error: "missing_title", message: "'title' is missing, please send a title!" }, { status: 400 });
  if (!body.description || (body.description as string).trim().length < 1) return NextResponse.json({ error: "missing_description", message: "'description' is missing, please send a description!" }, { status: 400 });
  if (!body.codeURL || (body.codeURL as string).trim().length < 1) return NextResponse.json({ error: "missing_code_url", message: "'codeURL' is missing, please send a code url!" }, { status: 400 });
  if (body.spotlighted !== true && body.spotlighted !== false) return NextResponse.json({ error: "missing_spotlighted", message: "'spotlighted' is missing, please specify if this project is spotlighted or not!" }, { status: 400 });
  try {
    await db.insert(projectTable).values({ title: body.title as string, description: body.description as string, spotlighted: body.spotlighted ? true : false, code: body.codeURL as string, link: (body.link as string | undefined) || null }).returning();
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
  return NextResponse.json({ success: true});
}
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (!validateAuth(req)) return NextResponse.json({ error: "invalid_auth", message: "you aren't authorized to do this! make sure you are logged in." }, { status: 401 });
  if (!body.id || isNaN(Number.parseInt(body.id))) return NextResponse.json({ error: "missing_id", message: "'id' is missing, please send a valid id attribute!" }, { status: 400 });
  try {
    if ((await db.select().from(projectTable).where(eq(projectTable.id, Number.parseInt(body.id as string)))).length === 0) return NextResponse.json({ error: "not_found", message: "your 'id' does not resolve to any project!" }, { status: 404 });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "read_failure", message: "an error occured while reading from the database!" }, { status: 500 });
  }
  const updatedData: { title?: string, description?: string, code?: string, link?: string, spotlighted?: boolean } = {};
  if (body.title) updatedData.title = body.title as string;
  if (body.description) updatedData.description = body.description as string;
  if (body.codeURL) updatedData.code = body.codeURL as string;
  if (body.link) updatedData.link = body.link as string;
  if (body.spotlighted !== undefined) updatedData.spotlighted = (body.spotlighted ? true : false);
  if (JSON.stringify(updatedData) === "{}") return NextResponse.json({ success: true });
  try {
    await db.update(projectTable).set(updatedData).where(eq(projectTable.id, Number.parseInt(body.id as string)));
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
  if (!body.id || isNaN(Number.parseInt(body.id))) return NextResponse.json({ error: "missing_id", message: "'id' is missing, please send a valid id attribute!" }, { status: 400 });
  try {
    await db.delete(projectTable).where(eq(projectTable.id, Number.parseInt(body.id as string)));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
}