import { getData } from "@/utils";
import { PortfolioItem } from "@/components";

import styles from "./page.module.scss";

export default async function Portfolio() {
  const {
    attributes: { title, description, portfolioItems }
  } = await getData("portfolio-page?populate=deep");

  return (
    <section className={styles.portfolioSection}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.portfolioItems}>
        {portfolioItems.map((portfolioItem, idx) => (
          <PortfolioItem portfolioItem={portfolioItem} key={idx} />
        ))}
      </div>
    </section>
  );
}
