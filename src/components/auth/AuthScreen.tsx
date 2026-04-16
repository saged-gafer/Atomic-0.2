"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Loader2, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ─── Floating Orb ─── */
function Orb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─── Animated particle ─── */
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/60"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -30, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Rotating ring ─── */
function Ring({ size, duration, clockwise = true, color }: { size: number; duration: number; clockwise?: boolean; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{ width: size, height: size, borderColor: color, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
    </motion.div>
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: (i * 0.37) % 4,
}));

const FEATURES = [
  { icon: Zap, label: 'AI-Powered Planning', sub: 'Smart study optimization' },
  { icon: Shield, label: 'Secure & Private', sub: 'Your data, your control' },
  { icon: TrendingUp, label: 'Track Progress', sub: 'Deep analytics insights' },
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('study_planner_user_data');
    if (stored) { setHasStoredAccount(true); setMode('login'); }
    else { setHasStoredAccount(false); setMode('register'); }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleLogin = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); triggerShake(); return; }
    setIsSubmitting(true);
    const success = login(username.trim(), password.trim());
    if (!success) { setErrors({ credentials: 'Incorrect username or password.' }); setIsSubmitting(false); triggerShake(); }
  };

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 600); };
  const switchMode = (next: Mode) => { setErrors({}); setMode(next); };

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen w-full flex items-stretch relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.06) 0%, transparent 60%), #030712' }}
    >
      {/* ── Background particles ── */}
      {mounted && PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Left branding panel ── */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col justify-between flex-1 p-16 relative overflow-hidden"
      >
        {/* Background orbs */}
        <Orb className="w-[500px] h-[500px] bg-primary/20 -top-40 -left-40" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-secondary/15 bottom-0 right-0" delay={2} />
        <Orb className="w-[300px] h-[300px] bg-accent/10 top-1/2 left-1/3" delay={4} />

        {/* Top: logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 relative z-10"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <Star size={22} className="text-white" fill="white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-30 blur-xl"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">ATOMIC</span>
        </motion.div>

        {/* Center: hero */}
        <div className="relative z-10 space-y-8">
          {/* Orbiting rings around center orb */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <Ring size={192} duration={12} color="rgba(99,102,241,0.4)" />
            <Ring size={140} duration={8} clockwise={false} color="rgba(236,72,153,0.35)" />
            <Ring size={90} duration={5} color="rgba(6,182,212,0.4)" />

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.6)]"
            >
              <span className="text-4xl font-black text-white">A</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
              The Global<br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Standard
              </span><br />
              in Learning
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              AI-driven study planning with deep analytics and premium productivity tools built for serious students.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="space-y-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{f.label}</p>
                  <p className="text-xs text-slate-500">{f.sub}</p>
                </div>
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 text-xs text-slate-600 font-medium"
        >
          "Knowledge is the most precious thing — invest in it wisely."
        </motion.p>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 lg:max-w-[480px] flex items-center justify-center p-8 relative">
        {/* Subtle right-side glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
            animate={{
              background: mode === 'login'
                ? 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)',
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-sm z-10"
        >
          {/* Card */}
          <motion.div
            animate={{
              boxShadow: mode === 'login'
                ? '0 0 0 1px rgba(99,102,241,0.25), 0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(99,102,241,0.2)'
                : '0 0 0 1px rgba(236,72,153,0.25), 0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(236,72,153,0.2)',
            }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: 'rgba(10,12,30,0.85)', backdropFilter: 'blur(24px)' }}
          >
            {/* Animated top gradient beam */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] z-20"
              animate={{
                background: mode === 'login'
                  ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8) 30%, rgba(236,72,153,0.6) 70%, transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.8) 30%, rgba(99,102,241,0.6) 70%, transparent)',
              }}
              transition={{ duration: 0.7 }}
            />

            {/* Corner glow */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              animate={{
                background: mode === 'login' ? 'rgba(99,102,241,0.3)' : 'rgba(236,72,153,0.3)',
              }}
              transition={{ duration: 0.7 }}
            />

            <div className="relative z-10 p-9">
              {/* Brand mark */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                  <span className="text-xs font-black text-white">A</span>
                </div>
                <span className="text-sm font-black text-white tracking-wider">ATOMIC</span>
                <div className="ml-auto px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-400">Online</span>
                </div>
              </motion.div>

              {/* Mode pill toggle */}
              <motion.div
                className="relative flex rounded-2xl p-1 mb-8"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="absolute top-1 bottom-1 rounded-xl z-0"
                  animate={{
                    left: mode === 'login' ? '4px' : '50%',
                    right: mode === 'login' ? '50%' : '4px',
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))'
                      : 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(236,72,153,0.1))',
                    boxShadow: mode === 'login'
                      ? '0 0 20px rgba(99,102,241,0.2)'
                      : '0 0 20px rgba(236,72,153,0.2)',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {(['login', 'register'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-2.5 text-xs font-black uppercase tracking-[0.12em] relative z-10 rounded-xl transition-colors duration-300 ${
                      mode === m
                        ? m === 'login' ? 'text-primary' : 'text-secondary'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {m === 'login' ? 'Sign In' : 'Register'}
                  </button>
                ))}
              </motion.div>

              {/* Form panels */}
              <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
                {/* ── LOGIN PANEL ── */}
                <AnimatePresence mode="wait" initial={false}>
                  {mode === 'login' && (
                    <motion.div
                      key="login"
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-white">Welcome back</h2>
                        <p className="text-slate-500 text-sm mt-1">Sign in to continue your journey</p>
                      </div>

                      <motion.form
                        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
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
                            className="mt-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                            <p className="text-xs font-bold text-red-400">{errors.credentials}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!hasStoredAccount && (
                        <p className="mt-5 text-center text-xs text-slate-600">
                          No account yet?{' '}
                          <button onClick={() => switchMode('register')} className="text-secondary font-bold hover:text-secondary/80 transition-colors">
                            Create one
                          </button>
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* ── REGISTER PANEL ── */}
                  {mode === 'register' && (
                    <motion.div
                      key="register"
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
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
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                              <f.icon size={15} className="text-secondary" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{f.label}</p>
                              <p className="text-[10px] text-slate-500">{f.sub}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {hasStoredAccount && (
                        <p className="text-center text-xs text-slate-600">
                          Already have an account?{' '}
                          <button onClick={() => switchMode('login')} className="text-primary font-bold hover:text-primary/80 transition-colors">
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-6 w-full h-13 rounded-2xl font-black text-sm text-white overflow-hidden group"
                style={{ height: 52 }}
              >
                {/* Button gradient bg */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: mode === 'login'
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'
                      : 'linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1)',
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting
                    ? <Loader2 className="animate-spin" size={18} />
                    : mode === 'login' ? 'Sign In' : 'Get Started →'}
                </span>
              </motion.button>

              {/* Footer */}
              <p className="mt-5 text-center text-[10px] text-slate-700">
                By continuing you agree to our{' '}
                <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">Terms</span> &amp;{' '}
                <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">Privacy Policy</span>
              </p>
            </div>

            {/* Bottom gradient line */}
            <motion.div
              className="h-[1px]"
              animate={{
                background: mode === 'login'
                  ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
