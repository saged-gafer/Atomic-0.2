"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import {
  Loader2, Shield, TrendingUp, Brain, Lock,
  Sparkles, Users, BookOpen, Zap, Rocket, Star, Atom,
  CheckCircle2, ArrowRight, GraduationCap, Target, FlaskConical,
} from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ─── Theme definitions ─────────────────────────────── */
const THEMES = {
  login: {
    primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4',
    glow1: 'rgba(99,102,241,0.18)', glow2: 'rgba(139,92,246,0.12)',
    aurora1: 'rgba(99,102,241,0.2)', aurora2: 'rgba(6,182,212,0.12)',
    cardShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(99,102,241,0.25)',
    bgBase: '#020510',
    particleColors: ['#6366f1','#818cf8','#8b5cf6','#06b6d4','#a78bfa'],
    gradient: 'linear-gradient(135deg, #020510 0%, #07082a 50%, #020a18 100%)',
    beamColor: 'rgba(99,102,241,0.5)',
    cta: 'linear-gradient(135deg, #3730a3 0%, #6d28d9 50%, #1e40af 100%)',
  },
  register: {
    primary: '#ec4899', secondary: '#f59e0b', accent: '#10b981',
    glow1: 'rgba(236,72,153,0.18)', glow2: 'rgba(245,158,11,0.12)',
    aurora1: 'rgba(236,72,153,0.18)', aurora2: 'rgba(245,158,11,0.1)',
    cardShadow: '0 0 0 1px rgba(236,72,153,0.2), 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(236,72,153,0.22)',
    bgBase: '#0f0508',
    particleColors: ['#ec4899','#f43f5e','#f59e0b','#fb923c','#e879f9'],
    gradient: 'linear-gradient(135deg, #0f0508 0%, #1f0a10 50%, #0e0a03 100%)',
    beamColor: 'rgba(236,72,153,0.5)',
    cta: 'linear-gradient(135deg, #be185d 0%, #7c3aed 50%, #d97706 100%)',
  },
};

/* ─── Constellation + Shooting Stars Canvas ─────────── */
function ConstellationCanvas({ mode }: { mode: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = THEMES[mode];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = window.innerWidth < 768 ? 50 : 85;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.6,
      color: theme.particleColors[Math.floor(Math.random() * theme.particleColors.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    type Star = { x: number; y: number; vx: number; vy: number; len: number; alpha: number; life: number; maxLife: number };
    const stars: Star[] = [];
    const spawnStar = () => {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        vx: 6 + Math.random() * 8,
        vy: 3 + Math.random() * 5,
        len: 80 + Math.random() * 120,
        alpha: 1,
        life: 0,
        maxLife: 45 + Math.random() * 30,
      });
    };

    let starTimer = 0;
    let raf: number;
    const LINK_DIST = window.innerWidth < 768 ? 120 : 155;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.018;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
      });

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = 0.14 * (1 - dist / LINK_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${nodes[i].color}${Math.round(alpha * 255).toString(16).padStart(2,'0')}`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Dots
      nodes.forEach(n => {
        const pr = n.r * (1 + 0.25 * Math.sin(n.pulse));
        // glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 4);
        grad.addColorStop(0, n.color + Math.round(n.opacity * 180).toString(16).padStart(2,'0'));
        grad.addColorStop(1, n.color + '00');
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.round(n.opacity * 255).toString(16).padStart(2,'0');
        ctx.fill();
      });

      // Shooting stars
      starTimer++;
      if (starTimer > 90) { spawnStar(); starTimer = 0; }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx; s.y += s.vy; s.life++;
        s.alpha = Math.max(0, 1 - s.life / s.maxLife);
        const grad = ctx.createLinearGradient(s.x - s.vx * (s.len / s.vx), s.y - s.vy * (s.len / s.vx), s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * (s.len / 10), s.y - s.vy * (s.len / 10));
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (s.life >= s.maxLife) stars.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [mode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Aurora Background ──────────────────────────────── */
function Aurora({ mode }: { mode: Mode }) {
  const theme = THEMES[mode];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <motion.div
        className="absolute rounded-full blur-[180px]"
        animate={{
          width: mode === 'login' ? '80vw' : '70vw',
          height: mode === 'login' ? '80vw' : '70vw',
          top: mode === 'login' ? '-28%' : '-18%',
          left: mode === 'login' ? '-20%' : '-12%',
          background: `radial-gradient(circle, ${theme.aurora1} 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ duration: 1.3, ease: [0.22,1,0.36,1] }}
      >
        <motion.div className="absolute inset-0 rounded-full"
          animate={{ x: [0,50,-25,0], y: [0,30,-25,0], scale: [1,1.12,0.94,1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Blob 2 */}
      <motion.div
        className="absolute rounded-full blur-[140px]"
        animate={{
          background: `radial-gradient(circle, ${theme.aurora2} 0%, rgba(0,0,0,0) 70%)`,
          width: mode === 'login' ? '55vw' : '65vw',
          height: mode === 'login' ? '55vw' : '65vw',
          bottom: mode === 'login' ? '-14%' : '-10%',
          right: mode === 'login' ? '-10%' : '-18%',
        }}
        transition={{ duration: 1.3, ease: [0.22,1,0.36,1] }}
      >
        <motion.div className="absolute inset-0 rounded-full"
          animate={{ x: [0,-45,28,0], y: [0,-28,40,0], scale: [1,0.88,1.12,1] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
      </motion.div>

      {/* Blob 3 – centre pulse */}
      <motion.div
        className="absolute rounded-full blur-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: ['30vw','38vw','30vw'],
          height: ['30vw','38vw','30vw'],
          opacity: [0.25, 0.45, 0.25],
          background: `radial-gradient(circle, ${theme.glow1} 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mode burst flash */}
      <AnimatePresence>
        <motion.div key={mode} className="absolute inset-0"
          initial={{ opacity: 0.6 }} animate={{ opacity: 0 }} transition={{ duration: 1 }}
          style={{ background: mode === 'login'
            ? 'radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(236,72,153,0.25) 0%, transparent 70%)' }}
        />
      </AnimatePresence>
    </div>
  );
}

/* ─── Floating Decorative Icons ─────────────────────── */
function FloatingDecorIcon({ Icon, color, x, y, size = 20, delay = 0, rotSpeed = 8 }: {
  Icon: React.ElementType; color: string; x: string; y: string; size?: number; delay?: number; rotSpeed?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden lg:block z-10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1, ease: [0.22,1,0.36,1] }}
    >
      <motion.div
        animate={{ y: [0,-12,0], rotate: [0, 360] }}
        transition={{
          y: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: rotSpeed, repeat: Infinity, ease: 'linear' }
        }}
        className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-sm border"
        style={{ background: `${color}12`, borderColor: `${color}28`, boxShadow: `0 0 20px ${color}18` }}
      >
        <Icon size={size} style={{ color }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Glitch Logo ────────────────────────────────────── */
function GlitchLogo({ mode }: { mode: Mode }) {
  const [glitch, setGlitch] = useState(false);
  const theme = THEMES[mode];
  useEffect(() => {
    const trigger = () => { setGlitch(true); setTimeout(() => setGlitch(false), 380); };
    const id = setInterval(trigger, 4500 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative select-none">
      <motion.h1
        className="text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-none text-white"
        animate={glitch ? {
          x: [0,-5,5,-2,0],
          textShadow: [
            '0 0 0px rgba(0,0,0,0)',
            `-4px 0 0 ${theme.primary}cc, 4px 0 0 ${theme.accent}cc`,
            `4px 0 0 ${theme.primary}cc, -4px 0 0 ${theme.accent}cc`,
            '0 0 0px rgba(0,0,0,0)',
          ],
        } : { textShadow: `0 0 60px ${theme.primary}50` }}
        transition={{ duration: 0.38 }}
      >ATOMIC</motion.h1>
      <AnimatePresence>
        {glitch && (
          <>
            <motion.h1 className="absolute inset-0 text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: `${theme.primary}70`, clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)' }}
              initial={{ x: 0 }} animate={{ x: [-7,7,0] }} transition={{ duration: 0.32 }}
            >ATOMIC</motion.h1>
            <motion.h1 className="absolute inset-0 text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: `${theme.accent}70`, clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' }}
              initial={{ x: 0 }} animate={{ x: [6,-6,0] }} transition={{ duration: 0.32 }}
            >ATOMIC</motion.h1>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Typewriter Text ────────────────────────────────── */
function Typewriter({ texts, color }: { texts: string[]; color: string }) {
  const [idx, setIdx]     = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && chars < current.length) {
      const t = setTimeout(() => setChars(c => c + 1), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && chars === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && chars > 0) {
      const t = setTimeout(() => setChars(c => c - 1), 30);
      return () => clearTimeout(t);
    }
    if (deleting && chars === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
  }, [chars, deleting, idx, texts]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span style={{ color }} className="font-bold">{texts[idx].slice(0, chars)}</span>
      <motion.span
        animate={{ opacity: [1,0,1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ color, display: 'inline-block', width: 2, height: '1em', background: color, borderRadius: 1, marginLeft: 2 }}
      />
    </span>
  );
}

/* ─── Orbit Ring ─────────────────────────────────────── */
function OrbitRing({ size, dur, cw = true, color, dash = false }: {
  size: number; dur: number; cw?: boolean; color: string; dash?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, border: `1px ${dash ? 'dashed' : 'solid'} ${color}`, marginLeft: -size/2, marginTop: -size/2 }}
      animate={{ rotate: cw ? 360 : -360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div className="absolute w-2.5 h-2.5 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 14px 5px ${color}` }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: dur / 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

/* ─── Floating Badge ─────────────────────────────────── */
function FloatingBadge({ icon: Icon, label, value, color, delay, x, y }: {
  icon: React.ElementType; label: string; value: React.ReactNode;
  color: string; delay: number; x: string; y: string;
}) {
  return (
    <motion.div className="absolute z-20 pointer-events-none hidden xl:block" style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22,1,0.36,1] }}
    >
      <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl backdrop-blur-xl border"
        style={{ background: 'rgba(8,10,28,0.92)', borderColor: `${color}38`, boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 28px ${color}22` }}
      >
        <motion.div className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
          animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay }}
        >
          <Icon size={14} style={{ color }} />
        </motion.div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: `${color}80` }}>{label}</p>
          <p className="text-sm font-black text-white">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated Counter ───────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = to / (2.5 * 60);
    const id = setInterval(() => {
      s += step; if (s >= to) { setCount(to); clearInterval(id); }
      else setCount(Math.floor(s));
    }, 1000/60);
    return () => clearInterval(id);
  }, [to]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Beam Sweep ─────────────────────────────────────── */
function BeamSweep({ color }: { color: string }) {
  return (
    <motion.div className="absolute left-0 right-0 h-[1px] pointer-events-none z-30"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      animate={{ top: ['-2px', '102%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
    />
  );
}

/* ─── 3D Mouse-Tilt Card Wrapper ─────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Particle Burst ─────────────────────────────────── */
function ParticleBurst({ color, active }: { color: string; active: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <AnimatePresence>
      {active && particles.map(i => {
        const angle = (i / 12) * Math.PI * 2;
        const dist  = 40 + Math.random() * 30;
        return (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-50"
            style={{ background: color, left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </AnimatePresence>
  );
}

/* ─── Register steps left panel ─────────────────────── */
const REGISTER_STEPS = [
  { icon: Rocket,       text: 'Create your profile',    color: '#ec4899' },
  { icon: Brain,        text: 'Build your study plan',  color: '#f59e0b' },
  { icon: Star,         text: 'Track & achieve goals',  color: '#10b981' },
  { icon: Atom,         text: 'Level up with AI',       color: '#a78bfa' },
];

function RegisterLeftContent({ theme }: { theme: typeof THEMES['register'] }) {
  return (
    <motion.div key="register-left"
      initial={{ opacity: 0, x: -40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="space-y-8"
    >
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.3em] mb-3"
          style={{ color: `${theme.primary}80` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >Get started in minutes</motion.p>
        <GlitchLogo mode="register" />
        <motion.p className="mt-3 text-lg text-slate-400 font-semibold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          <Typewriter texts={['Your AI-powered study companion.', 'Learn smarter, not harder.', 'Achieve more every day.']} color={theme.primary} />
        </motion.p>
      </div>

      <div className="space-y-3">
        {REGISTER_STEPS.map((s, i) => (
          <motion.div key={s.text}
            initial={{ opacity: 0, x: -30, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.13, duration: 0.65, ease: [0.22,1,0.36,1] }}
            whileHover={{ x: 8, scale: 1.02 }}
            className="flex items-center gap-4 p-4 rounded-2xl border group cursor-default relative overflow-hidden"
            style={{ background: `${s.color}08`, borderColor: `${s.color}25` }}
          >
            {/* Hover shimmer */}
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{ background: `linear-gradient(105deg, rgba(0,0,0,0) 30%, ${s.color}10 50%, rgba(0,0,0,0) 70%)` }}
            />
            <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${s.color}20` }}
              whileHover={{ scale: 1.15, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </motion.div>
            <div className="flex-1">
              <span className="text-sm font-bold text-white">{i + 1}. {s.text}</span>
            </div>
            {/* Pulsing dot */}
            <motion.div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }}
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Orbit display */}
      <motion.div className="relative w-56 h-56 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.22,1,0.36,1] }}
      >
        {/* Halo glow */}
        <motion.div className="absolute rounded-full blur-[50px]"
          style={{ width: 200, height: 200, background: `${THEMES.register.primary}18` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <OrbitRing size={224} dur={18} color={`${THEMES.register.primary}45`} />
        <OrbitRing size={170} dur={12} cw={false} color={`${THEMES.register.secondary}38`} dash />
        <OrbitRing size={116} dur={7}  color={`${THEMES.register.accent}45`} />
        <motion.div className="absolute z-10 w-20 h-20 rounded-[1.6rem] flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${THEMES.register.primary}, ${THEMES.register.secondary})` }}
          animate={{
            boxShadow: [
              `0 0 30px ${THEMES.register.primary}60, 0 0 60px ${THEMES.register.primary}20`,
              `0 0 50px ${THEMES.register.secondary}70, 0 0 80px ${THEMES.register.secondary}25`,
              `0 0 30px ${THEMES.register.primary}60, 0 0 60px ${THEMES.register.primary}20`,
            ],
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.span className="text-3xl font-black text-white select-none"
            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}
          >A</motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Login left content ─────────────────────────────── */
const LOGIN_STATS = [
  { icon: Users,    label: 'Students',   to: 12400, suffix: '+', color: '#6366f1', x: '5%',  y: '16%', delay: 1.1 },
  { icon: BookOpen, label: 'Sessions',   to: 98000, suffix: '+', color: '#ec4899', x: '58%', y: '6%',  delay: 1.4 },
  { icon: Zap,      label: 'AI Insights',to: 340,   suffix: 'k', color: '#06b6d4', x: '60%', y: '70%', delay: 1.7 },
];

const LOGIN_FEATURES = [
  { icon: Brain,      label: 'AI-Powered Planning', sub: 'Smart study optimization', color: '#6366f1' },
  { icon: Shield,     label: 'Secure & Private',    sub: 'Your data stays yours',    color: '#10b981' },
  { icon: TrendingUp, label: 'Deep Analytics',      sub: 'Track every session',      color: '#f59e0b' },
];

function LoginLeftContent({ theme }: { theme: typeof THEMES['login'] }) {
  return (
    <motion.div key="login-left"
      initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="space-y-8"
    >
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.3em] mb-3"
          style={{ color: `${theme.primary}80` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >Welcome back</motion.p>
        <GlitchLogo mode="login" />
        <motion.p className="mt-3 text-lg text-slate-400 font-semibold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          <Typewriter texts={['Elevate your learning with AI.', 'Every session counts.', 'Your goals, powered by data.']} color={theme.primary} />
        </motion.p>
      </div>

      {/* Orbit display */}
      <motion.div className="relative w-64 h-64 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.22,1,0.36,1] }}
      >
        {/* Halo */}
        <motion.div className="absolute rounded-full blur-[60px]"
          style={{ width: 220, height: 220, background: `${theme.primary}18` }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <OrbitRing size={256} dur={22} color={`${theme.primary}38`} />
        <OrbitRing size={196} dur={15} cw={false} color={`${theme.secondary}32`} dash />
        <OrbitRing size={138} dur={9}  color={`${theme.accent}38`} />
        <OrbitRing size={80}  dur={5}  cw={false} color={`${theme.secondary}42`} dash />
        <motion.div className="absolute z-10 w-24 h-24 rounded-[1.8rem] flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, #db2777)` }}
          animate={{
            boxShadow: [
              `0 0 35px ${theme.primary}60, 0 0 70px ${theme.primary}20`,
              `0 0 50px ${theme.secondary}75, 0 0 100px ${theme.secondary}25`,
              `0 0 35px #db277760, 0 0 70px #db277720`,
              `0 0 35px ${theme.primary}60, 0 0 70px ${theme.primary}20`,
            ],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span className="text-4xl font-black text-white relative z-10 select-none"
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }}
          >A</motion.span>
        </motion.div>
      </motion.div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2.5">
        {LOGIN_FEATURES.map((f, i) => (
          <motion.div key={f.label}
            initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.7, ease: [0.22,1,0.36,1] }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border cursor-default"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: `${f.color}25`, backdropFilter: 'blur(10px)' }}
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${f.color}18` }}>
              <f.icon size={12} style={{ color: f.color }} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{f.label}</p>
              <p className="text-[10px] text-slate-600">{f.sub}</p>
            </div>
            <motion.div className="w-1.5 h-1.5 rounded-full ml-0.5" style={{ background: f.color }}
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.55 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export default function AuthScreen() {
  const { login } = useAppContext();
  const [hasStoredAccount, setHasStoredAccount] = useState(false);
  const [mode,            setMode           ] = useState<Mode>('login');
  const [showOnboarding,  setShowOnboarding ] = useState(false);
  const [username,        setUsername       ] = useState('');
  const [password,        setPassword       ] = useState('');
  const [errors,          setErrors         ] = useState<{ username?: string; password?: string; credentials?: string }>({});
  const [isSubmitting,    setIsSubmitting   ] = useState(false);
  const [shake,           setShake          ] = useState(false);
  const [mounted,         setMounted        ] = useState(false);
  const [burst,           setBurst          ] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem('study_planner_user_data');
      setHasStoredAccount(!!stored);
      setMode(stored ? 'login' : 'register');
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const theme = THEMES[mode];
  const triggerShake = useCallback(() => { setShake(true); setTimeout(() => setShake(false), 600); }, []);

  const handleLogin = useCallback(() => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); triggerShake(); return; }
    setIsSubmitting(true);
    setBurst(true); setTimeout(() => setBurst(false), 700);
    const success = login(username.trim(), password.trim());
    if (!success) { setErrors({ credentials: 'Incorrect username or password.' }); setIsSubmitting(false); triggerShake(); }
  }, [username, password, login, triggerShake]);

  const handleRegister = useCallback(() => {
    setBurst(true); setTimeout(() => setBurst(false), 700);
    setTimeout(() => setShowOnboarding(true), 200);
  }, []);

  const switchMode = useCallback((next: Mode) => { setErrors({}); setMode(next); }, []);

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      {/* Background gradient */}
      <motion.div className="absolute inset-0"
        animate={{ background: theme.gradient }}
        transition={{ duration: 1.0, ease: [0.22,1,0.36,1] }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px)' }}
      />

      {mounted && <ConstellationCanvas mode={mode} />}
      {mounted && <Aurora mode={mode} />}

      {/* Decorative floating icons */}
      {mounted && (
        <>
          <FloatingDecorIcon Icon={GraduationCap} color="#6366f1" x="3%"  y="55%" delay={1.8} rotSpeed={12} />
          <FloatingDecorIcon Icon={FlaskConical}  color="#ec4899" x="6%"  y="82%" delay={2.1} rotSpeed={9}  />
          <FloatingDecorIcon Icon={Target}        color="#06b6d4" x="45%" y="5%"  delay={2.4} rotSpeed={15} size={18} />
          <FloatingDecorIcon Icon={Sparkles}      color="#f59e0b" x="42%" y="88%" delay={1.5} rotSpeed={10} size={18} />
        </>
      )}

      {/* Floating stat badges */}
      <AnimatePresence>
        {mode === 'login' && mounted && LOGIN_STATS.map((s) => (
          <FloatingBadge key={s.label} icon={s.icon} label={s.label}
            value={<Counter to={s.to} suffix={s.suffix} />}
            color={s.color} delay={s.delay} x={s.x} y={s.y}
          />
        ))}
      </AnimatePresence>

      {/* ══ LEFT PANEL ══ */}
      <motion.div
        className="hidden lg:flex flex-col justify-center flex-1 relative overflow-hidden px-12 xl:px-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0 }}
      >
        <div className="relative z-10 max-w-xl">
          {/* Brand row */}
          <motion.div className="flex items-center gap-3 mb-10"
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22,1,0.36,1] }}
          >
            <motion.div className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              animate={{ boxShadow: [
                `0 0 18px ${theme.primary}70`,
                `0 0 32px ${theme.secondary}90`,
                `0 0 18px ${theme.primary}70`,
              ]}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={17} className="text-white" />
            </motion.div>
            <div>
              <p className="text-base font-black text-white tracking-widest">ATOMIC</p>
              <motion.p className="text-[9px] font-bold uppercase tracking-[0.25em]"
                animate={{ color: `${theme.primary}70` }} transition={{ duration: 0.8 }}
              >Study Platform</motion.p>
            </div>
          </motion.div>

          {/* Mode-specific left content */}
          <AnimatePresence mode="wait">
            {mode === 'login'
              ? <LoginLeftContent    key="login"    theme={THEMES.login}    />
              : <RegisterLeftContent key="register" theme={THEMES.register} />}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="flex-1 lg:max-w-[490px] flex items-center justify-center p-4 sm:p-6 md:p-10 relative min-h-screen lg:min-h-0">

        {/* Mode glow */}
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: `radial-gradient(ellipse at 50% 50%, ${theme.glow1} 0%, rgba(0,0,0,0) 65%)` }}
          transition={{ duration: 0.9 }}
        />

        {/* Decorative vline */}
        <motion.div className="absolute left-0 top-[15%] bottom-[15%] w-px hidden lg:block"
          animate={{ background: `linear-gradient(to bottom, rgba(0,0,0,0), ${theme.primary}30, rgba(0,0,0,0))` }}
          transition={{ duration: 0.9 }}
        />

        <motion.div
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.2 }}
          className="relative w-full max-w-sm sm:max-w-md z-10"
        >
          <TiltCard>
            {/* Card */}
            <motion.div
              animate={{ boxShadow: theme.cardShadow }} transition={{ duration: 0.9 }}
              className="relative rounded-[2rem] overflow-hidden"
              style={{ background: 'rgba(5,7,20,0.96)', backdropFilter: 'blur(32px)' }}
            >
              <BeamSweep color={theme.beamColor} />

              {/* Animated top border */}
              <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
                animate={{ background: [
                  `linear-gradient(90deg, rgba(0,0,0,0), ${theme.primary}, ${theme.secondary}, rgba(0,0,0,0))`,
                  `linear-gradient(90deg, rgba(0,0,0,0), ${theme.secondary}, ${theme.primary}, rgba(0,0,0,0))`,
                ]}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Corner glow accents */}
              <motion.div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] pointer-events-none"
                animate={{ background: `${theme.primary}35` }} transition={{ duration: 0.8 }}
              />
              <div className="absolute -bottom-14 -left-14 w-32 h-32 rounded-full blur-[40px] pointer-events-none"
                style={{ background: 'rgba(6,182,212,0.08)' }} />

              {/* Animated gradient border ring */}
              <motion.div className="absolute inset-0 rounded-[2rem] pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ boxShadow: `inset 0 0 30px ${theme.primary}10` }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10">

                {/* Brand row */}
                <div className="flex items-center gap-3 mb-7">
                  <motion.div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
                    animate={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-sm font-black text-white">A</span>
                  </motion.div>
                  <div>
                    <span className="text-base font-black text-white tracking-wider block leading-none">ATOMIC</span>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">v2.0 — Premium</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0"
                    style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.25)' }}>
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1,0.2,1], scale: [1,1.4,1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] font-bold text-emerald-400">Live</span>
                  </div>
                </div>

                {/* Mode tabs */}
                <div className="relative flex rounded-2xl p-1 mb-7 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <motion.div className="absolute top-1 bottom-1 rounded-xl z-0"
                    animate={{
                      left:  mode === 'login' ? 4 : '50%',
                      right: mode === 'login' ? '50%' : 4,
                      background: mode === 'login'
                        ? `linear-gradient(135deg, ${THEMES.login.primary}35, ${THEMES.login.primary}15)`
                        : `linear-gradient(135deg, ${THEMES.register.primary}35, ${THEMES.register.primary}15)`,
                      boxShadow: mode === 'login'
                        ? `0 0 20px ${THEMES.login.primary}28, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : `0 0 20px ${THEMES.register.primary}24, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                    transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
                  />
                  {(['login','register'] as Mode[]).map((m) => (
                    <motion.button key={m} onClick={() => switchMode(m)} whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-[0.15em] relative z-10 rounded-xl transition-colors duration-300 ${
                        mode === m ? (m === 'login' ? 'text-indigo-400' : 'text-pink-400') : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {m === 'login' ? 'Sign In' : 'Register'}
                    </motion.button>
                  ))}
                </div>

                {/* Form area */}
                <div className="relative" style={{ minHeight: 272 }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {mode === 'login' && (
                      <motion.div key="login-form"
                        initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
                        animate={{ opacity: 1,  x: 0,   filter: 'blur(0px)' }}
                        exit={{   opacity: 0,  x: 28,  filter: 'blur(8px)' }}
                        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                      >
                        <div className="mb-6">
                          <motion.h2 className="text-2xl font-black text-white mb-1"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                          >Welcome back 👋</motion.h2>
                          <motion.p className="text-slate-500 text-sm"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                          >Continue your learning journey</motion.p>
                        </div>

                        <motion.form
                          animate={shake ? { x: [-8,8,-5,5,-2,2,0] } : { x: 0 }}
                          transition={{ duration: 0.45 }}
                          onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                          className="space-y-4"
                        >
                          <FloatingInput label="Username" value={username}
                            onChange={(e) => { setUsername(e.target.value); setErrors({}); }}
                            error={errors.username} autoComplete="username"
                          />
                          <FloatingInput label="Password" type="password" value={password}
                            onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                            error={errors.password} autoComplete="current-password"
                          />
                          <input type="submit" className="hidden" />
                        </motion.form>

                        <AnimatePresence>
                          {errors.credentials && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                            >
                              <Lock size={12} className="text-red-400 shrink-0" />
                              <p className="text-xs font-bold text-red-400">{errors.credentials}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!hasStoredAccount && (
                          <motion.p className="mt-5 text-center text-xs text-slate-600"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          >
                            No account?{' '}
                            <button onClick={() => switchMode('register')} className="text-pink-400 font-bold hover:underline underline-offset-2">
                              Create one free
                            </button>
                          </motion.p>
                        )}
                      </motion.div>
                    )}

                    {mode === 'register' && (
                      <motion.div key="register-form"
                        initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
                        animate={{ opacity: 1,  x: 0,  filter: 'blur(0px)' }}
                        exit={{   opacity: 0,  x: -28, filter: 'blur(8px)' }}
                        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                      >
                        <div className="mb-6">
                          <motion.h2 className="text-2xl font-black text-white mb-1"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                          >Join ATOMIC 🚀</motion.h2>
                          <motion.p className="text-slate-500 text-sm"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                          >Start your premium study experience</motion.p>
                        </div>

                        <div className="space-y-2 mb-5">
                          {REGISTER_STEPS.map((s, i) => (
                            <motion.div key={s.text}
                              initial={{ opacity: 0, x: 18, scale: 0.92 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ delay: i * 0.09, ease: [0.22,1,0.36,1], duration: 0.5 }}
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-3 p-3 rounded-2xl cursor-default"
                              style={{ background: `${s.color}08`, border: `1px solid ${s.color}18` }}
                            >
                              <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: `${s.color}20` }}
                                whileHover={{ scale: 1.15, rotate: 10 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                <s.icon size={14} style={{ color: s.color }} />
                              </motion.div>
                              <span className="text-xs font-bold text-white flex-1">{i + 1}. {s.text}</span>
                              <motion.div className="shrink-0" style={{ color: s.color }}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                              >
                                <CheckCircle2 size={14} />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>

                        {hasStoredAccount && (
                          <motion.p className="text-center text-xs text-slate-600"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          >
                            Already registered?{' '}
                            <button onClick={() => switchMode('login')} className="text-indigo-400 font-bold hover:underline underline-offset-2">
                              Sign in
                            </button>
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <div className="relative mt-5">
                  <ParticleBurst color={theme.primary} active={burst} />
                  <motion.button
                    onClick={mode === 'login' ? handleLogin : handleRegister}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative w-full overflow-hidden rounded-2xl font-black text-white group"
                    style={{ height: 54 }}
                  >
                    {/* Gradient bg */}
                    <motion.div className="absolute inset-0"
                      animate={{ background: theme.cta }} transition={{ duration: 0.8 }}
                    />
                    {/* Shimmer */}
                    <motion.div className="absolute inset-0"
                      style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0) 30%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0) 70%)' }}
                      animate={{ x: ['-100%','200%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    {/* Outer glow pulse */}
                    <motion.div className="absolute inset-0 rounded-2xl"
                      animate={{ boxShadow: [`0 0 0px ${theme.primary}00`, `0 0 30px ${theme.primary}60`, `0 0 0px ${theme.primary}00`] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    {/* Label */}
                    <span className="relative z-10 flex items-center justify-center gap-2.5 text-[13px] tracking-widest uppercase">
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          {mode === 'login' ? 'Sign In' : 'Get Started Free'}
                          <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <ArrowRight size={16} />
                          </motion.div>
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
