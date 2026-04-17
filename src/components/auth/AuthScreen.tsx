"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Loader2, Zap, Shield, TrendingUp, Sparkles, Brain, Lock } from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ─── Typewriter Hook ─── */
function useTypewriter(text: string, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const to = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(to);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ─── Grid of dots background ─── */
function GridBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/* ─── Ambient orb ─── */
function Orb({ className, delay = 0, color }: { className: string; delay?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      style={color ? { background: color } : undefined}
      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─── Floating sparkle particle ─── */
function Sparkle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  const colors = ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6', '#10b981'];
  const color = colors[Math.floor((x + y) % colors.length)];
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{
        y: [0, -40, 0],
        x: [0, (x % 2 === 0 ? 10 : -10), 0],
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Orbiting ring ─── */
function Ring({ size, duration, clockwise = true, color, opacity = 0.4 }: {
  size: number; duration: number; clockwise?: boolean; color: string; opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        border: `1px solid ${color}`,
        borderTopColor: 'transparent',
        marginLeft: -size / 2, marginTop: -size / 2,
        opacity,
      }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full -top-[5px] left-1/2 -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 12px 3px ${color}` }}
      />
    </motion.div>
  );
}

/* ─── Scan line effect ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none z-50"
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
  );
}

const SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37.3) % 100,
  y: (i * 53.7) % 100,
  delay: (i * 0.31) % 4,
  size: 1 + (i % 3),
}));

const FEATURES = [
  { icon: Brain,      label: 'AI-Powered Planning',  sub: 'Smart study optimization',    color: '#6366f1' },
  { icon: Shield,     label: 'Secure & Private',      sub: 'Your data, your control',     color: '#10b981' },
  { icon: TrendingUp, label: 'Track Progress',        sub: 'Deep analytics insights',     color: '#f59e0b' },
];

const HEADLINE_WORDS = ['The Global', 'Standard', 'in Learning.'];

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
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const { displayed: taglineText } = useTypewriter('Your AI-powered study companion.', 45, 800);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem('study_planner_user_data');
      setHasStoredAccount(!!stored);
      setMode(stored ? 'login' : 'register');
    }, 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen w-full flex items-stretch relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(99,102,241,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(236,72,153,0.05) 0%, transparent 55%), #030712' }}
    >
      <GridBackground />
      {mounted && SPARKLES.map((p, i) => <Sparkle key={i} {...p} />)}

      {/* ── Left branding panel ── */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col justify-between flex-1 p-16 relative overflow-hidden"
      >
        <Orb className="w-[600px] h-[600px] -top-48 -left-48" color="rgba(99,102,241,0.15)" delay={0} />
        <Orb className="w-[400px] h-[400px] bottom-0 right-10" color="rgba(236,72,153,0.1)" delay={3} />
        <Orb className="w-[300px] h-[300px] top-1/2 left-1/3" color="rgba(6,182,212,0.08)" delay={6} />

        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-4 relative z-10"
        >
          <motion.div
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)' }}
            animate={{ boxShadow: ['0 0 20px rgba(99,102,241,0.4)', '0 0 40px rgba(99,102,241,0.7)', '0 0 20px rgba(99,102,241,0.4)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={22} className="text-white relative z-10" />
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <motion.span
              className="text-2xl font-black tracking-tighter text-white block"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              ATOMIC
            </motion.span>
            <motion.span
              className="text-[9px] text-primary/50 font-black uppercase tracking-[0.2em] block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Study Platform
            </motion.span>
          </div>
        </motion.div>

        {/* Center hero */}
        <div className="relative z-10 space-y-10">
          {/* Orbiting rings */}
          <div className="relative w-52 h-52 flex items-center justify-center">
            <Ring size={208} duration={14} color="rgba(99,102,241,0.5)" opacity={0.5} />
            <Ring size={154} duration={9} clockwise={false} color="rgba(236,72,153,0.45)" opacity={0.45} />
            <Ring size={100} duration={5.5} color="rgba(6,182,212,0.5)" opacity={0.5} />
            <Ring size={60} duration={3} clockwise={false} color="rgba(139,92,246,0.4)" opacity={0.4} />

            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                boxShadow: '0 0 60px rgba(99,102,241,0.6), 0 0 120px rgba(99,102,241,0.2)',
              }}
            >
              <motion.span
                className="text-4xl font-black text-white"
                animate={{ textShadow: ['0 0 0px #fff', '0 0 20px #fff', '0 0 0px #fff'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >A</motion.span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <motion.div
                key={word}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className={`font-black leading-[1.02] tracking-tight ${
                  i === 1
                    ? 'text-5xl xl:text-6xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
                    : 'text-5xl xl:text-6xl text-white'
                }`}>
                  {word}
                </h1>
              </motion.div>
            ))}

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-slate-400 text-base leading-relaxed max-w-sm font-medium mt-2 min-h-[1.5em]"
            >
              {taglineText}
              <motion.span
                className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Feature cards */}
          <div className="space-y-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.025] backdrop-blur-sm group cursor-default relative overflow-hidden"
              >
                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 50%, ${f.color}10 0%, transparent 60%)` }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-bold text-white">{f.label}</p>
                  <p className="text-xs text-slate-500">{f.sub}</p>
                </div>
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: f.color }}
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 text-xs text-slate-700 font-medium italic"
        >
          &quot;Knowledge is the most precious thing — invest in it wisely.&quot;
        </motion.p>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 lg:max-w-[480px] flex items-center justify-center p-8 relative">
        {/* Glow behind card */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
          animate={{
            background: mode === 'login'
              ? 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
          }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ y: 70, opacity: 0, scale: 0.93 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-sm z-10"
        >
          {/* Card */}
          <motion.div
            animate={{
              boxShadow: mode === 'login'
                ? '0 0 0 1px rgba(99,102,241,0.2), 0 32px 90px -20px rgba(0,0,0,0.8), 0 0 80px -15px rgba(99,102,241,0.18)'
                : '0 0 0 1px rgba(236,72,153,0.2), 0 32px 90px -20px rgba(0,0,0,0.8), 0 0 80px -15px rgba(236,72,153,0.15)',
            }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: 'rgba(8,10,28,0.9)', backdropFilter: 'blur(30px)' }}
          >
            <ScanLine />

            {/* Top gradient beam */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] z-20"
              animate={{
                background: mode === 'login'
                  ? 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.9) 35%, rgba(139,92,246,0.7) 65%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.9) 35%, rgba(99,102,241,0.7) 65%, transparent 100%)',
              }}
              transition={{ duration: 0.7 }}
            />

            {/* Corner glow */}
            <motion.div
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
              animate={{ background: mode === 'login' ? 'rgba(99,102,241,0.25)' : 'rgba(236,72,153,0.25)' }}
              transition={{ duration: 0.7 }}
            />

            <div className="relative z-10 p-9">
              {/* Brand mark */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-xs font-black text-white">A</span>
                </motion.div>
                <span className="text-sm font-black text-white tracking-wider">ATOMIC</span>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/20">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-bold text-emerald-400">Online</span>
                </div>
              </motion.div>

              {/* Mode toggle */}
              <div
                className="relative flex rounded-2xl p-1 mb-8"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="absolute top-1 bottom-1 rounded-xl z-0"
                  animate={{
                    left: mode === 'login' ? '4px' : '50%',
                    right: mode === 'login' ? '50%' : '4px',
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.08))'
                      : 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.08))',
                    boxShadow: mode === 'login' ? '0 0 20px rgba(99,102,241,0.15)' : '0 0 20px rgba(236,72,153,0.15)',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {(['login', 'register'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-2.5 text-xs font-black uppercase tracking-[0.12em] relative z-10 rounded-xl transition-colors duration-300 ${
                      mode === m ? (m === 'login' ? 'text-primary' : 'text-secondary') : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {m === 'login' ? 'Sign In' : 'Register'}
                  </button>
                ))}
              </div>

              {/* Form panels */}
              <div className="relative overflow-hidden" style={{ minHeight: 290 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {mode === 'login' && (
                    <motion.div
                      key="login"
                      initial={{ x: -30, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ x: -30, opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-white">Welcome back</h2>
                        <p className="text-slate-500 text-sm mt-1">Continue your learning journey</p>
                      </div>

                      <motion.form
                        animate={shake ? { x: [-10, 10, -7, 7, -4, 4, 0] } : { x: 0 }}
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
                            initial={{ opacity: 0, y: -10, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-red-500/8 border border-red-500/20"
                          >
                            <Lock size={13} className="text-red-400 shrink-0" />
                            <p className="text-xs font-bold text-red-400">{errors.credentials}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!hasStoredAccount && (
                        <p className="mt-5 text-center text-xs text-slate-600">
                          No account yet?{' '}
                          <button onClick={() => switchMode('register')} className="text-secondary font-bold hover:text-secondary/80 transition-colors underline-offset-2 hover:underline">
                            Create one
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}

                  {mode === 'register' && (
                    <motion.div
                      key="register"
                      initial={{ x: 30, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ x: 30, opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-white">Create Account</h2>
                        <p className="text-slate-500 text-sm mt-1">Join thousands of students worldwide</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {FEATURES.map((f, i) => (
                          <motion.div
                            key={f.label}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3 p-3 rounded-xl relative overflow-hidden group cursor-default"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                              style={{ background: `radial-gradient(circle at 0% 50%, ${f.color}12 0%, transparent 70%)` }}
                            />
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10"
                              style={{ background: `${f.color}18` }}
                            >
                              <f.icon size={15} style={{ color: f.color }} />
                            </div>
                            <div className="relative z-10">
                              <p className="text-xs font-bold text-white">{f.label}</p>
                              <p className="text-[10px] text-slate-500">{f.sub}</p>
                            </div>
                            <motion.div
                              className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: f.color }}
                              animate={{ opacity: [1, 0.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {hasStoredAccount && (
                        <p className="text-center text-xs text-slate-600">
                          Already have an account?{' '}
                          <button onClick={() => switchMode('login')} className="text-primary font-bold hover:text-primary/80 transition-colors underline-offset-2 hover:underline">
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
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-6 w-full rounded-2xl font-black text-sm text-white overflow-hidden group"
                style={{ height: 52 }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, #4f52e8 0%, #7c3aed 50%, #c026d3 100%)'
                      : 'linear-gradient(135deg, #c026d3 0%, #7c3aed 50%, #4f52e8 100%)',
                  }}
                  transition={{ duration: 0.6 }}
                />
                {/* Animated shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)',
                    backgroundSize: '250% 100%',
                  }}
                  animate={{ backgroundPosition: ['250% 0', '-250% 0'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                {/* Top reflection */}
                <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting
                    ? <Loader2 className="animate-spin" size={18} />
                    : mode === 'login'
                      ? <><Zap size={15} fill="currentColor" /> Sign In</>
                      : <><Sparkles size={15} /> Get Started →</>
                  }
                </span>
              </motion.button>

              {/* Footer */}
              <p className="mt-5 text-center text-[10px] text-slate-700">
                By continuing you agree to our{' '}
                <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">Terms</span>
                {' '}&amp;{' '}
                <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">Privacy Policy</span>
              </p>
            </div>

            {/* Bottom gradient */}
            <motion.div
              className="h-[1px]"
              animate={{
                background: mode === 'login'
                  ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
