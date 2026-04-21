"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowLeft, ArrowRight, UserPlus, Sparkles,
  Brain, Calendar, Trophy, Languages, Clock, Target,
} from 'lucide-react';

interface SignUpScreenProps {
  onBack: () => void;
  onContinue: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpScreen({ onBack, onContinue, onSwitchToLogin }: SignUpScreenProps) {
  const { userData } = useAppContext();
  const lang = userData?.language || 'en';
  const isAr = lang === 'ar';

  const features = isAr
    ? [
        { icon: Brain, title: 'جدولة ذكية', desc: 'الذكاء الاصطناعي يخطط يومك تلقائياً', color: '#8b5cf6' },
        { icon: Calendar, title: 'جدول أسبوعي', desc: 'نظم موادك على مدار الأسبوع بسهولة', color: '#6366f1' },
        { icon: Trophy, title: 'نظام تحفيزي', desc: 'اكسب نقاط XP و ارفع مستوى التزامك', color: '#a855f7' },
        { icon: Clock, title: 'مؤقت تركيز', desc: 'جلسات دراسية مع فترات راحة منظمة', color: '#7c3aed' },
        { icon: Target, title: 'أهداف يومية', desc: 'حدد ساعات دراستك و تابع تقدمك', color: '#9333ea' },
        { icon: Languages, title: 'متعدد اللغات', desc: 'يدعم العربية و الإنجليزية بالكامل', color: '#c084fc' },
      ]
    : [
        { icon: Brain, title: 'Smart Scheduling', desc: 'AI plans your day automatically', color: '#8b5cf6' },
        { icon: Calendar, title: 'Weekly Planner', desc: 'Organize subjects across your week', color: '#6366f1' },
        { icon: Trophy, title: 'Gamified Progress', desc: 'Earn XP and level up consistency', color: '#a855f7' },
        { icon: Clock, title: 'Focus Timer', desc: 'Study sessions with smart breaks', color: '#7c3aed' },
        { icon: Target, title: 'Daily Goals', desc: 'Set hours & track your progress', color: '#9333ea' },
        { icon: Languages, title: 'Multi-Language', desc: 'Full Arabic & English support', color: '#c084fc' },
      ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden px-4 py-8 sm:py-12"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0420 0%, #14082e 50%, #0a0420 100%)',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Animated blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

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
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              boxShadow: '0 20px 60px -10px rgba(139,92,246,0.6), inset 0 2px 0 rgba(255,255,255,0.2)',
            }}
          >
            <UserPlus size={36} className="text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-400/30 mb-4"
              style={{ background: 'rgba(139,92,246,0.12)' }}
            >
              <Sparkles size={11} className="text-purple-300" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-200">
                {isAr ? 'حساب جديد' : 'New Account'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #e9d5ff 50%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isAr ? 'ابدأ رحلتك' : 'Start Your Journey'}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              {isAr
                ? 'انضم إلى ذرة و اكتشف نظاماً متكاملاً يحول دراستك إلى تجربة ذكية و ممتعة'
                : 'Join ATOMIC and unlock an intelligent system that transforms studying into a smart, engaging experience'}
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
                background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(15,8,30,0.85) 100%)',
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
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              boxShadow: '0 15px 40px -10px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)' }}
            />
            <span className="relative flex items-center gap-2.5">
              {isAr ? 'هيا نبدأ' : "Let's Begin"}
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </span>
          </motion.button>

          <button
            onClick={onSwitchToLogin}
            className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-purple-300 transition-colors"
          >
            {isAr ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already have an account? Log in'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
