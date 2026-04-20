"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Check, X, Save, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateSuggestedSchedule } from '@/services/aiOptimizer';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* ── Animated subject card ───────────────────────────── */
function SubjectCard({
  subject, active, onClick, index, mode,
}: {
  subject: { id: string; name: string; color: string };
  active: boolean;
  onClick: () => void;
  index: number;
  mode: 'edit' | 'ai';
}) {
  const accentColor = mode === 'ai' ? '#f59e0b' : subject.color;

  return (
    <motion.button
      layout
      key={subject.id}
      onClick={onClick}
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.94 }}
      transition={{
        layout: { type: 'spring', stiffness: 400, damping: 30 },
        opacity: { duration: 0.25, delay: index * 0.04 },
        y: { type: 'spring', stiffness: 300, damping: 25, delay: index * 0.04 },
        scale: { duration: 0.25, delay: index * 0.04 },
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-3 p-4 rounded-2xl border text-left relative overflow-hidden group transition-colors duration-200"
      style={{
        background: active ? `${accentColor}12` : 'rgba(255,255,255,0.02)',
        borderColor: active ? `${accentColor}45` : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Active glow */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="glow"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${accentColor}18 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Color dot with animated glow */}
      <motion.div
        className="w-3 h-3 rounded-full shrink-0 relative"
        animate={{
          boxShadow: active ? `0 0 12px 3px ${accentColor}80` : '0 0 0px rgba(0,0,0,0)',
          scale: active ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{ background: accentColor }}
      />

      <span className={`text-sm font-bold flex-1 transition-colors duration-200 ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
        {subject.name}
      </span>

      {/* Animated checkbox */}
      <motion.div
        className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200"
        animate={{
          borderColor: active ? accentColor : 'rgba(100,116,139,0.5)',
          background: active ? accentColor : 'rgba(0,0,0,0)',
          scale: active ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        <AnimatePresence>
          {active && (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 600, damping: 20 }}
            >
              <Check size={12} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

export default function ScheduleEditor() {
  const { userData, setUserData } = useAppContext();
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [suggested, setSuggested] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'ai'>('edit');
  const [selectedDay, setSelectedDay] = useState(0);
  const [prevDay, setPrevDay] = useState(0);

  useEffect(() => {
    if (userData) {
      setSchedule(userData.weeklySchedule);
      setSuggested(generateSuggestedSchedule(userData));
    }
  }, [userData]);

  if (!userData) return null;
  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  const toggleSubject = (day: string, subjectId: string) => {
    const current = schedule[day] || [];
    const next = current.includes(subjectId)
      ? current.filter(id => id !== subjectId)
      : [...current, subjectId];
    setSchedule({ ...schedule, [day]: next });
  };

  const handleSave = () => {
    setUserData({ ...userData, weeklySchedule: schedule });
    setIsOpen(false);
  };

  const handleAcceptAI = () => {
    setSchedule(suggested);
    setActiveTab('edit');
  };

  const changeDay = (next: number) => {
    setPrevDay(selectedDay);
    setSelectedDay(next);
  };

  const currentDay = DAYS[selectedDay];
  const direction = selectedDay > prevDay ? 1 : -1;

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 h-9 px-3 rounded-xl text-sm font-bold border transition-all"
        style={{
          background: 'rgba(99,102,241,0.08)',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#818cf8',
        }}
      >
        <Calendar size={16} />
        <span className="hidden sm:inline">{t.edit_schedule}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-sm"
            />

            {/* Modal wrapper — centers on desktop, full screen on mobile */}
            <div
              className="fixed inset-0 z-[410] flex items-stretch md:items-center md:justify-center md:p-4 pointer-events-none"
            >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col overflow-hidden shadow-2xl w-full md:max-w-3xl md:max-h-[88vh] md:rounded-3xl pointer-events-auto"
              style={{
                background: '#06081c',
                border: '1px solid rgba(99,102,241,0.18)',
                boxShadow: '0 30px 80px -10px rgba(0,0,0,0.9), 0 0 60px rgba(99,102,241,0.08)',
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Animated top border */}
              <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
                animate={{ background: ['linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)', 'linear-gradient(90deg, transparent, #8b5cf6, #6366f1, transparent)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <motion.div className="w-9 h-9 rounded-2xl flex items-center justify-center"
                    animate={{ background: ['rgba(99,102,241,0.2)', 'rgba(139,92,246,0.2)', 'rgba(99,102,241,0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Calendar size={16} className="text-indigo-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-black text-white">{t.edit_schedule}</h2>
                    <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">Weekly Planner</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/5 shrink-0 relative">
                <motion.div className="absolute bottom-0 h-0.5 rounded-full"
                  animate={{
                    left: activeTab === 'edit' ? '0%' : '50%',
                    right: activeTab === 'edit' ? '50%' : '0%',
                    background: activeTab === 'edit' ? '#6366f1' : '#f59e0b',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Check size={14} />
                  {t.current_schedule}
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Sparkles size={14} />
                  {t.suggested_schedule}
                </button>
              </div>

              {/* Day strip */}
              <div className="flex gap-1.5 px-4 py-3 border-b border-white/5 overflow-x-auto shrink-0 scrollbar-hide">
                {DAYS.map((day, i) => {
                  const count = activeTab === 'edit'
                    ? (schedule[day]?.length || 0)
                    : (suggested[day]?.length || 0);
                  const isActive = selectedDay === i;
                  return (
                    <motion.button
                      key={day}
                      onClick={() => changeDay(i)}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-center transition-colors duration-200 relative overflow-hidden"
                      style={{
                        background: isActive
                          ? activeTab === 'edit' ? 'rgba(99,102,241,0.18)' : 'rgba(245,158,11,0.15)'
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isActive
                          ? activeTab === 'edit' ? 'rgba(99,102,241,0.45)' : 'rgba(245,158,11,0.4)'
                          : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      {isActive && (
                        <motion.div className="absolute inset-0 pointer-events-none"
                          layoutId="dayIndicator"
                          style={{ background: activeTab === 'edit' ? 'rgba(99,102,241,0.08)' : 'rgba(245,158,11,0.06)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      <span className={`text-[10px] font-black uppercase tracking-wide relative z-10 ${isActive ? activeTab === 'edit' ? 'text-indigo-300' : 'text-amber-300' : 'text-slate-500'}`}>
                        {DAY_SHORT[i]}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={count}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className={`text-[9px] font-bold mt-0.5 relative z-10 ${isActive ? activeTab === 'edit' ? 'text-indigo-400' : 'text-amber-400' : 'text-slate-600'}`}
                        >
                          {count > 0 ? count : '–'}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {activeTab === 'edit' ? (
                    <motion.div key="edit"
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Day header */}
                      <div className="flex items-center justify-between mb-5">
                        <AnimatePresence mode="wait">
                          <motion.div key={currentDay}
                            initial={{ opacity: 0, x: direction * 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <h3 className="text-lg font-black text-white">{currentDay}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {(schedule[currentDay]?.length || 0) === 0
                                ? '✦ Rest day — no subjects'
                                : `${schedule[currentDay]?.length} subject${schedule[currentDay]?.length > 1 ? 's' : ''} scheduled`}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                        <div className="flex items-center gap-1">
                          {[
                            { dir: -1, disabled: selectedDay === 0, icon: ChevronLeft },
                            { dir: 1, disabled: selectedDay === 6, icon: ChevronRight },
                          ].map(({ dir, disabled, icon: Icon }) => (
                            <motion.button key={dir}
                              onClick={() => !disabled && changeDay(selectedDay + dir)}
                              disabled={disabled}
                              whileHover={!disabled ? { scale: 1.1 } : {}}
                              whileTap={!disabled ? { scale: 0.9 } : {}}
                              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-20 transition-all"
                            >
                              <Icon size={16} />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Subject cards */}
                      <AnimatePresence mode="wait">
                        <motion.div key={currentDay + 'cards'}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                        >
                          {userData.subjects.length === 0
                            ? <p className="text-sm text-slate-500 text-center py-8 col-span-2">No subjects added yet.</p>
                            : userData.subjects.map((sub, i) => (
                              <SubjectCard
                                key={sub.id}
                                subject={sub}
                                active={!!schedule[currentDay]?.includes(sub.id)}
                                onClick={() => toggleSubject(currentDay, sub.id)}
                                index={i}
                                mode="edit"
                              />
                            ))
                          }
                        </motion.div>
                      </AnimatePresence>

                      {/* Weekly overview */}
                      <motion.div className="mt-6"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      >
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">Weekly Overview</p>
                        <div className="space-y-2">
                          {DAYS.map((day, i) => {
                            const subs = (schedule[day] || []).map(id => userData.subjects.find(s => s.id === id)).filter(Boolean);
                            return (
                              <motion.div key={day}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.04 }}
                                className="flex items-start gap-3 text-xs"
                              >
                                <span className="font-bold text-slate-600 w-8 shrink-0">{day.slice(0, 3)}</span>
                                {subs.length === 0 ? (
                                  <span className="text-slate-700 italic">Rest</span>
                                ) : (
                                  <div className="flex flex-wrap gap-1">
                                    {subs.map((sub) => sub && (
                                      <span key={sub.id} className="px-2 py-0.5 rounded-lg text-slate-400 font-medium"
                                        style={{ background: `${sub.color}12`, border: `1px solid ${sub.color}25` }}>
                                        {sub.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key="ai"
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <AnimatePresence mode="wait">
                          <motion.div key={currentDay + 'ai'}
                            initial={{ opacity: 0, x: direction * 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <h3 className="text-lg font-black text-white">{currentDay}</h3>
                            <p className="text-xs text-amber-400/70 mt-0.5">✦ AI recommended schedule</p>
                          </motion.div>
                        </AnimatePresence>
                        <div className="flex items-center gap-1">
                          {[
                            { dir: -1, disabled: selectedDay === 0, icon: ChevronLeft },
                            { dir: 1, disabled: selectedDay === 6, icon: ChevronRight },
                          ].map(({ dir, disabled, icon: Icon }) => (
                            <motion.button key={dir}
                              onClick={() => !disabled && changeDay(selectedDay + dir)}
                              disabled={disabled}
                              whileHover={!disabled ? { scale: 1.1 } : {}}
                              whileTap={!disabled ? { scale: 0.9 } : {}}
                              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-20 transition-all"
                            >
                              <Icon size={16} />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* AI subjects for selected day (read-only) */}
                      <AnimatePresence mode="wait">
                        <motion.div key={currentDay + 'ai-cards'}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                        >
                          {userData.subjects.filter(s => suggested[currentDay]?.includes(s.id)).length === 0 ? (
                            <motion.div className="col-span-2 py-8 flex flex-col items-center gap-2 text-center"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            >
                              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                <Calendar size={20} className="text-slate-600" />
                              </div>
                              <p className="text-sm text-slate-500 italic">Rest day — no subjects suggested</p>
                            </motion.div>
                          ) : (
                            userData.subjects
                              .filter(s => suggested[currentDay]?.includes(s.id))
                              .map((sub, i) => (
                                <SubjectCard
                                  key={sub.id}
                                  subject={sub}
                                  active
                                  onClick={() => {}}
                                  index={i}
                                  mode="ai"
                                />
                              ))
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Full week AI summary */}
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3 mt-4">Full Week</p>
                        <div className="space-y-2">
                          {DAYS.map((day, i) => {
                            const subs = userData.subjects.filter(s => suggested[day]?.includes(s.id));
                            return (
                              <motion.div key={day} className="flex items-start gap-3 text-xs"
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.04 }}
                              >
                                <span className="font-bold text-slate-600 w-8 shrink-0">{day.slice(0, 3)}</span>
                                {subs.length === 0 ? (
                                  <span className="text-slate-700 italic">Rest</span>
                                ) : (
                                  <div className="flex flex-wrap gap-1">
                                    {subs.map((sub) => (
                                      <span key={sub.id} className="px-2 py-0.5 rounded-lg font-medium"
                                        style={{ background: 'rgba(245,158,11,0.1)', color: 'rgba(251,191,36,0.8)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                        {sub.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAcceptAI}
                        className="w-full mt-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm relative overflow-hidden group"
                        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}
                      >
                        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(245,158,11,0.08)' }} />
                        <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                          <RefreshCw size={15} className="text-amber-400" />
                        </motion.div>
                        <span className="text-amber-300">{t.accept_suggestion}</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5 shrink-0">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="h-11 px-5 rounded-2xl text-sm font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/8 transition-all"
                >
                  {t.back}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="h-11 px-6 rounded-2xl text-sm font-black text-white flex items-center gap-2 relative overflow-hidden group"
                  style={{ background: 'linear-gradient(135deg, #4338ca, #7c3aed)' }}
                >
                  <motion.div className="absolute inset-0"
                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <Save size={15} className="relative z-10" />
                  <span className="relative z-10">{t.save_changes}</span>
                </motion.button>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
