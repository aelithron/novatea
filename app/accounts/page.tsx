import { faDiscord, faGithub, faReddit, faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "accounts" }
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faComment} /> nova&apos;s accounts!</h1>
      <p>places where i am / how to contact me :3</p>
      <div className="flex flex-col mt-3 gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1"><FontAwesomeIcon icon={faEnvelope} /> email</div>
          <a href="mailto:nova@novatea.dev" className="underline hover:text-sky-500">nova@novatea.dev</a>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1"><FontAwesomeIcon icon={faDiscord} /> discord</div>
          <p>aelithron</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1"><FontAwesomeIcon icon={faSignalMessenger} /> signal</div>
          <p>novatea.84</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1"><FontAwesomeIcon icon={faGithub} /> github</div>
          <a href="https://github.com/aelithron" target="_blank" className="underline hover:text-sky-500">aelithron</a>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1"><FontAwesomeIcon icon={faReddit} /> reddit</div>
          <a href="https://reddit.com/u/novatea0" target="_blank" className="underline hover:text-sky-500">novatea0</a>
        </div>
      </div>
    </main>
  );
}