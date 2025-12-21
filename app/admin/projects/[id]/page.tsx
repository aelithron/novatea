import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBriefcase, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import db from "@/utils/db";
import { projectTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { EditProjectForm } from "../../project.form";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "edit project" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const project = await db.select().from(projectTable).where(eq(projectTable.id, Number.parseInt((await params).id))).limit(1);
  if (!project || project.length < 1) return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faX} /> project not found!</h1>
      <p>this project could not be found.</p>
      <Link href={"/admin"} className="bg-violet-300 dark:bg-violet-600 rounded-xl p-1 mt-2"><FontAwesomeIcon icon={faBriefcase} /> back to admin</Link>
    </main>
  )
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <Link href="/admin" className="bg-slate-300 dark:bg-slate-800 p-1 rounded-full w-fit mb-2 text-lg"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faPencil} /> edit project</h1>
      <EditProjectForm id={Number.parseInt((await params).id)} curTitle={project[0].title} curDesc={project[0].description} curCodeURL={project[0].code} curLink={project[0].link} curSpotlighted={project[0].spotlighted} />
    </div>
  );
}