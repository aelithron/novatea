"use client";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faCloud, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faPlus, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function CreatePostForm() {
  const router = useRouter();
  const [path, setPath] = useState<string>("")
  const [title, setTitle] = useState<string>("");
  const [blurb, setBlurb] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 1) {
      alert("make sure to fill in the post's title!");
      return;
    }
    const res = await fetch("/api/admin/blog", { method: "POST", body: JSON.stringify({ path, title, blurb }) });
    let resBody;
    try {
      resBody = await res.json();
    } catch {
      alert("unknown error while creating the post!");
      return;
    }
    if (resBody.error) {
      alert(`error creating the post: ${resBody.message} (${resBody.error})`);
      return;
    }
    router.push(`/admin/posts/${path}`);
  }
  useEffect(() => {
    function checkBeforeClosing(e: BeforeUnloadEvent) { e.preventDefault(); }
    window.addEventListener("beforeunload", checkBeforeClosing);
    return () => { window.removeEventListener("beforeunload", checkBeforeClosing); }
  }, []);
  return (
    <form className="flex flex-col mt-4 gap-2 items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="path" className="font-semibold">path:</label>
        <input id="path" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={path} onChange={(e) => setPath(e.target.value)} />
        <label htmlFor="title" className="font-semibold">title:</label>
        <input id="title" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="blurb" className="font-semibold">blurb:</label>
        <input id="blurb" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={blurb} onChange={(e) => setBlurb(e.target.value)} />
      </div>
      <button className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="submit"><FontAwesomeIcon icon={faPlus} /> create</button>
    </form>
  );
}

// aaa why do things going to the client have to be serializable by react :heavysob:
export function EditPostForm({ path, origTitle, origBody, origBlurb, origPublishedAt, origPublished }: { path: string, origTitle: string, origBody: string, origBlurb: string, origPublishedAt: Date, origPublished: boolean }) {
  const router = useRouter();
  const [saved, setSaved] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(origTitle);
  const [body, setBody] = useState<string>(origBody);
  const [blurb, setBlurb] = useState<string>(origBlurb);
  const [publishedAt, setPublishedAt] = useState<Date>(origPublishedAt);
  const [published, setPublished] = useState<boolean>(origPublished);
  // weird state management mess i have to do for autosave to work
  const [curTitle, setCurTitle] = useState<string>(origTitle);
  const [curBody, setCurBody] = useState<string>(origBody);
  const [curBlurb, setCurBlurb] = useState<string>(origBlurb);
  const [curPublishedAt, setCurPublishedAt] = useState<Date>(origPublishedAt);
  const [curPublished, setCurPublished] = useState<boolean>(origPublished);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 1) {
      alert("make sure to fill in the post's title!");
      return;
    }
    const reqData: { title?: string, body?: string, blurb?: string, published?: boolean, publishedAt?: Date } = {};
    if (title !== curTitle) reqData.title = title;
    if (body !== curBody) reqData.body = body;
    if (blurb !== curBlurb) reqData.blurb = blurb;
    if (published !== curPublished) reqData.published = published;
    if (publishedAt !== curPublishedAt) reqData.publishedAt = publishedAt;
    const res = await fetch("/api/admin/blog", { method: "PATCH", body: JSON.stringify({ path, ...reqData }) });
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
    afterSave();
  }
  async function deletePost() {
    const verify = confirm(`are you sure you want to delete this post?\npath: ${path}\ntitle: ${curTitle}`);
    if (!verify) return;
    const res = await fetch("/api/admin/blog", { method: "DELETE", body: JSON.stringify({ path }) });
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(value: any, setter: Dispatch<SetStateAction<any>>) {
    setSaved(false);
    setter(value);
  }
  function afterSave() {
    setSaved(true);
    setCurTitle(title);
    setCurBody(body);
    setCurBlurb(blurb);
    setCurPublished(published);
    setCurPublishedAt(publishedAt);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title.trim().length < 1) return;
      const reqData: { title?: string, body?: string, blurb?: string, published?: boolean, publishedAt?: Date } = {};
      if (title !== curTitle) reqData.title = title;
      if (body !== curBody) reqData.body = body;
      if (blurb !== curBlurb) reqData.blurb = blurb;
      if (published !== curPublished) reqData.published = published;
      if (publishedAt !== curPublishedAt) reqData.publishedAt = publishedAt;
      fetch("/api/admin/blog", { method: "PATCH", body: JSON.stringify({ path, ...reqData }) })
        .then((res) => {
          try {
            return res.json();
          } catch {
            alert("unknown error while updating the post!");
            return null;
          }
        })
        .then((body) => {
          if (body.error) {
            alert(`error updating the post: ${body.message} (${body.error})`);
            return;
          } else afterSave();
        })
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, body, blurb, published, publishedAt]);
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
          <input id="path" type="text" value={path} disabled={true} />
          <label htmlFor="title" className="font-semibold">title:</label>
          <input id="title" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={title} onChange={(e) => handleChange(e.target.value, setTitle)} />
          <label htmlFor="blurb" className="font-semibold">blurb:</label>
          <input id="blurb" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={blurb} onChange={(e) => handleChange(e.target.value, setBlurb)} />
          <label htmlFor="published-at" className="font-semibold">published at:</label>
          <input id="published-at" type="datetime-local" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 w-64" value={formatTime(publishedAt)} onChange={(e) => handleChange(new Date(e.target.value), setPublishedAt)} />
          <div className="flex gap-2 mt-2">
            <label htmlFor="published" className="font-semibold">published?</label>
            <input id="published" type="checkbox" checked={published} onChange={(e) => handleChange(e.target.checked, setPublished)} />
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
          <textarea id="post-body" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1" value={body} onChange={(e) => handleChange(e.target.value, setBody)} rows={9} />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={saved ? faCloud : faSync} className="p-2 bg-slate-300 dark:bg-slate-800 rounded-full" />
        <button className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="submit"><FontAwesomeIcon icon={faPencil} /> edit</button>
        <button className="bg-red-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="button" onClick={deletePost}><FontAwesomeIcon icon={faTrashAlt} /> delete</button>
        <Link className="bg-slate-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" href={`/admin/preview/${path}`}><FontAwesomeIcon icon={faEye} /> preview</Link>
      </div>
    </form>
  );
}

function formatTime(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}