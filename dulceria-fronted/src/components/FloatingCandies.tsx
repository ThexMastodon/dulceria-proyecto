"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Candy, Cookie, PartyPopper } from "lucide-react";

export function FloatingCandies() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-pink-300 opacity-80"
      >
        <Candy size={64} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-[15%] text-orange-300 opacity-80"
      >
        <Cookie size={56} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 right-[10%] text-purple-300 opacity-80"
      >
        <Candy size={80} />
      </motion.div>

      <div className="absolute top-1/2 right-[20%] text-yellow-300 opacity-60">
         <PartyPopper size={40} />
      </div>
    </div>
  );
}