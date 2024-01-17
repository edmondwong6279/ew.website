import { getData } from "@/utils";
import styles from "./page.module.scss";
import cn from "classnames";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default async function About() {
  const {
    attributes: { title, description, aboutGroups }
  } = await getData("about-page?populate=deep");

  return (
    <section className={styles.homeSection}>
      <header className={styles.homeTitle}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{description}</p>
      </header>
      <div className={styles.container}>
        {aboutGroups.map((aboutGroup, idx: number) => (
          <div className={styles.section} key={idx}>
            <h2>{aboutGroup.groupTitle}</h2>
            {aboutGroup.aboutItems.map((aboutItem, idx2: number) => (
              <div
                className={cn(styles.card, {
                  [styles.flip]: idx2 % 2 === 0
                })}
                key={idx2}
              >
                <div className={styles.textContainer}>
                  <div className={styles.headingContainer}>
                    <h3 className={styles.title}>{aboutItem.title}</h3>
                    {aboutItem.subtitle !== null && (
                      <h4 className={styles.subtitle}>{aboutItem.subtitle}</h4>
                    )}
                  </div>
                  <ReactMarkdown>{aboutItem.description}</ReactMarkdown>
                </div>
                <Image
                  src={aboutItem.mediaUrl}
                  alt={`image- ${aboutItem.title}`}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
