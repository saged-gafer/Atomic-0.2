"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const ADHKAR = [
  "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
  "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً",
  "اللهم انفعني بما علمتني، وعلمني ما ينفعني، وزدني علماً",
  "اللهم إني أعوذ بك من علم لا ينفع، ومن قلب لا يخشع",
  "رب زدني علماً",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  "أستغفر الله وأتوب إليه",
  "اللهم صل وسلم على نبينا محمد",
  "يا حي يا قيوم برحمتك أستغيث",
  "اللهم إني أعوذ بك من النسيان، اللهم ذكرني ما نسيت وعلمني ما جهلت", // Dua for forgetfulness
  "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه", // Istighfar
  "اللهم بارك لي في وقتي وجهدي",
  "رب اشرح لي صدري ويسر لي أمري"
];

export default function AdhkarService() {
  const [currentDua, setCurrentDua] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showDua = () => {
      const randomDua = ADHKAR[Math.floor(Math.random() * ADHKAR.length)];
      setCurrentDua(randomDua);
      setIsVisible(true);

      // Auto-hide after 15 seconds for a "quick side message"
      setTimeout(() => {
        setIsVisible(false);
      }, 15000);
    };

    // Show first one after 30 seconds, then strictly every 15 minutes
    const initialTimer = setTimeout(showDua, 30000);
    const intervalTimer = setInterval(showDua, 15 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentDua && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.8 }}
          className="fixed bottom-24 right-6 z-[200] max-w-sm"
        >
          <div className="bg-[#0f172a]/90 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-blue-500/20 flex items-start gap-4 relative overflow-hidden">
            {/* Animated Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />

            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 relative z-10">
              <Sparkles size={20} className="animate-pulse" />
            </div>

            <div className="flex-1 relative z-10">
              <h4 className="text-[10px] text-blue-400/60 font-bold uppercase tracking-widest mb-1 text-right">ذكار اليوم</h4>
              <p className="text-base font-bold text-white leading-relaxed text-right" dir="rtl">
                {currentDua}
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/5 rounded-full transition-colors relative z-10"
            >
              <X size={16} className="text-slate-500 hover:text-white" />
            </button>

            {/* Progress bar for auto-hide */}
            <motion.div
              className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-blue-600 to-blue-400"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 15, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
