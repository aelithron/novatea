import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "blog" };
export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  let blogPost = null;
  try {
    blogPost = await db.select().from(blogTable).where(eq(blogTable.path, (await params).article)).limit(1);
  } catch {}
  if (!blogPost) return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faX} /> Blog post not found!</h1>
      <p>This blog post could not be found.</p>
      <Link href={"/blog"} className="bg-violet-300 dark:bg-violet-600 rounded-xl p-1 mt-2"><FontAwesomeIcon icon={faNewspaper} /> Back to Blog</Link>
    </main>
  );
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> (title)</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>(contents)</Markdown>
      </div>
    </main>
  );
}