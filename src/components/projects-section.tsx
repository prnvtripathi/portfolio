"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { projects } from "@/data/projects";

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

export function ProjectsSection() {
  const featured = projects.slice(0, 3);

  return (
    <motion.section
      id="projects"
      className="border-t border-border py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="mb-9 flex items-center justify-between"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          04 / Projects
        </p>
        <Link
          href="/projects"
          className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary"
        >
          All projects →
        </Link>
      </motion.div>
      <div className="flex flex-col">
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className={`border-t border-border py-7 ${
              index === featured.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-[19px] leading-tight text-foreground">
                  {project.name}
                </h3>
                {project.archived && (
                  <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                    Archived
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    Live ↗
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    Code ↗
                  </Link>
                )}
              </div>
            </div>
            <p className="mb-3 text-sm font-light leading-[1.72] text-muted-foreground">
              {project.description}
            </p>
            <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
              {project.skills.join(" · ")}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
