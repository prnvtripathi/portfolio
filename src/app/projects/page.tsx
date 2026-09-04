"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Input } from "@/components/ui/input";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (!normalizedSearch) return true;

        return [
          project.name,
          project.title,
          project.description,
          ...(project.skills ?? []),
        ].some((value) => value?.toLowerCase().includes(normalizedSearch));
      }),
    [normalizedSearch]
  );

  return (
    <motion.main
      className="mx-auto max-w-[720px] px-8 py-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header variants={itemVariants} className="mb-12">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          04 / Projects
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
          Selected work, built end to end.
        </h1>
      </motion.header>

      <motion.div
        variants={itemVariants}
        className="mb-8 flex items-center gap-4 border-y border-border py-3"
      >
        <Input
          type="search"
          placeholder="Search projects"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="h-8 flex-1 rounded-none border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
          aria-label="Search projects"
        />
        <span className="shrink-0 font-mono text-[10px] tracking-wide text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
      </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div variants={containerVariants} className="flex flex-col border-t border-border">
          {filteredProjects.map((project) => {
            const projectName = project.name ?? project.title ?? "Untitled project";

            return (
              <motion.article key={project.id} variants={itemVariants} className="border-b border-border py-7">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-[21px] leading-tight text-foreground">
                      {projectName}
                    </h2>
                    {project.archived && (
                      <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                        Archived
                      </span>
                    )}
                  </div>
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex shrink-0 gap-4 font-mono text-[11px] tracking-wide text-muted-foreground">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary"
                        >
                          Live ↗
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary"
                        >
                          Code ↗
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <p className="mb-4 max-w-[65ch] text-sm font-light leading-[1.72] text-muted-foreground">
                  {project.description}
                </p>
                <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                  {(project.skills ?? []).join(" · ")}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="border-y border-border py-12 text-center">
          <p className="font-serif text-xl text-foreground">No projects found.</p>
          <p className="mt-2 text-sm font-light text-muted-foreground">
            Try a project name, skill, or technology.
          </p>
        </motion.div>
      )}
    </motion.main>
  );
}
