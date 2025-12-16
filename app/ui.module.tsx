import Link from "next/link";
import{ FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faNewspaper, faClipboard } from "@fortawesome/free-regular-svg-icons";

export function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 p-2 md:px-6">
      <h1>nova :3</h1>
      <div className="flex gap-4 justify-between">
        <Link href={"/"} className="hover:text-sky-500"><FontAwesomeIcon icon={faHome} /> home</Link>
        <Link href={"/blog"} className="hover:text-sky-500"><FontAwesomeIcon icon={faNewspaper} /> blog</Link>
        <Link href={"/projects"} className="hover:text-sky-500"><FontAwesomeIcon icon={faClipboard} /> projects</Link>
      </div>
    </div>
  );
}