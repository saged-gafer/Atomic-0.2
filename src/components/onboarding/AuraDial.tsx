"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { Clock } from 'lucide-react';

interface AuraDialProps {
  value: number;
  onChange: (val: number) => void;
  language: 'en' | 'ar';
}

export default function AuraDial({ value, onChange, language }: AuraDialProps) {
  const isRTL = language === 'ar';
  const dialRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Internal rotation state (degrees)
  // 1 hour = 30 degrees (360/12)
  const rotation = useMotionValue((value - 1) * 30);
  const springRotation = useSpring(rotation, { stiffness: 300, damping: 30 });

  const glowOpacity = useTransform(springRotation, [0, 330], [0.3, 0.8]);

  const handleUpdate = (clientX: number, clientY: number) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle in radians
    let angle = Math.atan2(clientY - centerY, clientX - centerX);
    // Convert to degrees and adjust so 0 is at the top
    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    // Snap to hours (1-12)
    const hour = Math.max(1, Math.min(12, Math.round(degrees / 30) + 1));
    const targetDegrees = (hour - 1) * 30;

    rotation.set(targetDegrees);
    onChange(hour);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleUpdate(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleUpdate(e.clientX, e.clientY);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col items-center justify-center py-10 select-none">
      <div
        ref={dialRef}
        className="relative w-64 h-64 flex items-center justify-center cursor-pointer group"
        onMouseDown={onMouseDown}
      >
        {/* Background Ring */}
        <div className="absolute inset-0 rounded-full border-[12px] border-white/5 shadow-inner" />

        {/* Glowing Aura */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            opacity: glowOpacity
          }}
        />

        {/* Progress Arc (SVG) */}
        <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="url(#auraGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="276.46"
            animate={{ strokeDashoffset: 276.46 * (1 - value / 12) }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
          <defs>
            <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => {
          const deg = i * 30;
          const isActive = (i + 1) <= value;
          return (
            <div
              key={i}
              className="absolute inset-0 pointer-events-none"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div
                className={`absolute top-4 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-white/10'
                }`}
              />
            </div>
          );
        })}

        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: isDragging ? 0.9 : 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-8xl font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-none">
              {value}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mt-2">
              {language === 'ar' ? 'ساعات' : 'Hours'}
            </span>
          </motion.div>
        </div>

        {/* Floating Knob */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-indigo-600 z-20"
          style={{
            rotate: springRotation,
            top: 0,
            transformOrigin: '50% 128px'
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 text-slate-400 text-sm font-medium max-w-[240px] text-center"
      >
        {language === 'ar'
          ? 'اسحب المؤشر لتحديد هدفك الدراسي اليومي'
          : 'Drag the dial to set your daily study goal'}
      </motion.p>
    </div>
  );
}
