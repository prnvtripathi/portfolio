"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/data/social-links";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const emailHref = socialLinks.find((link) => link.name === "Email")!.href;

  return (
    <motion.section
      id="home"
      className="pb-24 pt-[clamp(88px,12vh,136px)]"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.p
        variants={fadeUp}
        className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
      >
        Full Stack Developer
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mb-7 font-serif text-[clamp(46px,7.5vw,74px)] leading-[1.07] tracking-[-0.01em] text-foreground"
      >
        Pranav
        <br />
        Tripathi
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mb-10 max-w-[420px] text-base font-light leading-[1.75] text-muted-foreground"
      >
        Building fast, scalable web applications with clean architecture and a
        thoughtful eye for user experience.
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <a
          href={emailHref}
          className="rounded-full border border-primary px-6 py-2 text-[13px] font-medium tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Get in touch →
        </a>
        <a
          href="#projects"
          className="rounded-full border border-border px-6 py-2 text-[13px] text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
        >
          View work ↓
        </a>
      </motion.div>
    </motion.section>
  );
}
