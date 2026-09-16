import { useCallback, useEffect, useState } from "react";

// ============================================================
// useTheme — Hook Dark Mode (indépendant d'i18n)
// - État 'light' | 'dark', initialisé depuis localStorage,
//   sinon prefers-color-scheme du système.
// - useEffect : pose/retire la classe `.dark` sur <html> (cible du
//   variant Tailwind v4 `@custom-variant dark`) + persiste en
//   localStorage à chaque changement.
// - Retourne { theme, toggleTheme }.
// ============================================================

const STORAGE_KEY = "yummy-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
