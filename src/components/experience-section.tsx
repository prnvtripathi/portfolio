"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Erzy Call",
      website: "https://erzycall.com",
      period: "June '25 - Present",
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
      technologies: [
        "JavaScript",
        "Next.js",
        "FastAPI",
        "Redis",
        "GKE",
        "Docker",
        "GCloud",
      ],
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="experience"
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="section-heading" variants={itemVariants}>
        Experience
      </motion.h2>
      <motion.div className="space-y-6" variants={containerVariants}>
        {experiences.map((exp, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="hover:-translate-y-2 hover:border-4 transition-all duration-200 ease-in-out">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <Link
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:underline-offset-4 w-fit group"
                    >
                      <CardDescription className="flex items-center gap-1">
                        {exp.company}
                        <ArrowUpRight className="w-4 h-4 hidden group-hover:flex" />
                      </CardDescription>
                    </Link>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
