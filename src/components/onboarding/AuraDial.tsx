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
}

export default function AuraDial({
  value,
  onChange,
  min = 1,
  max = 12,
  label = "Hours"
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
        <div className="absolute inset-0 rounded-full bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)]" />

        {/* Animated Glow Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="stroke-white/5 fill-none" strokeWidth="1" />
          <motion.circle
            cx="50" cy="50" r="45"
            className="stroke-primary fill-none"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: value / 12 }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{ filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.8))' }}
          />
        </svg>

        {/* Hour Markers */}
        {markers.map((m) => {
          const angle = (m * 30) - 90;
          const rad = (angle * Math.PI) / 180;
          const dist = 36;
          const isActive = m <= value || (value === 12);

          return (
            <div
              key={m}
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                left: `${50 + dist * Math.cos(rad)}%`,
                top: `${50 + dist * Math.sin(rad)}%`,
                transform: 'translate(-50%, -50%)',
                opacity: m <= value ? 1 : 0.2
              }}
            >
              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary glow-primary' : 'bg-white'}`} />
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
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[1.5%]"
            style={{ width: '24px', height: '24px' }}
          >
             <div className="w-full h-full rounded-full bg-white border-[6px] border-primary shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
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
              className="text-8xl sm:text-9xl font-black text-white text-glow leading-none select-none"
            >
              {value}
            </motion.div>
          </AnimatePresence>
          <div className="mt-2 text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{label}</div>
        </div>

        {/* Interaction Hint */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-12 text-[9px] font-black text-primary uppercase tracking-widest"
          >
            Adjusting...
          </motion.div>
        )}
      </div>
    </div>
  );
}
