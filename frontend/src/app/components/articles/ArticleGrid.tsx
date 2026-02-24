import styles from "./ArticleGrid.module.css";
import type { Article } from "../../lib/api/articles";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  accentTagSlugs?: string[];
}

export function ArticleGrid({ articles, accentTagSlugs }: ArticleGridProps) {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          accentTagSlugs={accentTagSlugs}
        />
      ))}
    </div>
  );
}

