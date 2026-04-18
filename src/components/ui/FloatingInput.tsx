"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  type?: string;
  onRevealToggle?: (visible: boolean) => void;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, value, onChange, onFocus, onBlur, className, type, error, onRevealToggle, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value !== undefined && value !== null && value !== '';
    const id = React.useId();
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : (type || 'text');

    const handleReveal = () => {
      const next = !showPassword;
      setShowPassword(next);
      onRevealToggle?.(next);
    };

    return (
      <div className="relative w-full pt-4 mt-2">
        <input
          {...props}
          id={id}
          ref={ref}
          type={inputType}
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
          placeholder=" "
          className={cn(
            "w-full h-12 bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white/20 transition-all duration-500 focus:border-transparent px-1 relative z-10",
            isPassword && "pr-10",
            error && "border-red-500/50",
            className
          )}
        />

        {/* Password reveal toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={handleReveal}
            className="absolute right-1 top-1/2 translate-y-1 z-20 p-1 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
        )}

        <motion.label
          htmlFor={id}
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
