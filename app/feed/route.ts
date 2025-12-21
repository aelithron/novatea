import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Feed } from "feed";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get("type") || "rss";
  let data;
  try {
    data = (await db.select().from(blogTable).where(eq(blogTable.published, true))).sort((a, b) => { return b.publishedAt.getTime() - a.publishedAt.getTime() });
  } catch (e) {
    console.warn(e);
    return NextResponse.json({ error: "read_failure", message: "an error occured while reading from the database!" }, { status: 500 });
  }
  const feed = new Feed({
    id: "https://novatea.dev/",
    title: "nova's blog",
    description: "my blog about random things (mainly tech)!",
    link: "https://novatea.dev/blog",
    author: { name: "Nova", email: "nova@novatea.dev", link: "https://novatea.dev/" },
    copyright: `© nova ${new Date().getFullYear()}`,
    language: "en",
    updated: data[0].publishedAt,
  });
  for (const post of data) {
    feed.addItem({
      title: post.title,
      link: `${req.nextUrl.origin}/blog/${post.path}`,
      date: post.publishedAt,
      author: [{ name: "Nova", email: "nova@novatea.dev", link: "https://novatea.dev/" }],
      description: post.blurb,
      content: (post.body.length < 1000 ? post.body : `${post.body.slice(0, 1000)}...`)
    });
  }
  switch (type) {
    case "rss":
      return new NextResponse(feed.rss2(), { headers: { "Content-Type": "application/rss+xml" } });
    case "atom":
      return new NextResponse(feed.atom1(), { headers: { "Content-Type": "application/atom+xml" } });
    case "json":
      return new NextResponse(feed.json1());
    default:
      return NextResponse.json({ error: "invalid_type", message: "a 'type' parameter was provided, but was not valid!" })
  }
}