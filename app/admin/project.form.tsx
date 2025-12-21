"use client";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateProjectForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [codeURL, setCodeURL] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [spotlighted, setSpotlighted] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 1, description.trim().length < 1, codeURL.trim().length < 1) {
      alert("make sure to fill in the project's title, description, and code url!");
      return;
    }
    const res = await fetch("/api/admin/projects", { method: "POST", body: JSON.stringify({ title, description, codeURL, link: (link === "" ? null : link), spotlighted }) });
    let resBody;
    try {
      resBody = await res.json();
    } catch {
      alert("unknown error while creating the project!");
      return;
    }
    if (resBody.error) {
      alert(`error creating the project: ${resBody.message} (${resBody.error})`);
      return;
    }
    router.push(`/admin`);
  }
  return (
    <form className="flex flex-col mt-4 gap-2 items-center" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <label htmlFor="title" className="font-semibold">title:</label>
        <input id="title" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="description" className="font-semibold">description:</label>
        <input id="description" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="code_url" className="font-semibold">code url:</label>
        <input id="code_url" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={codeURL} onChange={(e) => setCodeURL(e.target.value)} />
        <label htmlFor="link" className="font-semibold">main url:</label>
        <input id="link" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={link} onChange={(e) => setLink(e.target.value)} />
        <div className="flex gap-2 mt-2">
            <label htmlFor="published" className="font-semibold">spotlighted?</label>
            <input id="published" type="checkbox" checked={spotlighted} onChange={(e) => setSpotlighted(e.target.checked)} />
          </div>
      </div>
      <button className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="submit"><FontAwesomeIcon icon={faPlus} /> create</button>
    </form>
  );
}
export function EditProjectForm({ id, curTitle, curDesc, curCodeURL, curLink, curSpotlighted }: { id: number, curTitle: string, curDesc: string, curCodeURL: string, curLink: string | null, curSpotlighted: boolean }) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(curTitle);
  const [description, setDescription] = useState<string>(curDesc);
  const [codeURL, setCodeURL] = useState<string>(curCodeURL);
  const [link, setLink] = useState<string>(curLink || "");
  const [spotlighted, setSpotlighted] = useState<boolean>(curSpotlighted);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 1, description.trim().length < 1, codeURL.trim().length < 1) {
      alert("make sure to fill in the project's title, description, and code url!");
      return;
    }
    const reqData: { title?: string, description?: string, codeURL?: string, link?: string | null, spotlighted?: boolean } = {};
    if (title !== curTitle) reqData.title = title;
    if (description !== curDesc) reqData.description = description;
    if (codeURL !== curCodeURL) reqData.codeURL = codeURL;
    if ((link === "" ? null : link) !== curLink) reqData.link = (link === "" ? null : link);
    if (spotlighted !== curSpotlighted) reqData.spotlighted = spotlighted;
    const res = await fetch("/api/admin/projects", { method: "PATCH", body: JSON.stringify({ id, ...reqData }) });
    let resBody;
    try {
      resBody = await res.json();
    } catch {
      alert("unknown error while editing the project!");
      return;
    }
    if (resBody.error) {
      alert(`error editing the project: ${resBody.message} (${resBody.error})`);
      return;
    }
    router.push(`/admin`);
  }
  return (
    <form className="flex flex-col mt-4 gap-2 items-center" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <label htmlFor="title" className="font-semibold">title:</label>
        <input id="title" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="description" className="font-semibold">description:</label>
        <input id="description" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="code_url" className="font-semibold">code url:</label>
        <input id="code_url" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={codeURL} onChange={(e) => setCodeURL(e.target.value)} />
        <label htmlFor="link" className="font-semibold">main url:</label>
        <input id="link" type="text" className="bg-slate-300 dark:bg-slate-800 rounded-lg p-1 md:col-span-2" value={link} onChange={(e) => setLink(e.target.value)} />
        <div className="flex gap-2 mt-2">
            <label htmlFor="published" className="font-semibold">spotlighted?</label>
            <input id="published" type="checkbox" checked={spotlighted} onChange={(e) => setSpotlighted(e.target.checked)} />
          </div>
      </div>
      <button className="bg-violet-500 rounded-lg p-1 px-2 hover:text-sky-500 w-fit" type="submit"><FontAwesomeIcon icon={faPencil} /> edit</button>
    </form>
  );
}