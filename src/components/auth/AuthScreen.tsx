"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import {
  Loader2, Shield, TrendingUp, Brain, Lock,
  Sparkles, Users, BookOpen, Zap, Rocket, Star, Atom
} from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ─── Theme definitions ──────────────────────────────── */
const THEMES = {
  login: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    glow1: 'rgba(99,102,241,0.18)',
    glow2: 'rgba(139,92,246,0.12)',
    aurora1: 'rgba(99,102,241,0.2)',
    aurora2: 'rgba(6,182,212,0.12)',
    cardShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(99,102,241,0.25)',
    bgBase: '#020510',
    particleColors: ['#6366f1', '#818cf8', '#8b5cf6', '#06b6d4', '#a78bfa'],
    gradient: 'linear-gradient(135deg, #020510 0%, #07082a 50%, #020a18 100%)',
    beamColor: 'rgba(99,102,241,0.5)',
    cta: 'linear-gradient(135deg, #3730a3 0%, #6d28d9 50%, #1e40af 100%)',
  },
  register: {
    primary: '#ec4899',
    secondary: '#f59e0b',
    accent: '#10b981',
    glow1: 'rgba(236,72,153,0.18)',
    glow2: 'rgba(245,158,11,0.12)',
    aurora1: 'rgba(236,72,153,0.18)',
    aurora2: 'rgba(245,158,11,0.1)',
    cardShadow: '0 0 0 1px rgba(236,72,153,0.2), 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(236,72,153,0.22)',
    bgBase: '#0f0508',
    particleColors: ['#ec4899', '#f43f5e', '#f59e0b', '#fb923c', '#e879f9'],
    gradient: 'linear-gradient(135deg, #0f0508 0%, #1f0a10 50%, #0e0a03 100%)',
    beamColor: 'rgba(236,72,153,0.5)',
    cta: 'linear-gradient(135deg, #be185d 0%, #7c3aed 50%, #d97706 100%)',
  },
};

/* ─── Constellation Canvas ───────────────────────────── */
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

    const COUNT = window.innerWidth < 768 ? 40 : 70;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.55,
      color: theme.particleColors[Math.floor(Math.random() * theme.particleColors.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const LINK_DIST = window.innerWidth < 768 ? 110 : 140;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.015;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = 0.12 * (1 - dist / LINK_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${nodes[i].color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const pulseR = n.r * (1 + 0.2 * Math.sin(n.pulse));
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.round(n.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [mode]); // Re-run when mode changes to update particle colors

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Aurora Background ──────────────────────────────── */
function Aurora({ mode }: { mode: Mode }) {
  const theme = THEMES[mode];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full blur-[160px]"
        animate={{
          width: mode === 'login' ? '75vw' : '65vw',
          height: mode === 'login' ? '75vw' : '65vw',
          top: mode === 'login' ? '-25%' : '-15%',
          left: mode === 'login' ? '-18%' : '-10%',
          background: `radial-gradient(circle, ${theme.aurora1} 0%, transparent 70%)`,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ x: [0, 40, -20, 0], y: [0, 25, -20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute rounded-full blur-[130px]"
        animate={{
          background: `radial-gradient(circle, ${theme.aurora2} 0%, transparent 70%)`,
          width: mode === 'login' ? '50vw' : '60vw',
          height: mode === 'login' ? '50vw' : '60vw',
          bottom: mode === 'login' ? '-12%' : '-8%',
          right: mode === 'login' ? '-8%' : '-15%',
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ x: [0, -40, 25, 0], y: [0, -25, 35, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />
      </motion.div>

      {/* Mode burst flash on switch */}
      <AnimatePresence>
        <motion.div
          key={mode}
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: mode === 'login'
              ? 'radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(236,72,153,0.2) 0%, transparent 70%)',
          }}
        />
      </AnimatePresence>
    </div>
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
          x: [0, -5, 5, -2, 0],
          textShadow: [
            '0 0 0px transparent',
            `-4px 0 0 ${theme.primary}cc, 4px 0 0 ${theme.accent}cc`,
            `4px 0 0 ${theme.primary}cc, -4px 0 0 ${theme.accent}cc`,
            '0 0 0px transparent',
          ],
        } : { textShadow: `0 0 60px ${theme.primary}50` }}
        transition={{ duration: 0.38 }}
      >
        ATOMIC
      </motion.h1>
      <AnimatePresence>
        {glitch && (
          <>
            <motion.h1
              className="absolute inset-0 text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: `${theme.primary}70`, clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)' }}
              initial={{ x: 0 }} animate={{ x: [-7, 7, 0] }} transition={{ duration: 0.32 }}
            >ATOMIC</motion.h1>
            <motion.h1
              className="absolute inset-0 text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: `${theme.accent}70`, clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' }}
              initial={{ x: 0 }} animate={{ x: [6, -6, 0] }} transition={{ duration: 0.32 }}
            >ATOMIC</motion.h1>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Orbit Ring ─────────────────────────────────────── */
function OrbitRing({ size, dur, cw = true, color, dash = false }: {
  size: number; dur: number; cw?: boolean; color: string; dash?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, border: `1px ${dash ? 'dashed' : 'solid'} ${color}`, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ rotate: cw ? 360 : -360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div className="absolute w-2.5 h-2.5 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 12px 4px ${color}` }}
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
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl backdrop-blur-xl border"
        style={{ background: 'rgba(8,10,28,0.9)', borderColor: `${color}35`, boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${color}18` }}
      >
        <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
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
    }, 1000 / 60);
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

/* ─── Left panel register content ───────────────────── */
const REGISTER_STEPS = [
  { icon: Rocket, text: 'Create your profile', color: '#ec4899' },
  { icon: Brain, text: 'Build your study plan', color: '#f59e0b' },
  { icon: Star, text: 'Track & achieve goals', color: '#10b981' },
  { icon: Atom, text: 'Level up with AI', color: '#a78bfa' },
];

function RegisterLeftContent({ theme }: { theme: typeof THEMES['register'] }) {
  return (
    <motion.div
      key="register-left"
      initial={{ opacity: 0, x: -40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.3em] mb-3"
          style={{ color: `${theme.primary}80` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >Get started in minutes</motion.p>
        <GlitchLogo mode="register" />
        <motion.p className="mt-3 text-lg text-slate-400 font-semibold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          Your AI-powered study companion
        </motion.p>
      </div>

      <div className="space-y-3">
        {REGISTER_STEPS.map((s, i) => (
          <motion.div key={s.text}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 6 }}
            className="flex items-center gap-4 p-4 rounded-2xl border group cursor-default"
            style={{ background: `${s.color}08`, borderColor: `${s.color}25` }}
          >
            <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${s.color}20` }}
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </motion.div>
            <div className="flex-1">
              <span className="text-sm font-bold text-white">{i + 1}. {s.text}</span>
            </div>
            <motion.div className="w-2 h-2 rounded-full shrink-0"
              style={{ background: s.color }}
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Orbiting display */}
      <motion.div className="relative w-56 h-56 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <OrbitRing size={224} dur={18} color={`${THEMES.register.primary}40`} />
        <OrbitRing size={170} dur={12} cw={false} color={`${THEMES.register.secondary}35`} dash />
        <OrbitRing size={116} dur={7} color={`${THEMES.register.accent}40`} />
        <motion.div className="absolute z-10 w-20 h-20 rounded-[1.6rem] flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${THEMES.register.primary}, ${THEMES.register.secondary})` }}
          animate={{
            boxShadow: [
              `0 0 30px ${THEMES.register.primary}60, 0 0 60px ${THEMES.register.primary}20`,
              `0 0 50px ${THEMES.register.secondary}70, 0 0 80px ${THEMES.register.secondary}25`,
              `0 0 30px ${THEMES.register.primary}60, 0 0 60px ${THEMES.register.primary}20`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-3xl font-black text-white select-none">A</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const LOGIN_STATS = [
  { icon: Users, label: 'Students', to: 12400, suffix: '+', color: '#6366f1', x: '5%', y: '16%', delay: 1.1 },
  { icon: BookOpen, label: 'Sessions', to: 98000, suffix: '+', color: '#ec4899', x: '58%', y: '6%', delay: 1.4 },
  { icon: Zap, label: 'AI Insights', to: 340, suffix: 'k', color: '#06b6d4', x: '60%', y: '70%', delay: 1.7 },
];

const LOGIN_FEATURES = [
  { icon: Brain, label: 'AI-Powered Planning', sub: 'Smart study optimization', color: '#6366f1' },
  { icon: Shield, label: 'Secure & Private', sub: 'Your data stays yours', color: '#10b981' },
  { icon: TrendingUp, label: 'Deep Analytics', sub: 'Track every study session', color: '#f59e0b' },
];

function LoginLeftContent({ theme }: { theme: typeof THEMES['login'] }) {
  return (
    <motion.div
      key="login-left"
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.3em] mb-3"
          style={{ color: `${theme.primary}80` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >Welcome back</motion.p>
        <GlitchLogo mode="login" />
        <motion.p className="mt-3 text-lg text-slate-400 font-semibold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          Elevate your learning with AI.
        </motion.p>
      </div>

      {/* Orbiting display */}
      <motion.div className="relative w-64 h-64 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <OrbitRing size={256} dur={22} color={`${theme.primary}35`} />
        <OrbitRing size={196} dur={15} cw={false} color={`${theme.secondary}30`} dash />
        <OrbitRing size={138} dur={9} color={`${theme.accent}35`} />
        <OrbitRing size={80} dur={5} cw={false} color={`${theme.secondary}40`} dash />
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
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
          >A</motion.span>
        </motion.div>
      </motion.div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2.5">
        {LOGIN_FEATURES.map((f, i) => (
          <motion.div key={f.label}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: `${f.color}22`, backdropFilter: 'blur(10px)' }}
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${f.color}18` }}>
              <f.icon size={12} style={{ color: f.color }} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{f.label}</p>
              <p className="text-[10px] text-slate-600">{f.sub}</p>
            </div>
            <motion.div className="w-1.5 h-1.5 rounded-full ml-0.5" style={{ background: f.color }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
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
  const [mode, setMode] = useState<Mode>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; credentials?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    const success = login(username.trim(), password.trim());
    if (!success) { setErrors({ credentials: 'Incorrect username or password.' }); setIsSubmitting(false); triggerShake(); }
  }, [username, password, login, triggerShake]);

  const switchMode = useCallback((next: Mode) => { setErrors({}); setMode(next); }, []);

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      {/* ── Animated background ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: theme.gradient }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Scanline texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px)' }}
      />

      {mounted && <ConstellationCanvas mode={mode} />}
      {mounted && <Aurora mode={mode} />}

      {/* ── Floating stat badges (login only) ── */}
      <AnimatePresence>
        {mode === 'login' && mounted && LOGIN_STATS.map((s) => (
          <FloatingBadge key={s.label} icon={s.icon} label={s.label}
            value={<Counter to={s.to} suffix={s.suffix} />}
            color={s.color} delay={s.delay} x={s.x} y={s.y}
          />
        ))}
      </AnimatePresence>

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <motion.div
        className="hidden lg:flex flex-col justify-center flex-1 relative overflow-hidden px-12 xl:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <div className="relative z-10 max-w-xl">
          {/* Brand logo row */}
          <motion.div className="flex items-center gap-3 mb-10"
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              animate={{
                boxShadow: [
                  `0 0 18px ${theme.primary}70`,
                  `0 0 32px ${theme.secondary}90`,
                  `0 0 18px ${theme.primary}70`,
                ],
              }}
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
              ? <LoginLeftContent key="login" theme={THEMES.login} />
              : <RegisterLeftContent key="register" theme={THEMES.register} />
            }
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div className="flex-1 lg:max-w-[490px] flex items-center justify-center p-4 sm:p-6 md:p-10 relative min-h-screen lg:min-h-0">

        {/* Mode glow */}
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: `radial-gradient(ellipse at 50% 50%, ${theme.glow1} 0%, transparent 65%)` }}
          transition={{ duration: 0.9 }}
        />

        {/* Decorative vline */}
        <motion.div className="absolute left-0 top-[15%] bottom-[15%] w-px hidden lg:block"
          animate={{ background: `linear-gradient(to bottom, transparent, ${theme.primary}30, transparent)` }}
          transition={{ duration: 0.9 }}
        />

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full max-w-sm sm:max-w-md z-10"
        >
          {/* Card */}
          <motion.div
            animate={{ boxShadow: theme.cardShadow }}
            transition={{ duration: 0.9 }}
            className="relative rounded-[2rem] overflow-hidden"
            style={{ background: 'rgba(5,7,20,0.96)', backdropFilter: 'blur(32px)' }}
          >
            <BeamSweep color={theme.beamColor} />

            {/* Animated top border */}
            <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
              animate={{
                background: [
                  `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, transparent)`,
                  `linear-gradient(90deg, transparent, ${theme.secondary}, ${theme.primary}, transparent)`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Corner accent */}
            <motion.div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] pointer-events-none"
              animate={{ background: `${theme.primary}30` }} transition={{ duration: 0.8 }}
            />
            <div className="absolute -bottom-14 -left-14 w-32 h-32 rounded-full blur-[40px] pointer-events-none"
              style={{ background: 'rgba(6,182,212,0.08)' }} />

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
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
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
                    left: mode === 'login' ? 4 : '50%',
                    right: mode === 'login' ? '50%' : 4,
                    background: mode === 'login'
                      ? `linear-gradient(135deg, ${THEMES.login.primary}35, ${THEMES.login.primary}15)`
                      : `linear-gradient(135deg, ${THEMES.register.primary}35, ${THEMES.register.primary}15)`,
                    boxShadow: mode === 'login'
                      ? `0 0 20px ${THEMES.login.primary}25, inset 0 1px 0 rgba(255,255,255,0.08)`
                      : `0 0 20px ${THEMES.register.primary}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                {(['login', 'register'] as Mode[]).map((m) => (
                  <motion.button key={m} onClick={() => switchMode(m)} whileTap={{ scale: 0.96 }}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-[0.15em] relative z-10 rounded-xl transition-colors duration-300 ${
                      mode === m
                        ? m === 'login' ? 'text-indigo-400' : 'text-pink-400'
                        : 'text-slate-600 hover:text-slate-400'
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
                      initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-white mb-1">Welcome back 👋</h2>
                        <p className="text-slate-500 text-sm">Continue your learning journey</p>
                      </div>

                      <motion.form
                        animate={shake ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
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
                        <p className="mt-5 text-center text-xs text-slate-600">
                          No account?{' '}
                          <button onClick={() => switchMode('register')} className="text-pink-400 font-bold hover:underline underline-offset-2">
                            Create one free
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}

                  {mode === 'register' && (
                    <motion.div key="register-form"
                      initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-white mb-1">Join ATOMIC 🚀</h2>
                        <p className="text-slate-500 text-sm">Start your premium study experience</p>
                      </div>

                      <div className="space-y-2 mb-5">
                        {REGISTER_STEPS.map((s, i) => (
                          <motion.div key={s.text}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3 p-3 rounded-2xl"
                            style={{ background: `${s.color}08`, border: `1px solid ${s.color}18` }}
                          >
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: `${s.color}20` }}>
                              <s.icon size={14} style={{ color: s.color }} />
                            </div>
                            <span className="text-xs font-bold text-white flex-1">{i + 1}. {s.text}</span>
                            <motion.div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }}
                              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {hasStoredAccount && (
                        <p className="text-center text-xs text-slate-600">
                          Already registered?{' '}
                          <button onClick={() => switchMode('login')} className="text-indigo-400 font-bold hover:underline underline-offset-2">
                            Sign in
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={mode === 'login' ? handleLogin : () => setShowOnboarding(true)}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-5 w-full overflow-hidden rounded-2xl font-black text-white group"
                style={{ height: 54 }}
              >
                <motion.div className="absolute inset-0"
                  animate={{ background: theme.cta }}
                  transition={{ duration: 0.8 }}
                />
                {/* Shimmer */}
                <motion.div className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
                />
                {/* Hover glow */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `inset 0 0 30px ${theme.primary}40` }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-widest uppercase">
                  {isSubmitting
                    ? <Loader2 size={18} className="animate-spin" />
                    : mode === 'login'
                      ? <><Sparkles size={16} /> Sign In</>
                      : <><Rocket size={16} /> Get Started Free</>
                  }
                </span>
              </motion.button>

              {/* Bottom note */}
              <p className="mt-5 text-center text-[11px] text-slate-700 font-medium">
                By continuing you agree to our{' '}
                <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">Terms</span>
                {' '}&amp;{' '}
                <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">Privacy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
