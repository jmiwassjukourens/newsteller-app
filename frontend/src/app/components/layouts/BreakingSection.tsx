import { getBreaking } from "../../lib/api/articles";
import { ArticleCard } from "../articles/ArticleCard";
import { SectionHeader } from "../articles/SectionHeader";
import styles from "./BreakingSection.module.css";

export default async function BreakingSection() {
  const articles = await getBreaking();

  if (articles.length === 0) {
    return null;
  }

  const [lead, ...rest] = articles;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          title="Breaking Desk"
          subtitle="Urgent developments across the region."
          accent
        />
        <div className={styles.grid}>
          <ArticleCard article={lead} accentTagSlugs={["breaking"]} />
          <div>
            {rest.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                accentTagSlugs={["breaking"]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

