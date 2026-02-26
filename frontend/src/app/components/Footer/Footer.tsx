import styles from "./Footer.module.css";
import { getLatestArticles, Article } from "@/app/lib/api/articles";

const CITY_ORDER = [
  "beverly-hills",
  "west-hollywood",
  "santa-monica",
  "los-angeles",
  "long-beach",
];

function pickArticleForCity(articles: Article[], city: string) {
  return articles.find((a) => a.tags.includes(city));
}

export default async function Footer() {
  const latest = await getLatestArticles(20);

  const cityBlocks = CITY_ORDER.map((city) => ({
    city,
    article: pickArticleForCity(latest, city),
  }));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cityGrid}>
          {cityBlocks.map(({ city, article }) => (
            <div key={city} className={styles.cityColumn}>
              <h4 className={styles.cityTitle}>
                {city.replace("-", " ")}
              </h4>

              {article ? (
                <a
                  href={`/articles/${article.slug}`}
                  className={styles.article}
                >
                  {article.title}
                </a>
              ) : (
                <span className={styles.empty}>Not Enough Posts</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.brand}>
            © {new Date().getFullYear()} The Brick Club.
          </div>

          <div className={styles.links}>
            <a href="/signup">Sign up</a>
            <a href="/sponsors">Sponsors</a>
          </div>

          <button className={styles.subscribeBtn}>Subscribe</button>
        </div>
      </div>
    </footer>
  );
}