"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowRight, ArrowLeft, UserPlus, LogIn, Sparkles,
  User, Lock, Eye, EyeOff, Check, AlertCircle, ShieldCheck,
  Mail, KeyRound, UserCircle2,
} from 'lucide-react';

type Mode = 'signup' | 'login';

interface AuthCardProps {
  onContinue: () => void;
}

export default function AuthCard({ onContinue }: AuthCardProps) {
  const { userData } = useAppContext();
  const lang = userData?.language || 'en';
  const isAr = lang === 'ar';
  const [mode, setMode] = useState<Mode>('signup');

  /* ── Signup state ──────────────────────────────────── */
  const [suName, setSuName] = useState('');
  const [suPass, setSuPass] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [suShowPass, setSuShowPass] = useState(false);
  const [suError, setSuError] = useState('');

  /* ── Login state ───────────────────────────────────── */
  const [loginStep, setLoginStep] = useState(0);          // 0 = identify, 1 = password
  const [liName, setLiName] = useState('');
  const [liPass, setLiPass] = useState('');
  const [liShowPass, setLiShowPass] = useState(false);
  const [liError, setLiError] = useState('');

  const isSignup = mode === 'signup';

  /* ── Signup submit ─────────────────────────────────── */
  const handleSignup = () => {
    setSuError('');
    if (!suName.trim()) {
      setSuError(isAr ? 'الاسم مطلوب' : 'Name is required');
      return;
    }
    if (suPass.length < 4) {
      setSuError(isAr ? 'كلمة المرور 4 أحرف على الأقل' : 'Password must be at least 4 characters');
      return;
    }
    if (suPass !== suConfirm) {
      setSuError(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    onContinue();
  };

  /* ── Login submit ──────────────────────────────────── */
  const handleLoginNext = () => {
    setLiError('');
    if (!liName.trim()) {
      setLiError(isAr ? 'الاسم مطلوب' : 'Name is required');
      return;
    }
    setLoginStep(1);
  };

  const handleLoginSubmit = () => {
    setLiError('');
    if (liPass.length < 4) {
      setLiError(isAr ? 'كلمة المرور 4 أحرف على الأقل' : 'Password must be at least 4 characters');
      return;
    }
    onContinue();
  };

  /* ── Password strength (signup) ────────────────────── */
  const passStrength = (() => {
    let s = 0;
    if (suPass.length >= 4) s++;
    if (suPass.length >= 8) s++;
    if (/[A-Z]/.test(suPass) && /[a-z]/.test(suPass)) s++;
    if (/\d/.test(suPass) || /[^A-Za-z0-9]/.test(suPass)) s++;
    return s; // 0..4
  })();
  const strengthColor = ['#475569','#ef4444','#f59e0b','#22d3ee','#10b981'][passStrength];
  const strengthLabel = isAr
    ? ['—','ضعيفة','متوسطة','جيدة','قوية'][passStrength]
    : ['—','Weak','Fair','Good','Strong'][passStrength];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-8"
      style={{
        background: isSignup
          ? 'radial-gradient(ellipse at top, rgba(139,92,246,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0420 0%, #14082e 50%, #0a0420 100%)'
          : 'radial-gradient(ellipse at top, rgba(34,211,238,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom right, rgba(16,185,129,0.15) 0%, transparent 55%), linear-gradient(180deg, #02141a 0%, #062028 50%, #02141a 100%)',
        transition: 'background 0.7s ease',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Animated blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        animate={{
          background: isSignup
            ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
          scale: [1, 1.15, 1],
        }}
        transition={{
          background: { duration: 0.7 },
          scale: { duration: 8, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
        animate={{
          background: isSignup
            ? 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)',
          scale: [1, 1.2, 1],
        }}
        transition={{
          background: { duration: 0.7 },
          scale: { duration: 10, repeat: Infinity },
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${(i * 41) % 100}%`,
            left: `${(i * 61) % 100}%`,
            background: isSignup
              ? (i % 2 === 0 ? 'rgba(139,92,246,0.5)' : 'rgba(99,102,241,0.5)')
              : (i % 2 === 0 ? 'rgba(34,211,238,0.5)' : 'rgba(16,185,129,0.5)'),
            transition: 'background 0.7s ease',
          }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md">
        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div
            className="relative flex p-1.5 rounded-2xl border border-white/10"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-xl"
              animate={{
                left: isSignup ? '6px' : '50%',
                right: isSignup ? '50%' : '6px',
                background: isSignup
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : 'linear-gradient(135deg, #22d3ee, #10b981)',
                boxShadow: isSignup
                  ? '0 6px 20px rgba(139,92,246,0.5)'
                  : '0 6px 20px rgba(34,211,238,0.5)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            />
            <button
              onClick={() => { setMode('signup'); }}
              className="relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: isSignup ? '#fff' : 'rgba(148,163,184,0.7)' }}
            >
              <UserPlus size={14} />
              <span>{isAr ? 'إنشاء حساب' : 'Sign Up'}</span>
            </button>
            <button
              onClick={() => { setMode('login'); setLoginStep(0); }}
              className="relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: !isSignup ? '#fff' : 'rgba(148,163,184,0.7)' }}
            >
              <LogIn size={14} />
              <span>{isAr ? 'تسجيل الدخول' : 'Log In'}</span>
            </button>
          </div>
        </motion.div>

        {/* 3D Flip Card */}
        <div className="relative w-full" style={{ perspective: '2000px' }}>
          <motion.div
            className="relative w-full"
            animate={{ rotateY: isSignup ? 0 : 180 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', minHeight: 560 }}
          >
            {/* ── FRONT: SIGN UP ──────────────────────── */}
            <FaceShell
              side="front"
              accent={{ from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.5)' }}
              bgFrom="rgba(139,92,246,0.06)"
              bgTo="rgba(15,8,30,0.92)"
              borderColor="rgba(139,92,246,0.25)"
            >
              <FaceHeader
                icon={UserPlus}
                accent={{ from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.5)' }}
                badge={isAr ? 'حساب جديد' : 'New Account'}
                title={isAr ? 'ابدأ رحلتك' : 'Start Your Journey'}
                subtitle={isAr
                  ? 'أنشئ حسابك في خطوة واحدة و انطلق نحو التفوق'
                  : 'Create your account and unlock smarter studying'}
              />

              <div className="space-y-3 mt-5">
                <Field
                  icon={UserCircle2}
                  label={isAr ? 'الاسم الكامل' : 'Full Name'}
                  value={suName}
                  onChange={(v) => { setSuName(v); setSuError(''); }}
                  accent="#8b5cf6"
                  placeholder={isAr ? 'اكتب اسمك' : 'Your name'}
                  isAr={isAr}
                />
                <Field
                  icon={KeyRound}
                  label={isAr ? 'كلمة المرور' : 'Password'}
                  value={suPass}
                  onChange={(v) => { setSuPass(v); setSuError(''); }}
                  accent="#8b5cf6"
                  type={suShowPass ? 'text' : 'password'}
                  placeholder={isAr ? '4 أحرف على الأقل' : 'At least 4 characters'}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setSuShowPass(s => !s)}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                    >
                      {suShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                  isAr={isAr}
                />
                {/* Strength meter */}
                {suPass.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-1"
                  >
                    <div className="flex-1 flex gap-1">
                      {[1,2,3,4].map(i => (
                        <motion.div
                          key={i}
                          className="h-1 flex-1 rounded-full"
                          animate={{
                            background: i <= passStrength ? strengthColor : 'rgba(255,255,255,0.08)',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </motion.div>
                )}
                <Field
                  icon={ShieldCheck}
                  label={isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  value={suConfirm}
                  onChange={(v) => { setSuConfirm(v); setSuError(''); }}
                  accent="#8b5cf6"
                  type={suShowPass ? 'text' : 'password'}
                  placeholder={isAr ? 'أعد كتابتها' : 'Re-enter password'}
                  trailing={
                    suConfirm.length > 0 && suConfirm === suPass ? (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#10b981' }}
                      >
                        <Check size={12} className="text-white" strokeWidth={3.5}/>
                      </motion.div>
                    ) : null
                  }
                  isAr={isAr}
                />
              </div>

              <ErrorBox error={suError} />

              <CTA
                onClick={handleSignup}
                accent={{ from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.5)' }}
                label={isAr ? 'إنشاء الحساب' : 'Create Account'}
                isAr={isAr}
              />
            </FaceShell>

            {/* ── BACK: LOG IN ────────────────────────── */}
            <FaceShell
              side="back"
              accent={{ from: '#22d3ee', to: '#10b981', glow: 'rgba(34,211,238,0.5)' }}
              bgFrom="rgba(34,211,238,0.06)"
              bgTo="rgba(2,20,26,0.92)"
              borderColor="rgba(34,211,238,0.25)"
            >
              <FaceHeader
                icon={LogIn}
                accent={{ from: '#22d3ee', to: '#10b981', glow: 'rgba(34,211,238,0.5)' }}
                badge={isAr ? 'مرحباً بعودتك' : 'Welcome Back'}
                title={
                  loginStep === 0
                    ? (isAr ? 'من أنت؟' : 'Who Are You?')
                    : (isAr ? `أهلاً ${liName}` : `Hello ${liName}`)
                }
                subtitle={
                  loginStep === 0
                    ? (isAr ? 'أدخل اسمك للمتابعة' : 'Enter your name to continue')
                    : (isAr ? 'أدخل كلمة المرور للدخول' : 'Enter your password to sign in')
                }
              />

              {/* Login step indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 mb-1">
                {[0,1].map(i => (
                  <motion.div key={i}
                    className="h-1.5 rounded-full"
                    animate={{
                      width: loginStep === i ? 28 : 12,
                      background: i <= loginStep
                        ? 'linear-gradient(90deg, #22d3ee, #10b981)'
                        : 'rgba(255,255,255,0.12)',
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                  />
                ))}
              </div>
              <p className="text-center text-[9px] font-black uppercase tracking-[0.25em] text-cyan-300/60 mb-4">
                {isAr ? `خطوة ${loginStep + 1} / 2` : `Step ${loginStep + 1} of 2`}
              </p>

              {/* Steps */}
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait" initial={false}>
                  {loginStep === 0 && (
                    <motion.div
                      key="li-0"
                      initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3"
                    >
                      <Field
                        icon={UserCircle2}
                        label={isAr ? 'الاسم' : 'Name'}
                        value={liName}
                        onChange={(v) => { setLiName(v); setLiError(''); }}
                        accent="#22d3ee"
                        placeholder={isAr ? 'اكتب اسمك' : 'Your name'}
                        autoFocus
                        onEnter={handleLoginNext}
                        isAr={isAr}
                      />
                      <ErrorBox error={liError} />
                    </motion.div>
                  )}

                  {loginStep === 1 && (
                    <motion.div
                      key="li-1"
                      initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3"
                    >
                      <Field
                        icon={KeyRound}
                        label={isAr ? 'كلمة المرور' : 'Password'}
                        value={liPass}
                        onChange={(v) => { setLiPass(v); setLiError(''); }}
                        accent="#22d3ee"
                        type={liShowPass ? 'text' : 'password'}
                        placeholder={isAr ? 'كلمة المرور' : 'Your password'}
                        autoFocus
                        onEnter={handleLoginSubmit}
                        trailing={
                          <button
                            type="button"
                            onClick={() => setLiShowPass(s => !s)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                          >
                            {liShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        }
                        isAr={isAr}
                      />
                      <ErrorBox error={liError} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login navigation */}
              <div className="flex gap-2 mt-2">
                {loginStep > 0 && (
                  <motion.button
                    onClick={() => { setLoginStep(0); setLiError(''); }}
                    whileHover={{ scale: 1.03, x: isAr ? 3 : -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-12 px-5 rounded-2xl font-black text-xs uppercase tracking-widest border flex items-center gap-2"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(34,211,238,0.25)',
                      color: 'rgba(200,220,230,0.8)',
                    }}
                  >
                    <ArrowLeft size={13} className={isAr ? 'rotate-180' : ''}/>
                    {isAr ? 'رجوع' : 'Back'}
                  </motion.button>
                )}
                <CTA
                  onClick={loginStep === 0 ? handleLoginNext : handleLoginSubmit}
                  accent={{ from: '#22d3ee', to: '#10b981', glow: 'rgba(34,211,238,0.5)' }}
                  label={
                    loginStep === 0
                      ? (isAr ? 'التالي' : 'Next')
                      : (isAr ? 'تسجيل الدخول' : 'Log In')
                  }
                  isAr={isAr}
                  inline
                />
              </div>
            </FaceShell>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 mt-8"
        >
          ATOMIC • {isAr ? 'رفيقك الذكي للتفوق' : 'Your Smart Study Companion'}
        </motion.p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════ */

function FaceShell({
  side, accent, bgFrom, bgTo, borderColor, children,
}: {
  side: 'front' | 'back';
  accent: { from: string; to: string; glow: string };
  bgFrom: string; bgTo: string; borderColor: string;
  children: React.ReactNode;
}) {
  const isBack = side === 'back';
  return (
    <div
      className="absolute inset-0 w-full rounded-[2.5rem] p-6 sm:p-7 border overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
        borderColor,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
        boxShadow: `0 30px 80px -20px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
}

function FaceHeader({
  icon: Icon, accent, badge, title, subtitle,
}: {
  icon: React.ElementType;
  accent: { from: string; to: string; glow: string };
  badge: string; title: string; subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          boxShadow: `0 12px 30px -8px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={24} className="text-white" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border mb-1.5"
          style={{ borderColor: `${accent.from}40`, background: `${accent.from}15` }}
        >
          <Sparkles size={9} style={{ color: accent.from }} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: accent.from }}>{badge}</span>
        </div>
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-black text-white mb-0.5 tracking-tight">
          {title}
        </motion.h1>
        <motion.p
          key={subtitle}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[11px] sm:text-xs text-slate-400 font-medium leading-snug">
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, label, value, onChange, accent, type = 'text',
  placeholder, trailing, autoFocus, onEnter, isAr,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  accent: string;
  type?: string;
  placeholder?: string;
  trailing?: React.ReactNode;
  autoFocus?: boolean;
  onEnter?: () => void;
  isAr: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const filled = value.length > 0;
  return (
    <div>
      <label className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 block"
        style={{ color: focus || filled ? accent : 'rgba(148,163,184,0.6)' }}>
        {label}
      </label>
      <motion.div
        className="relative flex items-center rounded-2xl border overflow-hidden"
        animate={{
          borderColor: focus ? `${accent}90` : filled ? `${accent}50` : 'rgba(255,255,255,0.08)',
          background: focus ? `${accent}10` : 'rgba(0,0,0,0.25)',
          boxShadow: focus ? `0 0 0 4px ${accent}15, 0 0 18px ${accent}30` : 'none',
        }}
        style={{ borderWidth: 1.5 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`flex items-center justify-center w-11 h-12 shrink-0`}
          style={{ color: focus || filled ? accent : 'rgba(148,163,184,0.5)' }}>
          <Icon size={16}/>
        </div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={e => { if (e.key === 'Enter' && onEnter) onEnter(); }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          dir={isAr ? 'rtl' : 'ltr'}
          className="flex-1 h-12 bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-600 placeholder:font-medium pr-3"
          style={{ paddingInlineStart: 0, paddingInlineEnd: 12 }}
        />
        {trailing && <div className="pr-3">{trailing}</div>}
      </motion.div>
    </div>
  );
}

function ErrorBox({ error }: { error: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          className="flex items-center gap-2 px-3 py-2 mt-3 rounded-xl border"
          style={{
            background: 'rgba(239,68,68,0.08)',
            borderColor: 'rgba(239,68,68,0.35)',
          }}
        >
          <AlertCircle size={13} className="text-red-400 shrink-0"/>
          <span className="text-[11px] font-bold text-red-300">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CTA({
  onClick, accent, label, isAr, inline,
}: {
  onClick: () => void;
  accent: { from: string; to: string; glow: string };
  label: string;
  isAr: boolean;
  inline?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden rounded-2xl font-black text-white text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 ${inline ? 'flex-1 h-12 px-6' : 'w-full h-13 mt-5'}`}
      style={{
        height: inline ? 48 : 52,
        background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
        boxShadow: `0 12px 35px -8px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
      }}
    >
      <motion.div className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
      />
      <span className="relative z-10">{label}</span>
      <motion.div
        className="relative z-10"
        animate={{ x: isAr ? [-3, 0, -3] : [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight size={15} className={isAr ? 'rotate-180' : ''}/>
      </motion.div>
    </motion.button>
  );
}
