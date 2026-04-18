"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import {
  Loader2, Lock, ArrowRight, Wand2, Sparkles,
  Brain, TrendingUp, Shield, Rocket, Star, Check,
} from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ══════════════════════════════════════════════════════
   STUDYING PERSON SCENE
══════════════════════════════════════════════════════ */
const FORMULAS = ['∑', 'π', '∫', 'E=mc²', '∇', 'Δx', 'λ', 'θ', '∞', '∂'];

function FloatingFormula({ text, x, y, delay, color }: { text:string; x:number; y:number; delay:number; color:string }) {
  return (
    <motion.text
      x={x} y={y}
      fontSize={text.length > 2 ? "10" : "14"}
      fontWeight="bold"
      fontFamily="Georgia, serif"
      fill={color}
      initial={{ opacity: 0, y: y }}
      animate={{ opacity: [0, 0.7, 0.7, 0], y: [y, y - 35, y - 60, y - 80] }}
      transition={{ duration: 5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 3, ease: 'easeOut' }}
    />
  );
}

function StudyScene({ primary, secondary, accent }: { primary: string; secondary: string; accent: string }) {
  return (
    <div className="relative w-full h-full flex items-end justify-center select-none">
      <svg viewBox="0 0 520 360" className="w-full max-w-[580px]" style={{ filter:`drop-shadow(0 0 40px ${primary}30)` }}>
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id="lampGlow" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="deskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.1" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b4a78"/>
            <stop offset="100%" stopColor="#252e52"/>
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2540"/>
            <stop offset="100%" stopColor="#151a30"/>
          </linearGradient>
          <linearGradient id="bookSpine1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primary}/>
            <stop offset="100%" stopColor={secondary}/>
          </linearGradient>
        </defs>

        {/* ── Floor shadow ── */}
        <ellipse cx="260" cy="348" rx="210" ry="10" fill="rgba(0,0,0,0.35)" />

        {/* ── Desk ── */}
        <rect x="45" y="240" width="430" height="22" rx="4" fill="url(#deskGrad)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        {/* Desk legs */}
        <rect x="75"  y="262" width="14" height="75" rx="3" fill="#10142a"/>
        <rect x="431" y="262" width="14" height="75" rx="3" fill="#10142a"/>
        {/* Desk under-glow */}
        <ellipse cx="260" cy="248" rx="200" ry="8" fill={`${primary}08`} />

        {/* ── Books stack (left) ── */}
        {/* Book 3 - bottom */}
        <rect x="62" y="222" width="88" height="17" rx="3" fill="url(#bookSpine1)"/>
        <rect x="65" y="222" width="82" height="17" rx="2" fill={`${primary}cc`}/>
        <line x1="75" y1="225" x2="140" y2="225" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
        <line x1="75" y1="232" x2="140" y2="232" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
        {/* Book 2 */}
        <rect x="64" y="207" width="84" height="15" rx="3" fill={secondary}/>
        <line x1="74" y1="212" x2="140" y2="212" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        {/* Book 1 - top */}
        <rect x="66" y="194" width="80" height="13" rx="3" fill={accent}/>
        <line x1="76" y1="200" x2="138" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>

        {/* ── Open book on desk ── */}
        {/* Left page */}
        <path d="M 170 240 Q 230 225 260 232 L 260 240 Z" fill="rgba(245,240,230,0.92)"/>
        {/* Right page */}
        <path d="M 260 232 Q 290 225 350 240 L 260 240 Z" fill="rgba(240,235,220,0.88)"/>
        {/* Book lines */}
        {[228,233,238].map((y,i) => (
          <line key={i} x1="178" y1={y} x2="252" y2={y-4} stroke="rgba(100,90,70,0.25)" strokeWidth="0.7"/>
        ))}
        {[228,233,238].map((y,i) => (
          <line key={i} x1="268" y1={y-4} x2="340" y2={y} stroke="rgba(100,90,70,0.2)" strokeWidth="0.7"/>
        ))}
        {/* Book spine shadow */}
        <line x1="260" y1="231" x2="260" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>

        {/* ── Person (chair back) ── */}
        <rect x="148" y="195" width="12" height="55" rx="4" fill="#1a1f3a"/>
        <rect x="194" y="195" width="12" height="55" rx="4" fill="#1a1f3a"/>
        <rect x="148" y="197" width="58" height="14" rx="4" fill="#222840"/>

        {/* ── Person body ── */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Body */}
          <rect x="152" y="195" width="54" height="46" rx="10" fill="url(#bodyGrad)"/>
          {/* Collar */}
          <path d="M 172 195 Q 179 202 186 195" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

          {/* Neck */}
          <rect x="170" y="176" width="18" height="20" rx="5" fill="#e8b89a"/>

          {/* Head */}
          <circle cx="179" cy="162" r="24" fill="#f0c8a8"/>
          {/* Hair */}
          <path d="M 156 155 Q 159 135 179 132 Q 199 135 202 155 Q 199 138 179 135 Q 159 138 156 155 Z" fill="#1a0f08"/>
          <ellipse cx="179" cy="136" rx="22" ry="10" fill="#1a0f08"/>
          <ellipse cx="157" cy="155" rx="6" ry="10" fill="#1a0f08"/>
          <ellipse cx="201" cy="155" rx="6" ry="10" fill="#1a0f08"/>

          {/* Eyes */}
          <motion.g animate={{ scaleY:[1,1,1,0.08,1] }} transition={{ duration:4, repeat:Infinity, repeatDelay:3, times:[0,0.9,0.93,0.96,1] }}>
            <ellipse cx="171" cy="161" rx="4.5" ry="5" fill="#1a1410"/>
            <ellipse cx="187" cy="161" rx="4.5" ry="5" fill="#1a1410"/>
            <circle cx="173" cy="159" r="1.5" fill="rgba(255,255,255,0.8)"/>
            <circle cx="189" cy="159" r="1.5" fill="rgba(255,255,255,0.8)"/>
          </motion.g>
          {/* Eyebrows */}
          <path d="M 166 154 Q 171 151 176 153" fill="none" stroke="#3d2010" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M 182 153 Q 187 151 192 154" fill="none" stroke="#3d2010" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Nose */}
          <path d="M 178 165 Q 175 170 178 172 Q 181 170 178 165" fill="none" stroke="#c4906e" strokeWidth="1.2" strokeLinecap="round"/>
          {/* Mouth - slight smile */}
          <path d="M 173 175 Q 179 179 185 175" fill="none" stroke="#b07848" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Left arm reaching to book (writing) */}
          <motion.g
            animate={{ x: [0, 6, 0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          >
            <path d="M 152 210 Q 135 225 160 235" fill="none" stroke="#e8b89a" strokeWidth="13" strokeLinecap="round"/>
            {/* Pencil */}
            <rect x="156" y="230" width="3.5" height="18" rx="1.5" fill="#f59e0b" transform="rotate(-25 158 235)"/>
            <path d="M 155 244 L 158 250 L 162 244 Z" fill="#fca5a5" transform="rotate(-25 158 235)"/>
          </motion.g>

          {/* Right arm resting */}
          <path d="M 206 210 Q 225 220 240 225" fill="none" stroke="#e8b89a" strokeWidth="12" strokeLinecap="round"/>
        </motion.g>

        {/* ── Laptop (right side) ── */}
        {/* Screen */}
        <rect x="295" y="155" width="108" height="80" rx="5" fill="#0a0d1a" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <rect x="298" y="158" width="102" height="74" rx="3" fill="url(#screenGlow)"/>
        {/* Screen content lines */}
        <line x1="307" y1="167" x2="390" y2="167" stroke={`${primary}60`} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="307" y1="175" x2="370" y2="175" stroke={`${primary}40`} strokeWidth="1" strokeLinecap="round"/>
        <line x1="307" y1="183" x2="380" y2="183" stroke={`${primary}35`} strokeWidth="1" strokeLinecap="round"/>
        <line x1="307" y1="191" x2="360" y2="191" stroke={`${primary}30`} strokeWidth="1" strokeLinecap="round"/>
        {/* Screen code block rect */}
        <rect x="307" y="197" width="85" height="28" rx="3" fill={`${primary}15`}/>
        <line x1="312" y1="204" x2="375" y2="204" stroke={`${accent}50`} strokeWidth="1.2"/>
        <line x1="312" y1="211" x2="360" y2="211" stroke={`${secondary}40`} strokeWidth="1"/>
        <line x1="312" y1="218" x2="370" y2="218" stroke={`${accent}35`} strokeWidth="1"/>
        {/* Screen cursor blink */}
        <motion.rect x="313" y="223" width="6" height="2" rx="1" fill={primary}
          animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        />
        {/* Laptop hinge/base */}
        <rect x="290" y="235" width="118" height="5" rx="2" fill="#0d1020" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        {/* Laptop base */}
        <rect x="285" y="238" width="128" height="3" rx="1.5" fill="#080c18"/>

        {/* Screen glow on desk */}
        <motion.ellipse cx="349" cy="242" rx="55" ry="8" fill={primary}
          animate={{ opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 3, repeat: Infinity }}
        />

        {/* ── Desk lamp ── */}
        {/* Base */}
        <rect x="430" y="234" width="30" height="6" rx="3" fill="#252e52"/>
        <rect x="441" y="210" width="8" height="26" rx="3" fill="#1e2545"/>
        {/* Arm */}
        <line x1="445" y1="210" x2="425" y2="170" stroke="#2a3560" strokeWidth="6" strokeLinecap="round"/>
        {/* Head */}
        <path d="M 406 160 Q 427 150 448 160 L 444 178 Q 427 172 410 178 Z" fill="#323c6e"/>
        <ellipse cx="427" cy="178" rx="18" ry="5" fill="#fde68a" opacity="0.3"/>
        {/* Lamp light rays */}
        <motion.ellipse cx="427" cy="200" rx="70" ry="45" fill="url(#lampGlow)"
          animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Coffee mug ── */}
        <rect x="128" y="225" width="30" height="15" rx="4" fill="#2d1b4e"/>
        <path d="M 158 228 Q 167 228 167 235 Q 167 242 158 242" fill="none" stroke="#2d1b4e" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="130" y="225" width="26" height="4" rx="2" fill="#1a0f28"/>
        <ellipse cx="143" cy="225" rx="13" ry="3.5" fill="#0a0510"/>
        {/* Steam */}
        <motion.path d="M 138 222 Q 140 215 138 208" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.25, 0.1, 0.25], y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path d="M 147 220 Q 149 213 147 206" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.08, 0.2], y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* ── Plant (far left) ── */}
        <rect x="50" y="227" width="22" height="14" rx="3" fill="#2a1a08"/>
        <ellipse cx="61" cy="227" rx="11" ry="5" fill="#1a0f05"/>
        <path d="M 61 225 Q 50 200 42 185" fill="none" stroke="#14532d" strokeWidth="4" strokeLinecap="round"/>
        <ellipse cx="42" cy="183" rx="12" ry="9" fill="#166534" transform="rotate(-20 42 183)"/>
        <path d="M 61 225 Q 70 205 75 195" fill="none" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round"/>
        <ellipse cx="77" cy="193" rx="11" ry="8" fill="#15803d" transform="rotate(15 77 193)"/>
        <path d="M 61 225 Q 58 210 55 200" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="53" cy="198" rx="9" ry="7" fill="#16a34a" transform="rotate(-10 53 198)"/>

        {/* ── Floating formulas ── */}
        {[
          { t: '∑', x: 90,  y: 160, delay: 0,   c: `${primary}cc` },
          { t: 'π', x: 460, y: 140, delay: 1.5, c: `${secondary}cc` },
          { t: '∫', x: 30,  y: 120, delay: 3,   c: `${accent}cc` },
          { t: 'λ', x: 490, y: 200, delay: 2,   c: `${primary}aa` },
          { t: '∞', x: 60,  y: 80,  delay: 4.5, c: `${secondary}bb` },
          { t: 'E=mc²', x: 400, y: 100, delay: 1, c: `${accent}aa` },
          { t: '∇', x: 130, y: 70, delay: 6, c: `${primary}cc` },
          { t: 'θ', x: 480, y: 80, delay: 3.5, c: `${secondary}aa` },
        ].map((f, i) => (
          <FloatingFormula key={i} text={f.t} x={f.x} y={f.y} delay={f.delay} color={f.c} />
        ))}

        {/* ── Sparkle stars ── */}
        {[
          { x:110,y:110 }, {x:390,y:130}, {x:30,y:190}, {x:470,y:170}, {x:200,y:80}, {x:320,y:95}
        ].map((s,i) => (
          <motion.g key={i}>
            <motion.circle cx={s.x} cy={s.y} r="2.5" fill={i%2===0 ? primary : secondary}
              animate={{ scale:[1,1.8,1], opacity:[0.4,1,0.4] }}
              transition={{ duration: 2+i*0.4, repeat:Infinity, delay: i*0.7 }}
              filter="url(#glow)"
            />
            {/* Plus sparkle */}
            <motion.line x1={s.x-5} y1={s.y} x2={s.x+5} y2={s.y} stroke={i%2===0 ? primary : secondary} strokeWidth="1"
              animate={{ opacity:[0,0.8,0], scale:[0.5,1,0.5] }} transition={{ duration:2+i*0.4, repeat:Infinity, delay:i*0.7 }}
            />
            <motion.line x1={s.x} y1={s.y-5} x2={s.x} y2={s.y+5} stroke={i%2===0 ? primary : secondary} strokeWidth="1"
              animate={{ opacity:[0,0.8,0], scale:[0.5,1,0.5] }} transition={{ duration:2+i*0.4, repeat:Infinity, delay:i*0.7 }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Scene ground glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-2xl pointer-events-none"
        style={{ background:`radial-gradient(ellipse, ${primary}15 0%, transparent 70%)` }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   THEME TOGGLE BUTTON
══════════════════════════════════════════════════════ */
function ThemeToggleBtn() {
  const { theme, toggleTheme, themeName } = useTheme();
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    toggleTheme();
    setTimeout(() => setAnimating(false), 800);
  };

  const nextName = themeName === 'nebula' ? 'Jade Dusk' : 'Nebula';

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border backdrop-blur-xl overflow-hidden z-50"
      style={{
        background: `${theme.primary}12`,
        borderColor: `${theme.primary}35`,
        boxShadow: `0 0 20px ${theme.primary}20`,
      }}
    >
      {/* Shimmer on click */}
      <AnimatePresence>
        {animating && (
          <motion.div className="absolute inset-0"
            initial={{ x: '-100%', opacity: 0.8 }}
            animate={{ x: '200%', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}60, transparent)` }}
          />
        )}
      </AnimatePresence>
      <motion.div animate={{ rotate: animating ? 360 : 0 }} transition={{ duration: 0.6 }}>
        <Wand2 size={15} style={{ color: theme.primary }} />
      </motion.div>
      <div className="flex flex-col items-start">
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 leading-none">Theme</span>
        <span className="text-[11px] font-black text-white leading-tight">→ {nextName}</span>
      </div>
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════
   BEAM SWEEP & TILT CARD
══════════════════════════════════════════════════════ */
function BeamSweep({ color }: { color: string }) {
  return (
    <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-30"
      style={{ background: `linear-gradient(90deg,rgba(0,0,0,0),${color},rgba(0,0,0,0))` }}
      animate={{ top: ['-1px', '101%'] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 90, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 90, damping: 16 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════════════ */
function Typewriter({ texts, color }: { texts: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!del && chars < cur.length)    { const t = setTimeout(() => setChars(c => c + 1), 52); return () => clearTimeout(t); }
    if (!del && chars === cur.length)  { const t = setTimeout(() => setDel(true), 2500);        return () => clearTimeout(t); }
    if (del  && chars > 0)             { const t = setTimeout(() => setChars(c => c - 1), 28); return () => clearTimeout(t); }
    if (del  && chars === 0)           { setDel(false); setIdx(i => (i + 1) % texts.length); }
  }, [chars, del, idx, texts]);
  return (
    <span>
      <span style={{ color }} className="font-semibold">{texts[idx].slice(0, chars)}</span>
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.75, repeat: Infinity }}
        style={{ display: 'inline-block', width: 2, height: '1em', background: color, borderRadius: 1, marginLeft: 3, verticalAlign: 'middle' }}
      />
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   CTA BUTTON
══════════════════════════════════════════════════════ */
function CTAButton({ label, gradient, color, loading, onClick }: {
  label: string; gradient: string; color: string; loading: boolean; onClick: () => void;
}) {
  const [burst, setBurst] = useState(false);
  const handle = () => {
    setBurst(true); setTimeout(() => setBurst(false), 600); onClick();
  };
  return (
    <div className="relative mt-6">
      <AnimatePresence>
        {burst && Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <motion.div key={i} className="absolute rounded-full pointer-events-none z-50"
              style={{ width: 6, height: 6, background: color, left: '50%', top: '50%' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(a) * 50, y: Math.sin(a) * 40, opacity: 0, scale: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          );
        })}
      </AnimatePresence>
      <motion.button onClick={handle} disabled={loading}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative w-full overflow-hidden rounded-2xl font-black text-white"
        style={{ height: 52 }}
      >
        <div className="absolute inset-0" style={{ background: gradient }} />
        <motion.div className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg,rgba(0,0,0,0) 30%,rgba(255,255,255,0.22) 50%,rgba(0,0,0,0) 70%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
        <motion.div className="absolute inset-0 rounded-2xl"
          animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 30px ${color}55`, `0 0 0px ${color}00`] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[13px] tracking-widest uppercase">
          {loading ? <Loader2 size={18} className="animate-spin" />
            : <><span>{label}</span><motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={16} /></motion.div></>
          }
        </span>
      </motion.button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   REGISTER STEPS
══════════════════════════════════════════════════════ */
const REG_STEPS = [
  { icon: Rocket,     label: 'Create your profile',   color: '#f472b6' },
  { icon: Brain,      label: 'Build your study plan',  color: '#fbbf24' },
  { icon: TrendingUp, label: 'Track your progress',    color: '#34d399' },
  { icon: Star,       label: 'Level up with AI',       color: '#a78bfa' },
];

/* ══════════════════════════════════════════════════════
   MAIN AUTH SCREEN
══════════════════════════════════════════════════════ */
export default function AuthScreen() {
  const { login } = useAppContext();
  const { theme } = useTheme();
  const [hasStored,      setHasStored]      = useState(false);
  const [mode,           setMode]           = useState<Mode>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username,       setUsername]       = useState('');
  const [password,       setPassword]       = useState('');
  const [errors,         setErrors]         = useState<Record<string, string | undefined>>({});
  const [submitting,     setSubmitting]     = useState(false);
  const [shake,          setShake]          = useState(false);
  const [mounted,        setMounted]        = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const s = localStorage.getItem('study_planner_user_data');
      setHasStored(!!s);
      setMode(s ? 'login' : 'register');
    }, 0);
  }, []);

  const triggerShake = useCallback(() => {
    setShake(true); setTimeout(() => setShake(false), 600);
  }, []);

  const handleLogin = useCallback(() => {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = 'Username is required';
    if (!password.trim()) e.password = 'Password is required';
    if (Object.keys(e).length) { setErrors(e); triggerShake(); return; }
    setSubmitting(true);
    const ok = login(username.trim(), password.trim());
    if (!ok) { setErrors({ credentials: 'Incorrect username or password.' }); setSubmitting(false); triggerShake(); }
  }, [username, password, login, triggerShake]);

  if (showOnboarding) return <OnboardingFlow />;

  /* ── LOGIN LAYOUT ── */
  if (mode === 'login') return (
    <div className="min-h-screen w-full flex relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 20% 50%, ${theme.bgDeep} 0%, ${theme.bg} 60%)` }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.018) 0px,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 4px)' }}
      />

      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-50">
        {mounted && <ThemeToggleBtn />}
      </div>

      {/* ── LEFT: Studying scene ── */}
      <motion.div
        className="hidden lg:flex flex-col flex-1 relative overflow-hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        {/* Ambient glow behind scene */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 40% 70%, ${theme.primary}12 0%, transparent 65%)` }}
        />

        {/* Brand */}
        <motion.div className="absolute top-8 left-10 flex items-center gap-3 z-10"
          initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${theme.primary},${theme.secondary})` }}
            animate={{ boxShadow: [`0 0 20px ${theme.primary}60`, `0 0 35px ${theme.secondary}80`, `0 0 20px ${theme.primary}60`] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={16} className="text-white" />
          </motion.div>
          <div>
            <p className="text-base font-black text-white tracking-widest leading-none">ATOMIC</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: `${theme.primary}80` }}>Study Platform</p>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div className="absolute top-28 left-10 z-10"
          initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] mb-2" style={{ color: `${theme.primary}80` }}>Welcome back</p>
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter text-white leading-[0.9] mb-3">
            Study<br/>Smarter.
          </h1>
          <p className="text-lg text-slate-400">
            <Typewriter
              texts={['Powered by AI insights.', 'Every session counts.', 'Your goals, unlocked.']}
              color={theme.primary}
            />
          </p>
        </motion.div>

        {/* THE SCENE */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[65%]"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.22,1,0.36,1] }}
        >
          {mounted && <StudyScene primary={theme.primary} secondary={theme.secondary} accent={theme.accent} />}
        </motion.div>

        {/* Feature pills (bottom-left) */}
        <motion.div className="absolute bottom-8 left-8 flex gap-2 z-10"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}
        >
          {[
            { icon: Brain, label: 'AI Planning', color: theme.primary },
            { icon: Shield, label: 'Private', color: theme.accent },
            { icon: TrendingUp, label: 'Analytics', color: theme.secondary },
          ].map((f, i) => (
            <motion.div key={f.label} whileHover={{ y: -3 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm"
              style={{ background: `${f.color}10`, borderColor: `${f.color}25` }}
            >
              <f.icon size={11} style={{ color: f.color }} />
              <span className="text-[11px] font-bold text-white">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Vertical divider */}
        <motion.div className="absolute right-0 top-[10%] bottom-[10%] w-px"
          style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0), ${theme.primary}20, rgba(0,0,0,0))` }}
        />
      </motion.div>

      {/* ── RIGHT: Login form ── */}
      <div className="flex-1 lg:max-w-[470px] flex items-center justify-center p-5 sm:p-8 relative">
        {/* Panel glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${theme.primary}14 0%, rgba(0,0,0,0) 65%)` }}
        />

        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Switch to register (mobile) */}
          <div className="lg:hidden mb-4 flex justify-center">
            <ThemeToggleBtn />
          </div>

          <TiltCard>
            <div className="relative rounded-[2.2rem] overflow-hidden"
              style={{ background: theme.cardBg, backdropFilter: 'blur(40px)', boxShadow: `0 0 0 1px ${theme.cardBorder}, 0 40px 80px -10px rgba(0,0,0,0.96), 0 0 80px -15px ${theme.primary}35` }}
            >
              <BeamSweep color={`${theme.primary}80`} />
              {/* Animated top border */}
              <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
                animate={{ background: [
                  `linear-gradient(90deg,rgba(0,0,0,0),${theme.primary},${theme.secondary},rgba(0,0,0,0))`,
                  `linear-gradient(90deg,rgba(0,0,0,0),${theme.secondary},${theme.primary},rgba(0,0,0,0))`,
                ]}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Corner accent */}
              <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[60px] pointer-events-none"
                style={{ background: `${theme.primary}28` }} />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-[50px] pointer-events-none"
                style={{ background: `${theme.accent}15` }} />

              <div className="relative z-10 p-8 sm:p-10">
                {/* Brand row */}
                <div className="flex items-center gap-3 mb-7">
                  <motion.div className="w-9 h-9 rounded-2xl flex items-center justify-center"
                    animate={{ background: `linear-gradient(135deg,${theme.primary},${theme.secondary})` }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-sm font-black text-white">A</span>
                  </motion.div>
                  <div>
                    <span className="text-base font-black text-white tracking-wider leading-none block">ATOMIC</span>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">v2.0 · Premium</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                  >
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    <span className="text-[10px] font-bold text-emerald-400">Live</span>
                  </div>
                </div>

                {/* Form header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Welcome back 👋</h2>
                  <p className="text-sm text-slate-500">Sign in to continue your study journey</p>
                </div>

                {/* Form */}
                <motion.form
                  animate={shake ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.45 }}
                  onSubmit={e => { e.preventDefault(); handleLogin(); }}
                  className="space-y-4"
                >
                  <FloatingInput label="Username" value={username}
                    onChange={e => { setUsername(e.target.value); setErrors({}); }}
                    error={errors.username} autoComplete="username"
                  />
                  <FloatingInput label="Password" type="password" value={password}
                    onChange={e => { setPassword(e.target.value); setErrors({}); }}
                    error={errors.password} autoComplete="current-password"
                  />
                  <input type="submit" className="hidden" />
                </motion.form>

                <AnimatePresence>
                  {errors.credentials && (
                    <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <Lock size={12} className="text-red-400 shrink-0" />
                      <p className="text-xs font-bold text-red-400">{errors.credentials}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <CTAButton label="Sign In" gradient={theme.ctaGradient} color={theme.primary} loading={submitting} onClick={handleLogin} />

                {!hasStored && (
                  <p className="mt-5 text-center text-xs text-slate-600">
                    No account?{' '}
                    <button onClick={() => setMode('register')} className="font-bold hover:underline" style={{ color: theme.secondary }}>
                      Create one free →
                    </button>
                  </p>
                )}

                {/* Theme toggle at bottom on desktop */}
                <div className="mt-6 flex justify-center">
                  <ThemeToggleBtn />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );

  /* ══ REGISTER LAYOUT ══ */
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 70% 30%, ${theme.bgDeep} 0%, ${theme.bg} 60%)` }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.018) 0px,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 4px)' }}
      />

      {/* Background ambient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[150px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.primary}18 0%, rgba(0,0,0,0) 70%)` }}
      />
      <div className="absolute bottom-[-15%] left-[-8%] w-[40vw] h-[40vw] rounded-full blur-[130px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.secondary}14 0%, rgba(0,0,0,0) 70%)` }}
      />

      {/* Studying figure in background (subtle) */}
      <motion.div
        className="absolute inset-0 flex items-end justify-start pl-4 pb-0 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ duration: 1.5, delay: 0.5 }}
        style={{ filter: `blur(1px) saturate(0.7)` }}
      >
        {mounted && <StudyScene primary={theme.primary} secondary={theme.secondary} accent={theme.accent} />}
      </motion.div>

      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-50">
        {mounted && <ThemeToggleBtn />}
      </div>

      {/* Two-panel layout */}
      <div className="relative z-10 flex items-center gap-8 w-full max-w-5xl px-5">

        {/* LEFT – branding & steps */}
        <motion.div className="hidden lg:flex flex-col gap-8 flex-1 max-w-md"
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg,${theme.primary},${theme.secondary})` }}
              animate={{ boxShadow: [`0 0 25px ${theme.primary}60`, `0 0 40px ${theme.secondary}80`, `0 0 25px ${theme.primary}60`] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
            <div>
              <p className="text-xl font-black text-white tracking-widest">ATOMIC</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: `${theme.primary}80` }}>Study Platform · v2.0</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] mb-3" style={{ color: `${theme.primary}90` }}>Start your journey</p>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter text-white leading-[0.92] mb-4">
              Learn<br/>Without<br/>Limits.
            </h1>
            <p className="text-lg text-slate-400">
              <Typewriter
                texts={['AI-powered study plans.', 'Built for serious learners.', 'Track every achievement.']}
                color={theme.primary}
              />
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-0">
            {REG_STEPS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                className="flex items-start gap-4 relative"
              >
                {i < REG_STEPS.length - 1 && (
                  <div className="absolute left-4 top-9 w-px h-8" style={{ background: `linear-gradient(to bottom, ${s.color}40, rgba(0,0,0,0))` }} />
                )}
                <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 relative z-10"
                  style={{ background: `${s.color}20`, border: `1px solid ${s.color}35` }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <s.icon size={14} style={{ color: s.color }} />
                </motion.div>
                <div className="pb-5">
                  <p className="text-sm font-bold text-white">{i + 1}. {s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT – register card */}
        <motion.div className="flex-1 max-w-[440px] mx-auto"
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <TiltCard>
            <div className="relative rounded-[2.2rem] overflow-hidden"
              style={{ background: theme.cardBg, backdropFilter: 'blur(40px)', boxShadow: `0 0 0 1px ${theme.cardBorder}, 0 40px 80px -10px rgba(0,0,0,0.97), 0 0 80px -15px ${theme.primary}35` }}
            >
              <BeamSweep color={`${theme.primary}80`} />
              <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
                animate={{ background: [
                  `linear-gradient(90deg,rgba(0,0,0,0),${theme.primary},${theme.secondary},rgba(0,0,0,0))`,
                  `linear-gradient(90deg,rgba(0,0,0,0),${theme.secondary},${theme.primary},rgba(0,0,0,0))`,
                ]}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[60px] pointer-events-none"
                style={{ background: `${theme.primary}28` }} />

              <div className="relative z-10 p-8 sm:p-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <motion.div className="w-9 h-9 rounded-2xl flex items-center justify-center"
                    animate={{ background: `linear-gradient(135deg,${theme.primary},${theme.secondary})` }}
                    transition={{ duration: 0.8 }}
                  >
                    <Rocket size={15} className="text-white" />
                  </motion.div>
                  <div>
                    <span className="text-base font-black text-white tracking-wider leading-none block">Join ATOMIC</span>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Free Forever</span>
                  </div>
                  <div className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-black"
                    style={{ background: `${theme.primary}18`, border: `1px solid ${theme.primary}35`, color: theme.primary }}
                  >🚀 Free</div>
                </div>

                <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Create Account</h2>
                <p className="text-sm text-slate-500 mb-6">Set up in under 2 minutes</p>

                {/* Steps preview */}
                <div className="space-y-2.5 mb-6">
                  {REG_STEPS.map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 p-3.5 rounded-2xl border"
                      style={{ background: `${s.color}07`, borderColor: `${s.color}20` }}
                    >
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                        <s.icon size={13} style={{ color: s.color }} />
                      </div>
                      <span className="text-xs font-bold text-white flex-1">{i + 1}. {s.label}</span>
                      <motion.div className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: `${s.color}25` }}
                        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <Check size={9} style={{ color: s.color }} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <CTAButton label="Get Started Free" gradient={theme.ctaGradient} color={theme.primary} loading={false} onClick={() => setShowOnboarding(true)} />

                {hasStored && (
                  <p className="mt-5 text-center text-xs text-slate-600">
                    Already registered?{' '}
                    <button onClick={() => setMode('login')} className="font-bold hover:underline" style={{ color: theme.accent }}>
                      Sign in →
                    </button>
                  </p>
                )}

                <div className="mt-6 flex justify-center">
                  <ThemeToggleBtn />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
