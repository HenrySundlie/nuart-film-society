import articlesData from './articles.json';

export interface Article {
  id: number;
  title: string;
  date: string; // ISO date (YYYY-MM-DD).
  author: string;
  description: string;
  img: string;
  article?: string; // Optional Markdown slug in content/articles/.
}

export const articles: Article[] = articlesData;
