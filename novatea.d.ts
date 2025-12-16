export type NovaProject = {
  title: string;
  description: string;
  image: URL | null;
  ghrepo: URL;
  link: URL | null;
  spotlighted: boolean;
}