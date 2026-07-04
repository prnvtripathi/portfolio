"use client";

import { motion } from "motion/react";
import Link from "next/link";

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "TractUs Labs",
    website: "https://www.tractuslabs.com",
    period: "Nov '25 - Present",
  },
  {
    title: "Full Stack Developer",
    company: "Erzy Call",
    website: "https://erzycall.com",
    period: "June '25 - Nov '25",
    description:
      "Implemented a unified ETA calculation system for truck logistics, enhancing delivery time estimates. Designed and maintained Telegram-based bots and backend services to streamline automated communication and support functions.",
    technologies: [
      "TypeScript",
      "Next.js",
      "NestJs",
      "Telegram Bot API",
      "OpenAI API",
      "Google Maps API",
    ],
  },
  {
    title: "Full Stack Developer & DevOps Intern",
    company: "Soundverse AI",
    website: "https://soundverse.ai",
    period: "June '24 - May '25",
    description:
      "Developed and maintained the company's web application. Implemented CI/CD pipelines and automated deployment processes.",
    technologies: ["JavaScript", "Next.js", "FastAPI", "Redis", "GKE", "Docker", "GCloud"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Campaigning Source",
    website: "https://campaigningsource.com",
    period: "Aug '23 - June '24",
    description:
      "Developed and maintained multiple web applications. Collaborated with designers and product managers to deliver high-quality software solutions to various clients.",
    technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="border-t border-border py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.p
        variants={itemVariants}
        className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        03 / Experience
      </motion.p>
      <div className="flex flex-col">
        {experiences.map((exp) => (
          <motion.div
            key={exp.company}
            variants={itemVariants}
            className="border-t border-border py-8"
          >
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="mb-1 font-serif text-[19px] leading-tight text-foreground">
                  {exp.title}
                </h3>
                <Link
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-primary transition-opacity hover:opacity-70"
                >
                  {exp.company} ↗
                </Link>
              </div>
              <span className="whitespace-nowrap pt-[3px] font-mono text-[11px] tracking-wide text-muted-foreground">
                {exp.period}
              </span>
            </div>
            {exp.description && (
              <p className="mb-3.5 text-sm font-light leading-[1.78] text-muted-foreground">
                {exp.description}
              </p>
            )}
            {exp.technologies && (
              <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                {exp.technologies.join(" · ")}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
