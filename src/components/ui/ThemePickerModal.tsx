"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES, THEME_ORDER } from '@/context/ThemeContext';
import { X, Check } from 'lucide-react';

interface ThemePickerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ThemePickerModal({ open, onClose }: ThemePickerModalProps) {
  const { theme: currentTheme, themeName, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
          <motion.div
            className="relative z-10 rounded-[28px] p-6 w-full max-w-sm"
            style={{ background: currentTheme.cardBg, border: `2px solid ${currentTheme.primary}40` }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-black text-white">Style Presets</h3>
                <p className="text-[10px] font-bold mt-0.5" style={{ color: `${currentTheme.primary}70` }}>
                  Choose your visual theme
                </p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${currentTheme.primary}15`, color: `${currentTheme.primary}80` }}>
                <X size={14}/>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {THEME_ORDER.map(id => {
                const t = THEMES[id];
                const isActive = themeName === id;
                return (
                  <motion.button
                    key={id}
                    onClick={() => { setTheme(id); onClose(); }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 p-3 rounded-2xl text-left transition-all"
                    style={{
                      background: isActive ? `${t.primary}18` : `${t.primary}08`,
                      border: `1.5px solid ${isActive ? t.primary : `${t.primary}25`}`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.primary}40, ${t.secondary}30)` }}>
                      {t.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm">{t.name}</span>
                        {isActive && (
                          <div className="flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-lg"
                            style={{ background: `${t.primary}25`, color: t.primary }}>
                            <Check size={9}/> ACTIVE
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1.5 mt-1">
                        {[t.primary, t.secondary, t.accent].map((c, i) => (
                          <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }}/>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
