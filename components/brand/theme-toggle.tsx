"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let value: string | null = null;
      try { value = localStorage.getItem("ecotuca-theme"); } catch {}
      const enabled = value === "dark" || (value !== "light" && media.matches);
      document.documentElement.classList.toggle("dark", enabled);
      setDark(enabled);
    }
    sync();
    media.addEventListener("change", sync);
    function updateCurrentTheme() {
      setDark(document.documentElement.classList.contains("dark"));
    }
    window.addEventListener("storage", sync);
    window.addEventListener("ecotuca-theme-change", updateCurrentTheme);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("ecotuca-theme-change", updateCurrentTheme);
    };
  }, []);

  function toggleTheme() {
    const enabled = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", enabled);
    setDark(enabled);
    try { localStorage.setItem("ecotuca-theme", enabled ? "dark" : "light"); } catch {}
    window.dispatchEvent(new Event("ecotuca-theme-change"));
  }

  return (
    <button className="icon-control" type="button" onClick={toggleTheme} aria-label="Tema escuro" aria-pressed={dark}>
      <Sun className="hidden dark:block" size={17} aria-hidden="true" />
      <Moon className="dark:hidden" size={17} aria-hidden="true" />
    </button>
  );
}
