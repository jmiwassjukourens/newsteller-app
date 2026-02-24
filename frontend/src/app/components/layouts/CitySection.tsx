import { getArticlesByTag } from "../../lib/api/articles";
import { ArticleGrid } from "../articles/ArticleGrid";
import { SectionHeader } from "../articles/SectionHeader";
import styles from "./CitySection.module.css";

interface CitySectionProps {
  citySlug: string;
  title: string;
}

export default async function CitySection({ citySlug, title }: CitySectionProps) {
  const articles = await getArticlesByTag(citySlug);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          title={title}
          subtitle="City-specific coverage you can scan in a minute."
        />
        <ArticleGrid articles={articles} />
      </div>
    </section>
  );
}

