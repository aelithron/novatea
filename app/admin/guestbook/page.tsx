import { ClientTime } from "@/app/clientui.module";
import db from "@/utils/db";
import { guestbookTable } from "@/utils/schema";
import { faClock, faContactBook, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";
import GuestbookModeration from "./moderation.module";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "guestbook admin" };
export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <Link href="/admin" className="bg-slate-300 dark:bg-slate-800 p-1 rounded-full w-fit mb-2 text-lg"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faContactBook} /> guestbook admin</h1>
      <GuestbookAdmin />
    </main>
  );
}
async function GuestbookAdmin() {
  let entries = [];
  try {
    entries = (await db.select().from(guestbookTable)).sort((a, b) => { return b.createdAt.getTime() - a.createdAt.getTime() });
  } catch (e) {
    console.warn(e);
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faX} /> error loading guestbook entries!</h2>
      </div>
    );
  }
  entries.push({ id: 1, name: "nova", email: "nova@novatea.dev", url: "https://github.com/aelithron", body: "meow mrrp hi", createdAt: new Date(), visible: true });
  if (entries.length < 1) {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faClock} /> no guestbook entries have been added!</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
      {entries.map(entry => <div key={entry.id} className="flex flex-col p-2 bg-slate-300 dark:bg-slate-800 rounded-lg gap-2 justify-between">
        <div className="flex justify-between gap-2 w-full">
          <p><FontAwesomeIcon icon={entry.visible ? faEye : faEyeSlash} className={entry.visible ? "" : "text-slate-500"} /> {entry.name}</p>
          <GuestbookModeration id={entry.id} visible={entry.visible} />
        </div>
        <p className="bg-slate-200 dark:bg-slate-900 p-1 rounded-lg">{entry.body}</p>
        <p>email: <a href={`mailto:${entry.email}`} className="underline hover:text-sky-500">{entry.email}</a></p>
        <p>url: {entry.url ? <a href={entry.url} className="underline hover:text-sky-500">{entry.url}</a> : <u>none</u>}</p>
        <div className="flex justify-between gap-2 text-slate-500 text-sm">
          <p><FontAwesomeIcon icon={faClock} /> <ClientTime date={new Date(entry.createdAt)} /></p>
          <p>id: {entry.id}</p>
        </div>
      </div>)}
    </div>
  );
}