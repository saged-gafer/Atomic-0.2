"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Loader2, ArrowRight, Shield, TrendingUp, Brain, Lock, Sparkles, Users, BookOpen, Zap } from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ══════════════════════════════════════════
   CONSTELLATION CANVAS
══════════════════════════════════════════ */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 80;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.5,
      color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)],
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.round(n.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ══════════════════════════════════════════
   AURORA BACKGROUND
══════════════════════════════════════════ */
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full blur-[160px]"
        style={{ width: '70vw', height: '70vw', top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px]"
        style={{ width: '60vw', height: '60vw', bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.06) 60%, transparent 70%)' }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: '40vw', height: '40vw', top: '40%', left: '30%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   GLITCH LOGO
══════════════════════════════════════════ */
function GlitchLogo() {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 400);
    };
    const id = setInterval(trigger, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative select-none">
      <motion.h1
        className="text-[clamp(5rem,12vw,10rem)] font-black tracking-tighter leading-none text-white"
        animate={glitch ? {
          x: [0, -4, 4, -2, 0],
          textShadow: [
            '0 0 0px transparent',
            '-4px 0 0 rgba(255,0,100,0.8), 4px 0 0 rgba(0,200,255,0.8)',
            '4px 0 0 rgba(255,0,100,0.8), -4px 0 0 rgba(0,200,255,0.8)',
            '0 0 0px transparent',
          ],
        } : {
          textShadow: '0 0 60px rgba(99,102,241,0.4)',
        }}
        transition={{ duration: 0.35 }}
      >
        ATOMIC
      </motion.h1>

      {/* Ghost layers for glitch */}
      <AnimatePresence>
        {glitch && (
          <>
            <motion.h1
              className="absolute inset-0 text-[clamp(5rem,12vw,10rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: 'rgba(255,0,100,0.5)', clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)' }}
              initial={{ x: 0 }} animate={{ x: [-6, 6, 0] }}
              transition={{ duration: 0.3 }}
            >
              ATOMIC
            </motion.h1>
            <motion.h1
              className="absolute inset-0 text-[clamp(5rem,12vw,10rem)] font-black tracking-tighter leading-none pointer-events-none"
              style={{ color: 'rgba(0,200,255,0.5)', clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' }}
              initial={{ x: 0 }} animate={{ x: [5, -5, 0] }}
              transition={{ duration: 0.3 }}
            >
              ATOMIC
            </motion.h1>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function Counter({ to, duration = 2.5, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = to / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [started, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ══════════════════════════════════════════
   HOLOGRAPHIC ORBIT RING
══════════════════════════════════════════ */
function OrbitRing({ size, dur, cw = true, color, dash = false }: {
  size: number; dur: number; cw?: boolean; color: string; dash?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        border: `1px ${dash ? 'dashed' : 'solid'} ${color}`,
        marginLeft: -size / 2, marginTop: -size / 2,
        boxShadow: `inset 0 0 ${size / 4}px ${color}10, 0 0 ${size / 6}px ${color}08`,
      }}
      animate={{ rotate: cw ? 360 : -360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 15px 4px ${color}, 0 0 30px 8px ${color}50` }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function useTypewriter(text: string, speed = 50, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const to = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(to);
  }, [text, speed, startDelay]);
  return displayed;
}

/* ══════════════════════════════════════════
   FLOATING BADGE
══════════════════════════════════════════ */
function FloatingBadge({ icon: Icon, label, value, color, delay, x, y }: {
  icon: React.ElementType; label: string; value: React.ReactNode;
  color: string; delay: number; x: string; y: string;
}) {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl backdrop-blur-xl border"
        style={{ background: 'rgba(10,12,30,0.85)', borderColor: `${color}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}15` }}
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

/* ══════════════════════════════════════════
   BEAM SWEEP
══════════════════════════════════════════ */
function BeamSweep({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] pointer-events-none z-30"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      animate={{ top: ['-2px', '102%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
    />
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const STATS = [
  { icon: Users, label: 'Students', to: 12400, suffix: '+', color: '#6366f1', x: '5%', y: '20%', delay: 1.2 },
  { icon: BookOpen, label: 'Sessions', to: 98000, suffix: '+', color: '#ec4899', x: '60%', y: '8%', delay: 1.5 },
  { icon: Zap, label: 'AI Insights', to: 340, suffix: 'k', color: '#06b6d4', x: '65%', y: '75%', delay: 1.8 },
];

const FEATURES = [
  { icon: Brain, label: 'AI-Powered Planning', sub: 'Smart study optimization', color: '#6366f1' },
  { icon: Shield, label: 'Secure & Private', sub: 'Your data stays yours', color: '#10b981' },
  { icon: TrendingUp, label: 'Deep Analytics', sub: 'Track every study session', color: '#f59e0b' },
];

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
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const sy = useSpring(mouseY, { stiffness: 80, damping: 22 });
  const rotateX = useTransform(sy, [-200, 200], [8, -8]);
  const rotateY = useTransform(sx, [-200, 200], [-8, 8]);
  const glowX = useTransform(sx, [-200, 200], [0, 100]);
  const glowY = useTransform(sy, [-200, 200], [0, 100]);
  const cardGlowBg = useTransform(
    [glowX, glowY] as const,
    ([x, y]: number[]) => `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.08) 0%, transparent 55%)`
  );

  const tagline = useTypewriter('Elevate your learning with AI.', 48, 1000);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem('study_planner_user_data');
      setHasStoredAccount(!!stored);
      setMode(stored ? 'login' : 'register');
    }, 0);
  }, []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleCardMouseLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 600); };

  const handleLogin = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); triggerShake(); return; }
    setIsSubmitting(true);
    const success = login(username.trim(), password.trim());
    if (!success) { setErrors({ credentials: 'Incorrect username or password.' }); setIsSubmitting(false); triggerShake(); }
  };

  const switchMode = (next: Mode) => { setErrors({}); setMode(next); };

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden" style={{ background: '#040610' }}>
      {/* ── Constellation background ── */}
      {mounted && <ConstellationCanvas />}

      {/* ── Aurora glow ── */}
      <Aurora />

      {/* ── Horizontal scanline ambient ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 4px)' }}
      />

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <motion.div
        className="hidden lg:flex flex-col justify-center flex-1 relative overflow-hidden px-16 xl:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Floating stat badges */}
        {mounted && STATS.map((s) => (
          <FloatingBadge
            key={s.label}
            icon={s.icon}
            label={s.label}
            value={<Counter to={s.to} suffix={s.suffix} />}
            color={s.color}
            delay={s.delay}
            x={s.x}
            y={s.y}
          />
        ))}

        <div className="relative z-10 max-w-xl">
          {/* Logo top */}
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)' }}
              animate={{ boxShadow: ['0 0 20px rgba(99,102,241,0.5)', '0 0 40px rgba(139,92,246,0.7)', '0 0 20px rgba(236,72,153,0.5)', '0 0 20px rgba(99,102,241,0.5)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={18} className="text-white" />
            </motion.div>
            <div>
              <p className="text-base font-black text-white tracking-widest">ATOMIC</p>
              <p className="text-[9px] font-bold text-primary/40 uppercase tracking-[0.25em]">Study Platform</p>
            </div>
          </motion.div>

          {/* Glitch headline */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlitchLogo />
          </motion.div>

          {/* Animated gradient tagline */}
          <motion.div
            className="mt-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xl font-bold text-slate-400 min-h-[1.5em]">
              {tagline}
              <motion.span
                className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* Orbiting display */}
          <motion.div
            className="relative w-72 h-72 flex items-center justify-center mb-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <OrbitRing size={288} dur={18} color="rgba(99,102,241,0.35)" />
            <OrbitRing size={220} dur={12} cw={false} color="rgba(236,72,153,0.3)" dash />
            <OrbitRing size={154} dur={7} color="rgba(6,182,212,0.35)" />
            <OrbitRing size={90} dur={4} cw={false} color="rgba(139,92,246,0.4)" dash />

            {/* Center orb */}
            <motion.div
              className="absolute z-10 w-28 h-28 rounded-[2rem] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #db2777)' }}
              animate={{
                boxShadow: [
                  '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2)',
                  '0 0 60px rgba(139,92,246,0.8), 0 0 120px rgba(139,92,246,0.3)',
                  '0 0 40px rgba(236,72,153,0.6), 0 0 80px rgba(236,72,153,0.2)',
                  '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2)',
                ],
                rotate: [0, 3, -3, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Holographic overlay */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)' }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <motion.span
                className="text-5xl font-black text-white relative z-10 select-none"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >A</motion.span>
            </motion.div>
          </motion.div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border cursor-default group relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.025)', borderColor: `${f.color}25`, backdropFilter: 'blur(10px)' }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 50%, ${f.color}12 0%, transparent 80%)` }}
                />
                <div className="w-7 h-7 rounded-lg flex items-center justify-center relative z-10" style={{ background: `${f.color}18` }}>
                  <f.icon size={13} style={{ color: f.color }} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-white">{f.label}</p>
                  <p className="text-[10px] text-slate-600">{f.sub}</p>
                </div>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full ml-1 relative z-10"
                  style={{ background: f.color }}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div className="flex-1 lg:max-w-[500px] flex items-center justify-center p-6 md:p-10 relative">

        {/* Radial glow behind card */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: mode === 'login'
              ? 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,0.1) 0%, transparent 65%)',
          }}
          transition={{ duration: 0.9 }}
        />

        <motion.div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative w-full max-w-md z-10"
        >
          {/* Card shell */}
          <motion.div
            animate={{
              boxShadow: mode === 'login'
                ? '0 0 0 1px rgba(99,102,241,0.18), 0 40px 100px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(99,102,241,0.2)'
                : '0 0 0 1px rgba(236,72,153,0.18), 0 40px 100px -20px rgba(0,0,0,0.9), 0 0 100px -20px rgba(236,72,153,0.18)',
            }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: 'rgba(6,8,22,0.92)', backdropFilter: 'blur(40px)' }}
          >
            {/* Beam sweep */}
            <BeamSweep color={mode === 'login' ? 'rgba(99,102,241,0.5)' : 'rgba(236,72,153,0.5)'} />

            {/* Animated holographic top border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] z-30"
              animate={{
                background: mode === 'login'
                  ? ['linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)', 'linear-gradient(90deg, transparent, #8b5cf6, #6366f1, transparent)']
                  : ['linear-gradient(90deg, transparent, #ec4899, #8b5cf6, transparent)', 'linear-gradient(90deg, transparent, #8b5cf6, #ec4899, transparent)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Mouse-tracked inner glow */}
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
              style={{ background: cardGlowBg }}
            />

            {/* Corner accent */}
            <motion.div
              className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[60px] pointer-events-none"
              animate={{ background: mode === 'login' ? 'rgba(99,102,241,0.28)' : 'rgba(236,72,153,0.25)' }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-[50px] pointer-events-none"
              style={{ background: 'rgba(6,182,212,0.12)' }} />

            {/* Inner card content */}
            <div className="relative z-10 p-8 md:p-10">

              {/* Brand row */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                  animate={{ boxShadow: ['0 0 12px rgba(99,102,241,0.5)', '0 0 20px rgba(236,72,153,0.6)', '0 0 12px rgba(99,102,241,0.5)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.12, rotate: 12 }}
                >
                  <span className="text-sm font-black text-white">A</span>
                </motion.div>
                <div>
                  <span className="text-base font-black text-white tracking-wider block leading-none">ATOMIC</span>
                  <span className="text-[9px] text-primary/40 font-bold uppercase tracking-[0.2em]">v2.0 — Premium</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                  style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.25)' }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-bold text-emerald-400">Live</span>
                </div>
              </motion.div>

              {/* Mode tabs */}
              <div className="relative flex rounded-2xl p-1 mb-8 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Animated tab indicator */}
                <motion.div
                  className="absolute top-1 bottom-1 rounded-xl z-0"
                  animate={{
                    left: mode === 'login' ? 4 : '50%',
                    right: mode === 'login' ? '50%' : 4,
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))'
                      : 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(236,72,153,0.1))',
                    boxShadow: mode === 'login'
                      ? '0 0 25px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
                      : '0 0 25px rgba(236,72,153,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                {(['login', 'register'] as Mode[]).map((m) => (
                  <motion.button
                    key={m}
                    onClick={() => switchMode(m)}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-[0.15em] relative z-10 rounded-xl transition-colors duration-300 ${
                      mode === m ? (m === 'login' ? 'text-primary' : 'text-secondary') : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    {m === 'login' ? 'Sign In' : 'Register'}
                  </motion.button>
                ))}
              </div>

              {/* Form area */}
              <div className="relative" style={{ minHeight: 310 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {/* ── LOGIN ── */}
                  {mode === 'login' && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -25, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-7">
                        <motion.h2
                          className="text-2xl font-black text-white mb-1"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          Welcome back 👋
                        </motion.h2>
                        <motion.p
                          className="text-slate-500 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Continue your learning journey
                        </motion.p>
                      </div>

                      <motion.form
                        animate={shake ? { x: [-10, 10, -7, 7, -3, 3, 0] } : { x: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                        className="space-y-5"
                      >
                        <FloatingInput
                          label="Username"
                          value={username}
                          onChange={(e) => { setUsername(e.target.value); setErrors({}); }}
                          error={errors.username}
                          autoComplete="username"
                        />
                        <FloatingInput
                          label="Password"
                          type="password"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                          error={errors.password}
                          autoComplete="current-password"
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
                        <p className="mt-6 text-center text-xs text-slate-600">
                          No account?{' '}
                          <button onClick={() => switchMode('register')} className="text-secondary font-bold hover:underline underline-offset-2">
                            Create one free
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* ── REGISTER ── */}
                  {mode === 'register' && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -25, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-7">
                        <motion.h2
                          className="text-2xl font-black text-white mb-1"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          Join ATOMIC 🚀
                        </motion.h2>
                        <motion.p
                          className="text-slate-500 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Start your premium study experience
                        </motion.p>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        {FEATURES.map((f, i) => (
                          <motion.div
                            key={f.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3 p-3.5 rounded-2xl group relative overflow-hidden cursor-default"
                            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.color}18` }}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ background: `linear-gradient(90deg, ${f.color}08 0%, transparent 60%)` }}
                            />
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                              style={{ background: `${f.color}18` }}>
                              <f.icon size={15} style={{ color: f.color }} />
                            </div>
                            <div className="relative z-10 flex-1">
                              <p className="text-xs font-bold text-white">{f.label}</p>
                              <p className="text-[10px] text-slate-600">{f.sub}</p>
                            </div>
                            <motion.div
                              className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 relative z-10"
                              style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}
                            >
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: f.color }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                              />
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      {hasStoredAccount && (
                        <p className="text-center text-xs text-slate-600">
                          Already registered?{' '}
                          <button onClick={() => switchMode('login')} className="text-primary font-bold hover:underline underline-offset-2">
                            Sign in
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── CTA Button ── */}
              <motion.button
                onClick={mode === 'login' ? handleLogin : () => setShowOnboarding(true)}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-6 w-full overflow-hidden rounded-2xl font-black text-white group"
                style={{ height: 56 }}
              >
                {/* Gradient fill */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #be185d 100%)'
                      : 'linear-gradient(135deg, #be185d 0%, #7c3aed 50%, #4338ca 100%)',
                  }}
                  transition={{ duration: 0.7 }}
                />

                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                />

                {/* Top highlight */}
                <div className="absolute top-0 left-8 right-8 h-px bg-white/30" />

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 30px rgba(99,102,241,0.5), inset 0 0 30px rgba(99,102,241,0.1)' }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2.5 text-sm">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : mode === 'login' ? (
                    <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  ) : (
                    <>Get Started Free <Sparkles size={16} /></>
                  )}
                </span>
              </motion.button>

              {/* Footer */}
              <motion.p
                className="mt-5 text-center text-[10px] text-slate-700"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              >
                By continuing you agree to our{' '}
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
                {' '}&amp;{' '}
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
              </motion.p>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="h-px"
              animate={{
                background: mode === 'login'
                  ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.3), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), rgba(139,92,246,0.3), transparent)',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>

          {/* 3D depth layer shadow */}
          <div
            className="absolute -inset-4 -z-10 rounded-[3rem] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.15) 0%, transparent 70%)',
              transform: 'translateY(20px) scale(0.9)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
