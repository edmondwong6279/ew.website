import { getData } from "@/utils";
import styles from "./page.module.scss";
import cn from "classnames";
import { SkillsGraph } from "@/app/_components";

export default async function Skills() {
  const {
    attributes: { title, description, skillGroups }
  } = await getData("skills-page?populate=deep");

  return (
    <section className={styles.skillsSection}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <p className={cn(styles.desktopTip, styles.tooltip)}>
        Hover over each skill to see more information.
      </p>
      <p className={cn(styles.mobileTip, styles.tooltip)}>
        Tap on a section to view more information.
      </p>
      <div className={styles.skillsContainer}>
        <SkillsGraph skillGroups={skillGroups} />
      </div>
    </section>
  );
}
