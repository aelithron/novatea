"use client";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostForm({ path }: { path: string | null }) {
  const router = useRouter();
  const [newPath, setNewPath] = useState<string>(path || "");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [blurb, setBlurb] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<Date>(new Date());
  const [published, setPublished] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPath.trim().length < 1 || title.trim().length < 1) {
      alert("make sure to fill in the post's path and title!");
      return;
    }
    const res = await fetch("/api/admin/blog", { method: path ? "PATCH" : "POST", body: JSON.stringify({ path: newPath, title, body, blurb, publishedAt }) });
    let resBody;
    try {
      resBody = await res.json();
    } catch {
      alert("unknown error while updating the post!");
      return;
    }
    if (resBody.error) {
      alert(`error updating the post: ${resBody.message} (${resBody.error})`);
      return;
    }
    router.push("/admin");
  }
  useEffect(() => {
    function checkBeforeClosing(e: BeforeUnloadEvent) { e.preventDefault(); }
    window.addEventListener("beforeunload", checkBeforeClosing);
    return () => { window.removeEventListener("beforeunload", checkBeforeClosing); }
  }, []);
  return (
    <form className="flex flex-col mt-4 gap-2 items-center" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="path" className="font-semibold">path:</label>
          <input id="path" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={newPath} onChange={(e) => setNewPath(e.target.value)} />
          <label htmlFor="title" className="font-semibold">title:</label>
          <input id="title" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="blurb" className="font-semibold">blurb:</label>
          <input id="blurb" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={blurb} onChange={(e) => setBlurb(e.target.value)} />
          <label htmlFor="published-at" className="font-semibold">published at:</label>
          <input id="published-at" type="datetime-local" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 w-64" value={formatTime(publishedAt)} onChange={(e) => setPublishedAt(new Date(e.target.value))} />
          <div className="flex gap-2 mt-2">
            <label htmlFor="published" className="font-semibold">published?</label>
            <input id="published" type="checkbox" value={published ? "true" : "false"} onChange={(e) => setPublished(e.target.checked)} />
          </div>
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <div className="flex gap-2 justify-between">
            <label htmlFor="post-body" className="font-semibold">body:</label>
            <div className="flex gap-2">
              <p className="text-sm italic">(supports markdown!)</p>
              <a href="https://commonmark.org/help" className="hover:text-sky-500" target="_blank"><FontAwesomeIcon icon={faMarkdown} /></a>
            </div>
          </div>
          <textarea id="post-body" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={body} onChange={(e) => setBody(e.target.value)} rows={9} />
        </div>
      </div>
      <button className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="submit"><FontAwesomeIcon icon={faPencil} /> {path ? "Edit" : "Create"}</button>
    </form>
  );
}

function formatTime(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}