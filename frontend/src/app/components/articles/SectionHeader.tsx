import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  accent = false,
}: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} ${accent ? styles.titleAccent : ""}`}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

