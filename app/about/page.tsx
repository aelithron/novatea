import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "about" }
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faAddressCard} /> about nova</h1>
      <p className="mb-2">an extended bio, mostly in list form</p>
      <p>hi! my name is nova, and i&apos;m a random software dev on the internet :3</p>
      <p>this won&apos;t have everything, as i&apos;m saving some things for my blog.</p>
      <div className="flex flex-col gap-2 mt-2">
        <div>
          <h2 className="text-xl font-semibold">fun facts about me</h2>
          <ul className="list-disc list-inside">
            <li>i&apos;m a minor (teenager)</li>
            <li>i am transgender, more specifically transfeminine non-binary</li>
            <li>i am omnisexual, with a preference for women and non-binary people. this is under the bi umbrella :3</li>
            <li>my aesthetic is <a href="https://aesthetics.fandom.com/wiki/Soft_Girl" className="hover:text-sky-500 underline">soft girl</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">triggers, boundaries, and dni</h2>
          <p>i get triggered by multiple things, but mainly loud noises and physical touch. these can cause me to have mental breakdowns, so be careful about these with me!</p>
          <p>my boundaries are that you should ask to message me where possible, and you should never send me nsfw content without my permission (though suggestive content is ok).</p>
          <p>finally, my dni (do not interact) list:</p>
          <ul className="list-disc list-inside">
            <li>bigots</li>
            <li>ableists</li>
            <li>right-wingers (specifically people who support trump)</li>
            <li>misogynists</li>
            <li>creeps / predators</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">things i do</h2>
          <ul className="list-disc list-inside">
            <li>i&apos;m a full-stack software developer! this means i can make backends and frontends for all kinds of things (apps, websites, etc.)</li>
            <li>i&apos;m a member of <a href="https://www.hackclub.com" className="hover:text-sky-500 underline">Hack Club</a>, an online community of teen programmers!</li>
            <li>i am a creative writer! i write short stories and novellas, and am working on some full length chaptered novels. my focus is mainly original writing, but i make fanfiction on occasion.</li>
            <li>i like to take photos! my main focuses are nature (namely skies) and people, and i like to take self-portraits. i call myself an amateur photographer, as i&apos;m still learning.</li>
            <li>i do digital art on occasion. i&apos;m not very good at it, but it&apos;s fun and i am trying to improve!</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">things i like</h2>
          <h3 className="text-lg">music:</h3>
          <ul className="list-disc list-inside">
            <li><a href="https://derivakat.com" target="_blank" className="underline hover:text-sky-500">Derivakat</a></li>
            <li><a href="https://cave.town" target="_blank" className="underline hover:text-sky-500">Cavetown</a></li>
            <li><a href="https://www.ajrbrothers.com" target="_blank" className="underline hover:text-sky-500">AJR</a></li>
          </ul>
          <h3 className="text-lg">games:</h3>
          <ul className="list-disc list-inside">
            <li><a href="https://www.stardewvalley.net" target="_blank" className="underline hover:text-sky-500">Stardew Valley</a></li>
            <li><a href="https://www.minecraft.net" target="_blank" className="underline hover:text-sky-500">Minecraft</a></li>
            <li><a href="https://hsr.hoyoverse.com/en-us" target="_blank" className="underline hover:text-sky-500">Honkai: Star Rail</a></li>
            <li><a href="https://genshin.hoyoverse.com/en" target="_blank" className="underline hover:text-sky-500">Genshin Impact</a></li>
          </ul>
          <h3 className="text-lg">shows:</h3>
          <ul className="list-disc list-inside">
            <li><a href="https://www.imdb.com/title/tt21030032" target="_blank" className="underline hover:text-sky-500">Oshi no Ko</a></li>
            <li><a href="https://youtube.com/playlist?list=PLHovnlOusNLiJz3sm0d5i2Evwa2LDLdrg" target="_blank" className="underline hover:text-sky-500">Murder Drones</a></li>
          </ul>
        </div>
      </div>
    </main>
  );
}