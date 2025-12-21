import { Metadata } from "next";
import { EditPostForm } from "../../post.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBriefcase, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "edit post" };
export default async function Page({ params }: { params: Promise<{ path: string }> }) {
  const post = await db.select().from(blogTable).where(eq(blogTable.path, (await params).path)).limit(1);
  if (!post || post.length < 1) return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faX} /> blog post not found!</h1>
      <p>this blog post could not be found.</p>
      <Link href={"/admin"} className="bg-violet-300 dark:bg-violet-600 rounded-xl p-1 mt-2"><FontAwesomeIcon icon={faBriefcase} /> back to admin</Link>
    </main>
  )
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <Link href="/admin" className="bg-slate-300 dark:bg-slate-800 p-1 rounded-full w-fit mb-2 text-lg"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faPencil} /> edit post</h1>
      <EditPostForm path={(await params).path} origTitle={post[0].title} origBody={post[0].body} origBlurb={post[0].blurb} origPublished={post[0].published} origPublishedAt={new Date(post[0].publishedAt)} />
    </div>
  );
}