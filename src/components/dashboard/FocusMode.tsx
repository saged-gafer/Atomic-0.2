"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, X, Minimize2, 
  TrendingUp, Clock, Calendar, Award, Target, Zap,
  BarChart3, BookOpen, Brain, Atom,
  FlaskConical, Pi, PenTool, Calculator, GraduationCap
} from 'lucide-react';
import { useAppContext, Subject } from '@/context/AppContext';
import { translations, Language } from '@/lib/i18n';

interface FocusSession {
  id: string;
  date: string;
  duration: number;
  completed: boolean;
  subjectId?: string;
  subjectName?: string;
}

interface TimeInput {
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Particle Background ────────────────────────────────────────────────────
const ParticleBackground: React.FC<{ isRunning: boolean; isPaused: boolean }> = ({ isRunning, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const active    = isRunning && !isPaused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COUNT  = 90;
    const COLORS = ['#6366f1','#ec4899','#06b6d4','#8b5cf6','#f472b6','#34d399'];
    const speed  = () => (Math.random() - 0.5) * (active ? 1.4 : 0.5);

    const particles = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    speed(),
      vy:    speed(),
      size:  Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const o  = particles[j];
          const dx = p.x - o.x, dy = p.y - o.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.25 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: active ? 0.65 : 0.28 }}
    />
  );
};

// ─── Subject Icon ─────────────────────────────────────────────────────────────
const SubjectIcon: React.FC<{ icon: string; size?: number; className?: string }> = ({ icon, size = 20, className = '' }) => {
  const map: Record<string, React.ReactNode> = {
    BookOpen:    <BookOpen    size={size} className={className} />,
    Brain:       <Brain       size={size} className={className} />,
    Atom:        <Atom        size={size} className={className} />,
    FlaskConical:<FlaskConical size={size} className={className} />,
    Pi:          <Pi          size={size} className={className} />,
    Quill:       <PenTool     size={size} className={className} />,
    Calculator:  <Calculator  size={size} className={className} />,
    GraduationCap:<GraduationCap size={size} className={className} />,
  };
  return <>{map[icon] ?? <BookOpen size={size} className={className} />}</>;
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FocusMode() {
  const { userData, addLog, addStudyXP } = useAppContext();

  const [isOpen,           setIsOpen          ] = useState(false);
  const [isFullscreen,     setIsFullscreen     ] = useState(false);
  const [selectedSubject,  setSelectedSubject  ] = useState<Subject | null>(null);
  const [timeInput,        setTimeInput        ] = useState<TimeInput>({ hours: 0, minutes: 25, seconds: 0 });
  const [totalSeconds,     setTotalSeconds     ] = useState(0);
  const [remainingSeconds, setRemainingSeconds ] = useState(0);
  const [isRunning,        setIsRunning        ] = useState(false);
  const [isPaused,         setIsPaused         ] = useState(false);
  const [showAnalytics,    setShowAnalytics    ] = useState(false);
  const [sessions,         setSessions         ] = useState<FocusSession[]>([]);
  const [language,         setLanguage         ] = useState<Language>('en');
  const [motivIdx,         setMotivIdx         ] = useState(0);
  const [pulseGlow,        setPulseGlow        ] = useState(false);

  const timerRef      = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef  = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  const isActive = isRunning && !isPaused;

  useEffect(() => {
    if (isActive && isFullscreen) {
      document.body.classList.add('deep-work-active');
    } else {
      document.body.classList.remove('deep-work-active');
    }
    return () => document.body.classList.remove('deep-work-active');
  }, [isActive, isFullscreen]);

  const motivationalMessages = {
    en: [
      "Stay focused. Every second counts! 🎯",
      "You're doing amazing! Keep going! 💪",
      "Success is built one moment at a time! ✨",
      "Believe in yourself — you've got this! 🚀",
      "Focus now, shine later! ⭐",
      "Deep work creates extraordinary results! 🔥",
    ],
    ar: [
      "ركّز جيداً. كل ثانية تُحسب! 🎯",
      "أنت رائع! استمر في التقدم! 💪",
      "النجاح يُبنى لحظةً بلحظة! ✨",
      "آمن بنفسك — أنت قادر على ذلك! 🚀",
      "ركّز الآن وتألق لاحقاً! ⭐",
      "العمل العميق يصنع نتائج استثنائية! 🔥",
    ],
  };

  useEffect(() => {
    if (userData) {
      setLanguage(userData.language || 'en');
      const stored = localStorage.getItem('focus_sessions');
      if (stored) setSessions(JSON.parse(stored));
    }
  }, [userData]);

  // Rotate motivational messages
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setMotivIdx(p => (p + 1) % motivationalMessages[language].length), 8000);
    return () => clearInterval(id);
  }, [isActive, language]);

  // Pulse glow effect
  useEffect(() => {
    const id = setInterval(() => setPulseGlow(p => !p), 1500);
    return () => clearInterval(id);
  }, []);

  const t = translations[language];

  const formatTime = useCallback((secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0'),
    };
  }, []);

  const handleTimeChange = (field: keyof TimeInput, value: number) => {
    const max = { hours: 23, minutes: 59, seconds: 59 };
    setTimeInput(prev => ({ ...prev, [field]: Math.max(0, Math.min(max[field], value || 0)) }));
  };

  const calcTotal = useCallback(() => timeInput.hours * 3600 + timeInput.minutes * 60 + timeInput.seconds, [timeInput]);

  const startSession = () => {
    const total = calcTotal();
    if (total <= 0) return;
    setTotalSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(true);
    setIsPaused(false);
    setIsFullscreen(true);
    document.body.classList.add('focus-mode');
    startTimeRef.current  = performance.now();
    accumulatedRef.current = 0;
  };

  const togglePause = useCallback(() => {
    if (!isRunning) return;
    if (isPaused) {
      setIsPaused(false);
      startTimeRef.current = performance.now();
    } else {
      setIsPaused(true);
      accumulatedRef.current += performance.now() - startTimeRef.current;
    }
  }, [isRunning, isPaused]);

  const resetSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFullscreen(false);
    setSelectedSubject(null);
    setRemainingSeconds(0);
    setTotalSeconds(0);
    document.body.classList.remove('focus-mode');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const completeSession = useCallback(() => {
    const session: FocusSession = {
      id:          Date.now().toString(),
      date:        new Date().toISOString(),
      duration:    totalSeconds,
      completed:   true,
      subjectId:   selectedSubject?.id,
      subjectName: selectedSubject?.name,
    };
    const updated = [session, ...sessions].slice(0, 100);
    setSessions(updated);
    localStorage.setItem('focus_sessions', JSON.stringify(updated));
    if (selectedSubject?.id) {
      addLog({ date: new Date().toISOString(), duration: totalSeconds, type: 'study', subjectId: selectedSubject.id });
    }
    const xpEarned = Math.max(10, Math.floor(totalSeconds / 60) * 5);
    addStudyXP(xpEarned);
    resetSession();
    setShowAnalytics(true);
  }, [totalSeconds, sessions, selectedSubject, addLog, addStudyXP]);

  useEffect(() => {
    if (isRunning && !isPaused && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        const elapsed    = Math.floor((performance.now() - startTimeRef.current + accumulatedRef.current) / 1000);
        const remaining  = Math.max(0, totalSeconds - elapsed);
        setRemainingSeconds(remaining);
        if (remaining <= 0) completeSession();
      }, 100);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [isRunning, isPaused, totalSeconds, completeSession]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) resetSession();
      if (e.key === ' ' && isRunning && isOpen) { e.preventDefault(); togglePause(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen, isRunning, isOpen, togglePause]);

  const getAnalytics = () => {
    const now      = new Date();
    const today    = now.toISOString().split('T')[0];
    const weekAgo  = new Date(now.getTime() - 7  * 86400000);
    const monthAgo = new Date(now.getTime() - 30 * 86400000);
    const todayT   = sessions.filter(s => s.date.startsWith(today));
    const weekT    = sessions.filter(s => new Date(s.date) >= weekAgo);
    const monthT   = sessions.filter(s => new Date(s.date) >= monthAgo);
    return {
      todayTotal:   todayT.reduce((a, s) => a + s.duration, 0),
      weekTotal:    weekT.reduce((a, s)  => a + s.duration, 0),
      monthTotal:   monthT.reduce((a, s) => a + s.duration, 0),
      sessionCount: sessions.length,
    };
  };

  const analytics         = getAnalytics();
  const formattedRemaining = formatTime(remainingSeconds);
  const progress           = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  // glow color based on state
  const glowColor  = isActive ? 'rgba(99,102,241,0.9)' : 'rgba(245,158,11,0.8)';
  const glowColor2 = isActive ? 'rgba(99,102,241,0.4)' : 'rgba(245,158,11,0.3)';

  // ── Time Input Field ────────────────────────────────────────────────────────
  const TimeInputField = ({ value, onChange, label, max }: { value: number; onChange: (v: number) => void; label: string; max: number }) => (
    <div className="flex flex-col items-center gap-2">
      <motion.div className="relative" whileHover={{ scale: 1.06 }}>
        <input
          type="number"
          min={0} max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-20 h-24 text-center text-4xl font-black bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 transition-all"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </motion.div>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );

  // ── Analytics Modal ─────────────────────────────────────────────────────────
  const AnalyticsModal = () => (
    <AnimatePresence>
      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowAnalytics(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="bg-[#0f172a]/95 border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <TrendingUp className="text-indigo-400" size={24} />
                {t.focus_mode} – {t.analytics}
              </h2>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => setShowAnalytics(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: language === 'ar' ? 'اليوم' : 'Today',      value: analytics.todayTotal,  icon: Clock,    color: '#6366f1' },
                { label: language === 'ar' ? 'هذا الأسبوع' : 'Week', value: analytics.weekTotal,   icon: Calendar, color: '#ec4899' },
                { label: language === 'ar' ? 'هذا الشهر' : 'Month',  value: analytics.monthTotal,  icon: Award,    color: '#06b6d4' },
              ].map((stat) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <stat.icon size={20} className="mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-2xl font-black text-white">{(stat.value / 3600).toFixed(1)}h</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-cyan-500/20 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{language === 'ar' ? 'إجمالي الجلسات' : 'Total Sessions Completed'}</p>
                  <p className="text-4xl font-black text-white">{analytics.sessionCount}</p>
                </div>
                <Zap size={48} className="text-yellow-400" />
              </div>
            </div>

            {sessions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-indigo-400" />
                  {language === 'ar' ? 'الجلسات الأخيرة' : 'Recent Sessions'}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sessions.slice(0, 10).map((session, i) => {
                    const ft = formatTime(session.duration);
                    return (
                      <motion.div key={session.id}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-sm text-slate-400">{new Date(session.date).toLocaleDateString()}</span>
                          {session.subjectName && <span className="text-xs text-indigo-400 font-medium">{session.subjectName}</span>}
                        </div>
                        <span className="font-mono font-bold text-white">{ft.h}:{ft.m}:{ft.s}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── Fullscreen Timer ─────────────────────────────────────────────────────────
  const FullscreenTimer = () => {
    const circumference = 2 * Math.PI * 140;
    const dashOffset    = circumference * (1 - progress / 100);

    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] bg-[#020510] flex flex-col"
      >
        <ParticleBackground isRunning={isRunning} isPaused={isPaused} />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -8 }} whileTap={{ scale: 0.88 }}
            onClick={resetSession}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            <Minimize2 size={18} />
            <span className="text-sm font-bold">{language === 'ar' ? 'خروج' : 'Exit'}</span>
          </motion.button>

          {/* Subject Badge */}
          <AnimatePresence>
            {selectedSubject && (
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm"
                style={{
                  background:   `${selectedSubject.color}18`,
                  borderColor:  `${selectedSubject.color}50`,
                  boxShadow:    `0 0 18px ${selectedSubject.color}30`,
                }}
              >
                <SubjectIcon icon={selectedSubject.icon} size={18} className="text-indigo-400" />
                <span className="text-sm font-bold text-white">{selectedSubject.name}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 8 }} whileTap={{ scale: 0.88 }}
            onClick={() => setShowAnalytics(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400 hover:bg-indigo-500/30 transition-all backdrop-blur-sm"
          >
            <BarChart3 size={18} />
            <span className="text-sm font-bold">{t.analytics}</span>
          </motion.button>
        </div>

        {/* Timer centre */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative mb-12">

            {/* Outer slowly-rotating ring */}
            <motion.svg
              className="w-80 h-80 absolute inset-0"
              style={{ rotate: -90 }}
              animate={{ rotate: isActive ? ['-90deg', '270deg'] : '-90deg' }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#6366f1" />
                  <stop offset="50%"  stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="152"
                fill="none" stroke="url(#outerGrad)"
                strokeWidth="2" strokeDasharray="955" strokeDashoffset="680" opacity="0.35"
              />
            </motion.svg>

            {/* Main progress ring */}
            <svg className="w-80 h-80 -rotate-90 relative">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor={isActive ? '#6366f1' : '#f59e0b'} />
                  <stop offset="50%"  stopColor={isActive ? '#ec4899' : '#ef4444'} />
                  <stop offset="100%" stopColor={isActive ? '#06b6d4' : '#f97316'} />
                </linearGradient>
              </defs>

              {/* Track */}
              <circle cx="160" cy="160" r="140" fill="none"
                stroke="rgba(255,255,255,0.06)" strokeWidth="10"
              />

              {/* Progress arc with pulsing glow */}
              <motion.circle
                cx="160" cy="160" r="140"
                fill="none" stroke="url(#ringGrad)" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: dashOffset,
                  filter: pulseGlow
                    ? `drop-shadow(0 0 24px ${glowColor})`
                    : `drop-shadow(0 0 10px ${glowColor2})`,
                }}
                transition={{ strokeDashoffset: { duration: 0.5, ease: 'easeOut' }, filter: { duration: 1.2 } }}
              />
            </svg>

            {/* Pulsing inner glow disc */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{ opacity: pulseGlow ? 0.12 : 0.04 }}
              transition={{ duration: 1.2 }}
              style={{ background: `radial-gradient(circle, ${isActive ? '#6366f1' : '#f59e0b'} 0%, transparent 70%)` }}
            />

            {/* Timer digits */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="flex items-baseline gap-1"
                animate={{ scale: isPaused ? 1.025 : 1 }}
                transition={{ scale: { duration: 0.4, repeat: isPaused ? Infinity : 0, repeatType: 'reverse', type: 'tween', ease: 'easeInOut' } }}
              >
                <motion.span
                  className="font-mono text-7xl font-black text-white select-none"
                  animate={{ textShadow: pulseGlow ? `0 0 28px ${glowColor}` : `0 0 12px ${glowColor2}` }}
                  transition={{ duration: 1.2 }}
                >
                  {formattedRemaining.h}:{formattedRemaining.m}
                </motion.span>
                <motion.span
                  className="font-mono text-4xl font-bold text-slate-400 select-none"
                  animate={{ textShadow: pulseGlow ? `0 0 18px ${glowColor2}` : 'none' }}
                  transition={{ duration: 1.2 }}
                >
                  :{formattedRemaining.s}
                </motion.span>
              </motion.div>

              <motion.p
                className="mt-4 text-sm font-bold uppercase tracking-widest select-none"
                animate={{
                  color:      isActive ? '#818cf8' : '#fbbf24',
                  textShadow: isActive
                    ? `0 0 12px rgba(99,102,241,0.9)`
                    : `0 0 12px rgba(245,158,11,0.9)`,
                }}
                transition={{ duration: 0.5 }}
              >
                {isPaused
                  ? (language === 'ar' ? 'مُتوقف مؤقتاً' : 'Paused')
                  : (language === 'ar' ? 'جلسة تركيز' : 'Focus Session')}
              </motion.p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.18, rotate: -190 }}
              whileTap={{ scale: 0.85 }}
              onClick={resetSession}
              className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm shadow-lg"
            >
              <RotateCcw size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              onClick={togglePause}
              className={`p-6 rounded-3xl shadow-2xl transition-all backdrop-blur-sm ${
                isPaused
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 shadow-emerald-500/50'
                  : 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/50'
              }`}
              style={{ boxShadow: isPaused ? '0 0 40px rgba(16,185,129,0.5)' : '0 0 40px rgba(245,158,11,0.5)' }}
            >
              <motion.div
                animate={{ rotate: isPaused ? 0 : 360 }}
                transition={{ duration: 0.45, ease: 'backOut' }}
              >
                {isPaused
                  ? <Play  size={32} fill="white" className="text-white" />
                  : <Pause size={32} fill="white" className="text-white" />}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.18, rotate: 190 }}
              whileTap={{ scale: 0.85 }}
              onClick={completeSession}
              className="p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-indigo-400 hover:bg-indigo-500/30 transition-all backdrop-blur-sm shadow-lg"
            >
              <Award size={24} />
            </motion.button>
          </div>

          {/* Animated motivational message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={motivIdx}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.94 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="mt-12 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 text-center max-w-md px-4"
              style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.5))' }}
            >
              {motivationalMessages[language][motivIdx]}
            </motion.p>
          </AnimatePresence>

        </div>

        {/* Bottom progress area */}
        <div className="relative z-10 px-12 pb-8">
          {/* Glow bar */}
          <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className={`h-full rounded-full ${isActive ? 'bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
              animate={{
                width:     `${progress}%`,
                boxShadow: pulseGlow
                  ? `0 0 24px ${glowColor}, 0 0 8px ${glowColor}`
                  : `0 0 8px ${glowColor2}`,
              }}
              transition={{ width: { duration: 0.3 }, boxShadow: { duration: 1.2 } }}
            />
          </div>

          {/* Animated progress dots */}
          <div className="flex justify-center gap-3 mt-5">
            {[...Array(5)].map((_, i) => {
              const reached = progress >= (i + 1) * 20;
              return (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{
                    backgroundColor: reached ? (isActive ? '#6366f1' : '#f59e0b') : 'rgba(255,255,255,0.15)',
                    scale:           reached ? 1.3 : 1,
                    boxShadow:       reached
                      ? `0 0 12px ${isActive ? 'rgba(99,102,241,0.8)' : 'rgba(245,158,11,0.8)'}`
                      : '0 0 0px rgba(0,0,0,0)',
                  }}
                  transition={{ scale: { type: 'spring', stiffness: 500, damping: 12 }, backgroundColor: { duration: 0.4 } }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  // ── Setup Modal ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        whileHover={{ scale: 1.12, rotate: 18 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] p-4 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm"
        style={{ boxShadow: '0 0 28px rgba(99,102,241,0.5)' }}
      >
        <motion.div
          animate={{ rotate: isRunning ? 360 : 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        >
          <Target size={24} className="text-white" />
        </motion.div>
      </motion.button>

      {/* Setup modal */}
      <AnimatePresence>
        {isOpen && !isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 28 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 28 }}
              transition={{ type: 'spring', damping: 24, stiffness: 290 }}
              className="bg-[#0f172a]/95 border border-white/10 rounded-3xl p-8 max-w-lg w-full backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                    <Target className="text-indigo-400" size={28} />
                  </motion.div>
                  {t.focus_mode}
                </h2>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all">
                  <X size={20} className="text-slate-400" />
                </motion.button>
              </div>

              {/* Subject Selection */}
              {userData?.subjects && userData.subjects.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
                    {language === 'ar' ? 'اختر المادة (اختياري)' : 'Select Subject (Optional)'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.subjects.map((subject) => {
                      const active = selectedSubject?.id === subject.id;
                      return (
                        <motion.button
                          key={subject.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedSubject(active ? null : subject)}
                          className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                            active
                              ? 'border-indigo-500/50 shadow-lg'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                          style={active ? { background: `${subject.color}18`, borderColor: `${subject.color}55`, boxShadow: `0 0 16px ${subject.color}28` } : {}}
                        >
                          <SubjectIcon icon={subject.icon} size={18} className={active ? 'text-indigo-400' : 'text-slate-400'} />
                          <span className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-400'}`}>{subject.name}</span>
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="ml-auto w-2 h-2 rounded-full bg-indigo-400"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Time Inputs */}
              <div className="flex justify-center gap-4 mb-8">
                <TimeInputField value={timeInput.hours}   onChange={(v) => handleTimeChange('hours',   v)} label={language === 'ar' ? 'ساعات' : 'Hours'}   max={23} />
                <div className="flex items-end pb-8"><span className="text-4xl font-black text-slate-600">:</span></div>
                <TimeInputField value={timeInput.minutes} onChange={(v) => handleTimeChange('minutes', v)} label={language === 'ar' ? 'دقائق' : 'Minutes'} max={59} />
                <div className="flex items-end pb-8"><span className="text-4xl font-black text-slate-600">:</span></div>
                <TimeInputField value={timeInput.seconds} onChange={(v) => handleTimeChange('seconds', v)} label={language === 'ar' ? 'ثواني' : 'Seconds'} max={59} />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {[
                  { label: language === 'ar' ? '25 دقيقة' : '25 min', h: 0, m: 25, s: 0 },
                  { label: language === 'ar' ? '45 دقيقة' : '45 min', h: 0, m: 45, s: 0 },
                  { label: language === 'ar' ? '1 ساعة'   : '1 hour',  h: 1, m: 0,  s: 0 },
                  { label: language === 'ar' ? '90 دقيقة' : '90 min', h: 1, m: 30, s: 0 },
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setTimeInput({ hours: preset.h, minutes: preset.m, seconds: preset.s })}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
                  >
                    {preset.label}
                  </motion.button>
                ))}
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startSession}
                disabled={calcTotal() <= 0}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 rounded-2xl font-black text-white text-lg tracking-wider uppercase shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ boxShadow: '0 0 30px rgba(99,102,241,0.45)' }}
              >
                <span className="flex items-center justify-center gap-3">
                  <Play size={20} fill="white" />
                  {language === 'ar' ? 'ابدأ جلسة التركيز' : 'Start Focus Session'}
                </span>
              </motion.button>

              {/* Analytics Preview */}
              {sessions.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAnalytics(true)}
                  className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 size={18} />
                  {language === 'ar'
                    ? `عرض التحليلات (${sessions.length} جلسات)`
                    : `View Analytics (${sessions.length} sessions)`}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen timer */}
      <AnimatePresence>
        {isFullscreen && <FullscreenTimer />}
      </AnimatePresence>

      <AnalyticsModal />
    </>
  );
}
