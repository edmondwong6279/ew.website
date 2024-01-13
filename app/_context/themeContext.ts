"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};

export const ThemeContext = createContext<ContextType>({} as ContextType);
