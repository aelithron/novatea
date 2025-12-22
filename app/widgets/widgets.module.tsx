import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientTime } from "../clientui.module";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type UniversalStatusBody = { status: string, emoji: string, expiry: string };
export async function UniversalStatusWidget({ email }: { email: string }) {
  let status: UniversalStatusBody | null = null;
  try {
    const statusRes = await fetch(`https://status.novatea.dev/api/status?email=${email}`);
    status = await statusRes.json() as UniversalStatusBody;
    if (!status.status || !statusRes.ok) throw new Error("Invalid response from Universal Status");
  } catch (e) {
    console.warn(`error with universal status! ${e}`);
    return null;
  }
  if (status.status === "No status set.") return null;
  return (
    <div className="flex flex-col p-2 bg-slate-700 rounded-xl mt-2">
      <h1 className="font-semibold text-lg">nova&apos;s status</h1>
      <p>{status.emoji} {status.status}</p>
      {status.expiry && <p className="text-sm text-slate-500"><FontAwesomeIcon icon={faClock} /> expires <ClientTime date={new Date(status.expiry)} /></p>}
    </div>
  )
}
export async function LatestPostWidget() {
  let data;
  try {
    data = await db.select().from(blogTable).where(eq(blogTable.published, true));
  } catch (e) {
    console.warn(`error with database! ${e}`);
    return null;
  }
  if (data.length < 1) return null;
  return (
    <Link href={`/blog/${data[0].path}`} className="flex items-center justify-between p-2 bg-slate-700 rounded-xl mt-2">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg"><FontAwesomeIcon icon={faNewspaper} /> latest post</h1>
        <h2 className="font-semibold">{data[0].title}</h2>
        <p className="italic text-sm">{data[0].blurb}</p>
        <p className="text-sm text-slate-500 mt-1"><FontAwesomeIcon icon={faClock} /> <ClientTime date={data[0].publishedAt} /></p>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
}