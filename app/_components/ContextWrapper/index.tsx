"use client";

import React, { useEffect, useState } from "react";

import { ThemeContext } from "@/context";

export function ContextWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const newTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    document.body.style.transition = "color 0.2s ease-in-out";
    document.body.style.transition = "background-color 0.2s ease-in-out";
  }, []);

  useEffect(() => {
    if (typeof theme === "string") {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
