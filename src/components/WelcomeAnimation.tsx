"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WelcomeAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Shortened duration to 4 seconds
    const timer = setTimeout(() => onComplete(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* Background radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]"
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Logo Formation - More impressive physics */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 120,
            damping: 12,
            delay: 0.2
          }}
          className="relative w-48 h-48 mb-6"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_60px_rgba(99,102,241,0.8)]">
            <motion.circle
              cx="50" cy="50" r="12"
              fill="white"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {[0, 60, 120].map((r, i) => (
              <motion.ellipse
                key={i}
                cx="50" cy="50" rx="42" ry="14"
                stroke="#6366f1"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, rotate: r }}
                animate={{ pathLength: 1, rotate: r + 360 }}
                transition={{
                  pathLength: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
                  rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" }
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Site Name - Punchy Reveal */}
        <div className="overflow-hidden py-2">
          <motion.h1
            initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-8xl md:text-[11rem] font-black text-white tracking-tighter leading-none"
            style={{ textShadow: "0 0 80px rgba(99, 102, 241, 0.5)" }}
          >
            ATOMIC
          </motion.h1>
        </div>

        {/* Liquid Underline */}
        <div className="relative w-full max-w-md h-2 mt-4 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              delay: 1.2,
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-secondary/50"
          />
        </div>
      </div>
    </motion.div>
  );
}
