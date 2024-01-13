import { getData } from "@/utils";
import styles from "./page.module.scss";

export default async function Portfolio() {
  await getData("portfolio-page?populate=deep");

  return <section>TODO Portfolio page</section>;
}
