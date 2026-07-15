"use client";
import { faEnvelope, faIdBadge, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faLink, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function GuestbookForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [url, setURL] = useState<string>("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/guestbook", { method: "POST", body: JSON.stringify({ name, email, body, url }) });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        alert(`failed to submit guestbook entry! ${parsed ? parsed.message : ""}`);
        return;
      }
      alert("thanks! your entry has been sent to nova, and will be displayed publicly soon.");
    } catch (e) {
      console.error(`failed to submit guestbook entry: ${e}`);
      alert("failed to submit guestbook entry, check the browser console for info or try again!");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 mb-4 bg-slate-300 dark:bg-slate-800 rounded-xl">
      <h1 className="text-lg font-semibold"><FontAwesomeIcon icon={faPencil} /> add an entry</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name"><FontAwesomeIcon icon={faIdBadge} /> name</label>
          <input id="name" placeholder="(required) e.g nova" value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-500 rounded-lg border-slate-400 dark:border-slate-900 border-2 p-1" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> email</label>
          <input id="email" placeholder="(required) e.g. nova@novatea.dev" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-500 rounded-lg border-slate-400 dark:border-slate-900 border-2 p-1" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="url"><FontAwesomeIcon icon={faLink} /> url (your site)</label>
          <input id="url" placeholder="(optional) e.g. https://novatea.dev" value={url} onChange={(e) => setURL(e.target.value)} className="bg-slate-500 rounded-lg border-slate-400 dark:border-slate-900 border-2 p-1" />
        </div>
        <div className="flex flex-col gap-1 md:col-span-3">
          <label htmlFor="body"><FontAwesomeIcon icon={faMessage} /> message</label>
          <textarea id="body" placeholder="(required) enter your message here! :3" value={body} onChange={(e) => setBody(e.target.value)} className="bg-slate-500 rounded-lg border-slate-400 dark:border-slate-900 border-2 p-1" />
        </div>
        <div className="md:col-span-3 w-fit flex mx-auto">
          <button type="submit" className="bg-violet-500 py-1 px-2 rounded-xl hover:text-sky-500">submit!</button>
        </div>
      </div>
    </form>
  );
}