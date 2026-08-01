"use client";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function GuestbookReply({ id, curReply }: { id: number, curReply: string }) {
  const [reply, setReply] = useState<string>(curReply);
  const [saved, setSaved] = useState<boolean>(true);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/guestbook", { method: "PATCH", body: JSON.stringify({ id, reply }) });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        alert(`error replying to the guestbook entry: ${parsed.message ? parsed.message : ""}`);
        return;
      }
      setSaved(true);
    } catch (e) {
      console.error(`error replying to the guestbook entry: ${e}`);
      alert(`error replying to the guestbook entry: ${e}`);
    }
  }
  function handleChange(value: string) {
    setReply(value);
    setSaved(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex justify-between gap-1">
        <p>reply:</p>
        {!saved && <button type="submit" className="hover:text-sky-500"><FontAwesomeIcon icon={faSave} /></button>}
      </div>
      <textarea value={reply} onChange={(e) => handleChange(e.target.value)} className="bg-slate-500 rounded-lg border-slate-400 dark:border-slate-900 border-2 p-1" />
    </form>
  );
}