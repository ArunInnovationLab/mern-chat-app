"use client";

import { createContext, useState } from "react";
import React from "react";

type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext({});
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
