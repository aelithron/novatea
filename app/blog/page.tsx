import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

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
    //blogPosts = await db.select().from(blogTable);
    blogPosts = [{ path: "a", title: "Title", blurb: "Post stuff", body: "aaa", publishedAt: new Date(), tags: ["test"], editedAt: null }]
  } catch {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faX} /> error loading blog posts!</h2>
      </div>
    );
  }
  return (
    <div>
      {blogPosts.map(post => <div key={post.path}>
        
      </div>)}
    </div>
  )
}