"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { FloatingInput } from '@/components/ui/FloatingInput';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import {
  Timer, BookOpen, CheckSquare, Sparkles, ArrowDown,
  ArrowRight, Loader2, UserPlus, LogIn, ChevronLeft,
} from 'lucide-react';

type Scene = 'room' | 'landing' | 'auth';
type AuthMode = 'login' | 'register';

/* ─────────────────────────────────────────────
   Ambient helpers
───────────────────────────────────────────── */
function DustParticle({ x, y, size, dur, delay }: { x: string; y: string; size: number; dur: number; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'rgba(255,210,120,0.45)' }}
      animate={{ y: [0, -45, -18, -60, 0], x: [0, 12, -8, 18, 0], opacity: [0, 0.9, 0.4, 0.7, 0], scale: [0.5, 1, 0.7, 1.3, 0.5] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function Star({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none bg-white"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.4, 0.8] }}
      transition={{ duration: 2 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function FloatingIcon({ Icon, x, y, color, delay }: { Icon: React.ElementType; x: string; y: string; color: string; delay: number }) {
  return (
    <motion.div className="absolute pointer-events-none flex items-center justify-center rounded-2xl"
      style={{ left: x, top: y, width: 44, height: 44, background: `${color}18`, border: `1.5px solid ${color}35`, backdropFilter: 'blur(4px)' }}
      animate={{ y: [0, -14, 0], rotate: [-4, 4, -4], opacity: [0.65, 1, 0.65] }}
      transition={{ duration: 3.5 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon size={20} style={{ color }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SCENE 1 — Anime Study Room
───────────────────────────────────────────── */
const DUST = Array.from({ length: 22 }, (_, i) => ({
  x: `${8 + (i * 37 + 13) % 84}%`,
  y: `${18 + (i * 53 + 7) % 64}%`,
  size: 1.2 + (i % 4) * 0.6,
  dur: 5 + (i % 5),
  delay: (i * 0.4) % 4.5,
}));

const STARS = Array.from({ length: 22 }, (_, i) => ({
  x: `${(i * 43 + 5) % 98}%`,
  y: `${(i * 31 + 3) % 48}%`,
  size: 1 + (i % 3) * 0.9,
  delay: (i * 0.3) % 3,
}));

function StudyRoomScene({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg,#080620 0%,#0c0e28 40%,#150f38 70%,#090618 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -80, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stars */}
      {STARS.map((s, i) => <Star key={i} {...s} />)}

      {/* Moon */}
      <motion.div className="absolute" style={{ top: '7%', right: '11%' }}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 35%,#fffde7,#f4d03f)', boxShadow: '0 0 50px rgba(244,208,63,0.45),0 0 100px rgba(244,208,63,0.12)' }}
          />
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 68% 32%, transparent 55%, rgba(0,0,0,0.22) 100%)' }}
          />
        </div>
      </motion.div>

      {/* Room depth layers */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(12,10,40,0) 0%,rgba(18,13,55,0.75) 45%,rgba(8,6,24,0.96) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '30%', background: 'linear-gradient(180deg,rgba(6,5,20,0.92),#040312)', borderTop: '1px solid rgba(99,102,241,0.08)' }} />

      {/* Ambient lamp glow on ceiling */}
      <motion.div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '55%' }}
        animate={{ opacity: [0.55, 0.85, 0.55] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse 55% 60% at 55% 0%,rgba(255,175,45,0.18),transparent)' }} />
      </motion.div>

      {/* Window + curtains */}
      <div className="absolute" style={{ top: '14%', left: '9%' }}>
        <div style={{ width: 118, height: 148, background: 'linear-gradient(135deg,#09162a,#0c1f3c)', border: '5px solid #272060', borderRadius: 4, position: 'relative', boxShadow: 'inset 0 0 28px rgba(30,50,120,0.55),0 0 18px rgba(80,110,255,0.1)' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 4, background: '#272060', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 4, background: '#272060', transform: 'translateY(-50%)' }} />
          {[{ x: '18%', y: '18%' }, { x: '68%', y: '28%' }, { x: '38%', y: '68%' }, { x: '78%', y: '68%' }, { x: '14%', y: '62%' }].map((s, i) => (
            <motion.div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: 3, height: 3, background: 'white', borderRadius: '50%' }}
              animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.6 + i * 0.45, repeat: Infinity, delay: i * 0.3 }} />
          ))}
        </div>
        <motion.div style={{ position: 'absolute', top: -10, left: -16, width: 32, height: 178, background: 'linear-gradient(90deg,#3a1a65,#28144e)', borderRadius: '0 0 18px 0', transformOrigin: 'top center', zIndex: 5 }}
          animate={{ rotate: [-2.5, 2.5, -2.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div style={{ position: 'absolute', top: -10, right: -16, width: 32, height: 178, background: 'linear-gradient(270deg,#3a1a65,#28144e)', borderRadius: '0 0 0 18px', transformOrigin: 'top center', zIndex: 5 }}
          animate={{ rotate: [2.5, -2.5, 2.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} />
      </div>

      {/* Bookshelf */}
      <div className="absolute" style={{ top: '28%', right: '7%', width: 82, height: 122 }}>
        <div style={{ width: '100%', height: '100%', background: '#160e3a', border: '3px solid #2b2266', borderRadius: 4, padding: 4, position: 'relative' }}>
          {[33, 66].map((pct, i) => <div key={i} style={{ position: 'absolute', bottom: `${pct}%`, left: 0, right: 0, height: 3, background: '#2b2266' }} />)}
          {[
            { x: 5, h: 28, w: 10, c: '#6366f1' }, { x: 17, h: 22, w: 8, c: '#8b5cf6' }, { x: 27, h: 30, w: 11, c: '#ec4899' }, { x: 40, h: 25, w: 9, c: '#6366f1' }, { x: 51, h: 20, w: 7, c: '#f59e0b' },
            { x: 4, h: 27, w: 10, c: '#10b981', bot: '33%' }, { x: 16, h: 23, w: 9, c: '#6366f1', bot: '33%' }, { x: 27, h: 29, w: 10, c: '#ec4899', bot: '33%' }, { x: 39, h: 24, w: 8, c: '#8b5cf6', bot: '33%' },
          ].map((b, i) => <div key={i} style={{ position: 'absolute', bottom: b.bot || '0%', left: b.x, width: b.w, height: b.h, background: `linear-gradient(180deg,${b.c},${b.c}88)`, borderRadius: 2, border: `1px solid ${b.c}50` }} />)}
        </div>
      </div>

      {/* Desk lamp */}
      <div className="absolute" style={{ bottom: '31%', left: '60%' }}>
        <div style={{ width: 7, height: 55, background: '#7a6348', borderRadius: 3.5, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ width: 38, height: 6, background: '#7a6348', borderRadius: 3, position: 'absolute', bottom: 45, left: '50%', transform: 'translateX(-50%) rotate(-18deg)', transformOrigin: 'left center' }} />
        <motion.div style={{ width: 48, height: 28, background: 'linear-gradient(135deg,#c9960f,#ecb830)', borderRadius: '50% 50% 0 0', position: 'absolute', bottom: 48, left: '32%', boxShadow: '0 0 30px rgba(255,175,45,0.55),0 10px 40px rgba(255,140,25,0.3)' }}
          animate={{ opacity: [0.88, 1, 0.88] }} transition={{ duration: 2.2, repeat: Infinity }} />
        <motion.div style={{ width: 130, height: 130, background: 'radial-gradient(circle,rgba(255,175,45,0.22) 0%,transparent 70%)', position: 'absolute', bottom: 18, left: '-36px', pointerEvents: 'none' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }} />
      </div>

      {/* Desk + character */}
      <div className="absolute" style={{ bottom: '27%', left: '50%', transform: 'translateX(-50%)' }}>
        {/* Desk surface */}
        <div style={{ width: 224, height: 16, background: 'linear-gradient(180deg,#5a3e2c,#3c2818)', borderRadius: '6px 6px 0 0', boxShadow: '0 4px 24px rgba(0,0,0,0.55)' }} />
        <div style={{ width: 200, height: 7, background: '#3c2818', marginLeft: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 22 }}>
          {[0, 1].map(i => <div key={i} style={{ width: 10, height: 52, background: '#3c2818', borderRadius: '0 0 4px 4px' }} />)}
        </div>

        {/* Sitting character */}
        <div className="absolute" style={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative' }}>
            {/* Body */}
            <div style={{ width: 50, height: 56, background: 'linear-gradient(180deg,#2a2870,#1c1948)', borderRadius: '12px 12px 8px 8px', margin: '0 auto', position: 'relative', border: '1px solid rgba(99,102,241,0.28)' }}>
              <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 20, height: 17, background: 'white', borderRadius: '0 0 8px 8px', opacity: 0.9 }} />
              <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 7, height: 22, background: '#ec4899', borderRadius: 2 }} />
            </div>
            {/* Neck */}
            <div style={{ width: 14, height: 7, background: '#fde8d0', margin: '0 auto', borderRadius: '0 0 3px 3px' }} />
            {/* Head */}
            <div style={{ width: 52, height: 55, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#fef3e8,#fde8d0)', margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -9, left: 0, right: 0, height: 33, background: '#6366f1', borderRadius: '50% 50% 10px 10px' }} />
              {/* Antenna */}
              <motion.div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 4, height: 14, background: '#6366f1', borderRadius: 2 }}
                animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px rgba(139,92,246,0.8)' }} />
              {/* Eyes - looking down */}
              {[{ l: 9 }, { r: 9 }].map((e, i) => (
                <div key={i} style={{ position: 'absolute', top: 22, [i === 0 ? 'left' : 'right']: e.l || e.r, width: 12, height: 8, background: 'white', borderRadius: '50%', overflow: 'hidden' }}>
                  <div style={{ width: 9, height: 9, background: '#1e1b4b', borderRadius: '50%', margin: '2px auto 0' }} />
                </div>
              ))}
              {/* Blush */}
              {[{ l: 3 }, { r: 3 }].map((e, i) => (
                <div key={i} style={{ position: 'absolute', top: 34, [i === 0 ? 'left' : 'right']: 3, width: 12, height: 6, background: '#fda4af', borderRadius: '50%', opacity: 0.5 }} />
              ))}
              <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 14, height: 4, borderBottom: '2.5px solid #f97316', borderRadius: '0 0 6px 6px' }} />
            </div>
            {/* Arms */}
            <div style={{ position: 'absolute', bottom: 56, right: -22, width: 30, height: 11, background: '#2a2870', borderRadius: 6, transform: 'rotate(18deg)' }} />
            <div style={{ position: 'absolute', bottom: 56, left: -22, width: 30, height: 11, background: '#2a2870', borderRadius: 6, transform: 'rotate(-18deg)' }} />
          </motion.div>

          {/* Open book */}
          <div style={{ position: 'absolute', bottom: 16, left: -34, width: 62, height: 40, background: 'linear-gradient(90deg,#eef2ff,#e8eeff)', borderRadius: '2px 8px 8px 2px', boxShadow: '2px 2px 10px rgba(0,0,0,0.35)' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#c0caff', transform: 'translateX(-50%)' }} />
            {[7, 15, 23, 31].map((t, i) => <div key={i} style={{ position: 'absolute', top: t, left: 6, right: 6, height: 2, background: 'rgba(99,102,241,0.15)', borderRadius: 1 }} />)}
          </div>

          {/* Laptop */}
          <div style={{ position: 'absolute', bottom: 16, right: -40 }}>
            <div style={{ width: 52, height: 38, background: '#181630', borderRadius: '4px 4px 0 0', border: '2px solid #3a367a', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 4, background: 'linear-gradient(135deg,#1c1948,#2e2a7a)', borderRadius: 2, boxShadow: '0 0 12px rgba(99,102,241,0.45)' }} />
              {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', top: 8 + i * 8, left: 8, right: 8, height: 2, background: 'rgba(99,102,241,0.45)', borderRadius: 1 }} />)}
            </div>
            <div style={{ width: 32, height: 4, background: '#181630', margin: '0 auto', borderRadius: '0 0 4px 4px', border: '1px solid #3a367a' }} />
          </div>
        </div>
      </div>

      {/* Dust particles */}
      {DUST.map((d, i) => <DustParticle key={i} {...d} />)}

      {/* Floating icons */}
      <FloatingIcon Icon={Timer}       x="17%" y="44%" color="#6366f1" delay={0}   />
      <FloatingIcon Icon={BookOpen}    x="74%" y="39%" color="#8b5cf6" delay={1.3} />
      <FloatingIcon Icon={CheckSquare} x="22%" y="64%" color="#10b981" delay={2.2} />
      <FloatingIcon Icon={Sparkles}    x="70%" y="61%" color="#f59e0b" delay={0.8} />

      {/* ATOMICS badge */}
      <motion.div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg text-white"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 22px rgba(99,102,241,0.55)' }}
          animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 5, repeat: Infinity }}
        >A</motion.div>
        <div>
          <p className="text-xl font-black text-white tracking-widest leading-none">ATOMICS</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: '#6366f1' }}>Anime Study Platform</p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }}
      >
        <p className="text-white/50 text-sm font-medium tracking-wide">Your study adventure awaits</p>
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest"
          style={{ background: 'rgba(99,102,241,0.35)', border: '1.5px solid rgba(99,102,241,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 0 40px rgba(99,102,241,0.4),0 0 80px rgba(99,102,241,0.15)' }}
        >
          Begin Your Journey
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SCENE 2 — Auth Landing (ATOMICS neon + glass buttons)
───────────────────────────────────────────── */
const NEON_PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  x: `${15 + (i * 47 + 11) % 70}%`,
  y: `${15 + (i * 61 + 7) % 70}%`,
  size: 1 + (i % 4) * 0.8,
  dur: 3.5 + (i % 5),
  delay: (i * 0.35) % 4.2,
  color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
}));

function AuthLandingScene({ onLogin, onRegister, onBack }: {
  onLogin: () => void;
  onRegister: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 45%,#0d0b30 0%,#060410 100%)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5 }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(99,102,241,0.065) 1px,transparent 1px)', backgroundSize: '30px 30px' }}
      />

      {/* Particles */}
      {NEON_PARTICLES.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.85, 0], scale: [0.4, 1.6, 0.4] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity }}
        />
      ))}

      {/* Orbiting rings */}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        {[210, 320, 430].map((size, i) => (
          <motion.div key={i} className="absolute rounded-full border"
            style={{ width: size, height: size, left: -size / 2, top: -size / 2, borderColor: ['rgba(99,102,241,0.18)', 'rgba(139,92,246,0.1)', 'rgba(236,72,153,0.065)'][i] }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 22 + i * 6, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Back */}
      <motion.button onClick={onBack} whileHover={{ x: -3 }}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-white/35 hover:text-white/65 transition-colors text-sm font-bold"
      >
        <ChevronLeft size={18} /> Back
      </motion.button>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-sm w-full">

        {/* Logo */}
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="w-20 h-20 rounded-3xl flex items-center justify-center font-black text-4xl text-white"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 45px rgba(99,102,241,0.65),0 0 90px rgba(99,102,241,0.28)' }}
            animate={{ boxShadow: ['0 0 45px rgba(99,102,241,0.65),0 0 90px rgba(99,102,241,0.28)', '0 0 65px rgba(139,92,246,0.9),0 0 130px rgba(139,92,246,0.38)', '0 0 45px rgba(99,102,241,0.65),0 0 90px rgba(99,102,241,0.28)'] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >A</motion.div>

          <motion.h1 className="text-6xl sm:text-7xl font-black tracking-tighter"
            style={{ background: 'linear-gradient(135deg,#a5b4fc,#c4b5fd,#f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            animate={{ filter: ['brightness(1)', 'brightness(1.25)', 'brightness(1)'] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          >ATOMICS</motion.h1>

          <motion.p className="text-sm font-medium tracking-widest uppercase"
            style={{ color: 'rgba(165,180,252,0.55)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          >Your Anime Study Companion</motion.p>
        </motion.div>

        {/* Glassmorphism buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 w-full"
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button onClick={onRegister} whileHover={{ scale: 1.04, y: -5 }} whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.28),rgba(139,92,246,0.28))', border: '1.5px solid rgba(99,102,241,0.5)', backdropFilter: 'blur(22px)', boxShadow: '0 0 32px rgba(99,102,241,0.18),inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.42),rgba(139,92,246,0.42))' }} />
            <UserPlus size={15} style={{ color: '#a5b4fc' }} />
            <span className="relative z-10">Create Account</span>
          </motion.button>

          <motion.button onClick={onLogin} whileHover={{ scale: 1.04, y: -5 }} whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl font-black text-sm uppercase tracking-widest relative overflow-hidden group"
            style={{ background: 'rgba(99,102,241,0.09)', border: '1.5px solid rgba(99,102,241,0.28)', backdropFilter: 'blur(22px)', color: '#a5b4fc', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
          >
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(99,102,241,0.18)' }} />
            <LogIn size={15} />
            <span className="relative z-10">Sign In</span>
          </motion.button>
        </motion.div>

        {/* Feature pills */}
        <motion.div className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
        >
          {['⚡ AI Powered', '📚 Smart Plans', '🎮 Gamified', '🌙 Anime Style'].map(f => (
            <span key={f} className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(99,102,241,0.09)', border: '1px solid rgba(99,102,241,0.2)', color: 'rgba(165,180,252,0.65)' }}
            >{f}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SCENE 3 — Auth Form (morphing + toasts)
───────────────────────────────────────────── */
function AuthFormScene({ mode, onBack, onSwitchMode, onRegisterSuccess }: {
  mode: AuthMode;
  onBack: () => void;
  onSwitchMode: () => void;
  onRegisterSuccess: () => void;
}) {
  const { login } = useAppContext();
  const { toast } = useToast();
  const [username, setUsername]           = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPw, setConfirmPw]         = useState('');
  const [submitting, setSubmitting]       = useState(false);
  const [powerUp, setPowerUp]             = useState(false);
  const isLogin = mode === 'login';

  const handleSubmit = useCallback(async () => {
    if (!username.trim())          { toast('error', 'Please enter a username!');            return; }
    if (password.length < 4)       { toast('error', 'Password must be at least 4 chars.');  return; }
    if (!isLogin && password !== confirmPw) { toast('error', "Passwords don't match!");     return; }

    setSubmitting(true);

    if (isLogin) {
      await new Promise(r => setTimeout(r, 600));
      const ok = login(username.trim(), password.trim());
      if (!ok) {
        toast('error', 'Wrong username or password! Try again.');
        setSubmitting(false);
      } else {
        toast('success', 'Welcome back! Power up! ⚡');
        setPowerUp(true);
        setTimeout(() => setPowerUp(false), 1400);
      }
    } else {
      const raw = localStorage.getItem('study_planner_user_data');
      if (raw) {
        try {
          const existing = JSON.parse(raw);
          if (existing.username === username.trim()) {
            toast('error', 'Username already taken!');
            setSubmitting(false);
            return;
          }
        } catch { /* ignore */ }
      }
      await new Promise(r => setTimeout(r, 450));
      toast('success', "Account ready! Setting up your profile 🚀");
      setTimeout(() => onRegisterSuccess(), 900);
    }
  }, [username, password, confirmPw, isLogin, login, toast, onRegisterSuccess]);

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 42% 58%,#0f0a2e 0%,#050310 100%)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(99,102,241,0.055) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />
      {/* Ambient glow */}
      <motion.div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 550, height: 550 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 3.5, repeat: Infinity }}
      >
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle,rgba(99,102,241,0.11) 0%,transparent 68%)' }} />
      </motion.div>

      {/* Power-up overlay */}
      <AnimatePresence>
        {powerUp && (
          <motion.div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%,rgba(99,102,241,0.48) 0%,transparent 68%)' }}
              animate={{ scale: [0.4, 3.2], opacity: [0.9, 0] }} transition={{ duration: 0.85 }} />
            <motion.div className="text-7xl z-10" initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }} transition={{ duration: 1 }}>⚡</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back */}
      <motion.button onClick={onBack} whileHover={{ x: -3 }}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-white/35 hover:text-white/65 transition-colors text-sm font-bold z-20"
      >
        <ChevronLeft size={18} /> Back
      </motion.button>

      {/* Card */}
      <motion.div className="relative z-10 w-full max-w-md px-5"
        initial={{ y: 70, opacity: 0, scale: 0.94 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-[28px] overflow-hidden"
          style={{ background: 'rgba(8,6,32,0.88)', border: '1.5px solid rgba(99,102,241,0.3)', backdropFilter: 'blur(32px)', boxShadow: '0 4px 0 rgba(99,102,241,0.28),0 32px 90px rgba(0,0,0,0.85),0 0 90px rgba(99,102,241,0.08)' }}
        >
          {/* Animated top bar */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
            animate={{ background: ['linear-gradient(90deg,transparent,#6366f1,#8b5cf6,transparent)', 'linear-gradient(90deg,transparent,#8b5cf6,#ec4899,transparent)', 'linear-gradient(90deg,transparent,#6366f1,#8b5cf6,transparent)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Content */}
          <div className="p-8 sm:p-10" style={{ ['--primary' as string]: '#6366f1' }}>

            {/* Header row */}
            <motion.div className="flex items-center gap-3 mb-7"
              initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-base"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 22px rgba(99,102,241,0.5)' }}
              >A</div>
              <div>
                <p className="font-black text-white tracking-widest text-sm">ATOMICS</p>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(99,102,241,0.55)' }}>
                  {isLogin ? 'Sign In · Level Up' : 'New Adventure · Begin'}
                </p>
              </div>
              <div className="ml-auto">
                <motion.div className="w-2.5 h-2.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div className="mb-7"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            >
              <h2 className="text-3xl font-black text-white tracking-tight mb-1">
                {isLogin
                  ? <>Welcome Back <span style={{ color: '#8b5cf6' }}>✨</span></>
                  : <>New Legend <span style={{ color: '#6366f1' }}>🚀</span></>}
              </h2>
              <p className="text-sm font-medium" style={{ color: 'rgba(99,102,241,0.55)' }}>
                {isLogin ? 'Your study adventure continues!' : 'Your anime journey starts here!'}
              </p>
            </motion.div>

            {/* Fields */}
            <motion.div className="space-y-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              onKeyDown={handleKeyDown}
            >
              <FloatingInput label="Username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
              <FloatingInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={isLogin ? 'current-password' : 'new-password'} />
              <AnimatePresence>
                {!isLogin && (
                  <motion.div key="confirm" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <FloatingInput label="Confirm Password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} autoComplete="new-password" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.div className="mt-7"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            >
              <motion.button onClick={handleSubmit} disabled={submitting}
                whileHover={submitting ? {} : { scale: 1.02, y: -2 }} whileTap={submitting ? {} : { scale: 0.98 }}
                className="w-full h-14 rounded-2xl font-black text-white text-sm uppercase tracking-widest relative overflow-hidden"
                style={{ background: submitting ? 'rgba(99,102,241,0.38)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: '2px solid rgba(99,102,241,0.55)', boxShadow: '0 4px 0 rgba(99,102,241,0.38),0 0 32px rgba(99,102,241,0.22)' }}
              >
                {!submitting && (
                  <motion.div className="absolute inset-0"
                    style={{ background: 'linear-gradient(105deg,rgba(0,0,0,0) 30%,rgba(255,255,255,0.18) 50%,rgba(0,0,0,0) 70%)' }}
                    animate={{ x: ['-130%', '230%'] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {submitting
                    ? <Loader2 size={18} className="animate-spin" />
                    : <>{isLogin ? <LogIn size={15} /> : <UserPlus size={15} />}
                       <span>{isLogin ? 'Sign In!' : 'Create Account!'}</span>
                       <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><ArrowRight size={14} /></motion.div></>
                  }
                </span>
              </motion.button>
            </motion.div>

            {/* Switch mode */}
            <motion.p className="mt-5 text-center text-xs font-bold" style={{ color: 'rgba(99,102,241,0.45)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }}
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={onSwitchMode} className="font-black hover:underline" style={{ color: '#8b5cf6' }}>
                {isLogin ? 'Create one →' : 'Sign in →'}
              </button>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main export — orchestrates all scenes
───────────────────────────────────────────── */
export default function AuthScreen() {
  const [scene, setScene]               = useState<Scene>('room');
  const [authMode, setAuthMode]         = useState<AuthMode>('register');
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <AnimatePresence mode="wait">
      {scene === 'room' && (
        <StudyRoomScene key="room" onContinue={() => setScene('landing')} />
      )}

      {scene === 'landing' && (
        <AuthLandingScene key="landing"
          onLogin={() => { setAuthMode('login'); setScene('auth'); }}
          onRegister={() => { setAuthMode('register'); setScene('auth'); }}
          onBack={() => setScene('room')}
        />
      )}

      {scene === 'auth' && (
        <AuthFormScene key={`auth-${authMode}`}
          mode={authMode}
          onBack={() => setScene('landing')}
          onSwitchMode={() => setAuthMode(m => m === 'login' ? 'register' : 'login')}
          onRegisterSuccess={() => setShowOnboarding(true)}
        />
      )}
    </AnimatePresence>
  );
}
