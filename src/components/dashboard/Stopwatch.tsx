"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Save, Coffee, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
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

export default function Stopwatch({
  subjectId, subjectName, language, subjectColor
}: {
  subjectId: string; subjectName: string; subjectColor: string; language: Language;
}) {
  const { addLog } = useAppContext();
  const t = translations[language || 'en'];

  const [studyMs, setStudyMs] = useState(0);
  const [breakMs, setBreakMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');

  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
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

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center gap-3 flex-wrap">
        {miniRing}
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
            onClick={handleReset}
            className="h-9 px-3 rounded-xl flex items-center gap-1.5 font-bold text-xs bg-white/5 text-white/30 border border-white/10 hover:text-white/60 transition-all"
            title="Reset"
          >
            <RotateCcw size={12} />
          </motion.button>
        </div>
      </div>

      {/* Mini stats */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Study</span>
          <span className="font-mono text-[10px] font-black text-white/40 tabular-nums">{formatHHMMSS(studyMs)}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Break</span>
          <span className="font-mono text-[10px] font-black text-white/40 tabular-nums">{formatHHMMSS(breakMs)}</span>
        </div>
        {isRunning && (
          <>
            <div className="w-px h-3 bg-white/10" />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-widest">
              {mode === 'study' ? 'Focusing' : 'On Break'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
