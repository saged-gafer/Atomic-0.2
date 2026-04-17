"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Play, Pause, Maximize2, X, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Language, translations } from '@/lib/i18n';
import { useAppContext } from '@/context/AppContext';

/**
 * Polished Focus Mode (Final Requirement Match)
 * - HH:MM:SS High-Precision Timer
 * - 3-Button Control (Start, Pause, End)
 * - 5-min Phrase Rotation
 * - 1-hour session validation
 * - Keyboard Shortcuts & Exit Confirmation
 */

const STUDY_GOAL_SECONDS = 3600; // 1 hour threshold
const PHRASE_INTERVAL_SECONDS = 300; // 5 minutes
const PHRASE_DISPLAY_DURATION = 5000; // 5 seconds

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
  console.log(subjectColor); // Avoid unused var lint
  const { addLog } = useAppContext();
  const t = translations[language || 'en'];
  const isRTL = language === 'ar';

  // State
  const [studyMs, setStudyMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Encouraging Phrase State
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
  const [phraseVisible, setPhraseVisible] = useState(false);
  const lastPhraseTimeRef = useRef(0);

  // Refs
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const updateTimerRef = useRef<() => void>(null);

  const updateTimer = useCallback(() => {
    const now = performance.now();
    const delta = now - startTimeRef.current;
    const currentTotal = accumulatedRef.current + delta;

    setStudyMs(currentTotal);

    // Phrase Rotation Logic (Every 5 mins of active study time)
    const currentSeconds = Math.floor(currentTotal / 1000);
    if (currentSeconds > 0 &&
        currentSeconds >= lastPhraseTimeRef.current + PHRASE_INTERVAL_SECONDS) {

      lastPhraseTimeRef.current = currentSeconds;
      const phrases = t.phrases || [];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setCurrentPhrase(randomPhrase);
      setPhraseVisible(true);
      setTimeout(() => setPhraseVisible(false), PHRASE_DISPLAY_DURATION);
    }

    if (updateTimerRef.current) {
      requestRef.current = requestAnimationFrame(updateTimerRef.current);
    }
  }, [t.phrases]);

  useEffect(() => {
    updateTimerRef.current = updateTimer;
  }, [updateTimer]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      accumulatedRef.current = studyMs;
      if (updateTimerRef.current) {
        requestRef.current = requestAnimationFrame(updateTimerRef.current);
      }
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, studyMs]);

  // Handlers
  const handleStart = useCallback(() => setIsRunning(true), []);
  const handlePause = useCallback(() => setIsRunning(false), []);
  const handleToggle = useCallback(() => setIsRunning(prev => !prev), []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setStudyMs(0);
    accumulatedRef.current = 0;
    lastPhraseTimeRef.current = 0;
  }, []);

  const executeSave = useCallback(() => {
    const sSec = Math.floor(studyMs / 1000);
    if (sSec > 0) addLog({ date: new Date().toISOString(), duration: sSec, type: 'study', subjectId });

    handleReset();
    setIsFocus(false);
    setShowConfirm(false);
    setShowExitConfirm(false);
  }, [studyMs, addLog, subjectId, handleReset]);

  const handleEnd = useCallback(() => {
    const sSec = Math.floor(studyMs / 1000);
    if (sSec === 0) return;

    if (sSec < STUDY_GOAL_SECONDS) {
      setShowConfirm(true);
    } else {
      executeSave();
    }
  }, [studyMs, executeSave]);

  const handleManualExit = useCallback(() => {
    if (isRunning || studyMs > 0) {
      setShowExitConfirm(true);
    } else {
      setIsFocus(false);
    }
  }, [isRunning, studyMs]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocus) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggle();
      } else if (e.key.toLowerCase() === 'e') {
        handleEnd();
      } else if (e.key === 'Escape') {
        handleManualExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocus, handleToggle, handleEnd, handleManualExit]);

  // Visuals
  const progress = Math.min((studyMs / 1000) / STUDY_GOAL_SECONDS, 1);
  const springProgress = useSpring(progress, { stiffness: 40, damping: 15 });
  const timerScale = useTransform(springProgress, [0, 1], [1, 1.05]);

  return (
    <div className="flex flex-wrap items-center gap-4 p-1">
      {/* Mini View */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" className="text-white/5" fill="none" />
          <motion.circle
            cx="50" cy="50" r="44"
            stroke="#6366f1"
            strokeWidth="8"
            fill="none"
            strokeDasharray="276.46"
            animate={{ strokeDashoffset: 276.46 * (1 - progress) }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            strokeLinecap="round"
          />
        </svg>
        <span className="font-mono text-[9px] font-black text-white z-10">{formatHHMMSS(studyMs).slice(3)}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className={`h-9 px-4 rounded-xl flex items-center gap-2 font-bold text-xs transition-all ${isRunning ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-primary text-white shadow-lg shadow-primary/25'}`}
          >
            {isRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isRunning ? t.pause : t.start}
          </motion.button>

          <button
            onClick={() => setIsFocus(true)}
            className="h-9 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest"
          >
            <Maximize2 size={13} />
            {t.exit_focus === 'Exit Focus' ? 'Focus Mode' : 'وضع التركيز'}
          </button>
        </div>
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocus && mounted && createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Liquid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Exit Header */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <Maximize2 size={18} />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest">{subjectName}</h4>
                  <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">{t.study}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={handleManualExit}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Encouraging Phrase */}
            <div className="absolute top-32 h-16 flex items-center justify-center w-full overflow-hidden px-4">
              <AnimatePresence mode="wait">
                {phraseVisible && currentPhrase && (
                  <motion.div
                    key={currentPhrase}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-black text-sm sm:text-lg shadow-2xl backdrop-blur-md"
                  >
                    <span className="text-primary text-xl">✦</span>
                    {currentPhrase}
                    <span className="text-primary text-xl">✦</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Huge Timer */}
            <motion.div
              style={{ scale: timerScale }}
              className="relative flex flex-col items-center"
            >
              <div
                className="font-mono font-black tabular-nums tracking-tighter text-white select-none"
                style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', lineHeight: 0.9 }}
              >
                <span className="text-glow transition-all duration-300">
                  {formatHHMMSS(studyMs)}
                </span>
              </div>

              {/* Goal Progress */}
              <div className="w-full max-w-md mt-12 space-y-4 px-6">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-primary shadow-[0_0_20px_var(--primary)]"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                  />
                </div>
                <div className="flex justify-between px-1">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">1 Hour Study Goal</span>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{Math.round(progress * 100)}%</span>
                </div>
              </div>
            </motion.div>

            {/* Focus Controls */}
            <div className="mt-24 flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 max-w-2xl w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isRunning}
                onClick={handleStart}
                className={`flex-1 h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 border ${!isRunning ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white/5 text-white/10 border-white/5 cursor-not-allowed'}`}
              >
                <Play size={16} fill="currentColor" />
                {t.start}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!isRunning}
                onClick={handlePause}
                className={`flex-1 h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 border ${isRunning ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-white/5 text-white/10 border-white/5 cursor-not-allowed'}`}
              >
                <Pause size={16} fill="currentColor" />
                {t.pause}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnd}
                className="flex-1 h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                {t.end_session_confirm.split(' ')[0]}
              </motion.button>
            </div>

            {/* Confirm End Modal (< 1h) */}
            <AnimatePresence>
              {showConfirm && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                  onClick={() => setShowConfirm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                    className="max-w-md w-full bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] text-center space-y-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                      <AlertCircle size={32} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white">Almost there!</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        {t.short_session_warning.replace('{min}', Math.floor(studyMs / 60000).toString())}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
                      >
                        {t.continue_studying}
                      </button>
                      <button
                        onClick={executeSave}
                        className="w-full py-4 rounded-2xl bg-white/5 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                      >
                        {t.end_session_confirm}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm Exit (Loss of progress warning) */}
            <AnimatePresence>
              {showExitConfirm && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                  onClick={() => setShowExitConfirm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                    className="max-w-md w-full bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] text-center space-y-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                      <AlertCircle size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white">Exit Focus Mode?</h3>
                      <p className="text-slate-400 text-sm font-medium">{t.exit_warning}</p>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => setShowExitConfirm(false)}
                        className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest"
                      >
                        {t.back}
                      </button>
                      <button
                        onClick={() => { setIsFocus(false); setShowExitConfirm(false); handleReset(); }}
                        className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest"
                      >
                        {t.end_session_confirm}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
