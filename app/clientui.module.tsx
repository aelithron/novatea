"use client"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CopyButton({ text, icon, message }: { text: string, icon: IconDefinition, message?: string }) {
  async function copyText() {
    await navigator.clipboard.writeText(text);
    alert(message ? message : "copied!");
  }
  return (
    <button onClick={copyText} type="button" className="hover:text-sky-500"><FontAwesomeIcon icon={icon} /></button>
  );
}