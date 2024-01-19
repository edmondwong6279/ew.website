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
      {portfolioItems.map(
        ({ title, description, mediaUrl, repositoryUrl, projectUrl }, idx) => (
          <div className={styles.card} key={idx}>
            <video
              key={idx}
              className={styles.vid}
              muted
              playsInline
              autoPlay
              loop
            >
              <source src={mediaUrl} type={"video/mp4"} />
            </video>{" "}
            <div className={styles.textContainer}>
              <h3>{title}</h3>
              <ReactMarkdown>{description}</ReactMarkdown>
              {(repositoryUrl !== null || projectUrl !== null) && (
                <div className={styles.linkContainer}>
                  {repositoryUrl !== null && (
                    <Link
                      href={repositoryUrl}
                      className={styles.link}
                      target="_blank"
                    >
                      Repo Link
                    </Link>
                  )}
                  {projectUrl !== null && (
                    <Link
                      href={projectUrl}
                      className={styles.link}
                      target="_blank"
                    >
                      Project Link
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
