import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { getData } from "@/utils";

import styles from "./styles.module.scss";

export default async function BlogPage({
  params
}: {
  params: { slug: string };
}) {
  // TODO Do we need to put some sort of protection on this?
  const blogResult = await getData(
    `blogs?filters[slug][$eq]=${params.slug}&populate=deep`
  );

  if (blogResult.length === 0) {
    return notFound();
  }

  //
  const {
    attributes: { title, postDate, content }
  } = blogResult[0];

  const postDateFormatted = new Date(postDate).toLocaleDateString("en-GB");

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogHeading}>
        <h1 className={styles.blogTitle}>{title}</h1>
        <h5 className={styles.blogDate}>Published: {postDateFormatted}</h5>
      </div>
      <div className={styles.blogContent}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
