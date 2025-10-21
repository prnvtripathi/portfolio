"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Link2 } from "lucide-react";
import Link from "next/link";
import { Project, ProjectCardProps } from "@/types";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  // Use title if name is not available
  const projectName = project.name || project.title;
  // Use image if imageUrl is not available and vice versa
  const imageSrc = project.image || project.imageUrl || '';
  // Use tags if skills is not available
  const skills = project.skills || project.tags || [];

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={projectName ?? "Project Image"}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {projectName}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          {project.liveUrl && (
            <Button
              asChild
              variant="default"
              effect={"expandIcon"}
              icon={ArrowUpRight}
              iconPlacement="right"
              size="sm"
              className="w-32"
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              effect={"expandIcon"}
              icon={Github}
              iconPlacement="right"
              className="w-32"
            >
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
