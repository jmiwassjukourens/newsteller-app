import { notFound } from "next/navigation";
import { apiFetch } from "../../lib/apiFetch";
import styles from "./ArticlePage.module.css";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
  tags: string[];
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await apiFetch<Article>(`api/articles/${slug}`);
  } catch {
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 ahora es Promise
}) {
  const { slug } = await params; // 👈 importante

  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <main className={styles.container}>
      {article.coverImageUrl && (
        <div
          className={styles.heroImage}
          style={{
            backgroundImage: `url(${article.coverImageUrl})`,
          }}
        />
      )}

      <article className={styles.contentWrapper}>
        <h1 className={styles.title}>{article.title}</h1>

        {article.publishedAt && (
          <p className={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}