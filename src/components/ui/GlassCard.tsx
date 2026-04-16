"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  motion, HTMLMotionProps,
  useMotionTemplate, useMotionValue,
  useSpring
} from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  reflection?: boolean;
  interactive?: boolean;
  tilt?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, reflection = true, interactive = true, tilt = true, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);

    const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 30 });
    const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 30 });

    const glowBackground = useMotionTemplate`
      radial-gradient(
        500px circle at ${mouseX}px ${mouseY}px,
        rgba(99, 102, 241, 0.08),
        transparent 70%
      )
    `;

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      mouseX.set(x);
      mouseY.set(y);

      if (tilt) {
        const centerX = width / 2;
        const centerY = height / 2;
        rawRotateY.set(((x - centerX) / centerX) * 4);
        rawRotateX.set(-((y - centerY) / centerY) * 4);
      }
    }

    function handleMouseLeave() {
      if (tilt) {
        rawRotateX.set(0);
        rawRotateY.set(0);
      }
    }

    const scale = useSpring(1, { stiffness: 300, damping: 30 });

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => scale.set(1.008)}
        onHoverEnd={() => scale.set(1)}
        style={tilt ? { rotateX, rotateY, scale, transformPerspective: 1200 } : { scale }}
        className={cn(
          "glass-panel rounded-[2rem] p-6 relative overflow-hidden group",
          reflection && "glass-reflection",
          interactive && "transition-colors duration-500",
          className
        )}
        {...props}
      >
        {/* Mouse-follow glow */}
        {interactive && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{ background: glowBackground }}
          />
        )}

        {/* Animated shimmer sweep */}
        <div className="glass-shine pointer-events-none" />

        {/* Border accent */}
        <div className="absolute inset-0 rounded-[2rem] pointer-events-none z-0 transition-colors duration-500
          border border-white/5 group-hover:border-white/[0.12]" />

        {/* Top edge highlight */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-0" />

        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
