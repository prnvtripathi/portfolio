"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "./ui/button";

export function Sidebar() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/prnvtripathi",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/tripathipranav14",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/prnvtwts",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:tripathipranav14@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen flex-col items-center w-16 border-r bg-background py-8 z-30">
        <div className="flex flex-col items-center gap-4 mt-auto">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label={link.name}>
                <link.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Footer */}
      <footer className="md:hidden flex justify-center items-center gap-4 py-4 border-t mt-auto">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" aria-label={link.name}>
              <link.icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </footer>
    </>
  );
}
