"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Save, Coffee, BookOpen, ExternalLink, Maximize2, X } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';
import TimerWidget, { TimerWidgetRef } from './TimerWidget';
import { motion, AnimatePresence } from 'framer-motion';

const STUDY_GOAL_SECONDS = 90 * 60; // 90 min default Pomodoro cycle

function formatTimeWithMs(totalMs: number) {
  const ms = Math.floor((totalMs % 1000) / 10);
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function CircularTimer({
  ms,
  goal,
  isRunning,
  color,
  type,
}: {
  ms: number;
  goal: number;
  isRunning: boolean;
  color: string;
  type: 'study' | 'break';
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const seconds = Math.floor(ms / 1000);
  const progress = Math.min(seconds / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);

  const formatShortTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative inline-flex items-center justify-center w-16 h-16 shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72" fill="none">
        {/* Track */}
        <circle cx="36" cy="36" r={radius} strokeWidth="3.5" stroke="rgba(255,255,255,0.05)" />
        {/* Progress fill */}
        <motion.circle
          cx="36" cy="36" r={radius}
          strokeWidth="3.5"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>

      {/* Pulse ring when running */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${color}`, borderRadius: '50%' }}
          />
        )}
      </AnimatePresence>

      {/* Time text */}
      <div className="flex flex-col items-center z-10">
        <span className="font-mono text-[10px] font-black text-white leading-none">{formatShortTime(seconds)}</span>
        <span className="text-[8px] font-black uppercase tracking-wider mt-0.5"
          style={{ color: `${color}99` }}>
          {type === 'study' ? 'study' : 'break'}
        </span>
      </div>
    </div>
  );
}

export default function Stopwatch({
  subjectId, subjectName, subjectColor, language
}: {
  subjectId: string; subjectName: string; subjectColor: string; language: Language;
}) {
  const { addLog } = useAppContext();
  // Time in milliseconds for high precision
  const [studyTimeMs, setStudyTimeMs] = useState(0);
  const [breakTimeMs, setBreakTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [type, setType] = useState<'study' | 'break'>('study');
  const [showWidget, setShowWidget] = useState(false);
  const [saved, setSaved] = useState(false);

  const widgetRef = useRef<TimerWidgetRef>(null);
  const startTimeRef = useRef<number>(0);
  const baseTimeRef = useRef<number>(0);

  // High precision timer effect
  useEffect(() => {
    let requestRef: number;

    const update = () => {
      const now = performance.now();
      const delta = now - startTimeRef.current;
      const total = baseTimeRef.current + delta;

      if (type === 'study') setStudyTimeMs(total);
      else setBreakTimeMs(total);

      requestRef = requestAnimationFrame(update);
    };

    if (isRunning) {
      startTimeRef.current = performance.now();
      baseTimeRef.current = type === 'study' ? studyTimeMs : breakTimeMs;
      requestRef = requestAnimationFrame(update);
    }

    return () => {
      if (requestRef) cancelAnimationFrame(requestRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, type]);

  // Toggle Focus Mode Body Class
  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    return () => document.body.classList.remove('focus-mode');
  }, [isFocusMode]);

  const handleSave = () => {
    const studySec = Math.floor(studyTimeMs / 1000);
    const breakSec = Math.floor(breakTimeMs / 1000);

    if (studySec > 0) addLog({ date: new Date().toISOString(), duration: studySec, type: 'study', subjectId });
    if (breakSec > 0) addLog({ date: new Date().toISOString(), duration: breakSec, type: 'break', subjectId });

    setStudyTimeMs(0);
    setBreakTimeMs(0);
    setIsRunning(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setStudyTimeMs(0);
    setBreakTimeMs(0);
    setIsRunning(false);
  };

  const launchTimer = () => {
    setShowWidget(true);
    setTimeout(() => widgetRef.current?.togglePip(), 100);
  };

  const breakGoal = 15 * 60;
  const activeColor = type === 'study' ? '#6366f1' : '#f59e0b';
  const currentTime = type === 'study' ? Math.floor(studyTimeMs / 1000) : Math.floor(breakTimeMs / 1000);
  const currentGoal = type === 'study' ? STUDY_GOAL_SECONDS : breakGoal;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Circular timer display */}
      <CircularTimer
        ms={type === 'study' ? studyTimeMs : breakTimeMs}
        goal={currentGoal}
        isRunning={isRunning}
        color={activeColor}
        type={type}
      />

      {/* Controls */}
      <div className="flex flex-col gap-1.5">
        {/* Type toggle */}
        <div className="flex rounded-xl overflow-hidden border border-white/5 text-[9px] font-black uppercase tracking-widest">
          <button
            onClick={() => setType('study')}
            className={`px-2.5 py-1 transition-all duration-200 flex items-center gap-1 ${
              type === 'study'
                ? 'bg-primary text-white'
                : 'text-slate-500 hover:text-slate-300 bg-white/[0.02]'
            }`}
          >
            <BookOpen size={9} /> Study
          </button>
          <button
            onClick={() => setType('break')}
            className={`px-2.5 py-1 transition-all duration-200 flex items-center gap-1 ${
              type === 'break'
                ? 'bg-amber-500 text-white'
                : 'text-slate-500 hover:text-slate-300 bg-white/[0.02]'
            }`}
          >
            <Coffee size={9} /> Break
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Play / Pause */}
          <motion.button
            onClick={() => setIsRunning(!isRunning)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`h-8 px-3 rounded-xl flex items-center gap-1.5 text-white font-bold text-[10px] transition-all duration-300 ${
              isRunning
                ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'bg-primary shadow-[0_0_12px_rgba(99,102,241,0.4)]'
            }`}
          >
            {isRunning ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" />}
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>

          {/* Save */}
          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div
                key="saved"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
              >
                <motion.svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                  <motion.path
                    d="M1 5 L4 8 L11 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              </motion.div>
            ) : (
              <motion.button
                key="save"
                onClick={handleSave}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="h-8 w-8 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all flex items-center justify-center"
              >
                <Save size={13} />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="h-8 w-8 rounded-xl bg-white/5 border border-white/8 text-slate-500 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <RotateCcw size={12} />
          </motion.button>

          <motion.button
            onClick={launchTimer}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="h-8 w-8 rounded-xl bg-white/5 border border-white/8 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all flex items-center justify-center"
            title="External Widget"
          >
            <ExternalLink size={12} />
          </motion.button>

          <motion.button
            onClick={() => setIsFocusMode(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="h-8 px-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all flex items-center gap-1 font-bold text-[9px] uppercase tracking-wider"
          >
            <Maximize2 size={12} /> Focus
          </motion.button>
        </div>
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#0b0e14] flex flex-col items-center justify-center overflow-hidden"
          >
            <button
              onClick={() => setIsFocusMode(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center gap-2 font-bold text-sm"
            >
              <X size={20} /> Exit Focus
            </button>

            <div className="flex flex-col items-center select-none">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/30 font-black uppercase tracking-[0.3em] text-sm mb-4"
              >
                {subjectName} • {type}
              </motion.div>

              <motion.div
                key={type}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-mono font-black tabular-nums tracking-tighter text-white"
                style={{ fontSize: 'min(22vw, 200px)', lineHeight: 1 }}
              >
                {formatTimeWithMs(type === 'study' ? studyTimeMs : breakTimeMs)}
              </motion.div>

              <div className="mt-12 flex gap-4">
                 {/* Progress indicator in Focus Mode */}
                 <div className="h-1 w-64 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: `${Math.min((currentTime / currentGoal) * 100, 100)}%` }}
                    />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TimerWidget
        ref={widgetRef}
        isOpen={showWidget}
        onClose={() => setShowWidget(false)}
        subjectName={subjectName}
        subjectColor={subjectColor}
        studyTime={Math.floor(studyTimeMs / 1000)}
        breakTime={Math.floor(breakTimeMs / 1000)}
        isRunning={isRunning}
        type={type}
        onToggle={() => setIsRunning(!isRunning)}
        onReset={handleReset}
        onSave={handleSave}
        onToggleType={() => setType(t => t === 'study' ? 'break' : 'study')}
        language={language}
      />
    </div>
  );
}
