import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientTime } from "../clientui.module";
import db from "@/utils/db";
import { blogTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import alex88x31 from "@/public/friend-88x31s/parkalex.png";
import error88x31 from "@/public/friend-88x31s/errorcodezero.png";

import hackclub88x31 from "@/public/other-88x31s/hackclub.png";
import transrights88x31 from "@/public/other-88x31s/transrights.png";

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
    <div className="flex flex-col p-2 bg-slate-400 dark:bg-slate-700 rounded-xl mt-2">
      <h1 className="font-semibold text-lg">nova&apos;s status</h1>
      <p>{status.emoji} {status.status}</p>
      {status.expiry && <p className="text-sm text-slate-500"><FontAwesomeIcon icon={faClock} /> expires <ClientTime date={new Date(status.expiry)} /></p>}
    </div>
  )
}
export async function LatestPostWidget() {
  let data;
  try {
    data = (await db.select().from(blogTable).where(eq(blogTable.published, true))).sort((a, b) => { return b.publishedAt.getTime() - a.publishedAt.getTime() });
  } catch (e) {
    console.warn(`error with database! ${e}`);
    return null;
  }
  if (data.length < 1) return null;
  return (
    <Link href={`/blog/${data[0].path}`} className="flex items-center justify-between p-2 bg-slate-400 dark:bg-slate-700 rounded-xl mt-2">
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
export function EightyEightThirtyOnes() {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-2">
        <a href="https://parkalex.dev" target="_blank"><Image src={alex88x31} width={88} height={31} alt="Alex's 88x31" /></a>
        <a href="https://errorcodezero.dev" target="_blank"><Image src={error88x31} width={88} height={31} alt="errorcodezero's 88x31" /></a>
      </div>
      <div className="flex gap-2">
        <a href="https://hackclub.com" target="_blank"><Image src={hackclub88x31} width={88} height={31} alt="Hack Club 88x31" /></a>
        <Image src={transrights88x31} width={88} height={31} alt="Trans Rights! (88x31)" />
      </div>
    </div>
  );
}