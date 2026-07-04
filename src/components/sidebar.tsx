"use client";

import Link from "next/link";
import { socialLinks } from "@/data/social-links";

const sidebarLinks = socialLinks.filter((link) => link.name !== "Email");

export function Sidebar() {
  return (
    <div className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-5 md:flex">
      {sidebarLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rotate-180 font-mono text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:translate-y-1 hover:text-primary [text-orientation:mixed] [writing-mode:vertical-rl]"
        >
          {link.name}
        </Link>
      ))}
      <div className="mt-1 h-18 w-px bg-border" />
    </div>
  );
}
