"use client";

import { motion } from "motion/react";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Golang",
  "FastAPI",
  "Node.js",
  "Express",
  "Docker",
  "Redis",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
  "Linux",
];

export function SkillsSection() {
  return (
    <motion.section
      className="border-t border-border py-20"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        02 / Skills
      </p>
      <p className="font-mono text-[13px] leading-[2.1] tracking-wide text-muted-foreground">
        {SKILLS.join(" · ")}
      </p>
    </motion.section>
  );
}
