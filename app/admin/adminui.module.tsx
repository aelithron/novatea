"use client"
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export function LogOutButton() {
  const router = useRouter();
  async function logOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/auth");
  }
  return (<button onClick={logOut} className="bg-slate-500 rounded-lg p-1 px-2 hover:text-sky-500"><FontAwesomeIcon icon={faSignOut} /> sign out</button>);
}