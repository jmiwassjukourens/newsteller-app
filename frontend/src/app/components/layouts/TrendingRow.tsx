import { getTrending } from "../../lib/api/articles";
import { ArticleCard } from "../articles/ArticleCard";
import { SectionHeader } from "../articles/SectionHeader";
import styles from "./TrendingRow.module.css";

export default async function TrendingRow() {
  const articles = await getTrending();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          title="Trending Now"
          subtitle="Stories your peers are reading across the region."
          accent
        />
        <div className={styles.row}>
          {articles.map((article) => (
            <div key={article.id} className={styles.item}>
              <ArticleCard article={article} accentTagSlugs={["trending"]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

