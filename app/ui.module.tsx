import Link from "next/link";
import{ FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faNewspaper, faClipboard, faComment } from "@fortawesome/free-regular-svg-icons";

export function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 p-2 md:px-6">
      <Link href={"/"} className="text-xl font-semibold bg-linear-to-br from-violet-300 to-violet-500 text-transparent bg-clip-text">nova :3</Link>
      <div className="flex gap-4 justify-between">
        <Link href={"/"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faHome} /> home</Link>
        <Link href={"/blog"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faNewspaper} /> blog</Link>
        <Link href={"/projects"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faClipboard} /> projects</Link>
        <Link href={"/info"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faComment} /> info</Link>
      </div>
    </div>
  );
}