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
      className="relative h-7 w-13 shrink-0 rounded-full border border-border bg-secondary transition-colors hover:border-muted-foreground"
    >
      <span className="absolute left-[3px] top-[3px] flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background transition-[left] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:left-[29px]">
        <Sun className="h-3 w-3 dark:hidden" />
        <Moon className="hidden h-3 w-3 dark:block" />
      </span>
    </button>
  );
}

