import { ClientTime } from "@/app/clientui.module";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { and, eq } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ path: string }> }): Promise<Metadata> {
  let post;
  try {
    const res = await db.select().from(blogTable).where(eq(blogTable.path, (await params).path)).limit(1);
    if (res.length < 1) throw new Error("blog post not found");
    post = res[0];
  } catch {
    return { title: "blog post" };
  }
  return { title: post.title }
}
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
    <main className="flex flex-col min-h-screen p-8 md:p-16 md:px-24 min-w-screen">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> {post.title}</h1>
      <p className="text-lg italic">{post.blurb}</p>
      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-3"><FontAwesomeIcon icon={faClock} /> <ClientTime date={new Date(post.publishedAt)} /> - <FontAwesomeIcon icon={faPencil} /> by nova</p>
      <div className="prose prose-neutral dark:prose-invert min-w-full">
        <Markdown>{post.body}</Markdown>
      </div>
    </main>
  );
}