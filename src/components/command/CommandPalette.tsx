"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Search, BookOpen, CheckSquare, Calendar, Heart, CheckCircle2,
  Settings, Target, Wand2, LogOut, Download, Upload, Command, ArrowRight, Hash
} from 'lucide-react';

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  color: string;
  group: string;
  keywords?: string;
  perform: () => void;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const { userData, toggleTask, logout } = useAppContext();
  const { toggleTheme, themeName } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isAr = userData?.language === 'ar';

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const navigateTab = (tab: string) => {
    window.dispatchEvent(new CustomEvent('atomic:navigate-tab', { detail: tab }));
    onClose();
  };

  const actions: Action[] = useMemo(() => {
    if (!userData) return [];
    const list: Action[] = [];

    // Subjects (jump-to)
    for (const sub of userData.subjects || []) {
      list.push({
        id: `sub-${sub.id}`,
        label: sub.name,
        hint: isAr ? 'فتح المادة' : 'Open subject',
        icon: BookOpen,
        color: sub.color || '#6366f1',
        group: isAr ? 'المواد' : 'Subjects',
        keywords: `subject material ${sub.name} ${sub.tasks?.map(t => t.title).join(' ') || ''}`,
        perform: () => {
          window.dispatchEvent(new CustomEvent('atomic:navigate-tab', { detail: 'subjects' }));
          window.dispatchEvent(new CustomEvent('atomic:open-subject', { detail: sub.id }));
          onClose();
        },
      });
    }

    // Open tasks (incomplete)
    const allTasks = (userData.subjects || []).flatMap(s => (s.tasks || []).map(t => ({ ...t, subject: s })));
    for (const task of allTasks.filter(t => !t.completed).slice(0, 50)) {
      list.push({
        id: `task-${task.id}`,
        label: task.title,
        hint: `${task.subject.name} • ${isAr ? 'إنجاز' : 'Mark done'}`,
        icon: CheckSquare,
        color: task.subject.color || '#10b981',
        group: isAr ? 'المهام' : 'Tasks',
        keywords: `task ${task.title} ${task.subject.name}`,
        perform: () => { toggleTask(task.subject.id, task.id); onClose(); },
      });
    }

    // Side tasks
    for (const t of (userData.sideTasks || []).filter(x => !x.completed).slice(0, 20)) {
      list.push({
        id: `side-${t.id}`,
        label: t.title,
        hint: isAr ? 'مهمة جانبية' : 'Side task',
        icon: Hash,
        color: '#a78bfa',
        group: isAr ? 'المهام الجانبية' : 'Side Tasks',
        keywords: `side task ${t.title}`,
        perform: () => { navigateTab('tasks'); },
      });
    }

    // Navigation
    const navItems: Array<[string, string, React.ElementType, string, string]> = [
      ['subjects', isAr ? 'المواد' : 'Subjects',  BookOpen,    '#6366f1', 'subjects materials files'],
      ['tasks',    isAr ? 'المهام' : 'Tasks',     CheckSquare, '#10b981', 'tasks side todo'],
      ['calendar', isAr ? 'التقويم' : 'Calendar', Calendar,    '#06b6d4', 'calendar monthly month'],
      ['azkar',    isAr ? 'الأذكار' : 'Azkar',    Heart,       '#ec4899', 'azkar dua supplications'],
      ['salat',    isAr ? 'الصلاة' : 'Prayers',   CheckCircle2,'#8b5cf6', 'salat prayer'],
    ];
    for (const [tab, label, icon, color, kw] of navItems) {
      list.push({
        id: `nav-${tab}`,
        label,
        hint: isAr ? 'انتقال' : 'Go to',
        icon, color,
        group: isAr ? 'التنقل' : 'Navigate',
        keywords: `${kw} go to navigate`,
        perform: () => navigateTab(tab),
      });
    }

    // Quick actions
    list.push(
      {
        id: 'act-focus', label: isAr ? 'وضع التركيز' : 'Focus Mode',
        hint: isAr ? 'بدء جلسة عميقة' : 'Start a deep session',
        icon: Target, color: '#f59e0b',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'focus deep work timer pomodoro',
        perform: () => { window.dispatchEvent(new CustomEvent('atomic:open-focus')); onClose(); },
      },
      {
        id: 'act-settings', label: isAr ? 'الإعدادات' : 'Settings',
        hint: isAr ? 'فتح الإعدادات' : 'Open settings',
        icon: Settings, color: '#94a3b8',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'settings preferences config',
        perform: () => { window.dispatchEvent(new CustomEvent('atomic:open-settings')); onClose(); },
      },
      {
        id: 'act-theme', label: isAr ? 'تبديل الثيم' : 'Toggle Theme',
        hint: themeName === 'nebula' ? '🌿 Jade' : '🌌 Nebula',
        icon: Wand2, color: '#a78bfa',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'theme dark light jade nebula appearance',
        perform: () => { toggleTheme(); onClose(); },
      },
      {
        id: 'act-export', label: isAr ? 'تصدير البيانات' : 'Export Data',
        hint: isAr ? 'نسخة احتياطية JSON' : 'Download JSON backup',
        icon: Download, color: '#22d3ee',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'export backup download json save',
        perform: () => { window.dispatchEvent(new CustomEvent('atomic:export-data')); onClose(); },
      },
      {
        id: 'act-import', label: isAr ? 'استيراد البيانات' : 'Import Data',
        hint: isAr ? 'استرجاع نسخة احتياطية' : 'Restore from backup',
        icon: Upload, color: '#fb7185',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'import restore upload json backup',
        perform: () => { window.dispatchEvent(new CustomEvent('atomic:import-data')); onClose(); },
      },
      {
        id: 'act-logout', label: isAr ? 'تسجيل الخروج' : 'Logout',
        hint: isAr ? 'إنهاء الجلسة' : 'End session',
        icon: LogOut, color: '#ef4444',
        group: isAr ? 'إجراءات' : 'Actions', keywords: 'logout sign out exit',
        perform: () => { logout(); onClose(); },
      },
    );

    return list;
  }, [userData, themeName, isAr]);

  // Filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(a =>
      a.label.toLowerCase().includes(q) ||
      (a.keywords || '').toLowerCase().includes(q) ||
      a.group.toLowerCase().includes(q)
    );
  }, [query, actions]);

  // Group results
  const grouped = useMemo(() => {
    const map = new Map<string, Action[]>();
    for (const a of filtered) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)!.push(a);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Reset active when filter changes
  useEffect(() => { setActiveIndex(0); }, [query]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const action = filtered[activeIndex];
        if (action) action.perform();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, filtered, activeIndex, onClose]);

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cmd-index="${activeIndex}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!isOpen || typeof document === 'undefined') return null;

  let runningIndex = -1;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[800] bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[810] left-1/2 top-[12vh] -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(8,10,24,0.98)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px -12px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Top gradient strip */}
            <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(236,72,153,0.5), transparent)' }} />

            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search size={18} className="text-indigo-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث عن مادة، مهمة، أو إجراء...' : 'Search subjects, tasks, or actions...'}
                className="flex-1 bg-transparent text-white text-sm font-medium placeholder:text-slate-500 outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {grouped.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-500 font-bold">
                    {isAr ? 'لا توجد نتائج' : 'No results'}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {isAr ? 'جرب كلمات أخرى' : 'Try different keywords'}
                  </p>
                </div>
              ) : grouped.map(([group, items]) => (
                <div key={group} className="mb-2">
                  <p className="px-3 py-1.5 text-[10px] font-black text-slate-600 uppercase tracking-widest">{group}</p>
                  {items.map(item => {
                    runningIndex++;
                    const idx = runningIndex;
                    const active = idx === activeIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        data-cmd-index={idx}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={item.perform}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${active ? '' : 'hover:bg-white/5'}`}
                        style={active ? {
                          background: `linear-gradient(90deg, ${item.color}18, transparent)`,
                          boxShadow: `inset 0 0 0 1px ${item.color}40`,
                        } : undefined}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                        >
                          <Icon size={14} style={{ color: item.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white truncate">{item.label}</p>
                          {item.hint && <p className="text-[11px] text-slate-500 truncate">{item.hint}</p>}
                        </div>
                        {active && <ArrowRight size={14} className="text-slate-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd> {isAr ? 'تنقل' : 'Navigate'}</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd> {isAr ? 'تنفيذ' : 'Select'}</span>
              </div>
              <span className="flex items-center gap-1.5">
                <Command size={10} /> ATOMIC
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
