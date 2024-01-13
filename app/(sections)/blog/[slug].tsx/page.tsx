import styles from "./page.module.scss";

export default function Blog({ params }: { params: { slug: string } }) {
  return <section>TODO Blog page{params.slug}</section>;
}
