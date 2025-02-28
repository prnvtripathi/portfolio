"use client";

import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function AboutSection() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "UI/UX Design",
    "Figma",
    "Git",
  ];

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
        <motion.div variants={itemVariants}>
          <motion.p className="text-lg mb-4" variants={itemVariants}>
            I'm a passionate full-stack developer with a focus on creating
            beautiful, functional, and user-friendly applications. With over 5
            years of experience in web development, I specialize in building
            modern web applications using React, Next.js, and Node.js.
          </motion.p>
          <motion.p className="text-lg mb-4" variants={itemVariants}>
            My journey in tech started when I built my first website at 15.
            Since then, I've worked with startups and established companies to
            deliver high-quality software solutions that solve real-world
            problems.
          </motion.p>
          <motion.p className="text-lg" variants={itemVariants}>
            When I'm not coding, you can find me hiking, reading sci-fi novels,
            or experimenting with new technologies.
          </motion.p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Skills & Technologies
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {skills.map((skill) => (
                  <motion.div key={skill} variants={itemVariants}>
                    <Badge variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
