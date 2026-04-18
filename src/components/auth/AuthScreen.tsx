"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import AnimeMascot, { StarBurst } from '@/components/anime/AnimeMascot';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ConfettiEffect from '@/components/ui/ConfettiEffect';
import ThemePickerModal from '@/components/ui/ThemePickerModal';
import { Wand2, ArrowRight, Loader2, Sparkles, Star, Zap, Shield, BookOpen, Palette } from 'lucide-react';

type Mode = 'login' | 'register';

function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning! Ready for a deep-work session? ☀️";
  if (h >= 12 && h < 17) return "Good afternoon! Let's power through! ⚡";
  if (h >= 17 && h < 21) return "Evening focus? Atomic is ready! 🌆";
  return "Late night session? Atomic is here with you! 🌙";
}

function FloatingStar({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -20, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <Star size={size} fill={color} style={{ color }} />
    </motion.div>
  );
}

function SpeechBubble({ text, className = '' }: { text: string; className?: string }) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`absolute bg-white rounded-2xl px-4 py-2.5 shadow-xl ${className}`}
      style={{ border: `2.5px solid ${theme.primary}`, minWidth: 120, zIndex: 20 }}
    >
      <p className="text-xs font-black text-slate-800 whitespace-nowrap">{text}</p>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `12px solid ${theme.primary}` }}
      />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '10px solid white' }}
      />
    </motion.div>
  );
}

function ThemeToggleBtn({ onOpenPicker }: { onOpenPicker: () => void }) {
  const { theme, themeName } = useTheme();
  return (
    <motion.button
      onClick={onOpenPicker}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.93 }}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[11px] uppercase tracking-widest"
      style={{
        background: `${theme.primary}18`,
        border: `2px solid ${theme.primary}50`,
        color: theme.primary,
        boxShadow: `0 0 15px ${theme.primary}25`,
      }}
    >
      <Palette size={13} />
      <span className="capitalize">{themeName}</span>
    </motion.button>
  );
}

function AnimeButton({ label, gradient, color, loading, onClick }: {
  label: string; gradient: string; color: string; loading: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.96, y: 0 }}
      className="relative w-full h-14 rounded-2xl font-black text-white text-sm uppercase tracking-widest overflow-hidden"
      style={{
        background: gradient,
        border: `2.5px solid ${color}`,
        boxShadow: `0 4px 0 0 ${color}80, 0 0 30px ${color}30`,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg,rgba(0,0,0,0) 30%,rgba(255,255,255,0.25) 50%,rgba(0,0,0,0) 70%)' }}
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2 }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {loading
          ? <Loader2 size={18} className="animate-spin" />
          : <><span>{label}</span><motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><ArrowRight size={16}/></motion.div></>
        }
      </span>
      <div className="absolute -bottom-1 left-2 right-2 h-1.5 rounded-full opacity-60" style={{ background: `${color}80` }}/>
    </motion.button>
  );
}

function ActionFX({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`absolute pointer-events-none font-black italic text-lg ${className}`}
      style={style}
      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/* Power-Up overlay on successful login */
function PowerUpOverlay({ active }: { active: boolean }) {
  const { theme } = useTheme();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}60 0%, transparent 70%)` }}
            animate={{ scale: [0.5, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute inset-0 border-4 pointer-events-none"
            style={{ borderColor: theme.primary }}
            animate={{ opacity: [1, 0], scale: [1, 1.04] }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div className="text-6xl">⚡</div>
            <p className="text-3xl font-black text-white tracking-tight" style={{ textShadow: `0 0 30px ${theme.primary}` }}>
              POWER UP!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AuthScreen() {
  const { login, gender } = useAppContext();
  const { theme } = useTheme();
  const [hasStored, setHasStored] = useState(false);
  const [mode, setMode] = useState<Mode>('register');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [powerUp, setPowerUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  /* Cursor tracking state (register page only) */
  const [activeField, setActiveField] = useState<string | null>(null);
  const [mascotPose, setMascotPose] = useState<'wave' | 'success' | 'point' | 'idle'>('wave');
  const [mascotExpr, setMascotExpr] = useState<'happy' | 'focused' | 'excited' | 'peek'>('happy');
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timeGreeting = mounted ? getTimeGreeting() : "Welcome back!";

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const s = localStorage.getItem('study_planner_user_data');
      setHasStored(!!s);
      setMode(s ? 'login' : 'register');
    }, 0);
  }, []);

  /* Show speech bubble briefly */
  const showBubble = useCallback((text: string, duration = 3000) => {
    setBubbleText(text);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubbleText(null), duration);
  }, []);

  /* Field focus handlers */
  const handleFieldFocus = useCallback((field: string) => {
    setActiveField(field);
    if (field === 'username') {
      setMascotPose('point'); setMascotExpr('happy');
      showBubble("Don't be shy, let's get started! 😊");
    } else if (field === 'password') {
      setMascotPose('idle'); setMascotExpr('focused');
      showBubble("Create a strong password! 🔒");
    }
  }, [showBubble]);

  const handlePasswordPeek = useCallback((visible: boolean) => {
    setShowPassword(visible);
    if (visible) {
      setMascotExpr('peek');
      showBubble("Oh? Let me see... 👓", 2000);
    } else {
      setMascotExpr('focused');
      setBubbleText(null);
    }
  }, [showBubble]);

  const triggerShake = useCallback(() => { setShake(true); setTimeout(() => setShake(false), 600); }, []);

  const handleLogin = useCallback(() => {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = 'Enter your username!';
    if (!password.trim()) e.password = 'Enter your password!';
    if (Object.keys(e).length) { setErrors(e); triggerShake(); return; }
    setSubmitting(true);
    const ok = login(username.trim(), password.trim());
    if (!ok) {
      setErrors({ creds: 'Wrong username or password!' });
      setSubmitting(false);
      triggerShake();
    } else {
      setPowerUp(true);
      setShowConfetti(true);
      setTimeout(() => setPowerUp(false), 1200);
    }
  }, [username, password, login, triggerShake]);

  if (showOnboarding) return <OnboardingFlow />;

  const STARS = [
    { x: '8%',  y: '12%', size: 12, delay: 0,   color: theme.primary },
    { x: '92%', y: '8%',  size: 16, delay: 0.7, color: theme.secondary },
    { x: '5%',  y: '75%', size: 10, delay: 1.4, color: theme.accent },
    { x: '88%', y: '80%', size: 14, delay: 2,   color: theme.primary },
    { x: '48%', y: '5%',  size: 10, delay: 1,   color: theme.secondary },
    { x: '55%', y: '92%', size: 12, delay: 2.5, color: theme.accent },
    { x: '18%', y: '42%', size: 8,  delay: 0.3, color: '#facc15' },
    { x: '80%', y: '48%', size: 8,  delay: 1.8, color: '#facc15' },
  ];

  /* ─── LOGIN ─── */
  if (mode === 'login') return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 30% 50%, ${theme.bgDeep} 0%, ${theme.bg} 65%)` }}
    >
      <PowerUpOverlay active={powerUp}/>
      <ConfettiEffect active={showConfetti} primaryColor={theme.primary} duration={2500}/>
      <ThemePickerModal open={showThemePicker} onClose={() => setShowThemePicker(false)}/>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, ${theme.primary}08 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
      />
      {mounted && STARS.map((s,i) => <FloatingStar key={i} {...s}/>)}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 18px)' }}
      />

      <div className="absolute top-5 right-5 z-50">
        {mounted && <ThemeToggleBtn onOpenPicker={() => setShowThemePicker(true)}/>}
      </div>

      <ActionFX className="top-[20%] left-[6%] opacity-20" style={{ color: theme.primary, fontSize: 28 }}>STUDY!</ActionFX>
      <ActionFX className="bottom-[22%] right-[5%] opacity-15" style={{ color: theme.secondary, fontSize: 22 }}>FOCUS!</ActionFX>

      <div className="flex items-center justify-center gap-10 w-full max-w-5xl px-5 relative z-10">

        {/* LEFT – mascot + branding */}
        <motion.div className="hidden lg:flex flex-col items-center gap-6 flex-1"
          initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl text-white"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, border: `3px solid ${theme.primary}`, boxShadow: `0 0 30px ${theme.primary}50` }}
              animate={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 5, repeat: Infinity }}
            >A</motion.div>
            <div>
              <p className="text-3xl font-black text-white tracking-tighter leading-none">ATOMIC</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: theme.primary }}>Study Platform</p>
            </div>
          </div>

          <div className="relative flex justify-center mt-4">
            <SpeechBubble text={timeGreeting} className="-top-16 left-1/2 -translate-x-1/2" />
            {mounted && (
              <AnimeMascot
                pose="wave"
                expression="happy"
                size={220}
                primaryColor={theme.primary}
                gender={gender || 'male'}
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-2">
            {[
              { icon: '📚', label: 'Students', val: '12k+' },
              { icon: '⚡', label: 'Sessions', val: '98k+' },
              { icon: '🏆', label: 'Tasks Done', val: '340k' },
            ].map((s,i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: 0.3+i*0.1 }}
                className="flex flex-col items-center p-3 rounded-2xl text-center"
                style={{ background: `${theme.primary}10`, border: `2px solid ${theme.primary}30` }}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="text-base font-black text-white">{s.val}</span>
                <span className="text-[9px] font-bold" style={{ color: theme.primary }}>{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { icon: Zap, label: 'AI Powered', color: theme.primary },
              { icon: Shield, label: 'Secure', color: '#4ade80' },
              { icon: BookOpen, label: 'Smart Plans', color: theme.secondary },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px]"
                style={{ background: `${f.color}12`, border: `1.5px solid ${f.color}30`, color: f.color }}
              >
                <f.icon size={11}/> {f.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT – Login card */}
        <motion.div className="w-full max-w-[420px]"
          initial={{ y:50, opacity:0 }} animate={{ y:0, opacity:1 }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        >
          <motion.form
            animate={shake ? { x:[-8,8,-5,5,-2,2,0] } : { x:0 }}
            transition={{ duration:0.45 }}
            onSubmit={e => { e.preventDefault(); handleLogin(); }}
          >
            <div className="relative rounded-[28px] overflow-hidden"
              style={{
                background: theme.cardBg,
                border: `2.5px solid ${theme.primary}60`,
                boxShadow: `0 0 0 1px ${theme.primary}20, 0 4px 0 0 ${theme.primary}40, 0 30px 80px -10px rgba(0,0,0,0.95), 0 0 60px -10px ${theme.primary}25`,
              }}
            >
              <motion.div className="absolute top-0 left-0 right-0 h-[3px] z-20"
                animate={{ background: [
                  `linear-gradient(90deg,transparent,${theme.primary},${theme.secondary},transparent)`,
                  `linear-gradient(90deg,transparent,${theme.secondary},${theme.primary},transparent)`,
                ]}}
                transition={{ duration:2.5, repeat:Infinity }}
              />
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize:'12px 12px' }}
              />
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                style={{ background:`${theme.primary}25` }}/>

              <div className="relative z-10 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-7">
                  <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-base"
                    style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 20px ${theme.primary}50` }}
                  >A</motion.div>
                  <div>
                    <span className="font-black text-white tracking-widest text-sm block">ATOMIC</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color:`${theme.primary}80` }}>Sign In · Level Up</span>
                  </div>
                  <div className="ml-auto">
                    <motion.div className="w-2.5 h-2.5 rounded-full bg-green-400"
                      animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ duration:1.5, repeat:Infinity }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <motion.h2 className="text-3xl font-black text-white mb-1 tracking-tight"
                    animate={{ x:[0,2,-2,0] }} transition={{ duration:5, repeat:Infinity }}
                  >
                    Welcome Back <span style={{ color:theme.secondary }}>✨</span>
                  </motion.h2>
                  <p className="text-sm font-medium" style={{ color:`${theme.primary}80` }}>Your study adventure continues!</p>
                </div>

                <div className="space-y-4">
                  <FloatingInput label="Username" value={username}
                    onChange={e => { setUsername(e.target.value); setErrors({}); }}
                    error={errors.username} autoComplete="username"
                  />
                  <FloatingInput
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors({}); }}
                    error={errors.password}
                    autoComplete="current-password"
                    onRevealToggle={handlePasswordPeek}
                  />
                </div>
                <input type="submit" className="hidden"/>

                <AnimatePresence>
                  {errors.creds && (
                    <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                      className="mt-4 p-3 rounded-2xl text-xs font-black"
                      style={{ background:'rgba(239,68,68,0.1)', border:'2px solid rgba(239,68,68,0.35)', color:'#f87171' }}
                    >
                      ❌ {errors.creds}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6">
                  <AnimeButton label="Sign In!" gradient={theme.ctaGradient} color={theme.primary} loading={submitting} onClick={handleLogin}/>
                </div>

                {!hasStored && (
                  <p className="mt-5 text-center text-xs font-bold" style={{ color:`${theme.primary}60` }}>
                    New here?{' '}
                    <button type="button" onClick={() => setMode('register')} className="font-black hover:underline" style={{ color:theme.secondary }}>
                      Create account →
                    </button>
                  </p>
                )}

                <div className="mt-6 flex justify-center">
                  {mounted && <ThemeToggleBtn onOpenPicker={() => setShowThemePicker(true)}/>}
                </div>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );

  /* ══ REGISTER ══ */
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 65% 40%, ${theme.bgDeep} 0%, ${theme.bg} 65%)` }}
    >
      <ThemePickerModal open={showThemePicker} onClose={() => setShowThemePicker(false)}/>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize:'28px 28px' }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage:'repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 18px)' }}
      />
      {mounted && STARS.map((s,i) => <FloatingStar key={i} {...s}/>)}

      <div className="absolute top-5 right-5 z-50">
        {mounted && <ThemeToggleBtn onOpenPicker={() => setShowThemePicker(true)}/>}
      </div>

      <ActionFX className="top-[15%] left-[5%] opacity-20" style={{ color:theme.primary, fontSize:26 }}>NEW STUDENT!</ActionFX>
      <ActionFX className="bottom-[18%] right-[4%] opacity-15" style={{ color:theme.secondary, fontSize:20 }}>LEVEL UP!</ActionFX>

      <div className="flex items-center justify-center gap-8 w-full max-w-5xl px-5 relative z-10">

        {/* LEFT – branding + mascot */}
        <motion.div className="hidden lg:flex flex-col items-center gap-5 flex-1"
          initial={{ x:-50, opacity:0 }} animate={{ x:0, opacity:1 }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
        >
          <div className="flex items-center gap-3 self-start">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white"
              style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, border:`3px solid ${theme.primary}`, boxShadow:`0 0 25px ${theme.primary}50` }}
              animate={{ rotate:[0,-3,3,0] }} transition={{ duration:5, repeat:Infinity }}
            >A</motion.div>
            <div>
              <p className="text-2xl font-black text-white tracking-tighter">ATOMIC</p>
              <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color:theme.primary }}>Anime Study Platform</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-2" style={{ color:`${theme.primary}90` }}>Begin Your Story</p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white leading-[0.92] tracking-tighter mb-3">
              Study Like<br/><span style={{ color:theme.primary }}>an</span> Anime<br/>Hero!
            </h1>
            <p className="text-sm font-medium" style={{ color:`${theme.primary}70` }}>
              Your legendary study journey starts here. Level up every day! ⚡
            </p>
          </div>

          {/* Mascot with dynamic speech bubble */}
          <div className="relative">
            <AnimatePresence>
              {bubbleText
                ? <SpeechBubble text={bubbleText} className="-top-16 left-1/2 -translate-x-1/2"/>
                : <SpeechBubble text="Let's go! ⚡" className="-top-14 right-4"/>
              }
            </AnimatePresence>
            {mounted && (
              <AnimeMascot
                pose={mascotPose}
                expression={mascotExpr}
                size={210}
                primaryColor={theme.primary}
                gender={gender || 'male'}
              />
            )}
          </div>

          <div className="flex gap-3">
            {[theme.primary, theme.secondary, theme.accent].map((c,i) => (
              <motion.div key={i} animate={{ rotate:[0,360] }} transition={{ duration:8+i*2, repeat:Infinity, ease:'linear' }}>
                <StarBurst color={c} size={22}/>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT – register card */}
        <motion.div className="w-full max-w-[440px]"
          initial={{ y:50, opacity:0 }} animate={{ y:0, opacity:1 }}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1], delay:0.1 }}
        >
          <div className="relative rounded-[28px] overflow-hidden"
            style={{
              background: theme.cardBg,
              border:`2.5px solid ${theme.primary}60`,
              boxShadow:`0 0 0 1px ${theme.primary}20, 0 4px 0 0 ${theme.primary}40, 0 30px 80px -10px rgba(0,0,0,0.95), 0 0 60px -10px ${theme.primary}25`,
            }}
          >
            <motion.div className="absolute top-0 left-0 right-0 h-[3px] z-20"
              animate={{ background:[
                `linear-gradient(90deg,transparent,${theme.primary},${theme.secondary},transparent)`,
                `linear-gradient(90deg,transparent,${theme.secondary},${theme.primary},transparent)`,
              ]}}
              transition={{ duration:2.5, repeat:Infinity }}
            />
            <div className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize:'12px 12px' }}
            />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
              style={{ background:`${theme.primary}25` }}/>

            <div className="relative z-10 p-8 sm:p-10">
              <div className="lg:hidden flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-white"
                  style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})` }}>A</div>
                <span className="font-black text-white tracking-widest">ATOMIC</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <motion.div className="text-2xl" animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}>🚀</motion.div>
                <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
              </div>
              <p className="text-sm mb-6 font-medium" style={{ color:`${theme.primary}70` }}>
                Join thousands of students leveling up daily!
              </p>

              {/* What you'll get */}
              <div className="space-y-2.5 mb-6">
                {[
                  { emoji:'👤', label:'Set up your hero profile', color:'#f472b6' },
                  { emoji:'📚', label:'Choose your study subjects', color:'#facc15' },
                  { emoji:'📅', label:'Build your weekly schedule', color:'#4ade80' },
                  { emoji:'🎯', label:'Set daily study goals', color:theme.accent },
                ].map((item,i) => (
                  <motion.div key={item.label}
                    initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.1+i*0.08 }}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background:`${item.color}10`, border:`2px solid ${item.color}25` }}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span className="text-xs font-bold text-white">{item.label}</span>
                    <motion.div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background:`${item.color}20` }}
                      animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.4 }}
                    >
                      <Sparkles size={10} style={{ color:item.color }}/>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Register fields with focus tracking */}
              <div className="space-y-4 mb-6">
                <FloatingInput
                  label="Choose a Username"
                  value=""
                  onChange={() => {}}
                  onFocus={() => handleFieldFocus('username')}
                  onBlur={() => { setActiveField(null); setMascotPose('wave'); setMascotExpr('happy'); }}
                />
                <FloatingInput
                  label="Create Password"
                  type={showPassword ? 'text' : 'password'}
                  value=""
                  onChange={() => {}}
                  onFocus={() => handleFieldFocus('password')}
                  onBlur={() => { setActiveField(null); setMascotPose('success'); setMascotExpr('excited'); }}
                  onRevealToggle={handlePasswordPeek}
                />
              </div>

              <AnimeButton label="Start My Journey!" gradient={theme.ctaGradient} color={theme.primary} loading={false} onClick={() => setShowOnboarding(true)}/>

              {hasStored && (
                <p className="mt-5 text-center text-xs font-bold" style={{ color:`${theme.primary}60` }}>
                  Already a member?{' '}
                  <button onClick={() => setMode('login')} className="font-black hover:underline" style={{ color:theme.secondary }}>
                    Sign in →
                  </button>
                </p>
              )}

              <div className="mt-6 flex justify-center">
                {mounted && <ThemeToggleBtn onOpenPicker={() => setShowThemePicker(true)}/>}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
