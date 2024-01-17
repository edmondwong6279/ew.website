import { getData } from "@/utils";
import styles from "./page.module.scss";
import { PortfolioItems } from "@/components";

export default async function Portfolio() {
  const {
    attributes: { title, description, portfolioItems }
  } = await getData("portfolio-page?populate=deep");

  return (
    <section className={styles.portfolioSection}>
      <h1 className={styles.heading}>{title}</h1>
      <p>{description}</p>
      <PortfolioItems portfolioItems={portfolioItems} />
    </section>
  );
}
