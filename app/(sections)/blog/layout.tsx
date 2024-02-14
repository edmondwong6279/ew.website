import styles from "./styles.module.scss";

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.blogSection}>{children}</section>;
}
