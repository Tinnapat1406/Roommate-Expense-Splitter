"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Auto" },
];

// The theme lives in localStorage and on <html>, not in React state. Everything
// below reads or writes that external store from module scope.

let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  // Keeps other tabs in step.
  window.addEventListener("storage", onChange);
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    // Private mode or blocked storage.
    return "system";
  }
}

function getServerSnapshot(): Theme {
  // No storage on the server; the inline script in <head> fixes this up
  // before paint, and this component re-renders after hydration.
  return "system";
}

function applyTheme(next: Theme) {
  try {
    const root = document.documentElement;
    if (next === "system") {
      localStorage.removeItem("theme");
      delete root.dataset.theme;
    } else {
      localStorage.setItem("theme", next);
      root.dataset.theme = next;
    }
  } catch {
    // Storage unavailable — nothing to persist.
  }
  for (const listener of listeners) listener();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
          onClick={() => applyTheme(option.value)}
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
