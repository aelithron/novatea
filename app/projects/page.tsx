import projectList from "@/utils/projects";
import { faClipboard, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "projects" }
export default function Page() {
  const topProjects = projectList().filter(project => project.spotlighted);
  const otherProjects = projectList().filter(project => !project.spotlighted);
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faClipboard} /> projects</h1>
      <p>cool things i&apos;ve built!</p>
      {topProjects.length > 0 && <div className="flex flex-col mt-2">
        <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faStar} /> top projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {topProjects.map((project, index) => <div key={index} className="p-3 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <h1 className="text-lg font-semibold">{project.title}</h1>
            <p>{project.description}</p>
          </div>)}
        </div>
      </div>}
      {otherProjects.length > 0 && <div className="flex flex-col mt-2">
        {topProjects.length > 0 && <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faClipboard} /> other projects</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          {otherProjects.map((project, index) => <div key={index} className="p-3 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <h1 className="text-lg">{project.title}</h1>
            <p>{project.description}</p>
          </div>)}
        </div>
      </div>}
    </main>
  );
}