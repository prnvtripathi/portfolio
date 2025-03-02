"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectListProps {
  projects: {
    id: number;
    name: string;
    description: string;
    skills: string[];
    liveUrl?: string;
    githubUrl?: string;
  }[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <motion.ul
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {projects.map((project) => {
        const projectLink = project.liveUrl || project.githubUrl;

        return (
          <motion.li
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              {projectLink && (
                <Button asChild variant="link" effect="hoverUnderline">
                  <Link
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Project <ArrowUpRight className="inline h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            <p className="text-muted-foreground mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
