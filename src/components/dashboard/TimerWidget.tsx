"use client";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Atom, Minimize2, BookOpen, Timer as TimerIcon, ExternalLink, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations, Language } from '@/lib/i18n';

interface TimerWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  subjectColor: string;
  studyTime: number;
  breakTime: number;
  isRunning: boolean;
  type: 'study' | 'break';
  onToggle: () => void;
  onReset: () => void;
  onSave?: () => void;
  onToggleType?: () => void;
  language: Language;
}

export interface TimerWidgetRef {
  togglePip: () => void;
}

const TimerWidget = React.forwardRef<TimerWidgetRef, TimerWidgetProps>(({
  isOpen,
  onClose,
  subjectName,
  subjectColor,
  studyTime,
  breakTime,
  isRunning,
  type,
  onToggle,
  onReset,
  onSave,
  onToggleType,
  language
}, ref) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPipActive, setIsPipActive] = useState(false);
  const pipWindowRef = useRef<Window | null>(null);
  const t = translations[language || 'en'];
  const isRTL = language === 'ar';

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePip = React.useCallback(async () => {
    if (isPipActive) {
      if (pipWindowRef.current) {
        pipWindowRef.current.close();
      }
      return;
    }

    try {
      // @ts-expect-error - Document Picture-in-Picture API
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 320,
        height: 480,
      });

      pipWindowRef.current = pipWindow;
      setIsPipActive(true);

      // Copy styles to PIP window
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach((styleSheet) => {
        try {
          const cssRules = Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          pipWindow.document.head.appendChild(style);
        } catch {
          const link = document.createElement("link");
          if (styleSheet.href) {
            link.rel = "stylesheet";
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        }
      });

      // Add basic body styles to PIP
      pipWindow.document.body.style.background = "#030712";
      pipWindow.document.body.style.margin = "0";
      pipWindow.document.body.style.display = "flex";
      pipWindow.document.body.style.alignItems = "center";
      pipWindow.document.body.style.justifyContent = "center";
      pipWindow.document.body.style.height = "100vh";
      pipWindow.document.body.style.overflow = "hidden";

      const container = pipWindow.document.createElement("div");
      container.id = "pip-root";
      pipWindow.document.body.appendChild(container);

      // Copy class list to PiP window body to ensure Tailwind works if it uses body classes
      pipWindow.document.body.className = document.body.className;

      pipWindow.addEventListener("pagehide", () => {
        setIsPipActive(false);
        pipWindowRef.current = null;
      });
    } catch (err) {
      console.error("Failed to open PiP window:", err);
    }
  }, [isPipActive]);

  React.useImperativeHandle(ref, () => ({
    togglePip: () => {
      togglePip();
    }
  }), [togglePip]);

  useEffect(() => {
    if (isPipActive && pipWindowRef.current) {
      // Logic to update PIP window content would go here if we were using a portal
      // But for simplicity in this environment, we'll just show the UI in the main window
      // when PiP is active, as React Portals are tricky with PiP windows in some setups.
    }
  }, [isPipActive, studyTime, breakTime, isRunning, type]);

  // Use a state for the portal target to avoid reading ref during render
  const [pipTarget, setPipTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isPipActive && pipWindowRef.current) {
      setPipTarget(pipWindowRef.current.document.getElementById('pip-root'));
    } else {
      setPipTarget(null);
    }
  }, [isPipActive]);

  if (!isOpen) return null;

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: position.x,
        }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        drag
        dragMomentum={false}
        onDragEnd={(_, info) => {
          setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
        }}
        className={`fixed z-[200] ${isRTL ? 'left-6' : 'right-6'} bottom-6 ${
          isMinimized ? 'w-auto' : 'w-80'
        } cursor-grab active:cursor-grabbing`}
        style={{ touchAction: 'none' }}
      >
        <div
          className={`bg-[#0f172a]/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden relative ${
            isRunning ? 'shadow-blue-500/20' : ''
          }`}
        >
          {/* Animated Glow background */}
          <AnimatePresence>
            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[80px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[80px] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/[0.03] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${subjectColor}20` }}
              >
                <Atom size={16} style={{ color: subjectColor }} className={isRunning ? 'animate-spin-slow' : ''} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 truncate max-w-[140px]">
                {subjectName}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={togglePip}
                className={`p-1.5 rounded-lg transition-colors ${isPipActive ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10 text-slate-500'}`}
                title="Pop out timer"
              >
                <ExternalLink size={14} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => {
                  if (isPipActive && pipWindowRef.current) pipWindowRef.current.close();
                  onClose();
                }}
                className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isMinimized ? (
              <motion.div
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6"
              >
                {/* Timer Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Background Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible">
                      <circle
                        cx="80"
                        cy="80"
                        r="74"
                        fill="none"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="74"
                        fill="none"
                        stroke={type === 'study' ? '#3b82f6' : '#f59e0b'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: (type === 'study' ? studyTime % 3600 : breakTime % 3600) / 3600 }}
                        transition={{ duration: 1, ease: "linear" }}
                        style={{ filter: `drop-shadow(0 0 8px ${type === 'study' ? 'rgba(59,130,246,0.5)' : 'rgba(245,158,11,0.5)'})` }}
                      />
                    </svg>

                    <div className="flex flex-col items-center z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <TimerIcon size={12} className={isRunning ? 'text-blue-400' : 'text-slate-500'} />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Stopwatch</span>
                      </div>
                      <span className={`font-mono text-4xl font-black tracking-tighter ${
                        isRunning ? 'text-white' : 'text-slate-400'
                      }`}>
                        {formatTime(type === 'study' ? studyTime : breakTime)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info & Controls */}
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                      <BookOpen size={12} className="text-blue-400" />
                      <span className="text-[11px] font-black text-slate-200 uppercase tracking-wide truncate max-w-[180px]">
                        {subjectName}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={onToggleType}
                      animate={{ 
                        backgroundColor: type === 'study' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)',
                        color: type === 'study' ? '#3b82f6' : '#f59e0b',
                        borderColor: type === 'study' ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.2)'
                      }}
                      className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      {type === 'study' ? t.study : t.break}
                    </motion.button>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={onToggle}
                      className={`h-14 w-14 p-0 rounded-2xl shadow-xl transition-all active:scale-95 ${
                        isRunning
                          ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-900/20'
                          : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                      }`}
                    >
                      {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={onReset}
                      className="h-14 w-14 p-0 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                    >
                      <RotateCcw size={20} />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={onSave}
                      className="h-14 w-14 p-0 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 hover:text-emerald-500 transition-all active:scale-95"
                    >
                      <Save size={20} />
                    </Button>
                  </div>

                  {/* Sessions Summary */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="text-center">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">{t.study}</p>
                      <p className="text-xs font-mono font-bold text-blue-400">{formatTime(studyTime)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">{t.break}</p>
                      <p className="text-xs font-mono font-bold text-amber-500">{formatTime(breakTime)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="minimized"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-5 py-3 flex items-center gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{subjectName}</span>
                  <span className={`font-mono text-xl font-black ${
                    isRunning ? 'text-blue-400' : 'text-slate-400'
                  }`}>
                    {formatTime(type === 'study' ? studyTime : breakTime)}
                  </span>
                </div>
                <Button
                  onClick={onToggle}
                  className={`h-10 w-10 p-0 rounded-xl ${
                    isRunning ? 'bg-amber-500' : 'bg-blue-600'
                  }`}
                >
                  {isRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  if (isPipActive && pipTarget) {
    return createPortal(content, pipTarget);
  }

  if (!isOpen) return null;

  return content;
});

TimerWidget.displayName = 'TimerWidget';
export default TimerWidget;
