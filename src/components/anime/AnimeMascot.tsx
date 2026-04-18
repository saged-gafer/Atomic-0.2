"use client";
import React from 'react';
import { motion } from 'framer-motion';

export type MascotPose = 'wave' | 'study' | 'success' | 'think' | 'idle';
export type MascotExpression = 'happy' | 'focused' | 'excited' | 'surprised' | 'wink';

interface AnimeMascotProps {
  pose?: MascotPose;
  expression?: MascotExpression;
  size?: number;
  className?: string;
  primaryColor?: string;
  animate?: boolean;
}

export default function AnimeMascot({
  pose = 'idle',
  expression = 'happy',
  size = 200,
  className = '',
  primaryColor = '#a855f7',
  animate: shouldAnimate = true,
}: AnimeMascotProps) {
  const hairColor = primaryColor;
  const skinColor = '#fde8d0';
  const eyeColor = '#6366f1';
  const blazerColor = '#1e1b4b';
  const shirtColor = '#f0f4ff';
  const blushColor = '#fda4af';
  const tieColor = '#ec4899';

  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size * 1.35 }}
      animate={shouldAnimate ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 270" width={size} height={size * 1.35} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Skin gradient */}
          <radialGradient id="skinGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef3e8"/>
            <stop offset="100%" stopColor={skinColor}/>
          </radialGradient>
          {/* Hair gradient */}
          <radialGradient id="hairGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor={hairColor} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={hairColor} stopOpacity="1"/>
          </radialGradient>
          {/* Eye gradient */}
          <radialGradient id="eyeGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#818cf8"/>
            <stop offset="100%" stopColor={eyeColor}/>
          </radialGradient>
          {/* Blazer gradient */}
          <linearGradient id="blazerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d2870"/>
            <stop offset="100%" stopColor={blazerColor}/>
          </linearGradient>
          {/* Star glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ══ BODY ══ */}
        {/* Shadow under feet */}
        <ellipse cx="100" cy="262" rx="42" ry="7" fill="rgba(0,0,0,0.2)"/>

        {/* Legs */}
        <rect x="76"  y="208" width="20" height="44" rx="10" fill="#0f0d2a"/>
        <rect x="104" y="208" width="20" height="44" rx="10" fill="#0f0d2a"/>
        {/* Shoes */}
        <ellipse cx="86"  cy="252" rx="14" ry="8" fill="#1a1a2e"/>
        <ellipse cx="114" cy="252" rx="14" ry="8" fill="#1a1a2e"/>

        {/* Blazer body */}
        <path d="M 58 145 Q 55 170 54 210 L 146 210 Q 145 170 142 145 Q 130 138 100 138 Q 70 138 58 145 Z"
          fill="url(#blazerGrad)" stroke={`${hairColor}30`} strokeWidth="1"/>

        {/* White shirt collar */}
        <path d="M 84 138 Q 100 148 116 138 L 116 160 Q 100 165 84 160 Z" fill={shirtColor}/>
        {/* Tie */}
        <path d="M 96 148 L 104 148 L 107 172 L 100 176 L 93 172 Z" fill={tieColor}/>
        <path d="M 96 148 L 100 144 L 104 148" fill={tieColor} opacity="0.7"/>

        {/* Blazer lapels */}
        <path d="M 58 145 Q 70 142 84 138 L 76 162 Q 62 155 58 145 Z" fill="#252070" opacity="0.8"/>
        <path d="M 142 145 Q 130 142 116 138 L 124 162 Q 138 155 142 145 Z" fill="#252070" opacity="0.8"/>

        {/* Blazer buttons */}
        <circle cx="100" cy="175" r="2.5" fill={shirtColor} opacity="0.6"/>
        <circle cx="100" cy="188" r="2.5" fill={shirtColor} opacity="0.6"/>
        <circle cx="100" cy="201" r="2.5" fill={shirtColor} opacity="0.6"/>

        {/* ARMS */}
        {pose === 'wave' ? (
          <>
            {/* Left arm down */}
            <motion.g
              animate={shouldAnimate ? { rotate: [2, -2, 2] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: '65px 150px' }}
            >
              <rect x="50" y="148" width="18" height="55" rx="9" fill="url(#blazerGrad)"/>
              <ellipse cx="59" cy="206" rx="10" ry="9" fill="url(#skinGrad)"/>
            </motion.g>
            {/* Right arm WAVING */}
            <motion.g
              animate={shouldAnimate ? { rotate: [-15, 15, -15] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '135px 150px' }}
            >
              <rect x="132" y="136" width="18" height="52" rx="9" fill="url(#blazerGrad)"/>
              <ellipse cx="141" cy="190" rx="10" ry="9" fill="url(#skinGrad)"/>
              {/* Waving fingers */}
              <path d="M 133 185 Q 130 178 133 172" fill="none" stroke={skinColor} strokeWidth="4" strokeLinecap="round"/>
              <path d="M 140 183 Q 137 175 140 169" fill="none" stroke={skinColor} strokeWidth="4" strokeLinecap="round"/>
              <path d="M 147 185 Q 144 177 148 172" fill="none" stroke={skinColor} strokeWidth="4" strokeLinecap="round"/>
            </motion.g>
          </>
        ) : pose === 'study' ? (
          <>
            {/* Book held in front */}
            <rect x="50" y="152" width="18" height="52" rx="9" fill="url(#blazerGrad)"/>
            <rect x="132" y="152" width="18" height="52" rx="9" fill="url(#blazerGrad)"/>
            {/* Book */}
            <rect x="58" y="178" width="84" height="52" rx="5" fill="#7c3aed"/>
            <rect x="62" y="182" width="76" height="44" rx="3" fill="#a855f7"/>
            <line x1="100" y1="182" x2="100" y2="226" stroke="#6d28d9" strokeWidth="1.5"/>
            {/* Book lines */}
            {[190,197,204,211,218].map(y => <line key={y} x1="67" y1={y} x2="96" y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>)}
            {[190,197,204,211,218].map(y => <line key={y+1000} x1="104" y1={y} x2="133" y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>)}
          </>
        ) : pose === 'success' ? (
          <>
            {/* Both arms up */}
            <motion.g
              animate={shouldAnimate ? { rotate: [10, -5, 10] } : undefined}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '65px 150px' }}
            >
              <rect x="44" y="100" width="18" height="55" rx="9" fill="url(#blazerGrad)" transform="rotate(-35 53 127)"/>
              <ellipse cx="36" cy="100" rx="10" ry="9" fill="url(#skinGrad)"/>
            </motion.g>
            <motion.g
              animate={shouldAnimate ? { rotate: [-10, 5, -10] } : undefined}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '135px 150px' }}
            >
              <rect x="138" y="100" width="18" height="55" rx="9" fill="url(#blazerGrad)" transform="rotate(35 147 127)"/>
              <ellipse cx="164" cy="100" rx="10" ry="9" fill="url(#skinGrad)"/>
            </motion.g>
          </>
        ) : (
          <>
            {/* Default arms at sides */}
            <motion.g
              animate={shouldAnimate ? { rotate: [2, -1, 2] } : undefined}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformOrigin: '65px 150px' }}
            >
              <rect x="50" y="148" width="18" height="55" rx="9" fill="url(#blazerGrad)"/>
              <ellipse cx="59" cy="206" rx="10" ry="9" fill="url(#skinGrad)"/>
            </motion.g>
            <motion.g
              animate={shouldAnimate ? { rotate: [-2, 1, -2] } : undefined}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformOrigin: '135px 150px' }}
            >
              <rect x="132" y="148" width="18" height="55" rx="9" fill="url(#blazerGrad)"/>
              <ellipse cx="141" cy="206" rx="10" ry="9" fill="url(#skinGrad)"/>
            </motion.g>
          </>
        )}

        {/* ══ HEAD ══ */}
        {/* Neck */}
        <rect x="88" y="120" width="24" height="22" rx="10" fill="url(#skinGrad)"/>

        {/* Head base (face) */}
        <ellipse cx="100" cy="88" rx="52" ry="50" fill="url(#skinGrad)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5"/>

        {/* ══ HAIR ══ */}
        {/* Back hair */}
        <ellipse cx="100" cy="75" rx="55" ry="48" fill={hairColor}/>
        {/* Long hair pieces falling down */}
        <path d="M 52 80 Q 44 110 48 135 Q 52 132 55 140 Q 60 118 55 90 Z" fill={hairColor}/>
        <path d="M 148 80 Q 156 110 152 135 Q 148 132 145 140 Q 140 118 145 90 Z" fill={hairColor}/>
        {/* Bangs (front hair) */}
        <path d="M 52 72 Q 55 50 70 44 Q 80 55 88 58 Q 100 52 112 58 Q 120 55 130 44 Q 145 50 148 72 Q 140 60 128 68 Q 118 62 110 68 Q 105 60 100 62 Q 95 60 90 68 Q 82 62 72 68 Q 60 60 52 72 Z"
          fill={hairColor}/>
        {/* Ahoge (antenna hair) */}
        <motion.path d="M 100 38 Q 106 25 102 14 Q 98 10 96 18 Q 94 26 100 38 Z"
          fill={hairColor}
          animate={shouldAnimate ? { rotate: [-8, 8, -8], x: [-1, 1, -1] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 38px' }}
        />
        {/* Side hair accent */}
        <path d="M 52 72 Q 47 82 48 95 Q 51 90 53 80 Z" fill={`${hairColor}dd`}/>
        <path d="M 148 72 Q 153 82 152 95 Q 149 90 147 80 Z" fill={`${hairColor}dd`}/>
        {/* Hair shine */}
        <ellipse cx="80" cy="52" rx="12" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-25 80 52)"/>

        {/* ══ FACE ══ */}
        {/* Ears */}
        <ellipse cx="49" cy="90" rx="8" ry="10" fill="url(#skinGrad)"/>
        <ellipse cx="151" cy="90" rx="8" ry="10" fill="url(#skinGrad)"/>
        <ellipse cx="49" cy="90" rx="5" ry="7" fill={blushColor} opacity="0.2"/>
        <ellipse cx="151" cy="90" rx="5" ry="7" fill={blushColor} opacity="0.2"/>

        {/* ══ EYES ══ */}
        {expression === 'wink' ? (
          <>
            {/* Left eye normal */}
            <g>
              <ellipse cx="79" cy="89" rx="14" ry="16" fill="white"/>
              <ellipse cx="79" cy="91" rx="10" ry="12" fill="url(#eyeGrad)"/>
              <ellipse cx="79" cy="91" rx="5" ry="6" fill="#1e1b4b"/>
              <ellipse cx="73" cy="84" rx="4" ry="4.5" fill="white" opacity="0.95"/>
              <ellipse cx="83" cy="95" rx="2" ry="2.5" fill="white" opacity="0.7"/>
              {/* Lash */}
              <path d="M 65 80 Q 79 73 93 80" fill={`${hairColor}ee`} stroke={`${hairColor}ee`} strokeWidth="1"/>
            </g>
            {/* Right eye WINK (closed curved line) */}
            <path d="M 107 89 Q 120 80 133 89" fill="none" stroke={hairColor} strokeWidth="4" strokeLinecap="round"/>
            <path d="M 110 90 Q 121 86 132 91" fill="rgba(255,150,150,0.1)"/>
          </>
        ) : expression === 'surprised' ? (
          <>
            <g>
              <ellipse cx="79" cy="88" rx="16" ry="18" fill="white" stroke={hairColor} strokeWidth="2"/>
              <ellipse cx="79" cy="90" rx="11" ry="13" fill="url(#eyeGrad)"/>
              <ellipse cx="79" cy="90" rx="5.5" ry="6.5" fill="#1e1b4b"/>
              <ellipse cx="73" cy="83" rx="4.5" ry="5" fill="white" opacity="0.95"/>
            </g>
            <g>
              <ellipse cx="121" cy="88" rx="16" ry="18" fill="white" stroke={hairColor} strokeWidth="2"/>
              <ellipse cx="121" cy="90" rx="11" ry="13" fill="url(#eyeGrad)"/>
              <ellipse cx="121" cy="90" rx="5.5" ry="6.5" fill="#1e1b4b"/>
              <ellipse cx="115" cy="83" rx="4.5" ry="5" fill="white" opacity="0.95"/>
            </g>
          </>
        ) : expression === 'focused' ? (
          <>
            {/* Half-closed determined eyes */}
            <g>
              <ellipse cx="79" cy="91" rx="14" ry="12" fill="white"/>
              <ellipse cx="79" cy="93" rx="10" ry="9" fill="url(#eyeGrad)"/>
              <ellipse cx="79" cy="93" rx="5" ry="4.5" fill="#1e1b4b"/>
              <ellipse cx="73" cy="88" rx="3.5" ry="3.5" fill="white" opacity="0.95"/>
              {/* Half-lid */}
              <path d="M 65 87 Q 79 82 93 87" fill={`${hairColor}cc`}/>
            </g>
            <g>
              <ellipse cx="121" cy="91" rx="14" ry="12" fill="white"/>
              <ellipse cx="121" cy="93" rx="10" ry="9" fill="url(#eyeGrad)"/>
              <ellipse cx="121" cy="93" rx="5" ry="4.5" fill="#1e1b4b"/>
              <ellipse cx="115" cy="88" rx="3.5" ry="3.5" fill="white" opacity="0.95"/>
              <path d="M 107 87 Q 121 82 135 87" fill={`${hairColor}cc`}/>
            </g>
            {/* Determined eyebrows */}
            <path d="M 66 80 Q 79 75 92 80" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M 108 80 Q 121 75 134 80" fill="none" stroke={hairColor} strokeWidth="3.5" strokeLinecap="round"/>
          </>
        ) : (
          <>
            {/* Default happy eyes */}
            <g>
              <ellipse cx="79" cy="89" rx="15" ry="17" fill="white"/>
              <ellipse cx="79" cy="91" rx="11" ry="13" fill="url(#eyeGrad)"/>
              <ellipse cx="79" cy="91" rx="5.5" ry="6.5" fill="#1e1b4b"/>
              <ellipse cx="73" cy="84" rx="4.5" ry="5" fill="white" opacity="0.95"/>
              <ellipse cx="84" cy="97" rx="2" ry="2.5" fill="white" opacity="0.7"/>
              <circle cx="87" cy="84" rx="1.5" fill="white" opacity="0.5"/>
              {/* Upper lash */}
              <path d="M 65 79 Q 79 72 93 79" fill={hairColor}/>
            </g>
            <g>
              <ellipse cx="121" cy="89" rx="15" ry="17" fill="white"/>
              <ellipse cx="121" cy="91" rx="11" ry="13" fill="url(#eyeGrad)"/>
              <ellipse cx="121" cy="91" rx="5.5" ry="6.5" fill="#1e1b4b"/>
              <ellipse cx="115" cy="84" rx="4.5" ry="5" fill="white" opacity="0.95"/>
              <ellipse cx="126" cy="97" rx="2" ry="2.5" fill="white" opacity="0.7"/>
              <circle cx="129" cy="84" r="1.5" fill="white" opacity="0.5"/>
              <path d="M 107 79 Q 121 72 135 79" fill={hairColor}/>
            </g>
            {/* Curved happy eyebrows */}
            <path d="M 66 78 Q 79 73 92 78" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 108 78 Q 121 73 134 78" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round"/>
          </>
        )}

        {/* ══ NOSE & MOUTH ══ */}
        {/* Tiny cute nose */}
        <ellipse cx="100" cy="105" rx="2.5" ry="1.8" fill={blushColor} opacity="0.5"/>

        {/* Mouth */}
        {expression === 'happy' || pose === 'success' || pose === 'wave' ? (
          <>
            <path d="M 88 112 Q 100 121 112 112" fill="#f97316" opacity="0.8"/>
            <path d="M 88 112 Q 100 122 112 112" fill="none" stroke={`${hairColor}aa`} strokeWidth="2" strokeLinecap="round"/>
          </>
        ) : expression === 'focused' || pose === 'study' ? (
          <path d="M 92 114 Q 100 116 108 114" fill="none" stroke={`${hairColor}aa`} strokeWidth="2" strokeLinecap="round"/>
        ) : expression === 'surprised' ? (
          <ellipse cx="100" cy="116" rx="7" ry="5" fill="#f97316" opacity="0.7"/>
        ) : (
          <path d="M 90 113 Q 100 120 110 113" fill="none" stroke={`${hairColor}aa`} strokeWidth="2.5" strokeLinecap="round"/>
        )}

        {/* Blush marks */}
        <motion.g
          animate={shouldAnimate ? { opacity: [0.6, 0.9, 0.6] } : undefined}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ellipse cx="62" cy="100" rx="9" ry="5" fill={blushColor} opacity="0.55"/>
          <ellipse cx="138" cy="100" rx="9" ry="5" fill={blushColor} opacity="0.55"/>
        </motion.g>

        {/* ══ SPARKLE DECORATIONS ══ */}
        {(pose === 'success' || pose === 'wave') && shouldAnimate && [
          { x: 32, y: 55, delay: 0 },
          { x: 168, y: 48, delay: 0.4 },
          { x: 22, y: 120, delay: 0.8 },
          { x: 178, y: 115, delay: 1.2 },
        ].map((s, i) => (
          <motion.g key={i}
            animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: s.delay, repeatDelay: 1 }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <line x1={s.x-8} y1={s.y} x2={s.x+8} y2={s.y} stroke="#facc15" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1={s.x} y1={s.y-8} x2={s.x} y2={s.y+8} stroke="#facc15" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1={s.x-5} y1={s.y-5} x2={s.x+5} y2={s.y+5} stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1={s.x+5} y1={s.y-5} x2={s.x-5} y2={s.y+5} stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx={s.x} cy={s.y} r="3" fill="#facc15"/>
          </motion.g>
        ))}

        {/* Study glasses (only for study pose) */}
        {pose === 'study' && (
          <g opacity="0.9">
            <rect x="62" y="84" width="32" height="20" rx="6" fill="none" stroke={primaryColor} strokeWidth="2.5"/>
            <rect x="106" y="84" width="32" height="20" rx="6" fill="none" stroke={primaryColor} strokeWidth="2.5"/>
            <line x1="94" y1="92" x2="106" y2="92" stroke={primaryColor} strokeWidth="2"/>
            <line x1="50" y1="92" x2="62" y2="92" stroke={primaryColor} strokeWidth="2"/>
            <line x1="138" y1="92" x2="150" y2="92" stroke={primaryColor} strokeWidth="2"/>
            <rect x="64" y="86" width="28" height="16" rx="5" fill={`${primaryColor}15`}/>
            <rect x="108" y="86" width="28" height="16" rx="5" fill={`${primaryColor}15`}/>
          </g>
        )}

        {/* Think bubble */}
        {pose === 'think' && (
          <g>
            <circle cx="155" cy="38" r="3" fill="white" opacity="0.6"/>
            <circle cx="163" cy="28" r="5" fill="white" opacity="0.7"/>
            <circle cx="173" cy="18" r="7" fill="white" opacity="0.8"/>
            <rect x="162" y="8" width="32" height="24" rx="8" fill="white" opacity="0.85"/>
            {/* Question mark */}
            <text x="174" y="25" fontSize="14" fontWeight="900" fill={primaryColor} textAnchor="middle">?</text>
          </g>
        )}
      </svg>
    </motion.div>
  );
}

/* ─── Chibi mini version for sidebar/avatar ─────────── */
export function MiniMascot({ color = '#a855f7', size = 40 }: { color?: string; size?: number }) {
  return (
    <motion.div style={{ width: size, height: size }}
      animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <ellipse cx="40" cy="40" rx="36" ry="36" fill={`${color}20`}/>
        {/* Mini face */}
        <ellipse cx="40" cy="38" rx="22" ry="20" fill="#fde8d0"/>
        {/* Hair */}
        <ellipse cx="40" cy="26" rx="24" ry="16" fill={color}/>
        <path d="M 20 32 Q 17 42 19 50 Q 21 48 22 40 Z" fill={color}/>
        <path d="M 60 32 Q 63 42 61 50 Q 59 48 58 40 Z" fill={color}/>
        {/* Eyes */}
        <ellipse cx="33" cy="38" rx="5.5" ry="6.5" fill="white"/>
        <ellipse cx="33" cy="39" rx="3.5" ry="4.5" fill="#6366f1"/>
        <ellipse cx="31" cy="36" rx="1.5" ry="1.8" fill="white"/>
        <ellipse cx="47" cy="38" rx="5.5" ry="6.5" fill="white"/>
        <ellipse cx="47" cy="39" rx="3.5" ry="4.5" fill="#6366f1"/>
        <ellipse cx="45" cy="36" rx="1.5" ry="1.8" fill="white"/>
        {/* Smile */}
        <path d="M 35 47 Q 40 51 45 47" fill="none" stroke={`${color}aa`} strokeWidth="1.8" strokeLinecap="round"/>
        {/* Blush */}
        <ellipse cx="26" cy="44" rx="5" ry="3" fill="#fda4af" opacity="0.5"/>
        <ellipse cx="54" cy="44" rx="5" ry="3" fill="#fda4af" opacity="0.5"/>
      </svg>
    </motion.div>
  );
}

/* ─── Star burst decoration ─────────────────────────── */
export function StarBurst({ color = '#facc15', size = 24, className = '' }: { color?: string; size?: number; className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" width={size} height={size} className={className}
      animate={{ rotate: [0, 15, -10, 5, 0], scale: [1, 1.2, 0.9, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M12 2 L13.5 9 L20 8 L15 13 L17 20 L12 16 L7 20 L9 13 L4 8 L10.5 9 Z" fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round"/>
    </motion.svg>
  );
}
