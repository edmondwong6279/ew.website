import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import styles from "./styles.module.scss";
import { getData } from "@/utils";

/**
 * Home landing page
 *
 * Landing Page in strapi
 */
export default async function Home() {
  const {
    attributes: { title, tagline, description, mediaUrl, contactItems }
  } = await getData("home-page?populate=deep");

  return (
    <section className={styles.container}>
      <div className={styles.topSection}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{tagline}</p>
      </div>
      <div className={styles.middleSection}>
        <div className={styles.imageContainer}>
          <Image
            src={mediaUrl}
            className={styles.image}
            alt={"Image of Ed"}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.descriptionContainer}>
            {/* TODO check if this is the best package for markdown from strapi */}
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <div>
            <p>Contact Details and links:</p>
            <ul className={styles.list}>
              {contactItems.map((contactItem, idx: number) => (
                <li key={idx} className={styles.listItem}>
                  <Link
                    href={contactItem.link}
                    className={styles.link}
                    target="_blank"
                  >
                    {contactItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
