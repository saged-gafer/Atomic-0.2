"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, X, Save, Coffee, Focus, RotateCcw, Flame } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Language, translations } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';

const formatHHMMSS = (totalMs: number) => {
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const CIRCUMFERENCE = 2 * Math.PI * 54;

const FOCUS_QUOTES = [
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Deep work is a superpower in a distracted world.",
  "One hour of focused work beats four hours of distracted work.",
  "Your future is created by what you do today.",
];

export default function Stopwatch({
  subjectId, subjectName, language, subjectColor
}: {
  subjectId: string; subjectName: string; subjectColor: string; language: Language;
}) {
  const { addLog } = useAppContext();
  const t = translations[language || 'en'];
  const isRTL = language === 'ar';

  const [studyMs, setStudyMs] = useState(0);
  const [breakMs, setBreakMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  const updateTimerRef = useRef<() => void>(null);

  useEffect(() => {

  }, []);

  // Keyboard shortcuts — moved below function declarations (see after handleSave)

  // Rotate focus quotes every 20s
  useEffect(() => {
    if (!isFocusMode) return;
    const id = setInterval(() => {
      setQuoteIndex(i => (i + 1) % FOCUS_QUOTES.length);
    }, 20000);
    return () => clearInterval(id);
  }, [isFocusMode]);

  // Breathing cycle
  useEffect(() => {
    if (!isFocusMode || !isRunning) return;
    const cycle = async () => {
      setBreathPhase('inhale');
      await new Promise(r => setTimeout(r, 4000));
      setBreathPhase('hold');
      await new Promise(r => setTimeout(r, 2000));
      setBreathPhase('exhale');
      await new Promise(r => setTimeout(r, 4000));
    };
    cycle();
    const id = setInterval(cycle, 10000);
    return () => clearInterval(id);
  }, [isFocusMode, isRunning]);

  const updateTimer = useCallback(() => {
    const now = performance.now();
    const delta = now - startTimeRef.current;
    const currentTotal = accumulatedRef.current + delta;
    if (mode === 'study') setStudyMs(currentTotal);
    else setBreakMs(currentTotal);
    if (updateTimerRef.current) {
      requestRef.current = requestAnimationFrame(updateTimerRef.current);
    }
  }, [mode]);

  useEffect(() => { updateTimerRef.current = updateTimer; }, [updateTimer]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      accumulatedRef.current = mode === 'study' ? studyMs : breakMs;
      if (updateTimerRef.current) {
        requestRef.current = requestAnimationFrame(updateTimerRef.current);
      }
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, mode]); // eslint-disable-line

  const handleStart = useCallback(() => { setMode('study'); setIsRunning(true); }, []);
  const handlePause = useCallback(() => setIsRunning(false), []);
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setStudyMs(0); setBreakMs(0);
    accumulatedRef.current = 0;
    setMode('study');
  }, []);

  const handleSave = useCallback(() => {
    setIsRunning(false);
    const sSec = Math.floor(studyMs / 1000);
    if (sSec > 0) addLog({ date: new Date().toISOString(), duration: sSec, type: 'study', subjectId });
    setStudyMs(0);
    accumulatedRef.current = 0;
  }, [studyMs, addLog, subjectId]);

  // Keyboard shortcuts — declared after handlePause/handleStart/handleSave to avoid TDZ errors
  useEffect(() => {
    if (!isFocusMode) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); isRunning && mode === 'study' ? handlePause() : handleStart(); }
      if (e.code === 'KeyS' && !e.metaKey && !e.ctrlKey) handleSave();
      if (e.code === 'Escape') setIsFocusMode(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFocusMode, isRunning, mode, handlePause, handleStart, handleSave]);

  const toggleBreak = useCallback(() => {
    if (mode === 'break' && isRunning) {
      setIsRunning(false);
      const bSec = Math.floor(breakMs / 1000);
      if (bSec > 0) addLog({ date: new Date().toISOString(), duration: bSec, type: 'break', subjectId });
      setBreakMs(0);
      setMode('study');
    } else {
      setIsRunning(false);
      setMode('break');
      setIsRunning(true);
    }
  }, [mode, isRunning, breakMs, addLog, subjectId]);

  const activeMs = mode === 'study' ? studyMs : breakMs;
  const progress = Math.min(activeMs / 3600000, 1);
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  // Mini circular ring (compact view)
  const miniRing = (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.06)" strokeWidth="7" fill="none" />
        <motion.circle
          cx="60" cy="60" r="54"
          stroke={mode === 'study' ? subjectColor : '#818cf8'}
          strokeWidth="7"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transition={{ type: 'spring', stiffness: 40, damping: 18 }}
        />
      </svg>
      <span className="font-mono text-[9px] font-black text-white z-10 tabular-nums">
        {formatHHMMSS(activeMs).slice(3)}
      </span>
      {isRunning && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: [`0 0 0px ${subjectColor}00`, `0 0 14px ${subjectColor}55`, `0 0 0px ${subjectColor}00`] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );

  // Compact controls
  const compactControls = (
    <div className="flex flex-wrap items-center gap-2">
      {!isRunning || mode !== 'study' ? (
        <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          onClick={handleStart}
          className="h-9 px-3.5 rounded-xl flex items-center gap-1.5 font-bold text-xs bg-primary text-white shadow-lg shadow-primary/30"
        >
          <Play size={12} fill="currentColor" />{t.start}
        </motion.button>
      ) : (
        <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          onClick={handlePause}
          className="h-9 px-3.5 rounded-xl flex items-center gap-1.5 font-bold text-xs bg-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Pause size={12} fill="currentColor" />{t.pause}
        </motion.button>
      )}

      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        onClick={handleSave}
        disabled={studyMs === 0}
        className={`h-9 px-3.5 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all ${studyMs === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'}`}
      >
        <Save size={12} />{t.save}
      </motion.button>

      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        onClick={toggleBreak}
        className={`h-9 px-3.5 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all ${mode === 'break' && isRunning ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25'}`}
      >
        <Coffee size={12} />
        {mode === 'break' && isRunning ? t.save_break : t.break}
      </motion.button>

      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        onClick={() => setIsFocusMode(true)}
        className="h-9 px-3.5 rounded-xl flex items-center gap-1.5 font-bold text-[10px] bg-white/5 text-white/40 border border-white/10 hover:text-white hover:border-primary/30 transition-all"
        title="Focus Mode"
      >
        <Focus size={12} />
        Focus
      </motion.button>
    </div>
  );

  // Full focus mode overlay
  const breathScale = breathPhase === 'inhale' ? 1.15 : breathPhase === 'hold' ? 1.15 : 1;
  const breathLabel = breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out';

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center gap-3 flex-wrap">
        {miniRing}
        {compactControls}
      </div>

      {/* Focus Mode Portal */}
      <AnimatePresence>
        {isFocusMode && mounted && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{ background: '#020617' }}
          >
            {/* Ambient blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute rounded-full blur-[120px]"
                animate={{
                  background: mode === 'study'
                    ? [`${subjectColor}18`, `${subjectColor}28`, `${subjectColor}18`]
                    : ['rgba(129,140,248,0.12)', 'rgba(129,140,248,0.22)', 'rgba(129,140,248,0.12)'],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '70vw', height: '70vw', top: '15%', left: '15%' }}
              />
              <motion.div
                className="absolute rounded-full blur-[80px]"
                style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', background: 'rgba(236,72,153,0.06)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full"
                  style={{ background: subjectColor, boxShadow: `0 0 10px ${subjectColor}` }} />
                <span className="text-white/50 text-xs font-black uppercase tracking-[0.25em]">{subjectName}</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                  {mode === 'study' ? 'Study Session' : 'Break'}
                </span>
              </motion.div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleReset}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-white/60 transition-all"
                  title="Reset"
                >
                  <RotateCcw size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsFocusMode(false)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-white/60 transition-all"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Center content */}
            <div className="flex flex-col items-center gap-10 relative z-10">
              {/* Big ring */}
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  viewBox="0 0 260 260"
                  className="-rotate-90"
                  style={{ width: 'clamp(220px, 35vw, 340px)', height: 'clamp(220px, 35vw, 340px)' }}
                >
                  {/* Track */}
                  <circle cx="130" cy="130" r="118"
                    stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none" />
                  {/* Tick marks */}
                  {Array.from({ length: 60 }, (_, i) => {
                    const angle = (i / 60) * Math.PI * 2;
                    const isMajor = i % 5 === 0;
                    const r1 = isMajor ? 108 : 112;
                    const r2 = 118;
                    return (
                      <line
                        key={i}
                        x1={130 + r1 * Math.cos(angle)} y1={130 + r1 * Math.sin(angle)}
                        x2={130 + r2 * Math.cos(angle)} y2={130 + r2 * Math.sin(angle)}
                        stroke={`rgba(255,255,255,${isMajor ? 0.12 : 0.05})`}
                        strokeWidth={isMajor ? 2 : 1}
                      />
                    );
                  })}
                  {/* Progress arc */}
                  <motion.circle
                    cx="130" cy="130" r="118"
                    stroke={mode === 'study' ? subjectColor : '#818cf8'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 118}
                    animate={{ strokeDashoffset: 2 * Math.PI * 118 * (1 - progress) }}
                    transition={{ type: 'spring', stiffness: 30, damping: 15 }}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 12px ${mode === 'study' ? subjectColor : '#818cf8'})` }}
                  />
                </svg>

                {/* Center timer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    key={`${isRunning}-${mode}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-mono font-black tabular-nums text-white text-center select-none"
                    style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
                  >
                    {formatHHMMSS(activeMs)}
                  </motion.div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mt-3">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: isRunning ? '#10b981' : '#64748b' }}
                      animate={isRunning ? { opacity: [1, 0.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                      {mode === 'study' ? (isRunning ? 'Focusing' : 'Paused') : (isRunning ? 'On Break' : 'Paused')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Breathing guide */}
              <AnimatePresence mode="wait">
                {isRunning && mode === 'study' && (
                  <motion.div
                    key="breathing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.div
                      className="rounded-full border"
                      style={{ borderColor: `${subjectColor}40`, background: `${subjectColor}08` }}
                      animate={{ scale: breathScale, borderColor: [`${subjectColor}30`, `${subjectColor}70`, `${subjectColor}30`] }}
                      transition={{ duration: breathPhase === 'hold' ? 0.3 : breathPhase === 'inhale' ? 4 : 4, ease: 'easeInOut' }}
                    >
                      <motion.div
                        className="w-8 h-8 m-3 rounded-full"
                        style={{ background: `${subjectColor}60` }}
                        animate={{ scale: breathScale }}
                        transition={{ duration: breathPhase === 'hold' ? 0.3 : 4, ease: 'easeInOut' }}
                      />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={breathPhase}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]"
                      >
                        {breathLabel}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-3 flex-wrap justify-center"
              >
                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={isRunning && mode === 'study' ? handlePause : handleStart}
                  className="relative h-14 px-8 rounded-2xl flex items-center gap-3 font-black text-sm text-white overflow-hidden"
                  style={{ background: mode === 'study' ? subjectColor : '#818cf8', boxShadow: `0 0 30px ${mode === 'study' ? subjectColor : '#818cf8'}55` }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isRunning && mode === 'study'
                      ? <><Pause size={18} fill="currentColor" />{t.pause}</>
                      : <><Play size={18} fill="currentColor" />{t.start}</>
                    }
                  </span>
                </motion.button>

                {/* Save */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleSave}
                  disabled={studyMs === 0}
                  className={`h-14 px-6 rounded-2xl flex items-center gap-2 font-black text-sm transition-all ${studyMs === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white'}`}
                >
                  <Save size={16} />{t.save}
                </motion.button>

                {/* Break */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={toggleBreak}
                  className={`h-14 px-6 rounded-2xl flex items-center gap-2 font-black text-sm transition-all ${mode === 'break' && isRunning ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 hover:bg-indigo-500/20'}`}
                >
                  <Coffee size={16} />
                  {mode === 'break' && isRunning ? t.save_break : t.break}
                </motion.button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6"
              >
                <div className="text-center">
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Study</p>
                  <p className="font-mono font-black text-white/50 tabular-nums text-sm">{formatHHMMSS(studyMs)}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Break</p>
                  <p className="font-mono font-black text-white/50 tabular-nums text-sm">{formatHHMMSS(breakMs)}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">
                    <Flame size={10} className="inline mb-0.5" /> Streak
                  </p>
                  <p className="font-mono font-black text-white/50 tabular-nums text-sm">
                    {Math.floor(studyMs / 60000)}m
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Keyboard hints */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-8 z-20 flex items-center gap-3"
            >
              {[
                { key: 'Space', label: 'Play/Pause' },
                { key: 'S', label: 'Save' },
                { key: 'Esc', label: 'Exit' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-white/25">{key}</kbd>
                  <span className="text-[9px] text-white/15 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Floating quote */}
            <div className="absolute bottom-8 right-8 left-32 flex justify-end z-20 px-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6 }}
                  className="text-xs text-white/15 font-medium text-center italic max-w-md"
                >
                  &ldquo;{FOCUS_QUOTES[quoteIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
