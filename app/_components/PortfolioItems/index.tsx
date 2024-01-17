import Link from "next/link";
import styles from "./styles.module.scss";
// import PortfolioVideo from "../PortfolioVideo";

import ReactMarkdown from "react-markdown";
import { PortfolioItems } from "@/types";

/**
 * Server component fetches the portfolio page data from the CMS.
 */
export async function PortfolioItems({
  portfolioItems
}: {
  portfolioItems: PortfolioItems;
}) {
  return (
    <div className={styles.portfolioItems}>
      {portfolioItems.map((item, idx) => (
        <div className={styles.card} key={idx}>
          {/* <PortfolioVideo link={item.media} idx={idx} key={idx} /> */}
          <div className={styles.textContainer}>
            <h3>{item.title}</h3>
            <ReactMarkdown>{item.description}</ReactMarkdown>
            <div className={styles.linkContainer}>
              {item.repositoryUrl !== null && (
                <Link
                  href={item.repositoryUrl}
                  className={styles.link}
                  target="_blank"
                >
                  Repo Link
                </Link>
              )}
              {item.projectUrl !== null && (
                <Link
                  href={item.projectUrl}
                  className={styles.link}
                  target="_blank"
                >
                  Project Link
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
