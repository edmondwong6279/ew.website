import { getData } from "@/utils";
import styles from "./page.module.scss";
import { PortfolioItems } from "@/components";

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
      <PortfolioItems portfolioItems={portfolioItems} />
    </section>
  );
}
