"use client";

import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiGo,
  SiFastapi,
  SiDocker,
  SiRedis,
  SiNotion,
  SiLinux,
} from "react-icons/si";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Define skill icons mapping
const SKILL_ICONS: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  "Tailwind CSS": SiTailwindcss,
  Figma: SiFigma,
  Git: SiGit,
  Golang: SiGo,
  FastAPI: SiFastapi,
  Docker: SiDocker,
  Redis: SiRedis,
  Notion: SiNotion,
  Linux: SiLinux,
};

// Skills list
const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Golang",
  "FastAPI",
  "Docker",
  "Redis",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
  "Linux",
  "Notion",
] as const;

type Skill = (typeof SKILLS)[number];

// Components
const SkillBadge = ({ skill }: { skill: Skill }) => {
  const Icon = SKILL_ICONS[skill];

  return (
    <motion.div variants={itemVariants}>
      <Badge variant="secondary" className="text-sm flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {skill}
      </Badge>
    </motion.div>
  );
};

const AboutText = () => (
  <motion.div variants={itemVariants}>
    <motion.p className="text-lg mb-4" variants={itemVariants}>
      I'm a dedicated full-stack developer specializing in building dynamic and
      scalable applications. I have a strong focus on delivering efficient and
      user-friendly solutions, and I thrive on solving complex problems through
      technology.
    </motion.p>
    <motion.p className="text-lg mb-4" variants={itemVariants}>
      My experience spans working with modern frameworks like Next.js, FastAPI,
      and Golang. I have a deep understanding of building backend services,
      managing databases, and creating seamless user interfaces. I am
      particularly passionate about leveraging technology to enhance user
      experiences and streamline processes.
    </motion.p>
    <motion.p className="text-lg" variants={itemVariants}>
      When I'm not coding, I love playing my guitar. Also I'm an avid follower
      of F1 🏎️, Football ⚽ and Cricket 🏏.
    </motion.p>
  </motion.div>
);

const SkillsCard = () => (
  <motion.div variants={itemVariants}>
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {SKILLS.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="section-heading" variants={itemVariants}>
        About Me
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AboutText />
        <SkillsCard />
      </div>
    </motion.section>
  );
}
