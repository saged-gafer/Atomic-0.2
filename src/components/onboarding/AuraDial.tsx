"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AuraDial - Premium Onboarding Interaction
 * Features:
 * - 12-hour circular dial (12 at top)
 * - Full Touch & Mouse support
 * - Keyboard Accessibility (Arrows, Home/End)
 * - ARIA Slider compliance
 * - Haptic feedback simulation
 */

interface AuraDialProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  label?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function AuraDial({
  value,
  onChange,
  min = 1,
  max = 12,
  label = "Hours",
  primaryColor = '#ec4899',
  secondaryColor = '#f59e0b',
}: AuraDialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  // Core logic: Map angle to hour (30 degrees per hour)
  const calculateValueFromCoords = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current) return value;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle relative to 12 o'clock (top)
    // atan2 gives angle from X axis, we rotate by 90 to make Y negative (top) the 0
    let angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    // Each hour is 30 degrees. 0 deg is 12, 30 deg is 1, etc.
    let val = Math.round(angle / 30);
    if (val === 0) val = 12;
    if (val > 12) val = val % 12 || 12;

    return Math.max(min, Math.min(max, val));
  }, [min, max, value]);

  const handleUpdate = useCallback((clientX: number, clientY: number) => {
    const newVal = calculateValueFromCoords(clientX, clientY);
    if (newVal !== value) {
      onChange(newVal);
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(8);
      }
    }
  }, [value, onChange, calculateValueFromCoords]);

  // Event Listeners
  useEffect(() => {
    const onMove = (e: MouseEvent) => isDragging && handleUpdate(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleUpdate]);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    handleUpdate(clientX, clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        onChange(Math.min(max, value + 1));
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        onChange(Math.max(min, value - 1));
        break;
      case 'Home': onChange(min); break;
      case 'End': onChange(max); break;
    }
  };

  // UI calculations
  const markers = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const handleRotation = (value % 12) * 30;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        ref={dialRef}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-full flex items-center justify-center cursor-pointer outline-none select-none transition-transform duration-500 ${isDragging ? 'scale-105' : 'hover:scale-[1.02]'}`}
      >
        {/* Background Aura */}
        <motion.div className="absolute inset-0 rounded-full backdrop-blur-2xl border border-white/5"
          style={{ background: 'rgba(15,5,8,0.6)' }}
          animate={{ boxShadow: [`0 0 50px ${primaryColor}15`, `0 0 80px ${primaryColor}25`, `0 0 50px ${primaryColor}15`] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Animated Glow Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          {/* Background track */}
          <circle cx="50" cy="50" r="45" fill="none"
            stroke={`${primaryColor}18`} strokeWidth="8" strokeLinecap="round"
            strokeDasharray="283" strokeDashoffset="0"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={`url(#dialGrad)`}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: value / 12 }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{ filter: `drop-shadow(0 0 10px ${primaryColor}cc)` }}
          />
          <defs>
            <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
        </svg>

        {/* Hour Markers */}
        {markers.map((m) => {
          const angle = (m * 30) - 90;
          const rad = (angle * Math.PI) / 180;
          const dist = 36;
          const isActive = m <= value;

          return (
            <div
              key={m}
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                left: `${50 + dist * Math.cos(rad)}%`,
                top: `${50 + dist * Math.sin(rad)}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isActive ? 1 : 0.15,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{
                background: isActive ? primaryColor : 'rgba(255,255,255,0.4)',
                boxShadow: isActive ? `0 0 6px ${primaryColor}` : 'none',
              }} />
            </div>
          );
        })}

        {/* Floating Handle */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          animate={{ rotate: handleRotation }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: '100%', height: '100%' }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-[1.5%]" style={{ width: '26px', height: '26px' }}>
            <div className="w-full h-full rounded-full bg-white"
              style={{
                border: `5px solid ${primaryColor}`,
                boxShadow: `0 0 20px ${primaryColor}99, 0 0 40px ${primaryColor}44`,
              }}
            />
          </div>
        </motion.div>

        {/* Value Display */}
        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ scale: 0.5, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0, y: -10 }}
              className="font-black text-white leading-none select-none"
              style={{
                fontSize: 'clamp(4rem, 14vw, 6rem)',
                textShadow: `0 0 40px ${primaryColor}60`,
              }}
            >
              {value}
            </motion.div>
          </AnimatePresence>
          <motion.div className="mt-2 text-[10px] font-black uppercase tracking-[0.4em]"
            animate={{ color: [`${primaryColor}80`, `${secondaryColor}80`, `${primaryColor}80`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {label}
          </motion.div>
        </div>

        {/* Interaction Hint */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 text-[9px] font-black uppercase tracking-widest"
            style={{ color: primaryColor }}
          >
            ✦ Adjusting...
          </motion.div>
        )}
      </div>
    </div>
  );
}
