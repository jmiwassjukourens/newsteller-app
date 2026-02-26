import styles from "./SubscribeSection.module.css";

interface SubscribeSectionProps {
  variant?: "light" | "image";
  title: string;
  description: string;
  backgroundImageUrl?: string;
}

export default function SubscribeSection({
  variant = "light",
  title,
  description,
  backgroundImageUrl,
}: SubscribeSectionProps) {
  const boxClass =
    variant === "image" ? styles.imageBox : styles.lightBox;

  return (
    <section className={styles.section}>
      <div
        className={`${styles.containerBackground} ${boxClass}`}
        style={
          variant === "image" && backgroundImageUrl
            ? { backgroundImage: `url(${backgroundImageUrl})` }
            : undefined
        }
      >
        <div className={styles.text}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <form className={styles.form}>
          <input type="email" placeholder="E-mail" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}