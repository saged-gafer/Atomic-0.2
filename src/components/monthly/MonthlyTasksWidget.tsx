"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { CalendarDays, CheckCircle2, Circle, Plus, X, Trash2, Sparkles } from 'lucide-react';
import MonthlyCalendar from './MonthlyCalendar';

function pad(n: number) { return String(n).padStart(2, '0'); }

const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const EMPTY_MESSAGES_EN = [
  "Nothing on the calendar — your day is yours ✨",
  "A blank slate for today. The best kind of freedom ☕",
  "No tasks for today. Sometimes stillness is the plan 🌙",
];
const EMPTY_MESSAGES_AR = [
  "لا مهام لهذا اليوم — وقتك حر ✨",
  "اليوم فارغ، وهذا أحياناً أجمل شيء 🌙",
  "لم تُضف شيئاً بعد — ابدأ بخطوة صغيرة 🚀",
];

export default function MonthlyTasksWidget() {
  const { userData, toggleMonthlyTask, deleteMonthlyTask, addMonthlyTask } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [addingInput, setAddingInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  if (!userData) return null;

  const isRTL = userData.language === 'ar';
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayKey = `${year}-${pad(month + 1)}-${pad(today.getDate())}`;
  const monthName = isRTL ? MONTH_NAMES_AR[month] : MONTH_NAMES_EN[month];

  const allMonthlyTasks = userData.monthlyTasks || {};
  const todayTasks = allMonthlyTasks[todayKey] || [];

  const monthTotalTasks = Object.entries(allMonthlyTasks)
    .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
    .flatMap(([, v]) => v);
  const monthDone = monthTotalTasks.filter(t => t.completed).length;

  const emptyMessages = isRTL ? EMPTY_MESSAGES_AR : EMPTY_MESSAGES_EN;
  const emptyMsg = emptyMessages[today.getDate() % emptyMessages.length];

  const handleAdd = () => {
    const v = addingInput.trim();
    if (!v) return;
    addMonthlyTask(todayKey, v);
    setAddingInput('');
    setShowInput(false);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        {/* Section header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-black text-white flex items-center gap-3">
            <span className="opacity-40">02</span>
            {isRTL ? 'مهام الشهر' : 'Monthly Tasks'}
            <div className="h-px flex-1 min-w-[32px] bg-gradient-to-r from-white/20 to-transparent hidden sm:block" />
          </h3>
          <div className="flex items-center gap-2">
            {monthTotalTasks.length > 0 && (
              <span className="text-[11px] font-black text-slate-500 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5">
                {monthDone}/{monthTotalTasks.length} {isRTL ? 'هذا الشهر' : 'this month'}
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[11px] font-black border transition-all"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
            >
              <CalendarDays size={13} />
              {isRTL ? 'عرض الشهر' : 'View Month'}
            </motion.button>
          </div>
        </div>

        {/* Today's tasks card */}
        <div
          className="rounded-3xl border border-white/5 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {isRTL ? 'مهام اليوم' : "Today's Tasks"}
                </p>
              </div>
              <p className="text-sm font-black text-white mt-0.5">
                {new Date().toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInput(v => !v)}
              className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/20 transition-all"
            >
              {showInput ? <X size={14} /> : <Plus size={14} />}
            </motion.button>
          </div>

          {/* Add task input */}
          <AnimatePresence>
            {showInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="border-b border-white/5 overflow-hidden"
              >
                <div className="flex gap-2 px-5 py-3">
                  <input
                    autoFocus
                    value={addingInput}
                    onChange={e => setAddingInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    placeholder={isRTL ? 'أضف مهمة لليوم...' : 'Add a task for today...'}
                    className="flex-1 h-9 px-3 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition-colors"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAdd}
                    className="h-9 px-4 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-sm font-bold hover:bg-indigo-500/25 transition-all shrink-0"
                  >
                    {isRTL ? 'أضف' : 'Add'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Task list */}
          <div className="px-5 py-3 space-y-2 min-h-[80px]">
            <AnimatePresence>
              {todayTasks.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 py-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-slate-700" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{emptyMsg}</p>
                </motion.div>
              ) : (
                todayTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="flex items-center gap-3 group py-1.5"
                  >
                    <button
                      onClick={() => toggleMonthlyTask(todayKey, task.id)}
                      className="shrink-0 transition-transform active:scale-90"
                    >
                      {task.completed
                        ? <CheckCircle2 size={20} className="text-indigo-400" fill="rgba(99,102,241,0.15)" />
                        : <Circle size={20} className="text-slate-600 hover:text-slate-400 transition-colors" />
                      }
                    </button>
                    <span className={`flex-1 text-sm font-medium transition-all ${task.completed ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => deleteMonthlyTask(todayKey, task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-red-500/10 transition-all shrink-0"
                    >
                      <Trash2 size={13} className="text-red-400/70" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Full month calendar overlay */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
              className="fixed inset-0 z-[490] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="fixed inset-x-4 z-[500] top-1/2 -translate-y-1/2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: 'rgba(8,10,24,0.99)', border: '1px solid rgba(255,255,255,0.09)', maxHeight: '90dvh', overflowY: 'auto' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <CalendarDays size={15} className="text-indigo-400" />
                  </div>
                  <h2 className="text-base font-black text-white">{monthName} {year}</h2>
                </div>
                <button onClick={() => setExpanded(false)} className="p-2 rounded-xl hover:bg-white/8 text-slate-500 hover:text-white transition-colors">
                  <X size={17} />
                </button>
              </div>
              <div className="p-4">
                <MonthlyCalendar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
