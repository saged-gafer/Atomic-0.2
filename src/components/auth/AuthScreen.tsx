"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { FloatingInput } from '@/components/ui/FloatingInput';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { Loader2, UserPlus, LogIn, ArrowRight, Atom } from 'lucide-react';

type AuthMode = 'login' | 'register';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  x: `${(i * 47 + 11) % 96}%`,
  y: `${(i * 61 + 7) % 92}%`,
  size: 0.8 + (i % 4) * 0.7,
  dur: 3.5 + (i % 5),
  delay: (i * 0.35) % 4.5,
  color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][i % 4],
}));

export default function AuthScreen() {
  const { login } = useAppContext();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [powerUp, setPowerUp] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = useCallback(async () => {
    if (!username.trim()) { toast('error', 'Please enter a username!'); return; }
    if (password.length < 4) { toast('error', 'Password must be at least 4 characters.'); return; }
    if (!isLogin && password !== confirmPw) { toast('error', "Passwords don't match!"); return; }

    setSubmitting(true);

    if (isLogin) {
      await new Promise(r => setTimeout(r, 600));
      const ok = login(username.trim(), password.trim());
      if (!ok) {
        toast('error', 'Wrong username or password! Try again.');
        setSubmitting(false);
      } else {
        toast('success', 'Welcome back! ⚡');
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
      toast('success', 'Account ready! Setting up your profile 🚀');
      setTimeout(() => setShowOnboarding(true), 900);
    }
  }, [username, password, confirmPw, isLogin, login, toast]);

  if (showOnboarding) return <OnboardingFlow />;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 45%, #0d0b30 0%, #060410 100%)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(99,102,241,0.065) 1px,transparent 1px)', backgroundSize: '30px 30px' }}
      />

      {/* Animated particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.85, 0], scale: [0.4, 1.6, 0.4] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity }}
        />
      ))}

      {/* Orbiting rings */}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        {[220, 340, 460].map((size, i) => (
          <motion.div key={i} className="absolute rounded-full border"
            style={{ width: size, height: size, left: -size / 2, top: -size / 2, borderColor: ['rgba(99,102,241,0.15)', 'rgba(139,92,246,0.08)', 'rgba(236,72,153,0.05)'][i] }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 24 + i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Glow blobs */}
      <motion.div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div className="absolute bottom-[-15%] right-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Power-up overlay */}
      <AnimatePresence>
        {powerUp && (
          <motion.div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 50%,rgba(99,102,241,0.5) 0%,transparent 68%)' }}
              animate={{ scale: [0.4, 3.2], opacity: [0.9, 0] }} transition={{ duration: 0.85 }}
            />
            <motion.div className="text-7xl z-10"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }} transition={{ duration: 1 }}
            >⚡</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-[28px] overflow-hidden"
          style={{
            background: 'rgba(8,6,32,0.88)',
            border: '1.5px solid rgba(99,102,241,0.28)',
            backdropFilter: 'blur(32px)',
            boxShadow: '0 4px 0 rgba(99,102,241,0.25), 0 32px 90px rgba(0,0,0,0.85), 0 0 80px rgba(99,102,241,0.08)',
          }}
        >
          {/* Animated top bar */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
            animate={{ background: [
              'linear-gradient(90deg,transparent,#6366f1,#8b5cf6,transparent)',
              'linear-gradient(90deg,transparent,#8b5cf6,#ec4899,transparent)',
              'linear-gradient(90deg,transparent,#6366f1,#8b5cf6,transparent)',
            ]}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="p-7 sm:p-9">
            {/* Branding */}
            <motion.div className="flex flex-col items-center mb-7"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.25)' }}
                animate={{ boxShadow: [
                  '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.25)',
                  '0 0 55px rgba(139,92,246,0.8), 0 0 110px rgba(139,92,246,0.35)',
                  '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.25)',
                ]}}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <Atom size={28} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-black tracking-tighter text-white">ATOMIC</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-1" style={{ color: 'rgba(99,102,241,0.6)' }}>
                The Global Standard in Learning
              </p>
            </motion.div>

            {/* Mode tabs */}
            <motion.div
              className="flex rounded-2xl p-1 mb-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
            >
              {(['login', 'register'] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setUsername(''); setPassword(''); setConfirmPw(''); }}
                  className="flex-1 relative py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-colors duration-200"
                  style={{ color: mode === m ? 'white' : 'rgba(255,255,255,0.3)' }}
                >
                  {mode === m && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.45),rgba(139,92,246,0.45))', border: '1px solid rgba(99,102,241,0.4)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    {m === 'login' ? <LogIn size={12} /> : <UserPlus size={12} />}
                    {m === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Fields */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              >
                <FloatingInput label="Username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
                <FloatingInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={isLogin ? 'current-password' : 'new-password'} />
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      key="confirm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <FloatingInput label="Confirm Password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} autoComplete="new-password" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={submitting}
              whileHover={submitting ? {} : { scale: 1.02, y: -2 }}
              whileTap={submitting ? {} : { scale: 0.98 }}
              className="w-full h-13 rounded-2xl font-black text-white text-sm uppercase tracking-widest relative overflow-hidden mt-6"
              style={{
                height: 52,
                background: submitting ? 'rgba(99,102,241,0.38)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                border: '2px solid rgba(99,102,241,0.55)',
                boxShadow: '0 4px 0 rgba(99,102,241,0.35), 0 0 30px rgba(99,102,241,0.2)',
              }}
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
                  : <>
                      {isLogin ? <LogIn size={15} /> : <UserPlus size={15} />}
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                        <ArrowRight size={14} />
                      </motion.div>
                    </>
                }
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
