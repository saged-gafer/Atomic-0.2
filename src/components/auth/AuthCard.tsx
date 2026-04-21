"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowRight, UserPlus, LogIn, Sparkles,
  Brain, Calendar, Trophy, Languages, Clock, Target,
  Zap, Shield, History, BookOpen, Flame, Star,
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

  const signupFeatures = isAr
    ? [
        { icon: Brain, title: 'جدولة ذكية', desc: 'الذكاء الاصطناعي يخطط يومك', color: '#8b5cf6' },
        { icon: Calendar, title: 'جدول أسبوعي', desc: 'نظم موادك بسهولة', color: '#6366f1' },
        { icon: Trophy, title: 'نظام تحفيزي', desc: 'اكسب نقاط XP', color: '#a855f7' },
        { icon: Clock, title: 'مؤقت تركيز', desc: 'جلسات منظمة', color: '#7c3aed' },
        { icon: Target, title: 'أهداف يومية', desc: 'تابع تقدمك', color: '#9333ea' },
        { icon: Languages, title: 'متعدد اللغات', desc: 'عربي و إنجليزي', color: '#c084fc' },
      ]
    : [
        { icon: Brain, title: 'Smart Scheduling', desc: 'AI plans your day', color: '#8b5cf6' },
        { icon: Calendar, title: 'Weekly Planner', desc: 'Organize subjects', color: '#6366f1' },
        { icon: Trophy, title: 'Gamified XP', desc: 'Level up consistency', color: '#a855f7' },
        { icon: Clock, title: 'Focus Timer', desc: 'Smart study sessions', color: '#7c3aed' },
        { icon: Target, title: 'Daily Goals', desc: 'Track your progress', color: '#9333ea' },
        { icon: Languages, title: 'Multi-Language', desc: 'Arabic & English', color: '#c084fc' },
      ];

  const loginFeatures = isAr
    ? [
        { icon: History, title: 'استكمل تقدمك', desc: 'ابدأ من حيث توقفت', color: '#22d3ee' },
        { icon: Shield, title: 'بياناتك آمنة', desc: 'محفوظة محلياً', color: '#10b981' },
        { icon: Flame, title: 'حافظ على إيقاعك', desc: 'سلسلة الأيام تنتظرك', color: '#06b6d4' },
        { icon: BookOpen, title: 'موادك جاهزة', desc: 'كل الجداول كما هي', color: '#14b8a6' },
        { icon: Zap, title: 'دخول سريع', desc: 'لحظة و أنت داخل', color: '#0ea5e9' },
        { icon: Star, title: 'إنجازاتك محفوظة', desc: 'كل النقاط و الجلسات', color: '#34d399' },
      ]
    : [
        { icon: History, title: 'Resume Progress', desc: 'Pick up where you left', color: '#22d3ee' },
        { icon: Shield, title: 'Data Stays Safe', desc: 'Stored locally only', color: '#10b981' },
        { icon: Flame, title: 'Keep Your Streak', desc: 'XP and stats await', color: '#06b6d4' },
        { icon: BookOpen, title: 'Subjects Ready', desc: 'All schedules intact', color: '#14b8a6' },
        { icon: Zap, title: 'Quick Access', desc: 'Jump back in instantly', color: '#0ea5e9' },
        { icon: Star, title: 'Achievements Saved', desc: 'Every session preserved', color: '#34d399' },
      ];

  const isSignup = mode === 'signup';

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

      <div className="relative z-10 w-full max-w-2xl">
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
            {/* Sliding indicator */}
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
              onClick={() => setMode('signup')}
              className="relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: isSignup ? '#fff' : 'rgba(148,163,184,0.7)' }}
            >
              <UserPlus size={14} />
              <span>{isAr ? 'إنشاء حساب' : 'Sign Up'}</span>
            </button>
            <button
              onClick={() => setMode('login')}
              className="relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: !isSignup ? '#fff' : 'rgba(148,163,184,0.7)' }}
            >
              <LogIn size={14} />
              <span>{isAr ? 'تسجيل الدخول' : 'Log In'}</span>
            </button>
          </div>
        </motion.div>

        {/* 3D Flip Card */}
        <div
          className="relative w-full"
          style={{ perspective: '2000px' }}
        >
          <motion.div
            className="relative w-full"
            animate={{ rotateY: isSignup ? 0 : 180 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', minHeight: 600 }}
          >
            {/* FRONT — Sign Up */}
            <CardFace
              side="front"
              accent={{ from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.5)' }}
              icon={UserPlus}
              badge={isAr ? 'حساب جديد' : 'New Account'}
              title={isAr ? 'ابدأ رحلتك' : 'Start Your Journey'}
              subtitle={isAr
                ? 'انضم إلى ذرة و اكتشف نظاماً متكاملاً يحول دراستك إلى تجربة ذكية'
                : 'Join ATOMIC and unlock an intelligent system for smart studying'}
              features={signupFeatures}
              ctaLabel={isAr ? 'هيا نبدأ' : "Let's Begin"}
              onContinue={onContinue}
              isAr={isAr}
              bgFrom="rgba(139,92,246,0.06)"
              bgTo="rgba(15,8,30,0.92)"
              borderColor="rgba(139,92,246,0.25)"
            />

            {/* BACK — Log In */}
            <CardFace
              side="back"
              accent={{ from: '#22d3ee', to: '#10b981', glow: 'rgba(34,211,238,0.5)' }}
              icon={LogIn}
              badge={isAr ? 'مرحباً بعودتك' : 'Welcome Back'}
              title={isAr ? 'تابع تقدمك' : 'Resume Progress'}
              subtitle={isAr
                ? 'كل بياناتك و إنجازاتك محفوظة. دخول سلس بدون أي تعقيدات'
                : 'All your data and achievements await. Smooth, frictionless re-entry'}
              features={loginFeatures}
              ctaLabel={isAr ? 'تابع' : 'Continue'}
              onContinue={onContinue}
              isAr={isAr}
              bgFrom="rgba(34,211,238,0.06)"
              bgTo="rgba(2,20,26,0.92)"
              borderColor="rgba(34,211,238,0.25)"
            />
          </motion.div>
        </div>

        {/* Footer */}
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

/* ── Reusable card face ──────────────────────────────── */
interface CardFaceProps {
  side: 'front' | 'back';
  accent: { from: string; to: string; glow: string };
  icon: React.ElementType;
  badge: string;
  title: string;
  subtitle: string;
  features: { icon: React.ElementType; title: string; desc: string; color: string }[];
  ctaLabel: string;
  onContinue: () => void;
  isAr: boolean;
  bgFrom: string;
  bgTo: string;
  borderColor: string;
}

function CardFace({
  side, accent, icon: Icon, badge, title, subtitle, features,
  ctaLabel, onContinue, isAr, bgFrom, bgTo, borderColor,
}: CardFaceProps) {
  const isBack = side === 'back';

  return (
    <div
      className="absolute inset-0 w-full rounded-[2.5rem] p-6 sm:p-8 border overflow-hidden"
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
      {/* Top corner glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start gap-4 mb-6">
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            boxShadow: `0 12px 30px -8px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={26} className="text-white" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border mb-2"
            style={{
              borderColor: `${accent.from}40`,
              background: `${accent.from}15`,
            }}
          >
            <Sparkles size={10} style={{ color: accent.from }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]"
              style={{ color: accent.from }}
            >
              {badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
            {title}
          </h1>
          <p className="text-[12px] sm:text-sm text-slate-400 font-medium leading-snug">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="relative overflow-hidden rounded-xl p-3 border border-white/5"
            style={{ background: 'rgba(0,0,0,0.25)' }}
          >
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${f.color}40 0%, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}
              >
                <f.icon size={14} style={{ color: f.color }} />
              </div>
              <h3 className="text-[11px] font-black text-white mb-0.5 leading-tight">{f.title}</h3>
              <p className="text-[9px] text-slate-400 font-medium leading-tight">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex justify-center">
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden px-8 sm:px-10 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm uppercase tracking-widest"
          style={{
            background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
            boxShadow: `0 12px 35px -8px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
        >
          <span className="relative flex items-center gap-2.5">
            {ctaLabel}
            <motion.div
              animate={{ x: isAr ? [-3, 0, -3] : [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={15} className={isAr ? 'rotate-180' : ''} />
            </motion.div>
          </span>
        </motion.button>
      </div>
    </div>
  );
}
