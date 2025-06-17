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

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    image: string;
    skills: string[];
    liveUrl?: string;
    githubUrl: string;
  };
}

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
  return (
    <motion.div
      className="overflow-hidden flex flex-col h-full"
      variants={itemVariants}
    >
      <Card className="overflow-hidden flex flex-col h-full">
        <motion.div
          className="relative h-48 w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </motion.div>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
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
