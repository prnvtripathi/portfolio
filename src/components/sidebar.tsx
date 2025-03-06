"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { socialLinks } from "@/data/social-links";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 h-screen md:flex hidden flex-col items-center w-16 border-r bg-background py-8 z-30">
        <div className="flex flex-col items-center gap-4 mt-auto">
          {socialLinks.map((link) => (
            <TooltipProvider key={link.name} delayDuration={500}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" aria-label={link.name}>
                      <link.icon className={`h-5 w-5 ${link.isNewBlog ? "animate-wiggle" : "" }`} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </aside>
    </>
  );
}
