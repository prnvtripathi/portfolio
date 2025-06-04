"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export function HeroSection() {
  return (
    <motion.section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 h-screen items-center px-6 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Content */}
      <div className="text-center md:text-left">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Hi, I'm <span className="text-primary">Pranav Tripathi</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          Full Stack Developer
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center md:justify-start"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <Button asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#projects">View Projects</a>
          </Button>
        </motion.div>
      </div>

      {/* Right Content (Image) */}
      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* <Image
          src="https://avatars.githubusercontent.com/u/111558974"
          alt="Pranav Tripathi"
          width={400}
          height={400}
          className="rounded shadow-lg"
        /> */}
        <DirectionAwareHover imageUrl="/images/me.jpg" />
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </motion.a>
    </motion.section>
  );
}
