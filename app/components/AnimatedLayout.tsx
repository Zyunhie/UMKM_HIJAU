"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "../lib/animations";

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
