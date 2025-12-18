import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Markdown from "react-markdown";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "blog" };
export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> (title)</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>(contents)</Markdown>
      </div>
    </main>
  );
}