import { getData } from "@/utils";
import styles from "./page.module.scss";

export default async function About() {
  await getData("about-page?populate=deep");

  return <section>TODO About page</section>;
}
