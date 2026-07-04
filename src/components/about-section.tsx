"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutSection() {
  return (
    <motion.section
      id="about"
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
        01 / About
      </motion.p>
      <div className="flex flex-col gap-4">
        <motion.p
          variants={itemVariants}
          className="max-w-[560px] text-base font-light leading-[1.82] text-foreground"
        >
          I&apos;m a dedicated full-stack developer specializing in building
          dynamic and scalable applications. I focus on delivering efficient,
          user-friendly solutions and thrive on solving complex problems
          through technology.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="max-w-[560px] text-base font-light leading-[1.82] text-muted-foreground"
        >
          My experience spans modern frameworks like Next.js, FastAPI, and
          Golang — building backend services, managing databases, and
          crafting seamless user interfaces.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="mt-1 text-sm font-light leading-[1.75] text-muted-foreground"
        >
          When I&apos;m not coding — guitar, F1 🏎️, football, and cricket.
        </motion.p>
      </div>
    </motion.section>
  );
}
