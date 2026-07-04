"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative h-7 w-12 shrink-0 rounded-full border border-border/70 bg-background/70 transition-colors hover:border-muted-foreground/40 hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/40"
    >
      <span className="absolute left-[2px] top-[2px] flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 ease-out dark:left-[22px]">
        <Sun className="h-2.5 w-2.5 dark:hidden" />
        <Moon className="hidden h-2.5 w-2.5 dark:block" />
      </span>
    </button>
  );
}
