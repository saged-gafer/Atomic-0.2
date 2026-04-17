"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { getTodayName, getTodaySubjects } from '@/lib/schedule';
import SubjectCard from './SubjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import SettingsPanel from '@/components/settings/SettingsPanel';
import StudyAssistant from '@/components/studyassistant/StudyAssistant';
import Sidebar from '@/components/sidebar/Sidebar';
import { checkAndMigrate } from '@/services/aiMigrator';
import { translations } from '@/lib/i18n';
import WelcomeModal from './WelcomeModal';
import TrackingView from '@/components/analytics/TrackingView';
import ScheduleEditor from './ScheduleEditor';
import { Sparkles, Calendar, Menu, Atom, Clock, CheckCircle2, TrendingUp, Zap, PanelLeftOpen } from 'lucide-react';
import MonthlyTasksWidget from '@/components/monthly/MonthlyTasksWidget';

export default function Dashboard() {
  const { userData, setUserData } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && typeof window !== 'undefined' && userData) {
      const hasSeenWelcome = sessionStorage.getItem('has_seen_welcome');
      if (!hasSeenWelcome) {
        setTimeout(() => setShowWelcome(true), 0);
        sessionStorage.setItem('has_seen_welcome', 'true');
      }
      initialized.current = true;
    }
  }, [userData]);
  
  useEffect(() => {
    if (userData) {
      checkAndMigrate(userData, setUserData);
    }
  }, [userData, setUserData]);

  const t = translations[userData?.language || 'en'];
  const isRTL = userData?.language === 'ar';
  const todaySubjects = React.useMemo(() => userData ? getTodaySubjects(userData) : [], [userData]);
  const todayName = React.useMemo(() => getTodayName(), []);

  const stats = React.useMemo(() => {
    if (!userData) return [];
    const allTasks = userData.subjects.flatMap(s => s.tasks || []);
    const doneTasks = allTasks.filter(t => t.completed).length;
    const logs = userData.logs || [];
    const todayStr = new Date().toISOString().split('T')[0];
    const todayStudySec = logs.filter(l => l.type === 'study' && l.date.startsWith(todayStr)).reduce((s, l) => s + l.duration, 0);
    const todayStudyH = (todayStudySec / 3600).toFixed(1);
    const completedPrayers = (userData.prayerLogs?.[todayStr] || []).length;

    return [
      { icon: Clock,         label: 'Study Today', value: `${todayStudyH}h`,          color: '#6366f1', glow: 'rgba(99,102,241,0.3)'   },
      { icon: CheckCircle2,  label: 'Tasks Done',  value: `${doneTasks}/${allTasks.length}`, color: '#10b981', glow: 'rgba(16,185,129,0.3)'  },
      { icon: Zap,           label: "Today's Load", value: `${todaySubjects.length}`,  color: '#f59e0b', glow: 'rgba(245,158,11,0.3)'   },
      { icon: TrendingUp,    label: 'Prayers',     value: `${completedPrayers}/5`,     color: '#06b6d4', glow: 'rgba(6,182,212,0.3)'    },
    ];
  }, [userData, todaySubjects.length]);

  if (!userData) return null;

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Mobile top header ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 h-14 border-b border-white/5"
        style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(16px)' }}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)]">
            <Atom size={14} className="text-white" />
          </div>
          <span className="text-base font-black tracking-tighter text-white">ATOMIC</span>
        </div>
        <div className="flex items-center gap-2">
          <ScheduleEditor />
          <SettingsPanel />
        </div>
      </header>

      {/* Spacer for desktop sidebar — collapses to 0 when fully hidden */}
      <motion.div
        animate={{ width: sidebarCollapsed ? 0 : 280 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block shrink-0 pointer-events-none order-first"
      />

      {/* Floating re-open button — only visible when sidebar is collapsed */}
      <AnimatePresence>
        {sidebarCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSidebarCollapsed(false)}
            className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-50 ${isRTL ? 'right-0' : 'left-0'} w-8 h-16 items-center justify-center rounded-${isRTL ? 'l' : 'r'}-2xl bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 hover:w-10 transition-all duration-200 shadow-lg backdrop-blur-sm`}
            aria-label={t.sidebar_open}
          >
            <PanelLeftOpen size={16} className={isRTL ? 'rotate-180' : ''} />
          </motion.button>
        )}
      </AnimatePresence>

      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <main
        id="main-content"
        className="flex-1 p-4 md:p-8 pt-[4.5rem] lg:pt-8 transition-all duration-500 w-full min-w-0"
        role="main"
        aria-label="Student Dashboard"
      >
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-w-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-2xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)] shrink-0">
                  <Sparkles size={18} />
                </div>
                <h1 className="text-xs font-black tracking-[0.3em] uppercase text-primary/60 truncate">
                  {t.welcome_title} Dashboard
                </h1>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {(userData.loginCount ?? 1) <= 1 ? t.welcome : t.welcome_back},{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent break-words">
                  {userData.name}
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-4 text-slate-400 font-medium">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
                  <Calendar size={13} className="text-secondary shrink-0" />
                  <span className="text-xs font-bold tracking-wide">{todayName}</span>
                </div>
                <p className="text-sm font-semibold">
                  {t.subjects_to_study}: <span className="text-white font-black">{todaySubjects.length}</span>
                </p>
              </div>
            </motion.div>

            {/* Desktop action buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <ScheduleEditor />
              <SettingsPanel />
            </div>
          </header>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map(({ icon: Icon, label, value, color, glow }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl p-4 border border-white/5 group hover:border-white/10 transition-all duration-300 glass-reflection"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, transform: 'translate(30%,-30%)' }} />

                {/* Bottom hover glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ color }} />

                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 truncate">{label}</p>
                </div>
                <p className="text-2xl font-black text-white leading-none relative z-10" style={{ textShadow: `0 0 20px ${color}40` }}>
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Monthly Tasks Widget */}
          <MonthlyTasksWidget />

          {/* Subjects Grid */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-3 flex-wrap">
              <span className="opacity-40">01</span> Today&apos;s Learning Path
              <div className="h-px flex-1 min-w-[32px] bg-gradient-to-r from-white/20 to-transparent" />
            </h3>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {todaySubjects.map((subject, index) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    index={index}
                    language={userData.language}
                  />
                ))}
              </AnimatePresence>

              {todaySubjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full py-16 sm:py-24 glass-panel rounded-[2rem] border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 px-6"
                >
                  <div className="p-5 rounded-full bg-white/[0.03] text-slate-500 border border-white/5">
                    <Calendar size={40} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-white">{t.no_subjects}</p>
                    <p className="text-slate-500 font-medium text-sm">Enjoy your time off or add more subjects to your schedule.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* Integrated Services */}
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            <div className="2xl:col-span-2 space-y-8">
              <StudyAssistant />
              <AnalyticsDashboard />
            </div>
            <div className="space-y-8">
              <TrackingView />
            </div>
          </div>
        </div>

        <WelcomeModal
          isOpen={showWelcome}
          onClose={() => setShowWelcome(false)}
          userData={userData}
        />
      </main>
    </div>
  );
}
