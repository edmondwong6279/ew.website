import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { PortfolioItem } from "@/types";

import styles from "./styles.module.scss";

/**
 * Server component fetches the portfolio page data from the CMS.
 */
export async function PortfolioItem({
  portfolioItem: { title, description, repositoryUrl, projectUrl, mediaUrl }
}: {
  portfolioItem: PortfolioItem;
}) {
  return (
    <div className={styles.card}>
      <video
        className={styles.vid}
        muted
        playsInline
        autoPlay
        loop
        poster={
          "https://res.cloudinary.com/dtawgkgnl/image/upload/portfolio/images/loader_bdh22k.gif"
        }
      >
        <source src={mediaUrl} type={"video/mp4"} />
      </video>
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
                rel="noopener noreferrer"
              >
                Repo Link
              </Link>
            )}
            {projectUrl !== null && (
              <Link href={projectUrl} className={styles.link} target="_blank">
                Project Link
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
