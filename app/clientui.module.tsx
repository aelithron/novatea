"use client"
export function CopyButton({ children, text, message }: { children: React.ReactNode, text: string, message?: string }) {
  async function copyText() {
    await navigator.clipboard.writeText(text);
    alert(message ? `${message} (${text})` : `copied! (${text})`);
  }
  return (
    <button onClick={copyText} type="button" className="hover:text-sky-500">{children}</button>
  );
}
export function ClientTime({ date }: { date: Date }) {
  const formattedDate = new Date(date).toLocaleString(undefined, { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  return (<>{formattedDate}</>);
}