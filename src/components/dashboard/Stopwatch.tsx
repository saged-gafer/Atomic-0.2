"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Play, Pause, Maximize2, X, Save, Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';

/**
 * Updated Stopwatch Component
 * - 3-Button Control for Study (Start, Pause, Save)
 * - Break Session Tracking (Single toggle button)
 * - Full Screen / Enlarge button
 * - Removed Focus Mode logic (phrases, goals, confirmations)
 */

const formatHHMMSS = (totalMs: number) => {
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export default function Stopwatch({
  subjectId, subjectName, language, subjectColor
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
  const [isFull, setIsFull] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle browser fullscreen API
  useEffect(() => {
    if (isFull) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isFull]);

  // Refs
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFull(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const updateTimerRef = useRef<() => void>(null);

  const updateTimer = useCallback(() => {
    const now = performance.now();
    const delta = now - startTimeRef.current;
    const currentTotal = accumulatedRef.current + delta;

    if (mode === 'study') {
      setStudyMs(currentTotal);
    } else {
      setBreakMs(currentTotal);
    }

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

  // Handlers
  const handleStart = useCallback(() => {
    setMode('study');
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleSave = useCallback(() => {
    setIsRunning(false);
    const sSec = Math.floor(studyMs / 1000);
    if (sSec > 0) {
      addLog({ date: new Date().toISOString(), duration: sSec, type: 'study', subjectId });
    }
    setStudyMs(0);
    accumulatedRef.current = 0;
  }, [studyMs, addLog, subjectId]);

  const toggleBreak = useCallback(() => {
    if (mode === 'break' && isRunning) {
      // Save break
      setIsRunning(false);
      const bSec = Math.floor(breakMs / 1000);
      if (bSec > 0) {
        addLog({ date: new Date().toISOString(), duration: bSec, type: 'break', subjectId });
      }
      setBreakMs(0);
      setMode('study');
    } else {
      // Start break
      setIsRunning(false); // Pause study if running
      setMode('break');
      setIsRunning(true);
    }
  }, [mode, isRunning, breakMs, addLog, subjectId]);

  const activeMs = mode === 'study' ? studyMs : breakMs;

  const renderControls = (full: boolean = false) => (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${full ? 'mt-24 max-w-2xl w-full' : ''}`}>
      {/* Study Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          disabled={isRunning && mode === 'study'}
          className={`h-10 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${isRunning && mode === 'study' ? 'bg-primary/20 text-primary border border-primary/30 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/25'}`}
        >
          <Play size={14} fill="currentColor" />
          {t.start}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePause}
          disabled={!isRunning || mode !== 'study'}
          className={`h-10 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${!isRunning || mode !== 'study' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'}`}
        >
          <Pause size={14} fill="currentColor" />
          {t.pause}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={studyMs === 0}
          className={`h-10 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${studyMs === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'}`}
        >
          <Save size={14} />
          {t.save}
        </motion.button>
      </div>

      {/* Break Control */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleBreak}
        className={`h-10 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${mode === 'break' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}
      >
        <Coffee size={14} />
        {mode === 'break' ? (isRunning ? t.save_break : t.break) : t.break}
      </motion.button>

      {!full && (
        <button
          onClick={() => setIsFull(true)}
          className="h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest"
          title={t.full_screen}
        >
          <Maximize2 size={13} />
          {t.full_screen}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="flex items-center gap-4">
        {/* Mini View */}
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" className="text-white/5" fill="none" />
            <motion.circle
              cx="50" cy="50" r="44"
              stroke={mode === 'study' ? subjectColor : "#818cf8"}
              strokeWidth="8"
              fill="none"
              strokeDasharray="276.46"
              animate={{ strokeDashoffset: 276.46 * (1 - Math.min(activeMs / 3600000, 1)) }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              strokeLinecap="round"
            />
          </svg>
          <span className="font-mono text-[9px] font-black text-white z-10">{formatHHMMSS(activeMs).slice(3)}</span>
        </div>

        {renderControls(false)}
      </div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isFull && mounted && createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Liquid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <Maximize2 size={18} />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest">{subjectName}</h4>
                  <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">
                    {mode === 'study' ? t.study : t.break}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => setIsFull(false)}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Huge Timer */}
            <div className="relative flex flex-col items-center">
              <div
                className="font-mono font-black tabular-nums tracking-tighter text-white select-none"
                style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', lineHeight: 0.9 }}
              >
                <span className="text-glow transition-all duration-300">
                  {formatHHMMSS(activeMs)}
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                  {mode === 'study' ? (isRunning ? 'Studying' : 'Study Paused') : (isRunning ? 'On Break' : 'Break Paused')}
                </span>
              </div>
            </div>

            {renderControls(true)}
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
