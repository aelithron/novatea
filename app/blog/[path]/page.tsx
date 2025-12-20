import { ClientTime } from "@/app/clientui.module";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { and, eq } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "blog post" };
export default async function Page({ params }: { params: Promise<{ path: string }> }) {
  let blogPosts = null;
  try {
    blogPosts = await db.select().from(blogTable).where(and(eq(blogTable.published, true), eq(blogTable.path, (await params).path))).limit(1);
  } catch {}
  if (!blogPosts || blogPosts.length < 1) return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faX} /> blog post not found!</h1>
      <p>this blog post could not be found.</p>
      <Link href={"/blog"} className="bg-violet-300 dark:bg-violet-600 rounded-xl p-1 mt-2"><FontAwesomeIcon icon={faNewspaper} /> back to blog</Link>
    </main>
  );
  const post = blogPosts[0];
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> {post.title}</h1>
      <p className="text-lg italic">{post.blurb}</p>
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <ClientTime date={new Date(post.publishedAt)} />
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>{post.body}</Markdown>
      </div>
    </main>
  );
}