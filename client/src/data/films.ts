import filmsData from './films.json';

export interface Film {
  id: number;
  title: string;
  year: number;
  description: string;
  director: string;
  actors: string[];
  duration: number;
  img: string;
  runDates: string[]; // ISO dates (YYYY-MM-DD).
  runTime: string;
  article?: string; // Optional Markdown slug in content/films/.
}

export const films: Film[] = filmsData;
