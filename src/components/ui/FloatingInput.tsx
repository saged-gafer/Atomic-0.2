"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, value, onChange, onFocus, onBlur, className, type, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && value !== '';

    return (
      <div className="relative w-full pt-4 mt-2">
        <input
          {...props}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholder=" " // Required for peer-placeholder-shown if we used CSS, but we use Framer
          className={cn(
            "w-full h-12 bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white/20 transition-all duration-500 focus:border-transparent px-1 relative z-10",
            error && "border-red-500/50",
            className
          )}
        />

        <motion.label
          initial={false}
          animate={{
            y: isFocused || hasValue ? -25 : 8,
            scale: isFocused || hasValue ? 0.8 : 1,
            color: error ? "rgb(248 113 113)" : (isFocused ? "var(--primary)" : "rgba(255, 255, 255, 0.4)"),
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1 pointer-events-none origin-left font-bold tracking-tight z-0"
        >
          {label}
        </motion.label>

        {/* Background glow when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        {/* Animated focus underline */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 z-0" />
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary z-20 shadow-[0_0_8px_var(--primary)]"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
        />

        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-red-400/80 mt-1 block absolute"
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
