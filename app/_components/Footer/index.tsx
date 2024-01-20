"use client";

import { useContext } from "react";

import { ThemeContext } from "@/context";
import { ThemeToggle } from "@/components";

import styles from "./styles.module.scss";

export function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={styles.footer}>
      {theme === "light" && (
        <p className={styles.footerText}>
          Too light on your eyes? Try switching to dark mode.
        </p>
      )}
      {theme === "dark" && (
        <p className={styles.footerText}>
          Not a fan of dark mode? Try switching to light mode.
        </p>
      )}
      <div className={styles.themeContainer}>
        <ThemeToggle />
      </div>
    </footer>
  );
}
