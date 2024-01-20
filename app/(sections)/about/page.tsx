import ReactMarkdown from "react-markdown";
import Image from "next/image";
import cn from "classnames";

import { getData } from "@/utils";

import styles from "./page.module.scss";

export default async function About() {
  const {
    attributes: { title, description, aboutGroups }
  } = await getData("about-page?populate=deep");

  return (
    <section className={styles.aboutSection}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.container}>
        {aboutGroups.map((aboutGroup, idx: number) => (
          <div className={styles.section} key={idx}>
            <h3>{aboutGroup.groupTitle}</h3>
            {aboutGroup.aboutItems.map(
              ({ title, subtitle, mediaUrl, description }, idx2: number) => (
                <div className={styles.card} key={idx2}>
                  <div className={styles.headingContainer}>
                    <h4 className={styles.title}>{title}</h4>
                    <h5 className={styles.subtitle}>{subtitle}</h5>
                  </div>
                  {mediaUrl && (
                    <Image
                      className={cn(styles.img, {
                        [styles.flip]: idx2 % 2 === 0
                      })}
                      src={mediaUrl}
                      alt={`Image of- ${title}`}
                      width={300}
                      height={300}
                    />
                  )}
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
