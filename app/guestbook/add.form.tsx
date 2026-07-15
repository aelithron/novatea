"use client";
export default function GuestbookForm() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/guestbook", { method: "POST", body: JSON.stringify({  }) });
    } catch (e) {
      console.error(`failed to submit guestbook entry: ${e}`);
      alert("failed to submit guestbook entry, check the browser console for info or try again!");
    }
  }
  return (
    <form onSubmit={handleSubmit}>

    </form>
  );
}