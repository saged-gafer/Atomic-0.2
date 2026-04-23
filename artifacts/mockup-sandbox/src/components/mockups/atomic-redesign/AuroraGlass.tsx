import React, { useState } from "react";
import { 
  Search, Bell, Flame, Home, BookOpen, BarChart2, 
  Calendar as CalendarIcon, Sparkles, Settings, Play, 
  Pause, SkipForward, Clock, CheckCircle2, Circle, 
  MoreHorizontal, ChevronRight, Book, Activity, Moon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function AuroraGlass() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="min-h-screen bg-[#030308] text-slate-100 overflow-hidden font-sans relative flex selection:bg-cyan-500/30">
      
      {/* Background Aurora Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-600/15 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-fuchsia-600/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.01] backdrop-blur-2xl flex flex-col z-10 relative">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">ATOMIC</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem icon={<Home className="w-4 h-4" />} label="Dashboard" active />
          <NavItem icon={<BookOpen className="w-4 h-4" />} label="Subjects" />
          <NavItem icon={<BarChart2 className="w-4 h-4" />} label="Analytics" />
          <NavItem icon={<CalendarIcon className="w-4 h-4" />} label="Calendar" />
          <NavItem icon={<Sparkles className="w-4 h-4" />} label="AI Assistant" badge="New" />
        </nav>

        <div className="p-4 mt-auto">
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10">
        <div className="max-w-[1200px] mx-auto p-8 space-y-8">
          
          {/* Top Bar */}
          <header className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Wednesday, October 24
              </p>
              <h1 className="text-3xl font-semibold mt-1 tracking-tight">Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Layla</span></h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search commands..." 
                  className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all w-64 backdrop-blur-xl"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-md font-sans">⌘K</kbd>
              </div>

              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer">
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <Avatar className="h-10 w-10 rounded-2xl border border-white/10 ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-[#030308]">
                  <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Layla&backgroundColor=c0aede" />
                  <AvatarFallback className="bg-indigo-900 text-indigo-200">LY</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard 
              icon={<Clock className="text-cyan-400" />} 
              label="Study Time" 
              value="3.2h" 
              trend="+45m vs yesterday" 
              trendUp 
            />
            <StatCard 
              icon={<CheckCircle2 className="text-emerald-400" />} 
              label="Tasks Done" 
              value="12/18" 
              trend="67% completion" 
            />
            <StatCard 
              icon={<Book className="text-indigo-400" />} 
              label="Today's Load" 
              value="5" 
              trend="Subjects scheduled" 
            />
            <StatCard 
              icon={<Moon className="text-fuchsia-400" />} 
              label="Prayers" 
              value="4/5" 
              trend="Maghrib completed" 
            />
          </div>

          <div className="grid grid-cols-12 gap-6">
            
            {/* Focus Timer */}
            <div className="col-span-4 space-y-6">
              <GlassCard className="p-6 relative overflow-hidden group">
                {/* Glow behind timer */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-cyan-300 font-normal mb-6 flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Deep Focus Session
                  </Badge>
                  
                  <div className="text-7xl font-light tracking-tighter text-white mb-2 tabular-nums">
                    25:00
                  </div>
                  <p className="text-slate-400 text-sm mb-8">Mathematics • Advanced Calculus</p>

                  <div className="flex items-center gap-4">
                    <button className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                      <Settings className="w-5 h-5 text-slate-300" />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white fill-white" /> : <Play className="w-6 h-6 text-white fill-white ml-1" />}
                    </button>
                    <button className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                      <SkipForward className="w-5 h-5 text-slate-300" />
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Weekly Chart */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-slate-200">Study Pulse</h3>
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">This Week</Badge>
                </div>
                
                <div className="h-32 flex items-end gap-2 justify-between">
                  {[90, 120, 75, 180, 60, 200, 145].map((val, i) => {
                    const max = 200;
                    const height = (val / max) * 100;
                    const isToday = i === 5;
                    return (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                        <div className="w-full relative h-full flex items-end justify-center">
                          <div 
                            className={`w-full rounded-md transition-all duration-500 ${isToday ? 'bg-gradient-to-t from-cyan-500 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/10 group-hover:bg-white/20'}`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className={`text-xs ${isToday ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Main Center Area */}
            <div className="col-span-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium tracking-tight">Today's Protocol</h2>
                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                  View full schedule <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SubjectCard 
                  title="Mathematics" 
                  subtitle="Advanced Calculus" 
                  progress={75} 
                  timeLeft="45m left" 
                  color="cyan"
                  tasks={[
                    { name: "Derivatives worksheet", done: true },
                    { name: "Chapter 4 review", done: false }
                  ]}
                />
                <SubjectCard 
                  title="Physics" 
                  subtitle="Quantum Mechanics" 
                  progress={30} 
                  timeLeft="1h 20m left" 
                  color="indigo"
                  tasks={[
                    { name: "Lab report draft", done: false },
                    { name: "Reading assignment", done: false }
                  ]}
                />
                <SubjectCard 
                  title="Arabic Literature" 
                  subtitle="Pre-Islamic Poetry" 
                  progress={100} 
                  timeLeft="Completed" 
                  color="emerald"
                  tasks={[
                    { name: "Memorize Mu'allaqah", done: true },
                    { name: "Poetry analysis", done: true }
                  ]}
                />
                <SubjectCard 
                  title="Computer Science" 
                  subtitle="Data Structures" 
                  progress={0} 
                  timeLeft="2h scheduled" 
                  color="fuchsia"
                  tasks={[
                    { name: "Implement Red-Black Tree", done: false },
                    { name: "LeetCode practice", done: false }
                  ]}
                />
              </div>

              {/* Monthly Goals */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-200 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Monthly Milestones
                  </h3>
                  <button className="p-1 hover:bg-white/10 rounded-md transition-colors"><MoreHorizontal className="w-4 h-4 text-slate-400" /></button>
                </div>

                <div className="space-y-3">
                  <TaskRow title="Finish React Native course" date="Oct 28" done />
                  <TaskRow title="Complete Physics semester project" date="Oct 30" />
                  <TaskRow title="Read 'Atomic Habits'" date="Nov 2" />
                  <TaskRow title="Memorize Surah Yaseen" date="Nov 5" />
                  <TaskRow title="Prepare for Midterm exams" date="Nov 10" />
                </div>
              </GlassCard>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function NavItem({ icon, label, active, badge }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
      active 
        ? 'bg-white/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
      {badge && (
        <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp }: any) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3 group hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        <button className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
        </div>
        <p className={`text-xs mt-1 ${trendUp ? 'text-emerald-400' : 'text-slate-500'}`}>{trend}</p>
      </div>
    </GlassCard>
  );
}

function SubjectCard({ title, subtitle, progress, timeLeft, tasks, color }: any) {
  const colorMap: any = {
    cyan: 'bg-cyan-500 shadow-cyan-500/50',
    indigo: 'bg-indigo-500 shadow-indigo-500/50',
    emerald: 'bg-emerald-500 shadow-emerald-500/50',
    fuchsia: 'bg-fuchsia-500 shadow-fuchsia-500/50',
  };

  const textMap: any = {
    cyan: 'text-cyan-400',
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    fuchsia: 'text-fuchsia-400',
  };

  return (
    <GlassCard className="p-5 flex flex-col hover:bg-white/[0.05] transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-100 tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 ${textMap[color]}`}>
          {timeLeft}
        </div>
      </div>

      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Progress</span>
          <span className="text-slate-300 font-medium">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full rounded-full ${colorMap[color]} shadow-[0_0_10px_currentColor] transition-all duration-1000`} 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="space-y-2 mb-5 flex-1">
        {tasks.map((task: any, i: number) => (
          <div key={i} className="flex items-center gap-2.5">
            {task.done ? (
              <CheckCircle2 className={`w-3.5 h-3.5 ${textMap[color]}`} />
            ) : (
              <Circle className="w-3.5 h-3.5 text-slate-600" />
            )}
            <span className={`text-sm ${task.done ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
              {task.name}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
        <Play className="w-3.5 h-3.5" /> Start Focus
      </button>
    </GlassCard>
  );
}

function TaskRow({ title, date, done }: any) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors ${done ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3">
        <button className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${done ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'border-slate-600 hover:border-slate-400'}`}>
          {done && <CheckCircle2 className="w-3.5 h-3.5" />}
        </button>
        <span className={`text-sm ${done ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md">{date}</span>
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }: any) {
  return (
    <div className={`bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[2rem] ${className}`}>
      {children}
    </div>
  );
}
