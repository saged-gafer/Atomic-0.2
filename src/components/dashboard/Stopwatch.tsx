"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Play, Pause, RotateCcw, Save,
  Maximize2, X, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';
import TimerWidget, { TimerWidgetRef } from './TimerWidget';

/**
 * High-Precision Study Timer & Focus Mode
 * Features:
 * - Delta-based timing (immune to background throttling)
 * - Liquid Glass aesthetic
 * - Zen Focus Mode with animated environments
 * - Haptic-like visual feedback
 */

const STUDY_GOAL_SECONDS = 90 * 60;
const BREAK_GOAL_SECONDS = 15 * 60;

// Utility for high-precision formatting
const formatTimeDetailed = (totalMs: number) => {
  const ms = Math.floor((totalMs % 1000) / 10);
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor(totalSeconds / 3600);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms)}`;
  return `${pad(m)}:${pad(s)}.${pad(ms)}`;
};

const formatTimeShort = (totalMs: number) => {
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const m = Math.floor((totalSeconds / 60) % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(m)}:${pad(s)}`;
};

export default function Stopwatch({
  subjectId, subjectName, subjectColor, language
}: {
  subjectId: string; subjectName: string; subjectColor: string; language: Language;
}) {
  const { addLog } = useAppContext();
  const t = translations[language || 'en'];
  const isRTL = language === 'ar';

  // State
  const [studyMs, setStudyMs] = useState(0);
  const [breakMs, setBreakMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [isFocus, setIsFocus] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs for high-precision timing
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  const widgetRef = useRef<TimerWidgetRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Core Timing Engine
  const updateTimerRef = useRef<() => void>(null);

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

  useEffect(() => {
    updateTimerRef.current = updateTimer;
  }, [updateTimer]);

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
  }, [isRunning, mode, studyMs, breakMs]);

  // UI Handlers
  const handleToggle = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setStudyMs(0);
    setBreakMs(0);
    accumulatedRef.current = 0;
  };

  const handleSave = () => {
    const sSec = Math.floor(studyMs / 1000);
    const bSec = Math.floor(breakMs / 1000);

    if (sSec > 0) addLog({ date: new Date().toISOString(), duration: sSec, type: 'study', subjectId });
    if (bSec > 0) addLog({ date: new Date().toISOString(), duration: bSec, type: 'break', subjectId });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      handleReset();
    }, 1500);
  };

  // Focus Mode Body Lock
  useEffect(() => {
    if (isFocus) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isFocus]);

  const currentMs = mode === 'study' ? studyMs : breakMs;
  const currentGoal = mode === 'study' ? STUDY_GOAL_SECONDS : BREAK_GOAL_SECONDS;
  const progress = Math.min((currentMs / 1000) / currentGoal, 1);
  const activeColor = mode === 'study' ? '#6366f1' : '#f59e0b';

  return (
    <div className="flex flex-wrap items-center gap-4 p-1">
      {/* Compact Circular Progress */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" className="text-white/5" fill="none" />
          <motion.circle
            cx="50" cy="50" r="44"
            stroke={activeColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray="276.46"
            animate={{ strokeDashoffset: 276.46 * (1 - progress) }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col items-center z-10">
          <span className="font-mono text-[10px] font-black text-white leading-none">
            {formatTimeShort(currentMs)}
          </span>
          <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5 opacity-40">
            {mode}
          </span>
        </div>

        {isRunning && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: activeColor }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Main Controls */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/5">
          <button
            onClick={() => setMode('study')}
            className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'study' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Study
          </button>
          <button
            onClick={() => setMode('break')}
            className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Break
          </button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className={`h-9 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${isRunning ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-primary text-white shadow-lg shadow-primary/25'}`}
          >
            {isRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>

          <button onClick={handleReset} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors">
            <RotateCcw size={14} />
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved || (studyMs + breakMs === 0)}
            className={`p-2.5 rounded-xl border transition-all ${isSaved ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
          >
            {isSaved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          </button>

          <button
            onClick={() => setIsFocus(true)}
            className="h-9 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest"
          >
            <Maximize2 size={13} />
            Focus Mode
          </button>
        </div>
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocus && mounted && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Liquid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Exit Button */}
            <motion.button
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={() => setIsFocus(false)}
              className="absolute top-8 right-8 rtl:right-auto rtl:left-8 flex items-center gap-3 px-6 py-3 rounded-2xl glass-panel text-white/50 hover:text-white transition-all group z-50"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
              <span className="font-black text-xs uppercase tracking-[0.2em]">{t.exit_focus}</span>
            </motion.button>

            {/* Zen Content */}
            <div className="relative flex flex-col items-center max-w-4xl w-full px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12"
              >
                <div className="text-white/20 font-black uppercase tracking-[0.5em] text-sm mb-2">
                  {subjectName}
                </div>
                <div className="h-px w-12 bg-white/10 mx-auto" />
              </motion.div>

              {/* Huge Timer */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono font-black tabular-nums tracking-tighter text-white select-none relative"
                style={{ fontSize: 'clamp(5rem, 18vw, 12rem)', lineHeight: 1 }}
              >
                <span className="text-glow">{formatTimeDetailed(currentMs).split('.')[0]}</span>
                <span className="text-[0.25em] opacity-20 ml-2">.{formatTimeDetailed(currentMs).split('.')[1]}</span>
              </motion.div>

              {/* Subtle Progress Bar */}
              <div className="w-full max-w-md mt-16 space-y-4">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: activeColor, boxShadow: `0 0 20px ${activeColor}` }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                  />
                </div>
                <div className="flex justify-between px-1">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{mode === 'study' ? t.study : t.break}</span>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{formatTimeShort(currentGoal * 1000)}</span>
                </div>
              </div>

              {/* Big Zen Controls */}
              <div className="mt-20 flex items-center gap-12">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all"
                >
                  <RotateCcw size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggle}
                  className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-white transition-all relative group ${isRunning ? 'bg-amber-500 shadow-2xl shadow-amber-500/20' : 'bg-primary shadow-2xl shadow-primary/20'}`}
                >
                  <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 blur-xl scale-0 group-hover:scale-100 transition-transform" />
                  {isRunning ? <Pause size={42} fill="currentColor" /> : <Play size={42} fill="currentColor" className="ml-2" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all ${isSaved ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/5 text-white/30 hover:text-emerald-400'}`}
                >
                  {isSaved ? <CheckCircle2 size={24} /> : <Save size={24} />}
                </motion.button>
              </div>
            </div>

            {/* Quotes / Tips (Bottom) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 text-white/10 font-black text-[10px] uppercase tracking-[0.6em] px-8 text-center"
            >
              {t.focus_quote}
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      <TimerWidget
        ref={widgetRef}
        isOpen={showWidget}
        onClose={() => setShowWidget(false)}
        subjectName={subjectName}
        subjectColor={subjectColor}
        studyTime={Math.floor(studyMs / 1000)}
        breakTime={Math.floor(breakMs / 1000)}
        isRunning={isRunning}
        type={mode}
        onToggle={handleToggle}
        onReset={handleReset}
        onSave={handleSave}
        onToggleType={() => setMode(m => m === 'study' ? 'break' : 'study')}
        language={language}
      />
    </div>
  );
}
