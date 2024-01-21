import Link from "next/link";

import { getData } from "@/utils";

import styles from "./styles.module.scss";

export default async function Blog() {
  const [
    {
      attributes: { title, description }
    },
    blogs
  ] = await Promise.all([
    getData("blog-page?populate=deep"),
    getData("blogs?sort[0]=postDate:desc&populate=deep")
  ]);

  return (
    <section className={styles.blogSection}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.cardsContainer}>
        {blogs.map(
          (
            { attributes: { title, description, postDate, slug } },
            idx: number
          ) => {
            const date = new Date(postDate).toLocaleDateString("en-GB");

            return (
              <Link href={`/blog/${slug}`} key={idx} className={styles.link}>
                <div className={styles.card}>
                  <h1 className={styles.blogTitle}>{title}</h1>
                  <h5 className={styles.blogDate}>Published: {date}</h5>
                  <p>{description}</p>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
}
