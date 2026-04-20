"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const FEATURES = [
  { icon: '⚡', label: 'Smart Scheduling' },
  { icon: '🎯', label: 'Focus Mode' },
  { icon: '📊', label: 'Analytics' },
  { icon: '🌙', label: 'Prayer Tracker' },
];

function AtomRings({ size = 180 }: { size?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size + i * 48,
            height: size + i * 48,
            borderColor: `rgba(99,102,241,${0.35 - i * 0.08})`,
            borderWidth: i === 0 ? 2 : 1,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: -6,
              left: '50%',
              marginLeft: -6,
              background: i === 0 ? '#818cf8' : i === 1 ? '#ec4899' : '#06b6d4',
              boxShadow: `0 0 12px 4px ${i === 0 ? '#818cf8' : i === 1 ? '#ec4899' : '#06b6d4'}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 4 + Math.random() * 8,
    delay: Math.random() * 4,
    color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#34d399'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

function GlowBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </>
  );
}

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'main' | 'exit'>('intro');
  const [progress, setProgress] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('main'), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'main') return;
    const start = Date.now();
    const duration = 3200;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          setPhase('exit');
          setTimeout(onComplete, 600);
        }
      }
    }, 16);
    return () => clearInterval(interval);
  }, [phase, onComplete]);

  const handleSkip = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setPhase('exit');
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#020617' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
        >
          <GridLines />
          <GlowBlobs />
          <ParticleField />

          <div className="relative flex flex-col items-center justify-center gap-10 w-full px-6 max-w-lg">

            {/* Logo section */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="relative" style={{ width: 180, height: 180 }}>
                <AtomRings size={120} />

                {/* Core logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-24 h-24 rounded-3xl flex items-center justify-center font-black text-white text-5xl"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                      boxShadow: '0 0 60px rgba(99,102,241,0.7), 0 0 120px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 60px rgba(99,102,241,0.7), 0 0 120px rgba(139,92,246,0.4)',
                        '0 0 90px rgba(139,92,246,0.9), 0 0 160px rgba(236,72,153,0.5)',
                        '0 0 60px rgba(99,102,241,0.7), 0 0 120px rgba(139,92,246,0.4)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      A
                    </motion.span>
                    {/* Shine sweep */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)' }}
                      animate={{ x: ['-120%', '220%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* App name + tagline */}
            <motion.div
              className="text-center space-y-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1
                className="text-6xl font-black tracking-tighter text-white"
                style={{ letterSpacing: '-0.03em' }}
              >
                {'ATOMIC'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{
                      background: `linear-gradient(135deg, #fff ${i * 16}%, #818cf8 ${50 + i * 8}%, #ec4899 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    initial={{ y: 40, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.8 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-sm font-bold uppercase tracking-[0.35em] text-slate-400"
                initial={{ opacity: 0, letterSpacing: '0.6em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                The Global Standard in Learning
              </motion.p>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1.5px solid rgba(99,102,241,0.3)',
                    color: '#a5b4fc',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7 + i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(139,92,246,0.6)' }}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-full space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
                    width: `${progress}%`,
                    boxShadow: '0 0 12px rgba(99,102,241,0.8)',
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <motion.p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Initializing...
                </motion.p>
                <button
                  onClick={handleSkip}
                  className="text-[10px] font-bold uppercase tracking-widest transition-colors"
                  style={{ color: 'rgba(99,102,241,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(99,102,241,1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(99,102,241,0.5)')}
                >
                  Skip →
                </button>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          {[
            { top: 16, left: 16, rotate: 0 },
            { top: 16, right: 16, rotate: 90 },
            { bottom: 16, left: 16, rotate: -90 },
            { bottom: 16, right: 16, rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={{ ...pos, opacity: 0.2 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              <svg viewBox="0 0 32 32" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <path d="M0 8 L0 0 L8 0" stroke="#6366f1" strokeWidth="2" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
