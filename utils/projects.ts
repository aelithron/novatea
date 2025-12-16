import { NovaProject } from "@/novatea";

export default function projectList(): NovaProject[] {
  const projects: NovaProject[] = [];
  projects.push({ title: "Universal Status", description: "Change your status across many platforms at once!", image: null, spotlighted: true });
  return projects;
}