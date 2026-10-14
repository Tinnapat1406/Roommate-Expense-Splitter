"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Auto" },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  // localStorage is unavailable on the server, so read it after mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // Private mode or blocked storage — stay on system.
    }
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    try {
      if (next === "system") {
        localStorage.removeItem("theme");
        delete document.documentElement.dataset.theme;
      } else {
        localStorage.setItem("theme", next);
        document.documentElement.dataset.theme = next;
      }
    } catch {
      // Ignore — the in-memory choice still applies for this page.
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="hidden rounded-lg border border-border p-0.5 sm:flex"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          onClick={() => apply(option.value)}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition",
            theme === option.value
              ? "bg-accent-soft text-accent"
              : "text-muted hover:text-fg",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
