"use client";

import styles from "./styles.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "@/app/_context";
import Sun from "@/public/sun.svg";
import Moon from "@/public/moon.svg";
import Image from "next/image";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={classNames(styles.switch, {
        [styles.light]: theme === "light",
        [styles.dark]: theme === "dark"
      })}
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
      }}
    >
      <Image
        priority
        className={styles.themeIcon}
        alt={"Light mode image"}
        src={Sun}
        width={50}
        height={50}
      />
      <Image
        priority
        className={styles.themeIcon}
        alt={"Dark mode image"}
        src={Moon}
        width={50}
        height={50}
      />
    </div>
  );
}
