import { Loader } from "@/components";
import styles from "./styles.module.scss";

/**
 * Global loading components that wraps the main body,
 * but is outside the nav bar and footer
 */
export default function Loading({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.loadingContainer}>
      <Loader />
    </section>
  );
}
