import { getLatestArticles } from "../../lib/api/articles";
import { ArticleGrid } from "../articles/ArticleGrid";
import { SectionHeader } from "../articles/SectionHeader";
import styles from "./HeroGrid.module.css";

export default async function HeroGrid() {
  const articles = await getLatestArticles(6);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>Today in Greater Los Angeles</h1>
        <p className={styles.kicker}>
          A curated briefing across business, cities, and breaking developments.
        </p>
        <SectionHeader title="Latest Dispatches" />
        <ArticleGrid articles={articles} />
      </div>
    </section>
  );
}

