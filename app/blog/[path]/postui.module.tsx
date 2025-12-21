"use client";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DownloadPost({ path }: { path: string }) {
  function downloadPost() {
    const link = document.createElement("a");
    link.href = `${window.location.origin}/api/blog?path=${path}`;
    link.setAttribute("download", `${path}.md`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
  return <button onClick={downloadPost} className="hover:text-sky-500 text-lg"><FontAwesomeIcon icon={faDownload} /></button>
}