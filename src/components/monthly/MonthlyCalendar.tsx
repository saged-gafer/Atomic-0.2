"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { X, Plus, CheckCircle2, Circle, Trash2, CalendarDays, Sparkles } from 'lucide-react';

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function pad(n: number) { return String(n).padStart(2, '0'); }
function toDateKey(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

interface DayDetailProps {
  dateKey: string;
  dayNum: number;
  dayName: string;
  monthName: string;
  isRTL: boolean;
  onClose: () => void;
}

function DayDetail({ dateKey, dayNum, dayName, monthName, isRTL, onClose }: DayDetailProps) {
  const { userData, addMonthlyTask, toggleMonthlyTask, deleteMonthlyTask } = useAppContext();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const tasks = (userData?.monthlyTasks?.[dateKey] || []);
  const done = tasks.filter(t => t.completed).length;

  const handleAdd = () => {
    const v = input.trim();
    if (!v) return;
    addMonthlyTask(dateKey, v);
    setInput('');
    inputRef.current?.focus();
  };

  const emptyMessages = isRTL
    ? ['يوم هادي 🌙 لا مهام لليوم، استمتع بوقتك!', 'صفحة بيضاء ✨ لم تُضف شيئاً بعد.', 'لا شيء هنا — أضف مهمتك الأولى 🚀']
    : ["Clear day ✨ — Nothing planned yet. Add your first task!", "The slate is blank — your call 🌙", "No tasks yet — free as a Sunday morning ☕"];
  const emptyMsg = emptyMessages[dayNum % emptyMessages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 32, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm z-[300] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
      style={{ background: 'rgba(8,10,24,0.99)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.09)', maxHeight: '90dvh' }}
      dir={isRTL ? 'rtl' : 'ltr'}
      onClick={e => e.stopPropagation()}
    >
      {/* Drag handle */}
      <div className="sm:hidden flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/70">{monthName}</p>
          <h2 className="text-xl font-black text-white leading-tight">{dayName}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{dateKey}</p>
        </div>
        <div className="flex items-center gap-3">
          {tasks.length > 0 && (
            <div className="px-3 py-1.5 rounded-full bg-indigo-500/12 border border-indigo-500/20">
              <span className="text-xs font-black text-indigo-400">{done}/{tasks.length}</span>
            </div>
          )}
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/8 text-slate-500 hover:text-white transition-colors">
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Task input */}
      <div className="px-5 py-3 border-b border-white/5 shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder={isRTL ? 'أضف مهمة جديدة...' : 'Add a task for this day...'}
            className="flex-1 h-10 px-4 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25 transition-all flex items-center justify-center shrink-0"
          >
            <Plus size={18} />
          </motion.button>
        </div>
      </div>

      {/* Tasks list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 custom-scrollbar">
        <AnimatePresence>
          {tasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Sparkles size={24} className="text-slate-700" />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-[220px]">{emptyMsg}</p>
            </motion.div>
          ) : (
            tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-white/10 transition-all"
              >
                <button onClick={() => toggleMonthlyTask(dateKey, task.id)} className="shrink-0 transition-transform active:scale-90">
                  {task.completed
                    ? <CheckCircle2 size={20} className="text-indigo-400" fill="rgba(99,102,241,0.15)" />
                    : <Circle size={20} className="text-slate-600 hover:text-slate-400 transition-colors" />
                  }
                </button>
                <span className={`flex-1 text-sm font-medium transition-all ${task.completed ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteMonthlyTask(dateKey, task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-red-500/10 transition-all shrink-0"
                >
                  <Trash2 size={14} className="text-red-400/70" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function MonthlyCalendar() {
  const { userData } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!userData) return null;

  const isRTL = userData.language === 'ar';
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayKey = toDateKey(year, month, today.getDate());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = isRTL ? MONTH_NAMES_AR[month] : MONTH_NAMES_EN[month];
  const monthlyTasks = userData.monthlyTasks || {};

  const totalTasks = Object.entries(monthlyTasks)
    .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
    .flatMap(([, v]) => v);
  const totalDone = totalTasks.filter(t => t.completed).length;

  const dayNames = isRTL ? DAY_NAMES_AR : DAY_NAMES_SHORT;
  const selectedTask = selectedDate ? {
    dateKey: selectedDate,
    dayNum: parseInt(selectedDate.split('-')[2]),
    dayName: (() => {
      const d = new Date(selectedDate);
      const name = isRTL ? DAY_NAMES_AR[d.getDay()] : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
      return `${name} ${parseInt(selectedDate.split('-')[2])}`;
    })(),
    monthName,
  } : null;

  return (
    <div className="space-y-4">
      {/* Month header + summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-white">{monthName} {year}</h3>
          <p className="text-[10px] text-slate-500 font-bold mt-0.5">
            {totalTasks.length === 0
              ? (isRTL ? 'لا مهام هذا الشهر' : 'No tasks this month')
              : `${totalDone}/${totalTasks.length} ${isRTL ? 'مكتملة' : 'done'}`}
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <CalendarDays size={15} className="text-indigo-400" />
        </div>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 gap-0.5">
        {dayNames.map(d => (
          <div key={d} className="text-center text-[9px] font-black text-slate-600 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Leading empty cells */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const dateKey = toDateKey(year, month, dayNum);
          const tasks = monthlyTasks[dateKey] || [];
          const done = tasks.filter(t => t.completed).length;
          const isToday = dateKey === todayKey;
          const hasTasks = tasks.length > 0;

          return (
            <motion.button
              key={dateKey}
              whileTap={{ scale: 0.88 }}
              onClick={() => setSelectedDate(dateKey)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-center transition-all text-[11px] font-bold
                ${isToday
                  ? 'bg-indigo-500/25 border border-indigo-500/50 text-indigo-200'
                  : hasTasks
                    ? 'bg-white/[0.05] border border-white/10 text-slate-200 hover:border-indigo-500/30'
                    : 'bg-white/[0.02] border border-transparent text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
                }
              `}
            >
              <span>{dayNum}</span>
              {hasTasks && (
                <div className="flex gap-0.5 mt-0.5">
                  {tasks.slice(0, 3).map((t, idx) => (
                    <div
                      key={idx}
                      className={`w-1 h-1 rounded-full ${t.completed ? 'bg-emerald-400' : 'bg-indigo-400'}`}
                    />
                  ))}
                  {tasks.length > 3 && <div className="w-1 h-1 rounded-full bg-slate-500" />}
                </div>
              )}
              {isToday && (
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Upcoming tasks this month (next 5 days with tasks) */}
      {totalTasks.filter(t => !t.completed).length > 0 && (
        <div className="mt-4 space-y-1.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
            {isRTL ? 'مهام قادمة' : 'Pending tasks'}
          </p>
          {Object.entries(monthlyTasks)
            .filter(([k]) => k.startsWith(`${year}-${pad(month + 1)}`))
            .sort(([a], [b]) => a.localeCompare(b))
            .flatMap(([dateKey, tasks]) =>
              tasks.filter(t => !t.completed).slice(0, 2).map(t => ({ ...t, dateKey }))
            )
            .slice(0, 4)
            .map(task => (
              <div key={task.id} className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 shrink-0" />
                <span className="text-[11px] text-slate-400 truncate flex-1">{task.title}</span>
                <span className="text-[9px] font-black text-slate-600">{task.dateKey.split('-')[2]}</span>
              </div>
            ))}
        </div>
      )}

      {/* Day detail modal */}
      <AnimatePresence>
        {selectedDate && selectedTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDate(null)}
              className="fixed inset-0 z-[290] bg-black/65 backdrop-blur-sm"
            />
            <DayDetail
              dateKey={selectedTask.dateKey}
              dayNum={selectedTask.dayNum}
              dayName={selectedTask.dayName}
              monthName={selectedTask.monthName}
              isRTL={isRTL}
              onClose={() => setSelectedDate(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
