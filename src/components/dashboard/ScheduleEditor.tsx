"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Check, X, Save, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateSuggestedSchedule } from '@/services/aiOptimizer';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ScheduleEditor() {
  const { userData, setUserData } = useAppContext();
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [suggested, setSuggested] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'ai'>('edit');
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        setSchedule(userData.weeklySchedule);
        setSuggested(generateSuggestedSchedule(userData));
      }, 0);
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

  const currentDay = DAYS[selectedDay];

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
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
              className="fixed inset-0 z-[400] bg-black/75 backdrop-blur-sm"
            />

            {/* Modal — full screen on mobile, centered dialog on md+ */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-[410] flex flex-col overflow-hidden shadow-2xl
                top-0 left-0 right-0 bottom-0
                md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto
                md:-translate-x-1/2 md:-translate-y-1/2
                md:w-[90vw] md:max-w-3xl md:max-h-[88vh] md:rounded-3xl"
              style={{ background: '#080a18', border: '1px solid rgba(255,255,255,0.08)' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <Calendar size={16} className="text-indigo-400" />
                  </div>
                  <h2 className="text-base font-black text-white">{t.edit_schedule}</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs: Edit / AI Suggestion */}
              <div className="flex border-b border-white/5 shrink-0">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Check size={14} />
                  {t.current_schedule}
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Sparkles size={14} />
                  {t.suggested_schedule}
                </button>
              </div>

              {/* Day selector strip */}
              <div className="flex gap-1.5 px-4 py-3 border-b border-white/5 overflow-x-auto shrink-0 scrollbar-hide">
                {DAYS.map((day, i) => {
                  const count = activeTab === 'edit'
                    ? (schedule[day]?.length || 0)
                    : (suggested[day]?.length || 0);
                  const isActive = selectedDay === i;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(i)}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-center transition-all ${
                        isActive
                          ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                          : 'bg-white/[0.03] border border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wide">{DAY_SHORT[i]}</span>
                      <span className={`text-[9px] font-bold mt-0.5 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`}>
                        {count > 0 ? `${count}` : '–'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {activeTab === 'edit' ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-black text-white">{currentDay}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {(schedule[currentDay]?.length || 0) === 0 ? 'No subjects — rest day' : `${schedule[currentDay]?.length} subject${schedule[currentDay]?.length > 1 ? 's' : ''} scheduled`}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedDay(d => Math.max(0, d - 1))}
                            disabled={selectedDay === 0}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-25 transition-all"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedDay(d => Math.min(6, d + 1))}
                            disabled={selectedDay === 6}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-25 transition-all"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {userData.subjects.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">No subjects added yet.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {userData.subjects.map((sub) => {
                            const active = schedule[currentDay]?.includes(sub.id);
                            return (
                              <button
                                key={sub.id}
                                onClick={() => toggleSubject(currentDay, sub.id)}
                                className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                                  active
                                    ? 'border-indigo-500/40 bg-indigo-500/10'
                                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                                }`}
                              >
                                <div
                                  className="w-3 h-3 rounded-full shrink-0"
                                  style={{ background: sub.color, boxShadow: active ? `0 0 8px ${sub.color}` : 'none' }}
                                />
                                <span className={`text-sm font-bold flex-1 ${active ? 'text-white' : 'text-slate-400'}`}>
                                  {sub.name}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                  active ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'
                                }`}>
                                  {active && <Check size={11} className="text-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* All days summary */}
                      <div className="mt-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">Weekly Overview</p>
                        <div className="space-y-2">
                          {DAYS.map((day) => {
                            const subs = (schedule[day] || []).map(id => userData.subjects.find(s => s.id === id)?.name).filter(Boolean);
                            return (
                              <div key={day} className="flex items-start gap-3 text-xs">
                                <span className="font-bold text-slate-600 w-8 shrink-0">{day.slice(0, 3)}</span>
                                {subs.length === 0 ? (
                                  <span className="text-slate-700 italic">Rest</span>
                                ) : (
                                  <div className="flex flex-wrap gap-1">
                                    {subs.map((name, i) => (
                                      <span key={i} className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 font-medium">{name}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ai"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-base font-black text-white">{currentDay}</h3>
                          <p className="text-xs text-amber-400/70 mt-0.5">AI recommended schedule</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedDay(d => Math.max(0, d - 1))}
                            disabled={selectedDay === 0}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-25 transition-all"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedDay(d => Math.min(6, d + 1))}
                            disabled={selectedDay === 6}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-25 transition-all"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* AI suggestion for selected day */}
                      <div className="p-4 rounded-2xl border border-amber-500/15 bg-amber-500/5 space-y-2 mb-4">
                        {userData.subjects.filter(s => suggested[currentDay]?.includes(s.id)).length === 0 ? (
                          <p className="text-sm text-slate-500 italic">Rest day — no subjects suggested</p>
                        ) : (
                          userData.subjects.filter(s => suggested[currentDay]?.includes(s.id)).map((sub) => (
                            <div key={sub.id} className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: sub.color }} />
                              <span className="text-sm font-bold text-amber-200">{sub.name}</span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* All days AI summary */}
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Full Week</p>
                      <div className="space-y-2">
                        {DAYS.map((day) => {
                          const subs = userData.subjects.filter(s => suggested[day]?.includes(s.id));
                          return (
                            <div key={day} className="flex items-start gap-3 text-xs">
                              <span className="font-bold text-slate-600 w-8 shrink-0">{day.slice(0, 3)}</span>
                              {subs.length === 0 ? (
                                <span className="text-slate-700 italic">Rest</span>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {subs.map((sub) => (
                                    <span key={sub.id} className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400/80 font-medium">{sub.name}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAcceptAI}
                        className="w-full mt-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm text-amber-300 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all"
                      >
                        <RefreshCw size={15} />
                        {t.accept_suggestion}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5 shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-11 px-5 rounded-2xl text-sm font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/8 transition-all"
                >
                  {t.back}
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="h-11 px-6 rounded-2xl text-sm font-black text-white flex items-center gap-2 transition-all"
                  style={{ background: 'linear-gradient(135deg, #4338ca, #7c3aed)' }}
                >
                  <Save size={15} />
                  {t.save_changes}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
