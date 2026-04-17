"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, X, Maximize2, Minimize2, 
  TrendingUp, Clock, Calendar, Award, Target, Zap,
  BarChart3, ChevronLeft, ChevronRight, BookOpen, Brain, Atom,
  FlaskConical, Pi, Quill, Calculator, GraduationCap
} from 'lucide-react';
import { useAppContext, Subject } from '@/context/AppContext';
import { translations, Language } from '@/lib/i18n';

interface FocusSession {
  id: string;
  date: string;
  duration: number; // in seconds
  completed: boolean;
  subjectId?: string;
  subjectName?: string;
}

interface TimeInput {
  hours: number;
  minutes: number;
  seconds: number;
}

// Particle Animation Component
const ParticleBackground: React.FC<{ isRunning: boolean; isPaused: boolean }> = ({ isRunning, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
  }>>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6', '#f472b6'];
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isRunning && !isPaused ? 1.5 : 0.5),
      vy: (Math.random() - 0.5) * (isRunning && !isPaused ? 1.5 : 0.5),
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, isPaused]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isRunning ? 0.6 : 0.3 }}
    />
  );
};

// Subject Icon Component
const SubjectIcon: React.FC<{ icon: string; size?: number; className?: string }> = ({ icon, size = 20, className = '' }) => {
  const icons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen size={size} className={className} />,
    Brain: <Brain size={size} className={className} />,
    Atom: <Atom size={size} className={className} />,
    FlaskConical: <FlaskConical size={size} className={className} />,
    Pi: <Pi size={size} className={className} />,
    Quill: <Quill size={size} className={className} />,
    Calculator: <Calculator size={size} className={className} />,
    GraduationCap: <GraduationCap size={size} className={className} />,
  };
  return icons[icon] || <BookOpen size={size} className={className} />;
};

export default function FocusMode() {
  const { userData, addLog } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [timeInput, setTimeInput] = useState<TimeInput>({ hours: 0, minutes: 25, seconds: 0 });
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const [motivationalIndex, setMotivationalIndex] = useState(0);

  const motivationalMessages = {
    en: [
      "Stay focused. Every second counts! 🎯",
      "You're doing great! Keep going! 💪",
      "Success is built one moment at a time! ✨",
      "Believe in yourself! You've got this! 🚀",
      "Focus now, shine later! ⭐",
    ],
    ar: [
      "ركز جيداً. كل ثانية مهمة! 🎯",
      "أنت تفعل رائعاً! استمر! 💪",
      "النجاح يُبنى لحظة بلحظة! ✨",
      "آمن بنفسك! أنت قادر! 🚀",
      "ركز الآن وتألق لاحقاً! ⭐",
    ],
  };

  useEffect(() => {
    if (userData) {
      setLanguage(userData.language || 'en');
      const storedSessions = localStorage.getItem('focus_sessions');
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }
    }
  }, [userData]);

  // Rotate motivational messages
  useEffect(() => {
    if (isRunning && !isPaused) {
      const interval = setInterval(() => {
        setMotivationalIndex(prev => (prev + 1) % motivationalMessages[language].length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isPaused, language]);

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
    const maxValues = { hours: 23, minutes: 59, seconds: 59 };
    const clamped = Math.max(0, Math.min(maxValues[field], value));
    setTimeInput(prev => ({ ...prev, [field]: clamped }));
  };

  const calculateTotalSeconds = useCallback(() => {
    return timeInput.hours * 3600 + timeInput.minutes * 60 + timeInput.seconds;
  }, [timeInput]);

  const startSession = () => {
    const total = calculateTotalSeconds();
    if (total <= 0) return;
    
    setTotalSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(true);
    setIsPaused(false);
    setIsFullscreen(true);
    document.body.classList.add('focus-mode');
    
    startTimeRef.current = performance.now();
    accumulatedRef.current = 0;
  };

  const togglePause = useCallback(() => {
    if (!isRunning) return;
    
    if (isPaused) {
      // Resume
      setIsPaused(false);
      startTimeRef.current = performance.now();
    } else {
      // Pause
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
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: totalSeconds,
      completed: true,
      subjectId: selectedSubject?.id,
      subjectName: selectedSubject?.name,
    };
    
    const updatedSessions = [session, ...sessions].slice(0, 100);
    setSessions(updatedSessions);
    localStorage.setItem('focus_sessions', JSON.stringify(updatedSessions));
    
    // Also add to app logs
    if (selectedSubject?.id) {
      addLog({
        date: new Date().toISOString(),
        duration: totalSeconds,
        type: 'study',
        subjectId: selectedSubject.id,
      });
    }
    
    resetSession();
    setShowAnalytics(true);
  }, [totalSeconds, sessions, selectedSubject, addLog]);

  useEffect(() => {
    if (isRunning && !isPaused && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((performance.now() - startTimeRef.current + accumulatedRef.current) / 1000);
        const remaining = Math.max(0, totalSeconds - elapsed);
        setRemainingSeconds(remaining);
        
        if (remaining <= 0) {
          completeSession();
        }
      }, 100);
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isRunning, isPaused, totalSeconds, completeSession]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        resetSession();
      }
      if (e.key === ' ' && isRunning && isOpen) {
        e.preventDefault();
        togglePause();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen, isRunning, isOpen, togglePause]);

  const getAnalyticsData = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const todaySessions = sessions.filter(s => s.date.startsWith(today));
    const todayTotal = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekSessions = sessions.filter(s => new Date(s.date) >= weekAgo);
    const weekTotal = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthSessions = sessions.filter(s => new Date(s.date) >= monthAgo);
    const monthTotal = monthSessions.reduce((sum, s) => sum + s.duration, 0);
    
    return { todayTotal, weekTotal, monthTotal, sessionCount: sessions.length };
  };

  const analytics = getAnalyticsData();
  const formattedRemaining = formatTime(remainingSeconds);
  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  // Time Input Component
  const TimeInputField = ({ 
    value, 
    onChange, 
    label, 
    max 
  }: { 
    value: number; 
    onChange: (v: number) => void; 
    label: string; 
    max: number 
  }) => (
    <div className="flex flex-col items-center gap-2">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <input
          type="number"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-20 h-24 text-center text-4xl font-black bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </motion.div>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );

  // Analytics Modal
  const AnalyticsModal = () => (
    <AnimatePresence>
      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowAnalytics(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <TrendingUp className="text-primary" size={24} />
                {t.focus_mode} - {t.analytics}
              </h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Today', value: analytics.todayTotal, icon: Clock, color: '#6366f1' },
                { label: 'This Week', value: analytics.weekTotal, icon: Calendar, color: '#ec4899' },
                { label: 'This Month', value: analytics.monthTotal, icon: Award, color: '#06b6d4' },
              ].map((stat) => {
                const hours = (stat.value / 3600).toFixed(1);
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                  >
                    <stat.icon size={20} className={`mx-auto mb-2`} style={{ color: stat.color }} />
                    <p className="text-2xl font-black text-white">{hours}h</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Session Count */}
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Sessions Completed</p>
                  <p className="text-4xl font-black text-white">{analytics.sessionCount}</p>
                </div>
                <Zap size={48} className="text-yellow-400" />
              </div>
            </div>

            {/* Recent Sessions */}
            {sessions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary" />
                  Recent Sessions
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sessions.slice(0, 10).map((session, i) => {
                    const time = formatTime(session.duration);
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-sm text-slate-400">
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-white">
                          {time.h}:{time.m}:{time.s}
                        </span>
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

  // Fullscreen Timer Display
  const FullscreenTimer = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-[#020510] flex flex-col"
    >
      {/* Particle Background */}
      <ParticleBackground isRunning={isRunning} isPaused={isPaused} />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetSession}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
        >
          <Minimize2 size={18} />
          <span className="text-sm font-bold">{language === 'ar' ? 'خروج' : 'Exit'}</span>
        </motion.button>

        {/* Subject Badge */}
        {selectedSubject && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
          >
            <SubjectIcon icon={selectedSubject.icon} size={18} className="text-primary" />
            <span className="text-sm font-bold text-white">{selectedSubject.name}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAnalytics(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-primary hover:bg-primary/30 transition-all backdrop-blur-sm"
        >
          <BarChart3 size={18} />
          <span className="text-sm font-bold">{t.analytics}</span>
        </motion.button>
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Progress Ring with Glow */}
        <div className="relative mb-12">
          {/* Outer rotating ring */}
          <motion.svg 
            className="w-80 h-80 -rotate-90 absolute inset-0"
            animate={{ rotate: isRunning && !isPaused ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="879"
              strokeDashoffset="200"
              opacity="0.3"
            />
          </motion.svg>

          {/* Main progress ring */}
          <svg className="w-80 h-80 -rotate-90 relative">
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.8))',
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer Text with Color-changing Shadow */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="flex items-baseline gap-2"
              animate={{ 
                scale: isPaused ? [1, 1.02, 1] : 1,
                textShadow: isRunning && !isPaused 
                  ? ['0 0 20px rgba(99,102,241,0.8)', '0 0 30px rgba(99,102,241,0.6)', '0 0 20px rgba(99,102,241,0.8)']
                  : ['0 0 20px rgba(245,158,11,0.8)', '0 0 30px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.8)']
              }}
              transition={{ 
                scale: { duration: 0.5, repeat: isPaused ? Infinity : 0 },
                textShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <span className="font-mono text-7xl font-black text-white">
                {formattedRemaining.h}:{formattedRemaining.m}
              </span>
              <span className="font-mono text-4xl font-bold text-slate-400">:{formattedRemaining.s}</span>
            </motion.div>
            <motion.p 
              className="mt-4 text-sm font-bold uppercase tracking-widest"
              animate={{
                color: isRunning && !isPaused ? '#6366f1' : '#f59e0b',
                textShadow: isRunning && !isPaused 
                  ? '0 0 10px rgba(99,102,241,0.8)' 
                  : '0 0 10px rgba(245,158,11,0.8)'
              }}
            >
              {isPaused 
                ? (language === 'ar' ? 'مُتوقف مؤقتاً' : 'Paused') 
                : (language === 'ar' ? 'جلسة تركيز' : 'Focus Session')}
            </motion.p>
          </div>
        </div>

        {/* Controls with Advanced Effects */}
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.15, rotate: -180 }}
            whileTap={{ scale: 0.85 }}
            onClick={resetSession}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm shadow-lg"
          >
            <RotateCcw size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePause}
            className={`p-6 rounded-3xl shadow-2xl transition-all backdrop-blur-sm ${
              isPaused 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-500/50' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/50'
            }`}
          >
            <motion.div
              animate={{ rotate: isPaused ? 0 : 360 }}
              transition={{ duration: 0.5 }}
            >
              {isPaused ? <Play size={32} fill="currentColor" className="text-white" /> : <Pause size={32} fill="currentColor" className="text-white" />}
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, rotate: 180 }}
            whileTap={{ scale: 0.85 }}
            onClick={completeSession}
            className="p-4 bg-primary/20 border border-primary/30 rounded-2xl text-primary hover:bg-primary/30 transition-all backdrop-blur-sm shadow-lg"
          >
            <Award size={24} />
          </motion.button>
        </div>

        {/* Animated Motivational Message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={motivationalIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-center max-w-md"
            style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}
          >
            {motivationalMessages[language][motivationalIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar with Glow */}
      <div className="relative z-10 px-12 pb-8">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{ 
              boxShadow: '0 0 20px rgba(99,102,241,0.6)',
              filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.8))'
            }}
          />
        </div>
        {/* Animated progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              animate={{
                backgroundColor: progress >= (i + 1) * 20 ? '#6366f1' : 'rgba(255,255,255,0.2)',
                scale: progress >= (i + 1) * 20 ? [1, 1.3, 1] : 1,
              }}
              transition={{ scale: { duration: 0.3 } }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Focus Mode Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg shadow-primary/30 border border-white/10 group backdrop-blur-sm"
      >
        <motion.div
          animate={{ rotate: isRunning ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Target size={24} className="text-white" />
        </motion.div>
      </motion.button>

      {/* Setup Modal */}
      <AnimatePresence>
        {isOpen && !isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0f172a]/90 border border-white/10 rounded-3xl p-8 max-w-lg w-full backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Target className="text-primary" size={28} />
                  {t.focus_mode}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all hover:rotate-90"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Subject Selection */}
              {userData?.subjects && userData.subjects.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
                    {language === 'ar' ? 'اختر المادة' : 'Select Subject'} (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.subjects.map((subject) => (
                      <motion.button
                        key={subject.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedSubject(selectedSubject?.id === subject.id ? null : subject)}
                        className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                          selectedSubject?.id === subject.id
                            ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <SubjectIcon icon={subject.icon} size={18} className={selectedSubject?.id === subject.id ? 'text-primary' : 'text-slate-400'} />
                        <span className={`text-sm font-bold ${selectedSubject?.id === subject.id ? 'text-white' : 'text-slate-400'}`}>
                          {subject.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Input */}
              <div className="flex justify-center gap-4 mb-8">
                <TimeInputField
                  value={timeInput.hours}
                  onChange={(v) => handleTimeChange('hours', v)}
                  label={language === 'ar' ? 'ساعات' : 'Hours'}
                  max={23}
                />
                <div className="flex items-end pb-8">
                  <span className="text-4xl font-black text-slate-600">:</span>
                </div>
                <TimeInputField
                  value={timeInput.minutes}
                  onChange={(v) => handleTimeChange('minutes', v)}
                  label={language === 'ar' ? 'دقائق' : 'Minutes'}
                  max={59}
                />
                <div className="flex items-end pb-8">
                  <span className="text-4xl font-black text-slate-600">:</span>
                </div>
                <TimeInputField
                  value={timeInput.seconds}
                  onChange={(v) => handleTimeChange('seconds', v)}
                  label={language === 'ar' ? 'ثواني' : 'Seconds'}
                  max={59}
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {[
                  { label: language === 'ar' ? '25 دقيقة' : '25 min', h: 0, m: 25, s: 0 },
                  { label: language === 'ar' ? '45 دقيقة' : '45 min', h: 0, m: 45, s: 0 },
                  { label: language === 'ar' ? '1 ساعة' : '1 hour', h: 1, m: 0, s: 0 },
                  { label: language === 'ar' ? '90 دقيقة' : '90 min', h: 1, m: 30, s: 0 },
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeInput({ hours: preset.h, minutes: preset.m, seconds: preset.s })}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:border-primary/30 transition-all"
                  >
                    {preset.label}
                  </motion.button>
                ))}
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startSession}
                disabled={calculateTotalSeconds() <= 0}
                className="w-full py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl font-black text-white text-lg tracking-wider uppercase shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="flex items-center justify-center gap-3">
                  <Play size={20} fill="currentColor" />
                  {language === 'ar' ? 'ابدأ جلسة التركيز' : 'Start Focus Session'}
                </span>
              </motion.button>

              {/* Analytics Preview */}
              {sessions.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAnalytics(true)}
                  className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 size={18} />
                  {language === 'ar' ? `عرض التحليلات (${sessions.length} جلسات)` : `View Analytics (${sessions.length} sessions)`}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Timer */}
      <AnimatePresence>
        {isFullscreen && <FullscreenTimer />}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnalyticsModal />
    </>
  );
}
