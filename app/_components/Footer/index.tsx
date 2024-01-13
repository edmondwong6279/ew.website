"use client";

import { ThemeContext } from "@/context";
import { useContext } from "react";
import { ThemeToggle } from "@/components";
import styles from "./styles.module.scss";

export function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={styles.container}>
      <div className={styles.footerText}>
        {theme === "light" && (
          <p>Too light on your eyes? Try switching to dark mode.</p>
        )}
        {theme === "dark" && (
          <p>Not a fan of dark mode? Try switching to light mode.</p>
        )}
      </div>
      <div className={styles.themeContainer}>
        <ThemeToggle />
      </div>
    </footer>
  );
}
