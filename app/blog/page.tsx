import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { ClientTime } from "../clientui.module";
import Link from "next/link";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "blog" };
export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> blog</h1>
      <p>nova&apos;s blog about random things!</p>
      <BlogPosts />
    </main>
  );
}
async function BlogPosts() {
  let blogPosts = [];
  try {
    blogPosts = await db.select().from(blogTable).where(eq(blogTable.published, true));
  } catch {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faX} /> error loading blog posts!</h2>
      </div>
    );
  }
  if (blogPosts.length < 1) {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faClock} /> no blog posts have been published!</h2>
      </div>
    );
  }
  return (
    <div className="mt-2">
      {blogPosts.map(post => <div key={post.path} className="flex p-2 bg-slate-300 dark:bg-slate-800 rounded-lg gap-2 justify-between">
        <Link href={`/blog/${post.path}`} className="flex gap-2 w-full">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <h1 className="text-lg font-semibold">{post.title}</h1>
              <p className="text-slate-500"><FontAwesomeIcon icon={faClock} /> <ClientTime date={new Date(post.publishedAt)} /></p>
            </div>
            <p className="italic">{post.blurb}</p>
          </div>
        </Link>
      </div>)}
    </div>
  )
}