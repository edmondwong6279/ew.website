"use client";

import React, { useContext } from "react";
import Image from "next/image";
import cn from "classnames";

import { ThemeContext } from "@/context";
import Sun from "@/public/sun.svg";
import Moon from "@/public/moon.svg";

import styles from "./styles.module.scss";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={cn(styles.switch, {
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
