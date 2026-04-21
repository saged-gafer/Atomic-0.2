"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
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
import FocusMode from './FocusMode';
import MonthlyTasksWidget from '@/components/monthly/MonthlyTasksWidget';
import { Menu, Clock, CheckCircle2, Zap, TrendingUp, Wand2, Star, Calendar, Atom, Flame, Search } from 'lucide-react';
import CommandPalette from '@/components/command/CommandPalette';
import { computeStreak } from '@/lib/streak';

/* ── Floating star decoration ───────────────────────── */
function FloatStars({ primary, secondary }: { primary:string; secondary:string }) {
  return (
    <div className="pointer-events-none">
      {[
        { x:'3%', y:'15%',  size:10, delay:0,   c:primary },
        { x:'96%',y:'12%',  size:14, delay:0.8, c:secondary },
        { x:'2%', y:'55%',  size:8,  delay:1.5, c:primary },
        { x:'97%',y:'60%',  size:10, delay:2.2, c:'#facc15' },
      ].map((s,i) => (
        <motion.div key={i} className="absolute" style={{ left:s.x, top:s.y }}
          animate={{ y:[0,-14,0], opacity:[0.3,0.8,0.3], rotate:[0,180,360] }}
          transition={{ duration:4+s.delay, repeat:Infinity, delay:s.delay }}
        >
          <Star size={s.size} fill={s.c} style={{ color:s.c }}/>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Anime stat card ────────────────────────────────── */
function AnimeStatCard({
  icon: Icon, label, value, color, index
}: { icon:React.ElementType; label:string; value:string; color:string; index:number }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20, scale:0.9 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay:0.1+index*0.07, type:'spring', stiffness:300, damping:25 }}
      whileHover={{ y:-5, scale:1.02 }}
      className="relative overflow-hidden rounded-[20px] p-4 group"
      style={{
        background:`rgba(${color==='#6366f1'?'99,102,241':color==='#10b981'?'16,185,129':color==='#f59e0b'?'245,158,11':'6,182,212'},0.06)`,
        border:`2px solid ${color}30`,
        boxShadow:`0 3px 0 0 ${color}25`,
      }}
    >
      {/* Screen tone pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(circle, ${color}15 1px, transparent 1px)`, backgroundSize:'10px 10px' }}
      />
      {/* Glow on hover */}
      <motion.div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background:`radial-gradient(circle at 30% 30%, ${color}12, transparent 70%)` }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${color}18` }}>
              <Icon size={15} style={{ color }}/>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color:`${color}80` }}>{label}</p>
          </div>
          <p className="text-2xl font-black text-white" style={{ textShadow:`0 0 15px ${color}40` }}>{value}</p>
        </div>
        <motion.div className="opacity-20 group-hover:opacity-60 transition-opacity"
          animate={{ rotate:[0,360] }} transition={{ duration:12, repeat:Infinity, ease:'linear' }}
        >
          <Atom size={20} style={{ color }}/>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Theme toggle button ────────────────────────────── */
function ThemeToggleBtn() {
  const { theme, toggleTheme, themeName } = useTheme();
  const [spin, setSpin] = useState(false);
  const handle = () => { setSpin(true); toggleTheme(); setTimeout(() => setSpin(false), 700); };
  const next = themeName === 'nebula' ? '🌿 Jade' : '🌌 Nebula';
  return (
    <motion.button onClick={handle} whileHover={{ scale:1.06, y:-1 }} whileTap={{ scale:0.94 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest"
      style={{ background:`${theme.primary}12`, border:`2px solid ${theme.primary}40`, color:theme.primary }}
    >
      <motion.div animate={{ rotate:spin?360:0 }} transition={{ duration:0.6 }}><Wand2 size={12}/></motion.div>
      {next}
    </motion.button>
  );
}

/* ── Main Dashboard ─────────────────────────────────── */
export default function Dashboard() {
  const { userData, setUserData } = useAppContext();
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const initialized = React.useRef(false);

  // Global ⌘K / Ctrl+K shortcut for command palette
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
      if (!seen) { setTimeout(() => setShowWelcome(true), 0); sessionStorage.setItem('has_seen_welcome','true'); }
      initialized.current = true;
    }
  }, [userData]);

  useEffect(() => {
    if (userData) checkAndMigrate(userData, setUserData);
  }, [userData, setUserData]);

  if (!userData) return null;

  const t = translations[userData.language];
  const isRTL = userData.language === 'ar';
  const todaySubjects = getTodaySubjects(userData);
  const todayName = getTodayName();

  const allTasks = userData.subjects.flatMap(s => s.tasks||[]);
  const doneTasks = allTasks.filter(t => t.completed).length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayStudySec = (userData.logs||[]).filter(l => l.type==='study' && l.date.startsWith(todayStr)).reduce((s,l) => s+l.duration, 0);
  const completedPrayers = (userData.prayerLogs?.[todayStr]||[]).length;
  const streak = computeStreak(userData.logs || []);

  const stats = [
    { icon:Clock,        label:'Study Today',  value:`${(todayStudySec/3600).toFixed(1)}h`,      color:'#6366f1' },
    { icon:CheckCircle2, label:'Tasks Done',   value:`${doneTasks}/${allTasks.length}`,          color:'#10b981' },
    { icon:Zap,          label:"Today's Load", value:`${todaySubjects.length} subj`,             color:'#f59e0b' },
    { icon:TrendingUp,   label:'Prayers',      value:`${completedPrayers}/5`,                   color:'#06b6d4' },
  ];

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row" dir={isRTL?'rtl':'ltr'}>

      {/* Floating stars (subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatStars primary={theme.primary} secondary={theme.secondary}/>
      </div>

      {/* ── Mobile header ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 border-b"
        style={{ background:theme.bg, backdropFilter:'blur(20px)', borderColor:`${theme.primary}15` }}
      >
        <button onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-xl border font-black"
          style={{ background:`${theme.primary}12`, borderColor:`${theme.primary}30`, color:theme.primary }}
        >
          <Menu size={18}/>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-white text-xs"
            style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})` }}>A</div>
          <span className="text-sm font-black text-white tracking-widest">ATOMIC</span>
        </div>
        <div className="flex items-center gap-2">
          <ScheduleEditor/>
          <SettingsPanel/>
        </div>
      </header>

      {/* Sidebar spacer */}
      <motion.div
        animate={{ width:sidebarCollapsed?0:280 }}
        transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
        className="hidden lg:block shrink-0 pointer-events-none order-first"
      />

      {/* Re-open sidebar button */}
      <AnimatePresence>
        {sidebarCollapsed && (
          <motion.button
            initial={{ opacity:0, x:isRTL?40:-40 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:isRTL?40:-40 }}
            onClick={() => setSidebarCollapsed(false)}
            className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-50 ${isRTL?'right-0':'left-0'} w-9 h-16 items-center justify-center rounded-r-2xl font-black text-white text-xs`}
            style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 20px ${theme.primary}40` }}
          >
            ▶
          </motion.button>
        )}
      </AnimatePresence>

      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* ── Main content ── */}
      <main className="flex-1 p-4 md:p-6 pt-[4.5rem] lg:pt-6 min-w-0 relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── Hero header ── */}
          <header className="relative rounded-[28px] overflow-hidden p-6"
            style={{
              background:`linear-gradient(135deg, ${theme.bg} 0%, rgba(20,10,40,0.95) 100%)`,
              border:`2px solid ${theme.primary}30`,
              boxShadow:`0 3px 0 0 ${theme.primary}25, 0 0 40px -10px ${theme.primary}20`,
            }}
          >
            {/* Screen tone */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}08 1px, transparent 1px)`, backgroundSize:'14px 14px' }}
            />
            {/* Top beam */}
            <motion.div className="absolute top-0 left-0 right-0 h-[3px]"
              animate={{ background:[
                `linear-gradient(90deg,transparent,${theme.primary},${theme.secondary},transparent)`,
                `linear-gradient(90deg,transparent,${theme.secondary},${theme.primary},transparent)`,
              ]}}
              transition={{ duration:3, repeat:Infinity }}
            />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0 hidden sm:block">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-2xl"
                    style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 24px ${theme.primary}50` }}
                    animate={{ rotate:[0,5,-5,0], scale:[1,1.03,1] }}
                    transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
                  >
                    <Atom size={28} className="text-white" />
                  </motion.div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color:`${theme.primary}80` }}>
                    ⚡ Study Dashboard
                  </p>
                  <motion.h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
                    animate={{ x:[0,2,-2,0] }} transition={{ duration:8, repeat:Infinity }}
                  >
                    {(userData.loginCount??1)<=1 ? 'Welcome' : 'Welcome back'},{' '}
                    <span style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                      {userData.name}
                    </span>
                    <motion.span animate={{ rotate:[0,15,-10,5,0] }} transition={{ duration:3, repeat:Infinity }} style={{ display:'inline-block', marginLeft:8 }}>
                      ✨
                    </motion.span>
                  </motion.h1>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold text-xs"
                      style={{ background:`${theme.secondary}12`, border:`1.5px solid ${theme.secondary}30`, color:theme.secondary }}
                    >
                      <Calendar size={10}/> {todayName}
                    </div>
                    {streak > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.2 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-black text-xs relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.15))', border: '1.5px solid rgba(245,158,11,0.4)', color: '#fbbf24' }}
                        title={`${streak} day streak`}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        >
                          <Flame size={11} fill="#fbbf24" />
                        </motion.div>
                        {streak} {streak === 1 ? (isRTL ? 'يوم' : 'day') : (isRTL ? 'أيام' : 'days')}
                      </motion.div>
                    )}
                    <span className="text-xs font-bold" style={{ color:`${theme.primary}60` }}>
                      {todaySubjects.length > 0 ? `${todaySubjects.length} subjects today` : 'Free day!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPaletteOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}
                  title="Command palette (⌘K)"
                >
                  <Search size={11} />
                  <span>{isRTL ? 'بحث' : 'Search'}</span>
                  <kbd className="ml-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-slate-400">⌘K</kbd>
                </motion.button>
                <ThemeToggleBtn/>
                <ScheduleEditor/>
                <SettingsPanel/>
              </div>
            </div>
          </header>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s,i) => (
              <AnimeStatCard key={s.label} {...s} index={i}/>
            ))}
          </div>

          {/* ── Monthly tasks ── */}
          <MonthlyTasksWidget/>

          {/* ── Today's subjects ── */}
          <section>
            {/* Manga-style section header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-4 rounded-full" style={{ background:theme.primary }}/>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Today&apos;s Learning Path</h3>
              <div className="flex-1 h-[2px] rounded-full" style={{ background:`linear-gradient(90deg,${theme.primary}40,transparent)` }}/>
              <span className="text-[10px] font-black px-2 py-1 rounded-lg" style={{ background:`${theme.primary}15`, color:theme.primary }}>
                {todaySubjects.length} active
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {todaySubjects.map((sub, i) => (
                  <SubjectCard key={sub.id} subject={sub} index={i} language={userData.language}/>
                ))}
              </AnimatePresence>

              {todaySubjects.length === 0 && (
                <motion.div
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  className="col-span-full py-16 flex flex-col items-center gap-4 rounded-[24px] border-dashed"
                  style={{ border:`2px dashed ${theme.primary}30`, background:`${theme.primary}05` }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ background:`linear-gradient(135deg,${theme.primary}30,${theme.secondary}20)`, border:`2px solid ${theme.primary}30` }}
                    animate={{ scale:[1,1.08,1], rotate:[0,8,-8,0] }}
                    transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                  >
                    <Star size={36} fill={theme.primary} style={{ color:theme.primary }}/>
                  </motion.div>
                  <div className="text-center">
                    <p className="text-xl font-black text-white">Free Day! 🎉</p>
                    <p className="text-sm font-medium mt-1" style={{ color:`${theme.primary}70` }}>
                      No subjects scheduled. Enjoy your rest or add subjects to your schedule.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* ── Study tools ── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-4 rounded-full" style={{ background:theme.secondary }}/>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Study Arsenal</h3>
              <div className="flex-1 h-[2px] rounded-full" style={{ background:`linear-gradient(90deg,${theme.secondary}40,transparent)` }}/>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
              <div className="2xl:col-span-2 space-y-6">
                <StudyAssistant/>
                <AnalyticsDashboard/>
              </div>
              <TrackingView/>
            </div>
          </section>

        </div>

        <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} userData={userData}/>
        <FocusMode/>
        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </main>
    </div>
  );
}
