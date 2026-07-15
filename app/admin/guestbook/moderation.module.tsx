"use client"
import { faBan, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function GuestbookModeration({ id, visible }: { id: number, visible: boolean }) {
  async function approveEntry() {

  }
  async function hideEntry() {

  }
  async function deleteEntry() {
    try {
      const res = await fetch("/api/admin/guestbook", { method: "DELETE" });
      window.navigation.reload();
    } catch (e) {
      console.error(`error deleting guestbook entry: ${e}`);
      alert(`error deleting guestbook entry: ${e}`);
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