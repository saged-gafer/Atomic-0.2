"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Target, Clock, Sparkles, Moon } from 'lucide-react';

/* ── Orbiting study icons ─────────────────────────────── */
const ORBIT_ICONS = [
  { Icon: BookOpen, color: '#818cf8', angle: 0 },
  { Icon: Brain, color: '#ec4899', angle: 60 },
  { Icon: Target, color: '#f59e0b', angle: 120 },
  { Icon: Clock, color: '#06b6d4', angle: 180 },
  { Icon: Moon, color: '#a78bfa', angle: 240 },
  { Icon: Sparkles, color: '#34d399', angle: 300 },
];

function OrbitingIcons({ radius = 130 }: { radius?: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
    >
      {ORBIT_ICONS.map(({ Icon, color, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={i}
            className="absolute w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{
              left: `calc(50% + ${x}px - 18px)`,
              top: `calc(50% + ${y}px - 18px)`,
              background: `${color}20`,
              border: `1.5px solid ${color}50`,
              boxShadow: `0 0 20px ${color}40`,
              backdropFilter: 'blur(8px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 300 }}
          >
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
              <Icon size={16} style={{ color }} />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

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
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            scale: { delay: 0.2 + i * 0.1, duration: 0.6, type: 'spring' },
            opacity: { delay: 0.2 + i * 0.1, duration: 0.6 },
            rotate: { duration: 8 + i * 4, repeat: Infinity, ease: 'linear' },
          }}
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
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: (i * 53) % 100,
    y: (i * 37) % 100,
    size: ((i * 7) % 3) + 1,
    duration: 4 + (i % 6),
    delay: (i % 10) * 0.4,
    color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#34d399', '#f59e0b'][i % 6],
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
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.9, 0],
            scale: [0, 1.4, 0],
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

function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i * 71) % 100,
    y: (i * 43) % 100,
    size: ((i * 3) % 2) + 0.5,
    twinkleDelay: (i % 8) * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2.5, delay: s.twinkleDelay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.05]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
      }}
    />
  );
}

function GlowBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-[28vw] h-[28vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </>
  );
}

function LightBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.2, times: [0, 0.3, 1] }}
    >
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-white"
        style={{
          boxShadow: '0 0 60px 30px rgba(255,255,255,0.9), 0 0 120px 60px rgba(139,92,246,0.6), 0 0 200px 100px rgba(99,102,241,0.4)',
        }}
        animate={{ scale: [0, 12, 0] }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'main' | 'exit'>('intro');
  const [progress, setProgress] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('main'), 600);
    const t2 = setTimeout(() => setShowBurst(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'main') return;
    const start = Date.now();
    const duration = 3600;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          setPhase('exit');
          setTimeout(onComplete, 700);
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
          style={{
            background: 'radial-gradient(ellipse at center, #0a0f24 0%, #050816 70%, #02030a 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <StarField />
          <GridLines />
          <GlowBlobs />
          <ParticleField />
          <LightBurst active={showBurst} />

          {/* Scan line effect */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
              boxShadow: '0 0 20px rgba(139,92,246,0.8)',
            }}
            animate={{ top: ['-2%', '102%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative flex flex-col items-center justify-center gap-8 sm:gap-10 w-full px-6 max-w-lg">

            {/* Logo + orbiting icons */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="relative" style={{ width: 280, height: 280 }}>
                <AtomRings size={120} />
                <OrbitingIcons radius={130} />

                {/* Core logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-24 h-24 rounded-3xl flex items-center justify-center font-black text-white text-5xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                      boxShadow: '0 0 60px rgba(99,102,241,0.7), 0 0 120px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
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
                      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                    >
                      A
                    </motion.span>
                    {/* Shine sweep */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
                      animate={{ x: ['-120%', '220%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                    />
                    {/* Inner pulse glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)' }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
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
              transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1
                className="text-6xl sm:text-7xl font-black tracking-tighter text-white"
                style={{ letterSpacing: '-0.04em' }}
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
                      filter: 'drop-shadow(0 0 16px rgba(139,92,246,0.5))',
                    }}
                    initial={{ y: 50, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 1.1 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Three-word power tagline */}
              <motion.div
                className="flex items-center justify-center gap-3 sm:gap-4 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                {['Plan', 'Focus', 'Excel'].map((word, i) => (
                  <React.Fragment key={word}>
                    {i > 0 && (
                      <motion.span
                        className="w-1 h-1 rounded-full bg-indigo-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8 + i * 0.15 }}
                        style={{ boxShadow: '0 0 6px rgba(129,140,248,0.8)' }}
                      />
                    )}
                    <motion.span
                      className="text-sm sm:text-base font-black uppercase tracking-[0.3em]"
                      style={{
                        background: `linear-gradient(135deg, ${['#a5b4fc', '#f9a8d4', '#67e8f9'][i]}, #fff)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.75 + i * 0.15 }}
                    >
                      {word}
                    </motion.span>
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mt-3"
                initial={{ opacity: 0, letterSpacing: '0.7em' }}
                animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                Smart Study Companion
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-full space-y-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <div
                className="relative w-full h-[4px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}
              >
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #06b6d4)',
                    backgroundSize: '300% 100%',
                    width: `${progress}%`,
                    boxShadow: '0 0 14px rgba(139,92,246,0.8)',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                  transition={{ backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' } }}
                >
                  {/* Glow head */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                    style={{ boxShadow: '0 0 12px 4px rgba(255,255,255,0.8)' }}
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <motion.p
                  className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                  style={{ color: 'rgba(165,180,252,0.6)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.span
                    className="inline-block w-1 h-1 rounded-full bg-indigo-400"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  Initializing experience
                </motion.p>
                <span className="text-[10px] font-black tracking-widest text-indigo-300/60 tabular-nums">
                  {Math.floor(progress)}%
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] mt-3 transition-colors"
                style={{ color: 'rgba(99,102,241,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(165,180,252,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(99,102,241,0.4)')}
              >
                Tap to skip →
              </button>
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
              className="absolute w-10 h-10"
              style={{ ...pos, opacity: 0.25 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              <svg viewBox="0 0 40 40" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <path d="M0 12 L0 0 L12 0" stroke="#818cf8" strokeWidth="2" />
                <circle cx="0" cy="0" r="2" fill="#ec4899" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
