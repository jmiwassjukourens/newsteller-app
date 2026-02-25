import styles from "./ArticleCard.module.css";
import type { Article } from "../../lib/api/articles";

interface ArticleCardProps {
  article: Article;
  accentTagSlugs?: string[];
}

export function ArticleCard({ article, accentTagSlugs = [] }: ArticleCardProps) {
  const dateLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unpublished";

  const primaryTag = article.tags[0];

  return (
    <article className={styles.card}>
      <div
        className={styles.cover}
        style={
          article.coverImageUrl
            ? {
                backgroundImage: `
                  linear-gradient(
                    to bottom,
                    rgba(22,22,22,0.15),
                    rgba(22,22,22,0.85)
                  ),
                  url(${article.coverImageUrl})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
      <div className={styles.meta}>
        <span>{dateLabel}</span>
        {primaryTag && <span>{primaryTag.replace("-", " ")}</span>}
      </div>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.excerpt}>{article.excerpt}</p>
      {article.tags.length > 0 && (
        <div className={styles.tags}>
          {article.tags.map((tag) => {
            const isAccent = accentTagSlugs.includes(tag);
            return (
              <span
                key={tag}
                className={`${styles.tag} ${isAccent ? styles.tagAccent : ""}`}
              >
                {tag.replace("-", " ")}
              </span>
            );
          })}
        </div>
      )}
    </article>
  );
}

