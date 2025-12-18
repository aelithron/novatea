import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientTime } from "./clientui.module";

type UniversalStatusBody = { status: string, emoji: string, expiry: string };
export async function UniversalStatusWidget({ email }: { email: string }) {
  let status: UniversalStatusBody | null = null;
  try {
    const statusRes = await fetch(`http://localhost:3001/api/status?email=${email}`);
    status = await statusRes.json() as UniversalStatusBody;
    if (!status.status || !statusRes.ok) throw new Error("Invalid response from Universal Status");
  } catch (e) {
    console.warn(`error with universal status! ${e}`);
    return null;
  }
  if (status.status === "No status set.") return null;
  return (
    <div className="flex flex-col p-2 bg-slate-700 rounded-xl mt-2">
      <h1 className="font-semibold">nova&apos;s status</h1>
      <p>{status.emoji} {status.status}</p>
      {status.expiry && <p className="text-sm text-slate-500"><FontAwesomeIcon icon={faClock} /> expires <ClientTime date={new Date(status.expiry)} /></p>}
    </div>
  )
}