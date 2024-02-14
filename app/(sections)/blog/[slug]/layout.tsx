import Link from "next/link";

import styles from "./styles.module.scss";

export default async function BlogPage({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.blogSlugSection}>
      <header>
        <Link className={styles.link} href={"/blog"}>
          &#8592; Back to all blogs
        </Link>
      </header>
      <div className={styles.blogContainer}>{children}</div>
    </section>
  );
}
