import { NovaProject } from "@/novatea";

export default function projectList(): NovaProject[] {
  const projects: NovaProject[] = [];
  projects.push({ title: "Universal Status", description: "Change your status across many platforms at once.", image: null, spotlighted: true });
  projects.push({ title: "LyricKit", description: "A one-stop-shop for finding, writing, and syncing lyrics.", image: null, spotlighted: true });
  projects.push({ title: "NovaBot", description: "Cusromixable personal assistant Discord bot", image: null, spotlighted: false })
  return projects;
}