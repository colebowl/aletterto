// Source: ChatGPT generated
import { useEffect, useState } from "react";

const useMode = () => {
  // Check for system preference
  const getSystemTheme = () => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Get theme from localStorage or fallback to system preference

  const storageKey = "aletterto-mode";

  const getInitialMode = () => {
    const savedMode = localStorage.getItem(storageKey);
    return savedMode ? savedMode : getSystemTheme();
  };

  const [mode, setMode] = useState(getInitialMode);

  // Toggle between light and dark mode
  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem(storageKey, newMode);
  };

  // Sync with system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const systemMode = e.matches ? "dark" : "light";
      if (!localStorage.getItem(storageKey)) {
        setMode(systemMode);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  return {
    mode,
    toggleMode,
  };
};

export default useMode;
