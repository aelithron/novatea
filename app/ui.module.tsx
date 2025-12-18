import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faNewspaper, faClipboard, faComment, faAddressCard } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import notByAI from "@/public/not-by-ai.svg"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center md:justify-between gap-2 p-2 md:px-6 bg-black">
      <Link href={"/"} className="text-xl font-semibold bg-linear-to-br from-violet-300 to-violet-500 text-transparent bg-clip-text">nova :3</Link>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href={"/"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faHome} /> home</Link>
          <Link href={"/blog"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faNewspaper} /> blog</Link>
          <Link href={"/about"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faAddressCard} /> about</Link>
        </div>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href={"/projects"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faClipboard} /> projects</Link>
          <Link href={"/accounts"} className={`hover:text-sky-500`}><FontAwesomeIcon icon={faComment} /> accounts</Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex gap-2 md:px-6 p-3 justify-between">
      <a href="https://github.com/aelithron/novatea" target="_blank" className="flex items-center text-slate-500 hover:text-sky-500"><FontAwesomeIcon icon={faGithub} /> <p className="ml-1 underline">source code</p></a>
      <a href="https://notbyai.fyi" target="_blank"><Image src={notByAI} width={128} height={128} alt="Developed by a human, not by AI!" /></a>
    </footer>
  )
}