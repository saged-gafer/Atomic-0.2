"use client";
import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(circle 600px at ${dx}px ${dy}px, rgba(99, 102, 241, 0.05), transparent 80%)`;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
      style={{ background }}
    >
      <motion.div
        className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"
        style={{
          x: dx,
          y: dy,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
};
