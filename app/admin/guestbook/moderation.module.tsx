"use client"
import { faBan, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function GuestbookModeration({ id, visible }: { id: number, visible: boolean }) {
  async function approveEntry() {
    try {
      const res = await fetch("/api/admin/guestbook", { method: "PATCH", body: JSON.stringify({ id, visible: true }) });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        alert(`error making the guestbook entry visible! ${parsed.message ? parsed.message : ""}`);
        return;
      }
      window.location.reload();
    } catch (e) {
      console.error(`error making the guestbook entry visible: ${e}`);
      alert(`error making the guestbook entry visible: ${e}`);
    }
  }
  async function hideEntry() {
    try {
      const res = await fetch("/api/admin/guestbook", { method: "PATCH", body: JSON.stringify({ id, visible: false }) });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        alert(`error hiding the guestbook entry! ${parsed.message ? parsed.message : ""}`);
        return;
      }
      window.location.reload();
    } catch (e) {
      console.error(`error hiding the guestbook entry: ${e}`);
      alert(`error hiding the guestbook entry: ${e}`);
    }
  }
  async function deleteEntry() {
    try {
      const res = await fetch("/api/admin/guestbook", { method: "DELETE", body: JSON.stringify({ id }) });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        alert(`error deleting the guestbook entry! ${parsed.message ? parsed.message : ""}`);
        return;
      }
      window.navigation.reload();
    } catch (e) {
      console.error(`error deleting the guestbook entry: ${e}`);
      alert(`error deleting the guestbook entry: ${e}`);
    }
  }
  return (
    <div className="flex gap-2">
      {!visible && <button onClick={approveEntry} className="hover:texy-sky-500"><FontAwesomeIcon icon={faCheck} /></button>}
      {visible && <button onClick={hideEntry} className="hover:text-sky-500"><FontAwesomeIcon icon={faBan} /></button>}
      <button onClick={deleteEntry} className="hover:text-sky-500"><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  )
}