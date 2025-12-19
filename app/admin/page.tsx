import { faBriefcase, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";
import { LogOutButton } from "./adminui.module";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "admin" };
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faBriefcase} /> admin</h1>
      <div className="flex justify-between gap-2 mt-2">
        <h1 className="text-xl font-semibold">blog posts</h1>
        <div className="flex items-center gap-2">
          <Link href={"/admin/create"} className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500"><FontAwesomeIcon icon={faPlus} /> create post</Link>
          <LogOutButton />
        </div>
      </div>

    </div>
  );
}