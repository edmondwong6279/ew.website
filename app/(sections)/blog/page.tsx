import { getData } from "@/utils";
import styles from "./page.module.scss";

export default async function Blog() {
  await getData("blog-page?populate=deep");

  await getData("blogs?populate=deep");
  await getData(`blogs?filters[slug][$eq]=asdf&populate=deep`);

  return <section>TODO Blog page</section>;
}
