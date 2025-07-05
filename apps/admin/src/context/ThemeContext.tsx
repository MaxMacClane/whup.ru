"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Просто читаем текущее состояние из CSS классов
  useEffect(() => {
    console.log('🎭 ThemeProvider инициализируется');
    
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains('dark');
      const initialTheme = isDark ? 'dark' : 'light';
      
      console.log('🎭 CSS классы при инициализации:', document.documentElement.classList.toString());
      console.log('🎭 Определили тему:', initialTheme);
      
      setTheme(initialTheme);
    }
    setMounted(true);
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log('🎭 Переключаем тему с', theme, 'на', newTheme);
    
    setTheme(newTheme);
    
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
      // Сохраняем в sessionStorage для сохранения при переключении языка
      sessionStorage.setItem("theme", newTheme);
      console.log('🎭 Сохранили в sessionStorage:', newTheme);
      console.log('🎭 CSS классы после переключения:', document.documentElement.classList.toString());
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
