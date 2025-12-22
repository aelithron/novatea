import { faDiscord, faGithub, faReddit, faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Image from "next/image";
import { CopyButton } from "./clientui.module";
import { UniversalStatusWidget, LatestPostWidget, EightyEightThirtyOnes } from "./widgets/widgets.module";
import { TimeWidget } from "./widgets/clientwidgets.module";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "home ✧ novatea.dev" };
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        <div className="flex flex-col gap-2 p-4 bg-slate-300 dark:bg-slate-800 rounded-xl">
          <div className="flex flex-col">
            <Image src={"https://avatars.githubusercontent.com/u/187228556?v=4"} width={100} height={100} alt="my profile picture" className="rounded-xl" />
            <h1 className="text-2xl font-semibold flex items-center">hi, i&apos;m <p className="ml-1 bg-linear-to-br from-violet-300 to-violet-500 text-transparent bg-clip-text">nova</p>! (they/she)</h1>
          </div>
          <div className="mt-1 gap-2">
            <p>i&apos;m a full stack dev, writer, and amateur photographer :3</p>
            <div className="flex gap-2 justify-start text-xl">
              <a href="mailto:nova@novatea.dev" target="_blank" className="hover:text-sky-500"><FontAwesomeIcon icon={faEnvelope} /></a>
              <a href="https://github.com/aelithron" target="_blank" className="hover:text-sky-500"><FontAwesomeIcon icon={faGithub} /></a>
              <CopyButton text="aelithron" message="copied discord username!"><FontAwesomeIcon icon={faDiscord} /></CopyButton>
              <CopyButton text="novatea.84" message="copied signal username!"><FontAwesomeIcon icon={faSignalMessenger} /></CopyButton>
              <a href="https://reddit.com/novatea0" target="_blank" className="hover:text-sky-500"><FontAwesomeIcon icon={faReddit} /></a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-slate-300 dark:bg-slate-800 rounded-xl">
          <UniversalStatusWidget email="aelithron@gmail.com" />
          <LatestPostWidget />
          <TimeWidget />
        </div>
        <div className="flex flex-col p-4 md:col-span-2 bg-slate-300 dark:bg-slate-800 rounded-xl">
          <h1 className="text-xl font-semibold"><FontAwesomeIcon icon={faAddressCard} /> about me!</h1>
          <p>hi again! my name is nova, and i&apos;m a teen transfem who does software development, plus some other things!</p>
          <p>i&apos;m a member of <a className="underline hover:text-sky-500" href="https://hackclub.com">hack club</a>, a community for teen software devs. i&apos;ve made some cool software, like <a className="underline hover:text-sky-500" href="https://github.com/aelithron/lyrickit">lyrickit</a> and <a className="underline hover:text-sky-500" href="https://github.com/aelithron/universal-status">universal status</a>!</p>
          <p>if you want to know more about me, check out my <Link href={"/about"} className="hover:text-sky-500 underline">full about page</Link> :3</p>
          <div className="flex gap-2 mt-2 items-center">
            <p className="text-lg font-semibold">my 88x31:</p>
            <p>coming soon :3</p>
          </div>
          <EightyEightThirtyOnes />
        </div>
      </div>
    </main>
  );
}