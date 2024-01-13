import { getData } from "@/utils";
import styles from "./page.module.scss";

export default async function Skills() {
  await getData("skills-page?populate=deep");

  return <section>TODO skills page</section>;
}
