"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function getVisitorCount() {
      try {
        const response = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCount(data?.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    }

    getVisitorCount();
  }, []);

  return (
    <motion.div
      className="inline-flex items-center px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 mb-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={false}
      animate={{
        paddingLeft: hovered ? 12 : 8,
        paddingRight: hovered ? 12 : 8,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <Eye className="w-4 h-4 flex-shrink-0" />

      <AnimatePresence>
        {hovered && count !== null && (
          <motion.span
            key="visitor-count"
            className="ml-2 whitespace-nowrap"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {count.toLocaleString()} visitors
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
