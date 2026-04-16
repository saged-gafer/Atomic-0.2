"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Save, Coffee, BookOpen, ExternalLink } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';
import TimerWidget, { TimerWidgetRef } from './TimerWidget';
import { motion, AnimatePresence } from 'framer-motion';

const STUDY_GOAL_SECONDS = 90 * 60; // 90 min default Pomodoro cycle

function CircularTimer({
  seconds,
  goal,
  isRunning,
  color,
  type,
}: {
  seconds: number;
  goal: number;
  isRunning: boolean;
  color: string;
  type: 'study' | 'break';
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(seconds / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (s: number) => {
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
        <span className="font-mono text-[11px] font-black text-white leading-none">{formatTime(seconds)}</span>
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
  const [studyTime, setStudyTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [type, setType] = useState<'study' | 'break'>('study');
  const [showWidget, setShowWidget] = useState(false);
  const [saved, setSaved] = useState(false);
  const widgetRef = useRef<TimerWidgetRef>(null);
  const t = translations[language || 'en'];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        if (type === 'study') setStudyTime(p => p + 1);
        else setBreakTime(p => p + 1);
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, type]);

  const handleSave = () => {
    if (studyTime > 0) addLog({ date: new Date().toISOString(), duration: studyTime, type: 'study', subjectId });
    if (breakTime > 0) addLog({ date: new Date().toISOString(), duration: breakTime, type: 'break', subjectId });
    setStudyTime(0);
    setBreakTime(0);
    setIsRunning(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setStudyTime(0);
    setBreakTime(0);
    setIsRunning(false);
  };

  const launchTimer = () => {
    setShowWidget(true);
    setTimeout(() => widgetRef.current?.togglePip(), 100);
  };

  const breakGoal = 15 * 60;
  const activeColor = type === 'study' ? '#6366f1' : '#f59e0b';
  const currentTime = type === 'study' ? studyTime : breakTime;
  const currentGoal = type === 'study' ? STUDY_GOAL_SECONDS : breakGoal;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Circular timer display */}
      <CircularTimer
        seconds={currentTime}
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
          >
            <ExternalLink size={12} />
          </motion.button>
        </div>
      </div>

      <TimerWidget
        ref={widgetRef}
        isOpen={showWidget}
        onClose={() => setShowWidget(false)}
        subjectName={subjectName}
        subjectColor={subjectColor}
        studyTime={studyTime}
        breakTime={breakTime}
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
