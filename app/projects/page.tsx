import db from "@/utils/db";
import { projectTable } from "@/utils/schema";
import { faClipboard, faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { faCodeBranch, faLink, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "projects" };
export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faClipboard} /> projects</h1>
      <p>cool things i&apos;ve built!</p>
      <ProjectList />
    </main>
  );
}
async function ProjectList() {
  let projects;
  try {
    projects = await db.select().from(projectTable);
  } catch {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faX} /> error loading projects!</h2>
      </div>
    );
  }
  if (projects.length < 1) {
    return (
      <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 mt-2">
        <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faClock} /> sorry, there aren&apos;t any projects on here right now!</h2>
      </div>
    );
  }
  const topProjects = projects.filter(project => project.spotlighted);
  const otherProjects = projects.filter(project => !project.spotlighted);
  return (
    <div>
      {topProjects.length > 0 && <div className="flex flex-col mt-2">
        <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faStar} /> top projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {topProjects.map((project, index) => <div key={index} className="p-3 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <h1 className="text-lg font-semibold">{project.title}</h1>
            <p>{project.description}</p>
            <div className="grid grid-cols-2 grid-rows-1 text-center mt-2">
              <a href={project.code} target="_blank" className={`hover:text-sky-500 ${!project.link ? "col-span-2" : ""}`}><FontAwesomeIcon icon={faCodeBranch} /> code</a>
              {project.link && <a href={project.link} target="_blank" className={`hover:text-sky-500`}><FontAwesomeIcon icon={faLink} /> open</a>}
            </div>
          </div>)}
        </div>
      </div>}
      {otherProjects.length > 0 && <div className="flex flex-col mt-2">
        {topProjects.length > 0 && <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faClipboard} /> other projects</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          {otherProjects.map((project, index) => <div key={index} className="p-3 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <h1 className="text-lg">{project.title}</h1>
            <p>{project.description}</p>
            <div className="grid grid-cols-2 grid-rows-1 text-center mt-2">
              <a href={project.code} target="_blank" className={`hover:text-sky-500 ${!project.link ? "col-span-2" : ""}`}><FontAwesomeIcon icon={faCodeBranch} /> code</a>
              {project.link && <a href={project.link} target="_blank" className={`hover:text-sky-500`}><FontAwesomeIcon icon={faLink} /> open</a>}
            </div>
          </div>)}
        </div>
      </div>}
    </div>
  )
}