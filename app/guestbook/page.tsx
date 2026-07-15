import db from "@/utils/db";
import { guestbookTable } from "@/utils/schema";
import { faClock, faContactBook } from "@fortawesome/free-regular-svg-icons";
import { faUpRightFromSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { ClientTime } from "../clientui.module";
import GuestbookForm from "./add.form";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "guestbook" };
export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold mb-0.5"><FontAwesomeIcon icon={faContactBook} /> guestbook</h1>
      <p className="mb-2">leave a little message on nova&apos;s site!</p>
      <GuestbookForm />
      <Guestbook />
    </main>
  );
}
async function Guestbook() {
  let entries = [];
  try {
    entries = (await db.select().from(guestbookTable).where(eq(guestbookTable.visible, true))).sort((a, b) => { return b.createdAt.getTime() - a.createdAt.getTime() });
  } catch (e) {
    console.warn(e);
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faX} /> error loading guestbook entries!</h2>
      </div>
    );
  }
  if (entries.length < 1) {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faClock} /> no guestbook entries have been published!</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {entries.map(entry => <div key={entry.id} className="flex flex-col p-2 bg-slate-300 dark:bg-slate-800 rounded-lg gap-2 justify-between">
        <div className="flex justify-between gap-2 w-full">
          <p>{entry.name}</p>
          {entry.url && <a href={entry.url} target="_blank" className="text-slate-700 dark:text-slate-300 hover:text-sky-500"><u>link</u> <FontAwesomeIcon icon={faUpRightFromSquare} /></a>}
        </div>
        <p className="bg-slate-200 dark:bg-slate-900 p-1 rounded-lg">{entry.body}</p>
        <p className="text-slate-500 text-sm"><FontAwesomeIcon icon={faClock} /> <ClientTime date={new Date(entry.createdAt)} /></p>
      </div>)}
    </div>
  );
}