import { NovaProject } from "@/novatea";

export default function projectList(): NovaProject[] {
  const projects: NovaProject[] = [];
  projects.push({ title: "Universal Status", description: "Change your status across many platforms at once.", link: new URL("https://status.novatea.dev"), ghrepo: new URL("https://github.com/aelithron/universal-status"), image: null, spotlighted: true });
  projects.push({ title: "LyricKit", description: "A suite for finding, writing, and syncing lyrics.", link: new URL("https://lyrics.novatea.dev"), ghrepo: new URL("https://github.com/aelithron/lyrickit"), image: null, spotlighted: true });
  projects.push({ title: "NovaBot", description: "Fully customizable personal assistant bot for Discord.", link: null, ghrepo: new URL("https://github.com/aelithron/novabot"), image: null, spotlighted: false });
  return projects;
}