import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookOpen, faBriefcase, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { ClientTime } from "@/app/clientui.module";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "preview post" };
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
      <Link href={`/admin/posts/${(await params).path}`} className="bg-slate-300 dark:bg-slate-800 p-1 rounded-full w-fit mb-2 text-lg"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faEye} /> preview - {post[0].title}</h1>
      <p className="text-lg italic mb-3">{post[0].blurb}</p>
      <p className="font-semibold text-slate-700 dark:text-slate-300"><FontAwesomeIcon icon={faPencil} /> by nova - <FontAwesomeIcon icon={faClock} /> <ClientTime date={post[0].publishedAt} /></p>
      <p className="font-semibold text-slate-700 dark:text-slate-300"><FontAwesomeIcon icon={faBookOpen} /> {post[0].body.split(" ").length} words (<FontAwesomeIcon icon={faClock} /> {Math.ceil(post[0].body.split(" ").length / 200)} min to read)</p>
      <div className="prose prose-neutral dark:prose-invert min-w-full mt-3">
        <Markdown remarkPlugins={[remarkGfm]}>{post[0].body}</Markdown>
      </div>
    </div>
  );
}