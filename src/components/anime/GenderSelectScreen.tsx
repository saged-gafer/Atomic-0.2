"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAppContext } from '@/context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';

function MaleAtomicSVG({ primaryColor }: { primaryColor: string }) {
  return (
    <svg viewBox="0 0 200 240" width="160" height="192" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mg-skin" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef3e8"/>
          <stop offset="100%" stopColor="#fde8d0"/>
        </radialGradient>
        <radialGradient id="mg-hair" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={primaryColor}/>
        </radialGradient>
        <linearGradient id="mg-blazer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d2870"/>
          <stop offset="100%" stopColor="#1e1b4b"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="232" rx="38" ry="6" fill="rgba(0,0,0,0.2)"/>
      <rect x="78" y="188" width="18" height="36" rx="9" fill="#0f0d2a"/>
      <rect x="104" y="188" width="18" height="36" rx="9" fill="#0f0d2a"/>
      <ellipse cx="87" cy="224" rx="12" ry="7" fill="#1a1a2e"/>
      <ellipse cx="113" cy="224" rx="12" ry="7" fill="#1a1a2e"/>
      <path d="M 62 128 Q 58 152 57 188 L 143 188 Q 142 152 138 128 Q 126 122 100 122 Q 74 122 62 128 Z" fill="url(#mg-blazer)" stroke={`${primaryColor}30`} strokeWidth="1"/>
      <path d="M 86 122 Q 100 132 114 122 L 114 142 Q 100 147 86 142 Z" fill="#f0f4ff"/>
      <path d="M 96 130 L 104 130 L 107 152 L 100 156 L 93 152 Z" fill="#ec4899"/>
      <rect x="54" y="130" width="16" height="48" rx="8" fill="url(#mg-blazer)"/>
      <ellipse cx="62" cy="180" rx="9" ry="8" fill="url(#mg-skin)"/>
      <rect x="130" y="130" width="16" height="48" rx="8" fill="url(#mg-blazer)"/>
      <ellipse cx="138" cy="180" rx="9" ry="8" fill="url(#mg-skin)"/>
      <rect x="90" y="108" width="20" height="18" rx="9" fill="url(#mg-skin)"/>
      <ellipse cx="100" cy="76" rx="48" ry="46" fill="url(#mg-skin)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5"/>
      <ellipse cx="100" cy="64" rx="51" ry="44" fill={primaryColor}/>
      <path d="M 55 66 Q 48 94 52 118 Q 56 115 58 124 Q 63 104 58 78 Z" fill={primaryColor}/>
      <path d="M 145 66 Q 152 94 148 118 Q 144 115 142 124 Q 137 104 142 78 Z" fill={primaryColor}/>
      <path d="M 55 60 Q 58 40 70 35 Q 80 46 88 48 Q 100 42 112 48 Q 120 46 130 35 Q 142 40 145 60 Q 136 50 124 57 Q 114 52 106 57 Q 102 50 100 52 Q 98 50 94 57 Q 86 52 76 57 Q 64 50 55 60 Z" fill={primaryColor}/>
      <motion.path d="M 100 28 Q 106 16 102 6 Q 98 2 96 10 Q 94 18 100 28 Z" fill={primaryColor}
        animate={{ rotate: [-8,8,-8], x: [-1,1,-1] }} transition={{ duration:2, repeat:Infinity }}
        style={{ transformOrigin:'100px 28px' }}/>
      <ellipse cx="52" cy="78" rx="7" ry="9" fill="url(#mg-skin)"/>
      <ellipse cx="148" cy="78" rx="7" ry="9" fill="url(#mg-skin)"/>
      <g>
        <ellipse cx="78" cy="78" rx="13" ry="15" fill="white"/>
        <ellipse cx="78" cy="80" rx="9" ry="11" fill="#6366f1"/>
        <ellipse cx="78" cy="80" rx="4.5" ry="5.5" fill="#1e1b4b"/>
        <ellipse cx="73" cy="74" rx="3.5" ry="4" fill="white" opacity="0.95"/>
        <path d="M 65 68 Q 78 62 91 68" fill={primaryColor}/>
      </g>
      <g>
        <ellipse cx="122" cy="78" rx="13" ry="15" fill="white"/>
        <ellipse cx="122" cy="80" rx="9" ry="11" fill="#6366f1"/>
        <ellipse cx="122" cy="80" rx="4.5" ry="5.5" fill="#1e1b4b"/>
        <ellipse cx="117" cy="74" rx="3.5" ry="4" fill="white" opacity="0.95"/>
        <path d="M 109 68 Q 122 62 135 68" fill={primaryColor}/>
      </g>
      <path d="M 65 66 Q 78 61 91 66" fill="none" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 109 66 Q 122 61 135 66" fill="none" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="100" cy="92" rx="2" ry="1.5" fill="#fda4af" opacity="0.5"/>
      <path d="M 89 100 Q 100 108 111 100" fill="#f97316" opacity="0.8"/>
      <ellipse cx="62" cy="87" rx="8" ry="4.5" fill="#fda4af" opacity="0.5"/>
      <ellipse cx="138" cy="87" rx="8" ry="4.5" fill="#fda4af" opacity="0.5"/>
    </svg>
  );
}

function FemaleAtomicSVG({ primaryColor }: { primaryColor: string }) {
  return (
    <svg viewBox="0 0 200 240" width="160" height="192" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fg-skin" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef3e8"/>
          <stop offset="100%" stopColor="#fde8d0"/>
        </radialGradient>
        <radialGradient id="fg-hair" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.85"/>
          <stop offset="100%" stopColor={primaryColor}/>
        </radialGradient>
        <linearGradient id="fg-outfit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${primaryColor}55`}/>
          <stop offset="100%" stopColor={`${primaryColor}22`}/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="232" rx="38" ry="6" fill="rgba(0,0,0,0.2)"/>
      <rect x="80" y="196" width="15" height="32" rx="7.5" fill="#1a1045"/>
      <rect x="105" y="196" width="15" height="32" rx="7.5" fill="#1a1045"/>
      <ellipse cx="87.5" cy="228" rx="11" ry="6" fill="#0f0a2e"/>
      <ellipse cx="112.5" cy="228" rx="11" ry="6" fill="#0f0a2e"/>
      <path d="M 60 128 Q 52 162 50 196 L 150 196 Q 148 162 140 128 Q 126 120 100 120 Q 74 120 60 128 Z"
        fill={`${primaryColor}25`} stroke={`${primaryColor}60`} strokeWidth="1.5"/>
      <path d="M 80 120 Q 100 134 120 120 L 120 140 Q 100 148 80 140 Z" fill="white" opacity="0.9"/>
      <path d="M 96 132 L 104 132 L 108 156 L 100 160 L 92 156 Z" fill={primaryColor} opacity="0.8"/>
      <rect x="60" y="152" width="16" height="2" rx="1" fill={primaryColor} opacity="0.5"/>
      <rect x="124" y="152" width="16" height="2" rx="1" fill={primaryColor} opacity="0.5"/>
      <motion.g animate={{ rotate:[5,-5,5] }} transition={{ duration:2.5, repeat:Infinity }} style={{ transformOrigin:'62px 134px' }}>
        <rect x="50" y="128" width="14" height="46" rx="7" fill={`${primaryColor}40`} stroke={`${primaryColor}80`} strokeWidth="1"/>
        <ellipse cx="57" cy="176" rx="9" ry="8" fill="url(#fg-skin)"/>
      </motion.g>
      <motion.g animate={{ rotate:[-5,5,-5] }} transition={{ duration:2.5, repeat:Infinity }} style={{ transformOrigin:'138px 134px' }}>
        <rect x="136" y="128" width="14" height="46" rx="7" fill={`${primaryColor}40`} stroke={`${primaryColor}80`} strokeWidth="1"/>
        <ellipse cx="143" cy="176" rx="9" ry="8" fill="url(#fg-skin)"/>
      </motion.g>
      <rect x="90" y="108" width="20" height="16" rx="8" fill="url(#fg-skin)"/>
      <ellipse cx="100" cy="76" rx="46" ry="44" fill="url(#fg-skin)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5"/>
      <ellipse cx="100" cy="55" rx="54" ry="42" fill={primaryColor}/>
      <path d="M 47 68 Q 38 100 42 128 Q 46 124 48 134 Q 56 108 50 78 Z" fill={primaryColor}/>
      <path d="M 153 68 Q 162 100 158 128 Q 154 124 152 134 Q 144 108 150 78 Z" fill={primaryColor}/>
      <path d="M 47 70 Q 50 30 70 22 Q 82 38 90 42 Q 100 34 110 42 Q 118 38 130 22 Q 150 30 153 70 Q 140 55 126 62 Q 114 54 108 62 Q 104 54 100 56 Q 96 54 92 62 Q 86 54 74 62 Q 60 55 47 70 Z" fill={primaryColor}/>
      <path d="M 47 70 Q 42 90 44 110 Q 50 105 52 90 Z" fill={`${primaryColor}cc`}/>
      <path d="M 153 70 Q 158 90 156 110 Q 150 105 148 90 Z" fill={`${primaryColor}cc`}/>
      <path d="M 47 70 Q 36 85 40 105 Q 46 102 48 88 Z" fill={primaryColor} opacity="0.7"/>
      <path d="M 153 70 Q 164 85 160 105 Q 154 102 152 88 Z" fill={primaryColor} opacity="0.7"/>
      <motion.path d="M 100 24 Q 107 12 103 2 Q 99 -2 97 6 Q 95 14 100 24 Z" fill={primaryColor}
        animate={{ rotate:[-10,10,-10], x:[-1,1,-1] }} transition={{ duration:2, repeat:Infinity }}
        style={{ transformOrigin:'100px 24px' }}/>
      <ellipse cx="54" cy="78" rx="7" ry="9" fill="url(#fg-skin)"/>
      <ellipse cx="146" cy="78" rx="7" ry="9" fill="url(#fg-skin)"/>
      <g>
        <ellipse cx="78" cy="78" rx="13" ry="15" fill="white"/>
        <ellipse cx="78" cy="80" rx="9" ry="11" fill={primaryColor}/>
        <ellipse cx="78" cy="80" rx="4.5" ry="5.5" fill="#1e1b4b"/>
        <ellipse cx="73" cy="74" rx="3.5" ry="4" fill="white" opacity="0.95"/>
        <ellipse cx="83" cy="86" rx="1.8" ry="2.2" fill="white" opacity="0.7"/>
        <path d="M 64 67 Q 78 60 92 67" fill={primaryColor}/>
        <path d="M 64 67 Q 78 60 92 67" fill="none" stroke={`${primaryColor}aa`} strokeWidth="1"/>
      </g>
      <g>
        <ellipse cx="122" cy="78" rx="13" ry="15" fill="white"/>
        <ellipse cx="122" cy="80" rx="9" ry="11" fill={primaryColor}/>
        <ellipse cx="122" cy="80" rx="4.5" ry="5.5" fill="#1e1b4b"/>
        <ellipse cx="117" cy="74" rx="3.5" ry="4" fill="white" opacity="0.95"/>
        <ellipse cx="127" cy="86" rx="1.8" ry="2.2" fill="white" opacity="0.7"/>
        <path d="M 108 67 Q 122 60 136 67" fill={primaryColor}/>
      </g>
      <path d="M 65 65 Q 78 59 91 65" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round"/>
      <path d="M 109 65 Q 122 59 135 65" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="100" cy="93" rx="2" ry="1.5" fill="#fda4af" opacity="0.6"/>
      <path d="M 89 101 Q 100 110 111 101" fill="#f97316" opacity="0.85"/>
      <path d="M 89 101 Q 100 111 111 101" fill="none" stroke={`${primaryColor}aa`} strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="63" cy="88" rx="8" ry="4.5" fill="#fda4af" opacity="0.6"/>
      <ellipse cx="137" cy="88" rx="8" ry="4.5" fill="#fda4af" opacity="0.6"/>
      <circle cx="54" cy="52" r="4" fill={primaryColor} opacity="0.9"/>
      <circle cx="146" cy="52" r="4" fill={primaryColor} opacity="0.9"/>
      <circle cx="52" cy="52" r="2" fill="white" opacity="0.6"/>
    </svg>
  );
}

export default function GenderSelectScreen() {
  const { theme } = useTheme();
  const { setGender } = useAppContext();
  const [hovered, setHovered] = useState<'male' | 'female' | null>(null);
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);

  const handleSelect = (g: 'male' | 'female') => {
    setSelected(g);
    setTimeout(() => {
      setGender(g);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]"
      style={{ background: `radial-gradient(ellipse at 50% 40%, ${theme.bgDeep} 0%, ${theme.bg} 70%)` }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 18px)' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, boxShadow: `0 0 30px ${theme.primary}50` }}
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >A</motion.div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">ATOMIC</p>
            <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: theme.primary }}>Choose Your Companion</p>
          </div>
        </div>

        <div>
          <motion.h1
            className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Who is <span style={{ color: theme.primary }}>Atomic</span>?
          </motion.h1>
          <p className="text-sm font-medium" style={{ color: `${theme.primary}80` }}>
            Select your study companion — this shapes your experience
          </p>
        </div>

        <div className="flex gap-6 sm:gap-10">
          {(['male', 'female'] as const).map((g) => {
            const isHov = hovered === g;
            const isSel = selected === g;
            const label = g === 'male' ? 'Atomic (Male)' : 'Atomic (Female)';
            const subtitle = g === 'male' ? 'Cool & Focused' : 'Bright & Energetic';
            return (
              <motion.button
                key={g}
                onHoverStart={() => setHovered(g)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => handleSelect(g)}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-[28px] cursor-pointer outline-none"
                style={{
                  background: isSel
                    ? `linear-gradient(135deg, ${theme.primary}25, ${theme.secondary}15)`
                    : isHov
                    ? `${theme.primary}12`
                    : `${theme.primary}08`,
                  border: `2.5px solid ${isSel || isHov ? theme.primary : `${theme.primary}30`}`,
                  boxShadow: isSel
                    ? `0 0 40px ${theme.primary}40, 0 4px 0 0 ${theme.primary}50`
                    : isHov
                    ? `0 0 25px ${theme.primary}25, 0 4px 0 0 ${theme.primary}30`
                    : 'none',
                  minWidth: 160,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`, opacity: isHov || isSel ? 1 : 0 }}
                  animate={{ opacity: isHov || isSel ? 1 : 0 }}
                />

                <motion.div
                  animate={isHov ? { y: [0, -6, 0] } : { y: [0, -4, 0] }}
                  transition={{ duration: isHov ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {g === 'male'
                    ? <MaleAtomicSVG primaryColor={theme.primary} />
                    : <FemaleAtomicSVG primaryColor={theme.primary} />
                  }
                </motion.div>

                <div>
                  <p className="font-black text-white text-base tracking-tight">{label}</p>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: `${theme.primary}80` }}>{subtitle}</p>
                </div>

                <AnimatePresence>
                  {(isHov || isSel) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs"
                      style={{ background: `${theme.primary}20`, color: theme.primary, border: `1.5px solid ${theme.primary}40` }}
                    >
                      {isSel ? '✓ Selected!' : 'Choose This'} <ArrowRight size={12}/>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isSel && (
                  <motion.div
                    className="absolute inset-0 rounded-[28px] pointer-events-none"
                    animate={{ boxShadow: [`0 0 0px ${theme.primary}00`, `0 0 60px ${theme.primary}40`, `0 0 0px ${theme.primary}00`] }}
                    transition={{ duration: 1, repeat: 2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          className="flex items-center gap-2 text-xs font-bold"
          style={{ color: `${theme.primary}50` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles size={12} style={{ color: theme.primary }}/>
          Your Atomic will adapt to your theme & preferences
          <Sparkles size={12} style={{ color: theme.primary }}/>
        </motion.div>
      </motion.div>
    </div>
  );
}
