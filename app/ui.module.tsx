import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faNewspaper, faClipboard, faComment, faAddressCard } from "@fortawesome/free-regular-svg-icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center md:justify-between gap-2 p-2 md:px-6 bg-black">
      <Link href={"/"} className="text-xl font-semibold bg-linear-to-br from-violet-300 to-violet-500 text-transparent bg-clip-text">nova :3</Link>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href={"/"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faHome} /> home</Link>
          <Link href={"/blog"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faNewspaper} /> blog</Link>
          <Link href={"/projects"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faClipboard} /> projects</Link>
        </div>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href={"/about"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faAddressCard} /> about</Link>
          <Link href={"/accounts"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faComment} /> accounts</Link>
        </div>
      </div>
    </header>
  );
}