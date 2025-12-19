"use client";
import { faKey, faSignIn, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPrompt() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/auth", { method: "POST", body: JSON.stringify({ token }) });
    let body;
    try {
      body = await res.json();
    } catch {
      alert("login failed: unknown error!");
    }
    if (body.success) {
      router.push("/admin");
      return;
    } else alert(`login failed: ${body.message} (${body.error})`);
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold"><FontAwesomeIcon icon={faUserLock} /> sign in to admin portal</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-1">
        <label><FontAwesomeIcon icon={faKey} /> admin token:</label>
        <input value={token} onChange={(e) => setToken(e.target.value)} className="border-violet-500 border-2 rounded-lg p-1" />
        <button className="mt-2 bg-slate-300 dark:bg-slate-800 rounded-lg p-1"><FontAwesomeIcon icon={faSignIn} /> sign in</button>
      </form>
    </div>
  );
}