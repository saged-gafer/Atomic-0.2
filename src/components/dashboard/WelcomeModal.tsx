"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Clock, Heart, BookOpen, Star, Moon } from 'lucide-react';
import { translations } from '@/lib/i18n';
import { UserData } from '@/context/AppContext';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

const ARABIC_ADHKAR = [
  { text: "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً", title: "دعاء طلب العلم", icon: BookOpen },
  { text: "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً", title: "دعاء التيسير", icon: Star },
  { text: "رب زدني علماً", title: "آية كريمة • طه ١١٤", icon: Moon },
];

function FloatingParticle({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) {
  return (
    <motion.div
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: '-20%', opacity: [0, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, bottom: 0, width: size, height: size, background: 'radial-gradient(circle, rgba(99,102,241,0.6), transparent 70%)' }}
    />
  );
}

export default function WelcomeModal({ isOpen, onClose, userData }: WelcomeModalProps) {
  const language = userData.language || 'en';
  const t = translations[language];
  const isRTL = language === 'ar';
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setStep(0), 0);
      const timer = setInterval(() => {
        setStep(s => (s < ARABIC_ADHKAR.length - 1 ? s + 1 : s));
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const prayerTimes = userData.prayerTimes;

  const particles = React.useMemo(() => [
    { x: '10%', delay: 0,   size: 6, duration: 6.2 },
    { x: '25%', delay: 1.2, size: 4, duration: 7.5 },
    { x: '45%', delay: 0.6, size: 8, duration: 5.8 },
    { x: '65%', delay: 1.8, size: 5, duration: 6.9 },
    { x: '80%', delay: 0.3, size: 6, duration: 7.1 },
    { x: '90%', delay: 2.1, size: 4, duration: 6.4 },
  ], []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full sm:max-w-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10,12,30,0.98) 0%, rgba(15,18,42,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '2rem 2rem 0 0',
              boxShadow: '0 -20px 80px rgba(99,102,241,0.15), 0 0 100px rgba(0,0,0,0.5)',
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            onClick={e => e.stopPropagation()}
          >
            {/* Ambient gradient top */}
            <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
            </div>

            {/* Animated beam border at top */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
              <motion.div
                className="h-full w-1/2"
                style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #ec4899, transparent)' }}
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Drag handle */}
            <div className="sm:hidden flex justify-center pt-3">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 px-6 pb-8 pt-6 space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex p-4 rounded-2xl mx-auto"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(236,72,153,0.2))' }}
                >
                  <Heart size={28} className="text-rose-400" fill="rgba(236,72,153,0.5)" />
                </motion.div>
                <h2 className="text-2xl font-black text-white">
                  {t.reminders_title}
                </h2>
                <p className="text-sm text-slate-400 font-medium">
                  Start your session with intention and focus.
                </p>
              </motion.div>

              {/* Animated Adhkar cards */}
              <div className="relative h-28 overflow-hidden" dir="rtl">
                <AnimatePresence mode="wait">
                  {ARABIC_ADHKAR.map((dhikr, idx) =>
                    idx === step ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-4 rounded-2xl flex flex-col justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(236,72,153,0.05))',
                          border: '1px solid rgba(99,102,241,0.15)',
                        }}
                      >
                        <p className="text-[11px] font-black text-primary/50 uppercase tracking-widest mb-2 text-right">
                          {dhikr.title}
                        </p>
                        <p className="text-base font-bold text-slate-100 leading-relaxed text-right">
                          {dhikr.text}
                        </p>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>

                {/* Step dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" dir="ltr">
                  {ARABIC_ADHKAR.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setStep(i)}
                      animate={{ width: i === step ? 20 : 6, background: i === step ? '#6366f1' : 'rgba(255,255,255,0.15)' }}
                      transition={{ duration: 0.3 }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Reminders */}
              <div className="grid gap-2">
                {[t.reminder_1, t.reminder_2, t.reminder_3].map((reminder, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(245,158,11,0.15)' }}>
                      <Sparkles size={11} className="text-amber-400" />
                    </div>
                    <p className="text-xs text-slate-400 flex-1">{reminder}</p>
                  </motion.div>
                ))}
              </div>

              {/* Prayer times */}
              {prayerTimes && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-4 rounded-2xl"
                  style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={13} className="text-emerald-400" />
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                      {t.prayer_times} — {userData.city}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center" dir="ltr">
                    {Object.entries(prayerTimes).map(([name, time]) => (
                      <div key={name} className="space-y-0.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{name}</p>
                        <p className="text-xs font-black text-white">{time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-2xl font-black text-white text-sm tracking-wide relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative">✦ {t.close} ✦</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
