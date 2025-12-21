import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { CreateProjectForm } from "../../project.form";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "create project" };
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen p-4 py-8 md:p-8">
      <Link href="/admin" className="bg-slate-300 dark:bg-slate-800 p-1 rounded-full w-fit mb-2 text-lg"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faPlus} /> create project</h1>
      <CreateProjectForm />
    </div>
  );
}