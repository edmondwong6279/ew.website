import styles from "./page.module.scss";

export default function Portfolio({ params }: { params: { slug: string } }) {
  return <section>TODO Portfolio page{params.slug}</section>;
}
