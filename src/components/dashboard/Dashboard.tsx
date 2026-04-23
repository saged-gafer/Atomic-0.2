"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { getTodayName, getTodaySubjects } from '@/lib/schedule';
import { translations } from '@/lib/i18n';
import { computeStreak } from '@/lib/streak';
import { checkAndMigrate } from '@/services/aiMigrator';
import {
  Search, Bell, Flame, Home, BookOpen, BarChart2,
  Calendar as CalendarIcon, Sparkles, Settings as SettingsIcon, Play,
  Pause, SkipForward, Clock, CheckCircle2, Circle,
  MoreHorizontal, ChevronRight, Book, Moon, Wrench, X,
  Menu, LogOut, Globe, ArrowRight, Plus
} from 'lucide-react';
import FocusMode from './FocusMode';
import ScheduleEditor from './ScheduleEditor';
import SettingsPanel from '@/components/settings/SettingsPanel';
import StudyAssistant from '@/components/studyassistant/StudyAssistant';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import TrackingView from '@/components/analytics/TrackingView';
import MonthlyTasksWidget from '@/components/monthly/MonthlyTasksWidget';
import Sidebar from '@/components/sidebar/Sidebar';
import CommandPalette from '@/components/command/CommandPalette';
import WelcomeModal from './WelcomeModal';

type Lang = 'en' | 'ar';

const L = (lang: Lang) => ({
  greetMorning: lang === 'ar' ? 'صباح الخير،' : 'Good morning,',
  greetAfternoon: lang === 'ar' ? 'مساء الخير،' : 'Good afternoon,',
  greetEvening: lang === 'ar' ? 'مساء الخير،' : 'Good evening,',
  studyTime: lang === 'ar' ? 'وقت الدراسة' : 'Study Time',
  tasksDone: lang === 'ar' ? 'المهام المنجزة' : 'Tasks Done',
  todaysLoad: lang === 'ar' ? 'حصص اليوم' : "Today's Load",
  prayers: lang === 'ar' ? 'الصلوات' : 'Prayers',
  subjectsScheduled: lang === 'ar' ? 'مواد مجدولة' : 'subjects scheduled',
  completion: lang === 'ar' ? 'إنجاز' : 'completion',
  todayProtocol: lang === 'ar' ? 'مواد اليوم' : "Today's Protocol",
  viewSchedule: lang === 'ar' ? 'عرض الجدول الكامل' : 'View full schedule',
  deepFocus: lang === 'ar' ? 'جلسة تركيز عميق' : 'Deep Focus Session',
  startFocus: lang === 'ar' ? 'ابدأ التركيز' : 'Start Focus',
  studyPulse: lang === 'ar' ? 'نبض الدراسة' : 'Study Pulse',
  thisWeek: lang === 'ar' ? 'هذا الأسبوع' : 'This Week',
  monthlyMilestones: lang === 'ar' ? 'أهداف الشهر' : 'Monthly Milestones',
  freeDay: lang === 'ar' ? 'يوم حر — لا توجد مواد مجدولة' : 'Free day — no subjects scheduled',
  noMonthlyTasks: lang === 'ar' ? 'لا توجد أهداف هذا الشهر بعد' : 'No monthly milestones yet',
  search: lang === 'ar' ? 'ابحث في الأوامر...' : 'Search commands...',
  dashboard: lang === 'ar' ? 'لوحة التحكم' : 'Dashboard',
  subjects: lang === 'ar' ? 'المواد' : 'Subjects',
  analytics: lang === 'ar' ? 'التحليلات' : 'Analytics',
  calendar: lang === 'ar' ? 'التقويم' : 'Calendar',
  aiAssistant: lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant',
  tools: lang === 'ar' ? 'الأدوات' : 'Tools',
  settings: lang === 'ar' ? 'الإعدادات' : 'Settings',
  newBadge: lang === 'ar' ? 'جديد' : 'New',
  streakDay: lang === 'ar' ? 'يوم متواصل' : 'day streak',
  streakDays: lang === 'ar' ? 'أيام متواصلة' : 'day streak',
  progress: lang === 'ar' ? 'التقدم' : 'Progress',
  open: lang === 'ar' ? 'فتح' : 'Open',
  close: lang === 'ar' ? 'إغلاق' : 'Close',
  noTasks: lang === 'ar' ? 'لا توجد مهام' : 'No tasks yet',
  completed: lang === 'ar' ? 'مكتمل' : 'Completed',
});

const PRAYER_IDS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

const DAY_KEY = (d: Date) => d.toISOString().split('T')[0];

function getGreetingKey(): 'greetMorning' | 'greetAfternoon' | 'greetEvening' {
  const h = new Date().getHours();
  if (h < 12) return 'greetMorning';
  if (h < 18) return 'greetAfternoon';
  return 'greetEvening';
}

function formatDate(lang: Lang) {
  return new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

function GlassCard({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`bg-white/[0.025] border border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}

function NavItem({
  icon, label, active, onClick, badge, isRTL
}: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; badge?: string; isRTL?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all text-start ${
        active
          ? 'bg-white/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm flex-1 truncate">{label}</span>
      {badge && (
        <span className={`text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({
  icon, label, value, trend, trendUp
}: { icon: React.ReactNode; label: string; value: string; trend?: string; trendUp?: boolean }) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3 group hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
        </div>
        {trend && <p className={`text-xs mt-1 ${trendUp ? 'text-emerald-400' : 'text-slate-500'}`}>{trend}</p>}
      </div>
    </GlassCard>
  );
}

const COLOR_CLASSES: Record<string, { bar: string; text: string; ring: string }> = {
  cyan: { bar: 'bg-cyan-500 shadow-cyan-500/50', text: 'text-cyan-400', ring: 'from-cyan-500/30 to-transparent' },
  indigo: { bar: 'bg-indigo-500 shadow-indigo-500/50', text: 'text-indigo-400', ring: 'from-indigo-500/30 to-transparent' },
  emerald: { bar: 'bg-emerald-500 shadow-emerald-500/50', text: 'text-emerald-400', ring: 'from-emerald-500/30 to-transparent' },
  fuchsia: { bar: 'bg-fuchsia-500 shadow-fuchsia-500/50', text: 'text-fuchsia-400', ring: 'from-fuchsia-500/30 to-transparent' },
  amber: { bar: 'bg-amber-500 shadow-amber-500/50', text: 'text-amber-400', ring: 'from-amber-500/30 to-transparent' },
  rose: { bar: 'bg-rose-500 shadow-rose-500/50', text: 'text-rose-400', ring: 'from-rose-500/30 to-transparent' },
};

function pickColorBucket(hex: string | undefined): keyof typeof COLOR_CLASSES {
  if (!hex) return 'cyan';
  const h = hex.toLowerCase();
  if (h.includes('06b') || h.includes('22d') || h.includes('0ea') || h.includes('cyan')) return 'cyan';
  if (h.includes('63') || h.includes('818') || h.includes('indigo') || h.includes('7c3') || h.includes('6366')) return 'indigo';
  if (h.includes('10b') || h.includes('059') || h.includes('emerald') || h.includes('22c')) return 'emerald';
  if (h.includes('be1') || h.includes('d9') || h.includes('e1') || h.includes('fuchsia') || h.includes('ec4')) return 'fuchsia';
  if (h.includes('f59') || h.includes('b45') || h.includes('eab') || h.includes('amber') || h.includes('fbb')) return 'amber';
  return 'rose';
}

function SubjectCardAurora({
  subject, lang, onStartFocus, onToggleTask
}: {
  subject: ReturnType<typeof getTodaySubjects>[number];
  lang: Lang;
  onStartFocus: () => void;
  onToggleTask: (taskId: string) => void;
}) {
  const t = L(lang);
  const colorKey = pickColorBucket(subject.color);
  const c = COLOR_CLASSES[colorKey];
  const tasks = subject.tasks || [];
  const total = tasks.length;
  const done = tasks.filter(x => x.completed).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  const remaining = total - done;
  const status = total === 0
    ? (lang === 'ar' ? 'لا مهام' : 'No tasks')
    : remaining === 0
      ? t.completed
      : (lang === 'ar' ? `${remaining} متبقي` : `${remaining} left`);

  return (
    <GlassCard className="p-5 flex flex-col hover:bg-white/[0.05] transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-100 tracking-tight truncate">{subject.name}</h3>
          {subject.icon && <p className="text-xs text-slate-400 mt-0.5">{subject.icon}</p>}
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 whitespace-nowrap ${c.text}`}>
          {status}
        </div>
      </div>

      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">{t.progress}</span>
          <span className="text-slate-300 font-medium">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full rounded-full ${c.bar} shadow-[0_0_10px_currentColor] transition-all duration-1000`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-5 flex-1 min-h-[40px]">
        {tasks.length === 0 ? (
          <p className="text-xs text-slate-500 italic">{t.noTasks}</p>
        ) : (
          tasks.slice(0, 3).map(task => (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className="w-full flex items-center gap-2.5 text-start group/task"
            >
              {task.completed ? (
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${c.text}`} />
              ) : (
                <Circle className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover/task:text-slate-400" />
              )}
              <span className={`text-sm truncate ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                {task.title}
              </span>
            </button>
          ))
        )}
        {tasks.length > 3 && (
          <p className="text-[11px] text-slate-500">+{tasks.length - 3}</p>
        )}
      </div>

      <button
        onClick={onStartFocus}
        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Play className="w-3.5 h-3.5" /> {t.startFocus}
      </button>
    </GlassCard>
  );
}

function WeeklyChart({ logs, lang }: { logs: { date: string; duration: number; type: string }[]; lang: Lang }) {
  const t = L(lang);
  const data = useMemo(() => {
    const today = new Date();
    const days: { label: string; minutes: number; isToday: boolean }[] = [];
    const dayLabelsEn = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dayLabelsAr = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = DAY_KEY(d);
      const seconds = (logs || [])
        .filter(l => l.type === 'study' && l.date.startsWith(key))
        .reduce((s, l) => s + l.duration, 0);
      days.push({
        label: (lang === 'ar' ? dayLabelsAr : dayLabelsEn)[d.getDay()],
        minutes: Math.round(seconds / 60),
        isToday: i === 0,
      });
    }
    return days;
  }, [logs, lang]);

  const max = Math.max(60, ...data.map(d => d.minutes));

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-slate-200">{t.studyPulse}</h3>
        <span className="text-xs text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md">{t.thisWeek}</span>
      </div>

      <div className="flex items-end gap-2 justify-between">
        {data.map((d, i) => {
          const height = Math.max(4, (d.minutes / max) * 128);
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
              <div className="w-full h-32 flex items-end justify-center">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${
                    d.isToday
                      ? 'bg-gradient-to-t from-cyan-500 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                      : 'bg-white/15 group-hover:bg-white/25'
                  }`}
                  style={{ height: `${height}px` }}
                />
              </div>
              <span className={`text-xs ${d.isToday ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function FocusTimerCard({ lang, onOpenFocus, currentSubjectName }: { lang: Lang; onOpenFocus: () => void; currentSubjectName?: string }) {
  const t = L(lang);
  return (
    <GlassCard className="p-6 relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white/5 border border-white/10 text-cyan-300 font-normal mb-6 flex items-center gap-1.5 backdrop-blur-md px-3 py-1 rounded-full text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {t.deepFocus}
        </div>
        <div className="text-7xl font-light tracking-tighter text-white mb-2 tabular-nums">25:00</div>
        <p className="text-slate-400 text-sm mb-8 text-center min-h-[20px]">
          {currentSubjectName || (lang === 'ar' ? 'اختر مادة وابدأ التركيز' : 'Pick a subject and dive in')}
        </p>
        <div className="flex items-center gap-4">
          <button className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
            <SettingsIcon className="w-5 h-5 text-slate-300" />
          </button>
          <button
            onClick={onOpenFocus}
            className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all hover:scale-105"
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
          <button className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
            <SkipForward className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function MonthlyMilestonesCard({ lang }: { lang: Lang }) {
  const t = L(lang);
  const { userData, toggleMonthlyTask } = useAppContext();
  const tasks = useMemo(() => {
    const all = userData?.monthlyTasks || {};
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const flat: { id: string; title: string; date: string; completed: boolean }[] = [];
    Object.entries(all).forEach(([date, list]) => {
      const d = new Date(date);
      if (d.getMonth() === month && d.getFullYear() === year) {
        list.forEach(item => flat.push({ ...item, date }));
      }
    });
    return flat.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
  }, [userData?.monthlyTasks]);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-slate-200 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          {t.monthlyMilestones}
        </h3>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">{t.noMonthlyTasks}</p>
      ) : (
        <div className="space-y-2">
          {tasks.map(task => {
            const d = new Date(task.date);
            const dateStr = d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
            return (
              <button
                key={task.id}
                onClick={() => toggleMonthlyTask(task.date, task.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-colors text-start ${task.completed ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${task.completed ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'border-slate-600'}`}>
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                  <span className={`text-sm truncate ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{task.title}</span>
                </div>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md shrink-0">{dateStr}</span>
              </button>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}

function SlideOver({
  open, onClose, title, children, isRTL
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; isRTL?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative ${isRTL ? 'mr-auto' : 'ml-auto'} h-full w-full max-w-2xl bg-[#0a0a14] border-${isRTL ? 'r' : 'l'} border-white/10 overflow-y-auto animate-in slide-in-from-${isRTL ? 'left' : 'right'} duration-300`}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a14]/90 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { userData, setUserData, togglePrayer, addLog, toggleTask, logout, updateUserData } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<null | 'subjects' | 'analytics' | 'calendar' | 'assistant' | 'tools'>(null);
  const initialized = React.useRef(false);

  // Global ⌘K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!initialized.current && typeof window !== 'undefined' && userData) {
      const seen = sessionStorage.getItem('has_seen_welcome');
      if (!seen) { setTimeout(() => setShowWelcome(true), 0); sessionStorage.setItem('has_seen_welcome', 'true'); }
      initialized.current = true;
    }
  }, [userData]);

  useEffect(() => {
    if (userData) checkAndMigrate(userData, setUserData);
  }, [userData, setUserData]);

  if (!userData) return null;

  const lang: Lang = userData.language;
  const t = L(lang);
  const isRTL = lang === 'ar';
  const todaySubjects = getTodaySubjects(userData);
  const todayName = getTodayName();

  const allTasks = userData.subjects.flatMap(s => s.tasks || []);
  const doneTasks = allTasks.filter(x => x.completed).length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayStudySec = (userData.logs || []).filter(l => l.type === 'study' && l.date.startsWith(todayStr)).reduce((s, l) => s + l.duration, 0);
  const completedPrayers = (userData.prayerLogs?.[todayStr] || []).length;
  const streak = computeStreak(userData.logs || []);

  const studyHours = (todayStudySec / 3600).toFixed(1);
  const completionPct = allTasks.length === 0 ? 0 : Math.round((doneTasks / allTasks.length) * 100);

  const greetKey = getGreetingKey();
  const initials = (userData.name || '?').slice(0, 2).toUpperCase();

  const openFocus = () => window.dispatchEvent(new CustomEvent('atomic:open-focus'));
  const toggleLang = () => updateUserData({ language: lang === 'ar' ? 'en' : 'ar' });

  const sidebarNav = (
    <>
      <NavItem icon={<Home className="w-4 h-4" />} label={t.dashboard} active isRTL={isRTL} />
      <NavItem icon={<BookOpen className="w-4 h-4" />} label={t.subjects} onClick={() => { setActivePanel('subjects'); setMobileNavOpen(false); }} isRTL={isRTL} />
      <NavItem icon={<BarChart2 className="w-4 h-4" />} label={t.analytics} onClick={() => { setActivePanel('analytics'); setMobileNavOpen(false); }} isRTL={isRTL} />
      <NavItem icon={<CalendarIcon className="w-4 h-4" />} label={t.calendar} onClick={() => { setActivePanel('calendar'); setMobileNavOpen(false); }} isRTL={isRTL} />
      <NavItem icon={<Sparkles className="w-4 h-4" />} label={t.aiAssistant} badge={t.newBadge} onClick={() => { setActivePanel('assistant'); setMobileNavOpen(false); }} isRTL={isRTL} />
    </>
  );

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#030308] text-slate-100 overflow-hidden font-sans relative flex selection:bg-cyan-500/30"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-600/15 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-fuchsia-600/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex w-64 ${isRTL ? 'border-l' : 'border-r'} border-white/5 bg-white/[0.01] backdrop-blur-2xl flex-col z-10 relative`}>
        <div className="p-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">ATOMIC</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarNav}
        </nav>
        <div className="p-4 mt-auto space-y-1 border-t border-white/5">
          <NavItem icon={<Wrench className="w-4 h-4" />} label={t.tools} onClick={() => setActivePanel('tools')} isRTL={isRTL} />
          <NavItem icon={<Globe className="w-4 h-4" />} label={lang === 'ar' ? 'English' : 'العربية'} onClick={toggleLang} isRTL={isRTL} />
          <NavItem icon={<LogOut className="w-4 h-4" />} label={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'} onClick={logout} isRTL={isRTL} />
        </div>
      </aside>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
          <aside className={`relative w-72 h-full bg-[#070710] ${isRTL ? 'mr-auto border-l' : 'ml-auto border-r'} border-white/10 backdrop-blur-2xl flex flex-col z-10`}>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-xl">ATOMIC</span>
              </div>
              <button onClick={() => setMobileNavOpen(false)} className="p-2 rounded-xl hover:bg-white/10"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 px-4 py-2 space-y-1">{sidebarNav}</nav>
            <div className="p-4 mt-auto space-y-1 border-t border-white/5">
              <NavItem icon={<Wrench className="w-4 h-4" />} label={t.tools} onClick={() => { setActivePanel('tools'); setMobileNavOpen(false); }} isRTL={isRTL} />
              <NavItem icon={<Globe className="w-4 h-4" />} label={lang === 'ar' ? 'English' : 'العربية'} onClick={toggleLang} isRTL={isRTL} />
              <NavItem icon={<LogOut className="w-4 h-4" />} label={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'} onClick={logout} isRTL={isRTL} />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10">
        <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6 md:space-y-8">

          {/* Top Bar */}
          <header className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setMobileNavOpen(true)} className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10">
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <p className="text-slate-400 font-medium text-xs sm:text-sm flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> {formatDate(lang)}
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold mt-1 tracking-tight truncate">
                  {t[greetKey]}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{userData.name}</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              {streak > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 text-orange-300">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs font-medium">{streak} {streak === 1 ? t.streakDay : t.streakDays}</span>
                </div>
              )}
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden md:flex relative items-center group bg-white/5 border border-white/10 rounded-2xl pl-10 pr-12 py-2 text-sm w-64 hover:bg-white/10 transition-all backdrop-blur-xl text-start"
              >
                <Search className={`w-4 h-4 absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
                <span className="text-slate-400">{t.search}</span>
                <kbd className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-md`}>⌘K</kbd>
              </button>

              <ScheduleEditor />
              <SettingsPanel />

              <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/40 to-cyan-500/30 border border-white/10 flex items-center justify-center font-semibold text-sm ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-[#030308]`}>
                {initials}
              </div>
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              icon={<Clock className="w-5 h-5 text-cyan-400" />}
              label={t.studyTime}
              value={`${studyHours}h`}
              trend={lang === 'ar' ? 'اليوم' : 'today'}
              trendUp={todayStudySec > 0}
            />
            <StatCard
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              label={t.tasksDone}
              value={`${doneTasks}/${allTasks.length}`}
              trend={`${completionPct}% ${t.completion}`}
            />
            <StatCard
              icon={<Book className="w-5 h-5 text-indigo-400" />}
              label={t.todaysLoad}
              value={String(todaySubjects.length)}
              trend={t.subjectsScheduled}
            />
            <StatCard
              icon={<Moon className="w-5 h-5 text-fuchsia-400" />}
              label={t.prayers}
              value={`${completedPrayers}/5`}
              trend={lang === 'ar' ? 'الصلوات اليومية' : 'today'}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left col: Focus + Chart */}
            <div className="xl:col-span-4 space-y-6">
              <FocusTimerCard
                lang={lang}
                onOpenFocus={openFocus}
                currentSubjectName={todaySubjects[0]?.name}
              />
              <WeeklyChart logs={userData.logs || []} lang={lang} />

              {/* Prayer quick toggle */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-200 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-fuchsia-400" />
                    {t.prayers}
                  </h3>
                  <span className="text-xs text-slate-400">{completedPrayers}/5</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {PRAYER_IDS.map(p => {
                    const done = (userData.prayerLogs?.[todayStr] || []).includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePrayer(p)}
                        className={`p-2 rounded-xl border text-[10px] uppercase tracking-wider font-semibold transition-all ${
                          done
                            ? 'bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-200 shadow-[0_0_12px_rgba(217,70,239,0.25)]'
                            : 'bg-white/[0.03] border-white/10 text-slate-500 hover:bg-white/5'
                        }`}
                      >
                        {p.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Right col: Subjects + Monthly */}
            <div className="xl:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium tracking-tight">{t.todayProtocol}</h2>
                <button onClick={() => setActivePanel('calendar')} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                  {t.viewSchedule} <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {todaySubjects.length === 0 ? (
                <GlassCard className="p-10 text-center">
                  <Sparkles className="w-10 h-10 mx-auto text-slate-500 mb-3" />
                  <p className="text-slate-300 font-medium">{t.freeDay}</p>
                  <button
                    onClick={() => setActivePanel('calendar')}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/15"
                  >
                    <Plus className="w-4 h-4" /> {lang === 'ar' ? 'أضف مادة للجدول' : 'Add subjects to schedule'}
                  </button>
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaySubjects.map(sub => (
                    <SubjectCardAurora
                      key={sub.id}
                      subject={sub}
                      lang={lang}
                      onStartFocus={openFocus}
                      onToggleTask={(taskId) => toggleTask(sub.id, taskId)}
                    />
                  ))}
                </div>
              )}

              <MonthlyMilestonesCard lang={lang} />
            </div>
          </div>

          {/* Spacer */}
          <div className="h-8" />
        </div>

        {/* Modals & globals */}
        <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} userData={userData} />
        <FocusMode />
        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </main>

      {/* Slide-over panels */}
      <SlideOver open={activePanel === 'subjects'} onClose={() => setActivePanel(null)} title={t.subjects} isRTL={isRTL}>
        <div className="space-y-4">
          {userData.subjects.map(sub => {
            const colorKey = pickColorBucket(sub.color);
            const c = COLOR_CLASSES[colorKey];
            const total = (sub.tasks || []).length;
            const done = (sub.tasks || []).filter(x => x.completed).length;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            return (
              <GlassCard key={sub.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-100">{sub.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{done}/{total} {t.tasksDone.toLowerCase()}</p>
                  </div>
                  <span className={`text-xs ${c.text}`}>{pct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${c.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </GlassCard>
            );
          })}
          <button
            onClick={() => setActivePanel('tools')}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4" /> {lang === 'ar' ? 'فتح أدوات المواد المتقدمة' : 'Open advanced subject tools'}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </SlideOver>

      <SlideOver open={activePanel === 'analytics'} onClose={() => setActivePanel(null)} title={t.analytics} isRTL={isRTL}>
        <div className="space-y-4">
          <AnalyticsDashboard />
          <TrackingView />
        </div>
      </SlideOver>

      <SlideOver open={activePanel === 'calendar'} onClose={() => setActivePanel(null)} title={t.calendar} isRTL={isRTL}>
        <MonthlyTasksWidget />
      </SlideOver>

      <SlideOver open={activePanel === 'assistant'} onClose={() => setActivePanel(null)} title={t.aiAssistant} isRTL={isRTL}>
        <StudyAssistant />
      </SlideOver>

      <SlideOver open={activePanel === 'tools'} onClose={() => setActivePanel(null)} title={t.tools} isRTL={isRTL}>
        <div className="-m-4">
          <Sidebar
            isCollapsed={false}
            onToggle={() => {}}
            mobileOpen={true}
            onMobileClose={() => setActivePanel(null)}
          />
        </div>
      </SlideOver>
    </div>
  );
}
