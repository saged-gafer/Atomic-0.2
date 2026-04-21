"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { UserPlus, LogIn, Sparkles, ArrowRight } from 'lucide-react';

interface AuthLandingProps {
  onChoose: (mode: 'signup' | 'login') => void;
}

export default function AuthLanding({ onChoose }: AuthLandingProps) {
  const { userData } = useAppContext();
  const lang = userData?.language || 'en';
  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-10"
      style={{
        background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.18) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.15) 0%, transparent 50%), linear-gradient(135deg, #050816 0%, #0a0f24 50%, #050816 100%)',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Animated blobs */}
      <motion.div
        className="absolute top-10 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative z-10 max-w-5xl w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 mb-5"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={12} className="text-indigo-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              {isAr ? 'منصة الدراسة الذكية' : 'Smart Study Platform'}
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 40%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.4))',
            }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            ATOMIC
          </motion.h1>

          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto px-2">
            {isAr
              ? 'رفيقك الذكي في رحلة التفوق الدراسي'
              : 'Your intelligent companion on the journey to academic excellence'}
          </p>
        </motion.div>

        {/* Two portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {/* Sign Up Portal */}
          <motion.button
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose('signup')}
            className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 text-left border border-indigo-400/20 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 50%, rgba(15,18,42,0.95) 100%)',
              boxShadow: '0 20px 60px -10px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
            />
            {/* Top right glow */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    boxShadow: '0 10px 30px -5px rgba(139,92,246,0.5)',
                  }}
                  whileHover={{ rotate: 10 }}
                >
                  <UserPlus size={26} className="text-white" />
                </motion.div>
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-purple-400/30 text-purple-200"
                  style={{ background: 'rgba(139,92,246,0.12)' }}
                >
                  {isAr ? 'جديد' : 'New'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                {isAr ? 'إنشاء حساب' : 'Create Account'}
              </h2>
              <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                {isAr
                  ? 'ابدأ رحلتك مع ذرة و اكتشف نظام الدراسة الذكي'
                  : 'Begin your journey with ATOMIC and unlock smart study planning'}
              </p>

              <div className="flex items-center gap-2 text-sm font-black text-indigo-200 group-hover:text-white transition-colors">
                <span>{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
                <motion.div
                  animate={{ x: isAr ? [-4, 0, -4] : [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                </motion.div>
              </div>
            </div>
          </motion.button>

          {/* Log In Portal */}
          <motion.button
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose('login')}
            className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 text-left border border-cyan-400/20 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(16,185,129,0.12) 50%, rgba(6,18,28,0.95) 100%)',
              boxShadow: '0 20px 60px -10px rgba(34,211,238,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.3) 0%, transparent 70%)' }}
            />
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #10b981)',
                    boxShadow: '0 10px 30px -5px rgba(34,211,238,0.5)',
                  }}
                  whileHover={{ rotate: -10 }}
                >
                  <LogIn size={26} className="text-white" />
                </motion.div>
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-400/30 text-emerald-200"
                  style={{ background: 'rgba(16,185,129,0.12)' }}
                >
                  {isAr ? 'عودة' : 'Returning'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                {isAr ? 'تسجيل الدخول' : 'Log In'}
              </h2>
              <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                {isAr
                  ? 'مرحباً بعودتك! اكمل من حيث توقفت و تابع تقدمك'
                  : 'Welcome back! Continue where you left off and resume your progress'}
              </p>

              <div className="flex items-center gap-2 text-sm font-black text-cyan-200 group-hover:text-white transition-colors">
                <span>{isAr ? 'تابع' : 'Continue'}</span>
                <motion.div
                  animate={{ x: isAr ? [-4, 0, -4] : [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                </motion.div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 mt-10"
        >
          {isAr ? 'ذرة • التتبع المتقدم لنجاح الطلاب' : 'ATOMIC • Advanced Tracking for Student Success'}
        </motion.p>
      </div>
    </div>
  );
}
