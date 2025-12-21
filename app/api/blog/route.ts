import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) return NextResponse.json({ error: "missing_path", message: "'path' is missing, please send a path search parameter!" });
  let post;
  try {
    post = await db.select().from(blogTable).where(and(eq(blogTable.path, path), eq(blogTable.published, true))).limit(1);
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "update_failure", message: "an error occured while updating the database!" }, { status: 500 });
  }
  if (post.length < 1) return NextResponse.json({ error: "not_found", message: "your 'path' does not resolve to any post!" }, { status: 404 });
  const postHeader = `# ${post[0].title}\n## by nova - ${post[0].publishedAt.toString()}`;
  return new NextResponse(`${postHeader}\n\n${post[0].body}`);
}