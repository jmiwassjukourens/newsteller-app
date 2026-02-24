import { apiFetch } from "../apiFetch";

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
  tags: string[];
}

export async function getLatestArticles(limit = 8): Promise<Article[]> {
  return apiFetch<Article[]>(`api/articles/latest?limit=${limit}`);
}

export async function getArticlesByTag(slug: string): Promise<Article[]> {
  return apiFetch<Article[]>(`api/articles/tag/${slug}`);
}

export async function getTrending(): Promise<Article[]> {
  return apiFetch<Article[]>("api/articles/trending");
}

export async function getBreaking(): Promise<Article[]> {
  return apiFetch<Article[]>("api/articles/breaking");
}

