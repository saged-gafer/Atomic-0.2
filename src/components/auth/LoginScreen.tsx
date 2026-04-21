"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowLeft, ArrowRight, LogIn, Sparkles,
  Zap, Shield, History, BookOpen, Flame, Star,
} from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onContinue: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginScreen({ onBack, onContinue, onSwitchToSignup }: LoginScreenProps) {
  const { userData } = useAppContext();
  const lang = userData?.language || 'en';
  const isAr = lang === 'ar';

  const features = isAr
    ? [
        { icon: History, title: 'استكمل تقدمك', desc: 'ابدأ من حيث توقفت بدون فقدان أي بيانات', color: '#22d3ee' },
        { icon: Shield, title: 'بياناتك آمنة', desc: 'كل شيء محفوظ محلياً على جهازك', color: '#10b981' },
        { icon: Flame, title: 'حافظ على ايقاعك', desc: 'سلسلة الأيام و النقاط لا تزال تنتظرك', color: '#06b6d4' },
        { icon: BookOpen, title: 'موادك جاهزة', desc: 'كل المواد و الجداول كما تركتها', color: '#14b8a6' },
        { icon: Zap, title: 'دخول سريع', desc: 'لحظة واحدة و أنت داخل لوحة التحكم', color: '#0ea5e9' },
        { icon: Star, title: 'إنجازاتك محفوظة', desc: 'كل الجلسات و الأوقات و النقاط', color: '#34d399' },
      ]
    : [
        { icon: History, title: 'Pick Up Where You Left', desc: 'Continue without losing any data', color: '#22d3ee' },
        { icon: Shield, title: 'Your Data Is Safe', desc: 'Everything stored locally on your device', color: '#10b981' },
        { icon: Flame, title: 'Keep Your Streak', desc: 'Your XP and daily streaks await', color: '#06b6d4' },
        { icon: BookOpen, title: 'Subjects Ready', desc: 'All schedules and notes intact', color: '#14b8a6' },
        { icon: Zap, title: 'Quick Access', desc: 'Jump straight back to your dashboard', color: '#0ea5e9' },
        { icon: Star, title: 'Achievements Saved', desc: 'Every session and stat preserved', color: '#34d399' },
      ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden px-4 py-8 sm:py-12"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom right, rgba(16,185,129,0.15) 0%, transparent 55%), linear-gradient(180deg, #02141a 0%, #062028 50%, #02141a 100%)',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Animated blobs */}
      <motion.div
        className="absolute top-0 right-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating particles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${(i * 41) % 100}%`,
            left: `${(i * 61) % 100}%`,
            background: i % 2 === 0 ? 'rgba(34,211,238,0.5)' : 'rgba(16,185,129,0.5)',
          }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: isAr ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
          <span>{isAr ? 'رجوع' : 'Back'}</span>
        </motion.button>

        {/* Hero */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #10b981)',
              boxShadow: '0 20px 60px -10px rgba(34,211,238,0.6), inset 0 2px 0 rgba(255,255,255,0.2)',
            }}
          >
            <LogIn size={36} className="text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 mb-4"
              style={{ background: 'rgba(34,211,238,0.12)' }}
            >
              <Sparkles size={11} className="text-cyan-300" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-200">
                {isAr ? 'مرحباً بعودتك' : 'Welcome Back'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #a5f3fc 50%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isAr ? 'تابع تقدمك' : 'Resume Progress'}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              {isAr
                ? 'كل بياناتك و إنجازاتك محفوظة على جهازك. دخول سلس بدون أي تعقيدات'
                : 'All your data and achievements are saved locally. Smooth re-entry, no friction'}
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl p-4 sm:p-5 border border-white/5"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(2,20,26,0.85) 100%)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${f.color}30 0%, transparent 60%)` }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `${f.color}20`,
                    border: `1px solid ${f.color}40`,
                  }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-black text-white mb-1">{f.title}</h3>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden px-10 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
              boxShadow: '0 15px 40px -10px rgba(34,211,238,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #67e8f9 0%, #34d399 100%)' }}
            />
            <span className="relative flex items-center gap-2.5">
              {isAr ? 'تابع' : 'Continue'}
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </span>
          </motion.button>

          <button
            onClick={onSwitchToSignup}
            className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-300 transition-colors"
          >
            {isAr ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign up"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
