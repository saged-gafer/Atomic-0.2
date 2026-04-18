"use client";
import React, { useState } from 'react';
import { Task, useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { translations, Language } from '@/lib/i18n';
import ConfettiEffect from '@/components/ui/ConfettiEffect';

function AnimatedCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-5 h-5 rounded-lg shrink-0 border transition-all duration-300 flex items-center justify-center overflow-hidden"
      style={{
        background: checked ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
        borderColor: checked ? '#10b981' : 'rgba(255,255,255,0.12)',
        boxShadow: checked ? '0 0 12px rgba(16,185,129,0.4)' : 'none',
      }}
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
            viewBox="0 0 12 10"
            fill="none"
            className="w-3 h-3"
          >
            <motion.path
              d="M1.5 5 L4.5 8 L10.5 2"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function TaskList({ subjectId, tasks, language }: { subjectId: string; tasks: Task[]; language: Language }) {
  const { addTask: addTaskCtx, toggleTask, deleteTask, addStudyXP } = useAppContext();
  const [newTask, setNewTask] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const t = translations[language || 'en'];

  const handleAdd = () => {
    if (newTask.trim()) {
      addTaskCtx(subjectId, newTask.trim());
      setNewTask('');
    }
  };

  const handleToggle = (taskId: string, currentCompleted: boolean) => {
    toggleTask(subjectId, taskId);
    if (!currentCompleted) {
      addStudyXP(20);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2200);
    }
  };

  const completed = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #10b981, #059669)' }}
            />
          </div>
          <span className="text-[10px] font-black text-slate-500 whitespace-nowrap">
            {completed}/{tasks.length}
          </span>
        </div>
      )}

      {/* Task items */}
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
            exit={{ opacity: 0, height: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="flex items-center justify-between group px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors duration-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <AnimatedCheckbox checked={task.completed} onChange={() => handleToggle(task.id, task.completed)} />
                <span
                  className={`text-sm font-medium truncate transition-all duration-300 ${
                    task.completed ? 'line-through text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <motion.button
                initial={false}
                onClick={() => deleteTask(subjectId, task.id)}
                className="p-1.5 rounded-lg text-transparent group-hover:text-slate-600 hover:!text-red-400 hover:bg-red-500/10 transition-all duration-200"
                whileTap={{ scale: 0.85 }}
              >
                <Trash2 size={12} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add task input */}
      <motion.div
        animate={{ opacity: isFocused ? 1 : 0.7 }}
        className="flex gap-2 mt-2"
      >
        <div className="relative flex-1">
          <Input
            placeholder={t.new_task}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="h-9 text-xs bg-white/[0.03] border-white/8 placeholder:text-slate-600 focus:border-primary/40 transition-all pr-9"
          />
        </div>
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
          style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.25)' }}
        >
          <Plus size={16} />
        </motion.button>
      </motion.div>
      {showConfetti && <ConfettiEffect active={showConfetti} />}
    </div>
  );
}
