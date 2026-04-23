import React, { useState } from "react";
import {
  Search,
  BookOpen,
  CheckCircle2,
  Calendar as CalendarIcon,
  Moon,
  Home,
  PieChart,
  Settings,
  Bell,
  Play,
  Pause,
  SkipForward,
  MoreHorizontal,
  Flame,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";

export function ZenMinimal() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#FAFAF9] text-[#292524] font-sans overflow-hidden selection:bg-[#E7E5E4] selection:text-[#1C1917]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#E7E5E4] flex flex-col justify-between py-8 px-6 bg-[#FAFAF9] shrink-0">
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-6 rounded-sm bg-[#D97757] flex items-center justify-center text-[#FAFAF9]">
              <span className="font-serif font-medium text-sm">A</span>
            </div>
            <span className="font-serif text-lg tracking-wide text-[#1C1917]">Atomic</span>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<Home size={18} strokeWidth={1.5} />} label="Dashboard" active />
            <NavItem icon={<BookOpen size={18} strokeWidth={1.5} />} label="Subjects" />
            <NavItem icon={<PieChart size={18} strokeWidth={1.5} />} label="Analytics" />
            <NavItem icon={<CalendarIcon size={18} strokeWidth={1.5} />} label="Calendar" />
            <NavItem icon={<BrainCircuit size={18} strokeWidth={1.5} />} label="AI Assistant" />
          </nav>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<Settings size={18} strokeWidth={1.5} />} label="Settings" />
          <NavItem icon={<MessageSquare size={18} strokeWidth={1.5} />} label="Feedback" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-10 py-10 space-y-12">
          {/* Top Bar */}
          <header className="flex justify-between items-end pb-6 border-b border-[#E7E5E4]">
            <div className="space-y-2">
              <p className="text-[#78716C] text-sm uppercase tracking-widest font-medium">Wednesday, Oct 24</p>
              <h1 className="font-serif text-4xl text-[#1C1917]">Good morning, Layla.</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#D97757] bg-[#FFF8F6] px-3 py-1.5 rounded border border-[#F5E6E1]">
                <Flame size={16} strokeWidth={2} />
                <span className="text-sm font-medium">12-day streak</span>
              </div>
              
              <div className="relative group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" strokeWidth={1.5} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-12 py-2 bg-transparent border border-[#E7E5E4] rounded-md text-sm w-64 focus:outline-none focus:border-[#D97757] transition-colors placeholder:text-[#A8A29E]"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#A8A29E] font-medium border border-[#E7E5E4] px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E7E5E4]">
                <img src="https://i.pravatar.cc/150?u=layla" alt="Layla" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-4 gap-6">
            <StatCard title="Study Time" value="3.2h" subtitle="Today" />
            <StatCard title="Tasks Done" value="12/18" subtitle="On track" />
            <StatCard title="Today's Load" value="5" subtitle="Subjects" />
            <StatCard title="Prayers" value="4/5" subtitle="Al-Asr next" />
          </section>

          <div className="grid grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="col-span-8 space-y-12">
              
              {/* Subjects Grid */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl text-[#1C1917]">Today's Subjects</h2>
                  <button className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">View all</button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <SubjectCard 
                    title="Mathematics" 
                    progress={65} 
                    timeRemaining="45m remaining"
                    tasks={[
                      { name: "Calculus worksheet", done: true },
                      { name: "Review Chapter 4", done: false }
                    ]}
                  />
                  <SubjectCard 
                    title="Physics" 
                    progress={30} 
                    timeRemaining="1h 20m remaining"
                    tasks={[
                      { name: "Lab report draft", done: false },
                      { name: "Practice problems 1-10", done: false }
                    ]}
                  />
                  <SubjectCard 
                    title="Arabic Literature" 
                    progress={100} 
                    timeRemaining="Completed"
                    tasks={[
                      { name: "Read pages 45-60", done: true },
                      { name: "Poetry analysis", done: true }
                    ]}
                  />
                  <SubjectCard 
                    title="Computer Science" 
                    progress={15} 
                    timeRemaining="2h remaining"
                    tasks={[
                      { name: "Data structures prep", done: false },
                      { name: "Write sorting algorithm", done: false }
                    ]}
                  />
                </div>
              </section>

              {/* Focus Timer */}
              <section className="border border-[#E7E5E4] rounded-xl p-10 bg-white relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div className="absolute top-0 w-full h-1 bg-[#F5F5F4]">
                  <div className="h-full bg-[#9EABA2] w-1/3"></div>
                </div>
                
                <span className="text-[#78716C] text-sm uppercase tracking-widest mb-6">Deep Work Session</span>
                
                <div className="font-serif text-8xl text-[#1C1917] tracking-tight mb-8">
                  25<span className="text-[#A8A29E]">:</span>00
                </div>

                <div className="flex items-center gap-6">
                  <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] transition-colors">
                    <SkipForward size={20} strokeWidth={1.5} className="rotate-180" />
                  </button>
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1C1917] text-white hover:bg-[#292524] transition-colors shadow-sm"
                  >
                    {isTimerRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] transition-colors">
                    <SkipForward size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </section>

            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-10">
              
              {/* Chart */}
              <section className="border border-[#E7E5E4] rounded-xl p-6 bg-white space-y-6">
                <h3 className="font-serif text-lg text-[#1C1917]">Weekly Study</h3>
                <div className="flex items-end justify-between gap-2">
                  {[90, 120, 75, 180, 60, 200, 145].map((val, i) => {
                    const height = `${(val / 200) * 140}px`;
                    const isToday = i === 6;
                    return (
                      <div key={i} className="flex flex-col items-center gap-3 flex-1">
                        <div className="w-full h-36 bg-[#F5F5F4] rounded-sm flex items-end overflow-hidden">
                          <div 
                            className={`w-full rounded-sm transition-all duration-500 ${isToday ? 'bg-[#D97757]' : 'bg-[#9EABA2]'}`} 
                            style={{ height }}
                          ></div>
                        </div>
                        <span className={`text-xs ${isToday ? 'text-[#1C1917] font-medium' : 'text-[#A8A29E]'}`}>
                          {['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We'][i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Tasks Checklist */}
              <section className="border border-[#E7E5E4] rounded-xl p-6 bg-white space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg text-[#1C1917]">Monthly Goals</h3>
                  <button className="text-[#A8A29E] hover:text-[#1C1917]"><MoreHorizontal size={18} /></button>
                </div>
                
                <div className="space-y-4">
                  <TaskItem title="Finish Physics Lab Report" date="Oct 26" done={false} />
                  <TaskItem title="Read 'The Prophet' for Lit" date="Oct 28" done={true} />
                  <TaskItem title="Complete Math Past Papers" date="Oct 30" done={false} />
                  <TaskItem title="CS Project Milestone 1" date="Nov 2" done={false} />
                  <TaskItem title="Memorize Surah Al-Mulk" date="Nov 5" done={false} />
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? 'bg-[#F5F5F4] text-[#1C1917] font-medium' : 'text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#1C1917]'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="border border-[#E7E5E4] rounded-xl p-5 bg-white flex flex-col justify-between">
      <span className="text-[#78716C] text-sm">{title}</span>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-serif text-3xl text-[#1C1917]">{value}</span>
        <span className="text-xs text-[#A8A29E]">{subtitle}</span>
      </div>
    </div>
  );
}

function SubjectCard({ title, progress, timeRemaining, tasks }: { title: string; progress: number; timeRemaining: string; tasks: { name: string; done: boolean }[] }) {
  return (
    <div className="border border-[#E7E5E4] rounded-xl p-6 bg-white group hover:border-[#D6D3D1] transition-colors">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-serif text-xl text-[#1C1917] leading-tight">{title}</h3>
        <span className="text-xs text-[#78716C] bg-[#F5F5F4] px-2 py-1 rounded">{timeRemaining}</span>
      </div>
      
      <div className="space-y-3 mb-6">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            {task.done ? (
              <CheckCircle2 size={16} className="text-[#9EABA2] shrink-0 mt-0.5" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-[#D6D3D1] shrink-0 mt-0.5" />
            )}
            <span className={task.done ? "text-[#A8A29E] line-through" : "text-[#44403C]"}>{task.name}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="w-1/2 flex items-center gap-3">
          <div className="flex-1 h-1 bg-[#F5F5F4] rounded-full overflow-hidden">
            <div className="h-full bg-[#1C1917] rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs text-[#78716C]">{progress}%</span>
        </div>
        
        <button className="text-sm font-medium text-[#D97757] hover:text-[#C86444] transition-colors">
          Start Focus
        </button>
      </div>
    </div>
  );
}

function TaskItem({ title, date, done }: { title: string; date: string; done: boolean }) {
  return (
    <div className="flex items-start gap-3 group cursor-pointer">
      <div className={`mt-0.5 flex items-center justify-center w-4 h-4 rounded border ${done ? 'bg-[#9EABA2] border-[#9EABA2]' : 'border-[#D6D3D1] group-hover:border-[#A8A29E]'} transition-colors`}>
        {done && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <div className="flex-1 flex justify-between items-baseline border-b border-transparent group-hover:border-[#E7E5E4] pb-2 transition-colors">
        <span className={`text-sm ${done ? 'text-[#A8A29E] line-through' : 'text-[#44403C]'}`}>{title}</span>
        <span className="text-xs text-[#A8A29E]">{date}</span>
      </div>
    </div>
  );
}
