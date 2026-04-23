import React, { useState } from 'react';
import { 
  Terminal, BarChart2, Calendar as CalendarIcon, Bot, Settings, 
  Search, Flame, Clock, CheckSquare, BookOpen, Heart, Play,
  Pause, SkipForward, Maximize2, MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// --- DATA ---
const chartData = [
  { day: 'Mon', minutes: 90 },
  { day: 'Tue', minutes: 120 },
  { day: 'Wed', minutes: 75 },
  { day: 'Thu', minutes: 180 },
  { day: 'Fri', minutes: 60 },
  { day: 'Sat', minutes: 200 },
  { day: 'Sun', minutes: 145 },
];

const subjects = [
  { name: 'Mathematics', progress: 65, timeRemaining: '45m', color: '#0ff', tasks: ['Derivatives Worksheet', 'Watch Ch 4 Lecture'] },
  { name: 'Physics', progress: 30, timeRemaining: '1h 20m', color: '#f0f', tasks: ['Lab Report', 'Kinematics Problems'] },
  { name: 'Arabic Literature', progress: 85, timeRemaining: '15m', color: '#39ff14', tasks: ['Read Poem 3', 'Write Summary'] },
  { name: 'Computer Science', progress: 10, timeRemaining: '2h', color: '#ffb000', tasks: ['Fix Memory Leak', 'Study Binary Trees'] },
];

const tasks = [
  { id: 1, text: 'Submit Physics Lab Report', date: 'Oct 12', done: false },
  { id: 2, text: 'Math Midterm Prep', date: 'Oct 15', done: false },
  { id: 3, text: 'Read "The Prophet" Chapters 1-3', date: 'Oct 18', done: true },
  { id: 4, text: 'CS Data Structures Project', date: 'Oct 20', done: false },
  { id: 5, text: 'Memorize Al-Kahf', date: 'Oct 25', done: false },
];

export function NeonixCyberpunk() {
  const [timerRunning, setTimerRunning] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#f0f] selection:text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
           }}
      />
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50"></div>

      <div className="flex h-screen relative z-10">
        
        {/* SIDEBAR */}
        <aside className="w-16 border-r border-[#0ff]/30 flex flex-col items-center py-6 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="w-10 h-10 border-2 border-[#f0f] text-[#f0f] flex items-center justify-center font-bold text-xl mb-12 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
            A
          </div>
          <nav className="flex-1 flex flex-col gap-8">
            <SidebarIcon icon={<Terminal size={20} />} active color="#0ff" />
            <SidebarIcon icon={<BookOpen size={20} />} color="#666" />
            <SidebarIcon icon={<BarChart2 size={20} />} color="#666" />
            <SidebarIcon icon={<CalendarIcon size={20} />} color="#666" />
            <SidebarIcon icon={<Bot size={20} />} color="#666" />
          </nav>
          <SidebarIcon icon={<Settings size={20} />} color="#666" />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* HEADER */}
          <header className="flex justify-between items-end mb-10 border-b border-[#333] pb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Layla&backgroundColor=050505" alt="Layla" className="w-16 h-16 border-2 border-[#0ff] p-1 bg-black" />
                <div className="absolute -bottom-2 -right-2 bg-black border border-[#0ff] text-[#0ff] text-xs px-2 py-0.5 font-mono shadow-[0_0_8px_rgba(0,255,255,0.5)]">LVL 42</div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>Layla</h1>
                <p className="text-[#0ff] font-mono text-sm mt-1 flex items-center gap-2 uppercase tracking-wider">
                  <span className="inline-block w-2 h-2 bg-[#39ff14] animate-pulse"></span>
                  System Online // Wednesday
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 border border-[#f0f]/50 bg-[#1a0515] px-4 py-2 font-mono text-[#f0f]">
                <Flame size={16} />
                <span>12-DAY STREAK</span>
              </div>
              <div className="relative group">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0ff]" />
                <input 
                  type="text" 
                  placeholder="SEARCH PROTOCOL..." 
                  className="bg-[#111] border border-[#333] text-white font-mono text-sm py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-[#0ff] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 border border-gray-600 bg-[#222] px-1.5 text-xs text-gray-400 font-mono">⌘K</div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            
            {/* LEFT COLUMN - STATS & TIMER */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              
              {/* HUD STATS */}
              <div className="grid grid-cols-4 gap-4">
                <StatCard label="STUDY TIME" value="3.2h" icon={<Clock size={16} />} color="#0ff" />
                <StatCard label="TASKS DONE" value="12/18" icon={<CheckSquare size={16} />} color="#39ff14" />
                <StatCard label="TODAY'S LOAD" value="5 SYS" icon={<Terminal size={16} />} color="#ffb000" />
                <StatCard label="PRAYERS" value="4/5" icon={<Heart size={16} />} color="#f0f" />
              </div>

              {/* FOCUS TIMER */}
              <div className="border border-[#0ff]/40 bg-[#0a0a0a] p-6 relative group hover:border-[#0ff] hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#0ff]"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#0ff]"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#0ff]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#0ff]"></div>
                
                <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
                  <h2 className="font-mono text-[#0ff] flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Maximize2 size={14} /> ACTIVE_FOCUS_MODE
                  </h2>
                  <div className="text-xs font-mono text-gray-500">SESSION: DEEP_WORK</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-7xl font-black text-white font-mono tracking-tighter" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                    25:00
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="w-16 h-16 border border-[#39ff14] bg-[#0a1a0a] text-[#39ff14] flex items-center justify-center hover:bg-[#39ff14] hover:text-black transition-colors"
                      style={{ boxShadow: timerRunning ? '0 0 15px rgba(57, 255, 20, 0.4)' : 'none' }}
                    >
                      {timerRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                    <button className="w-16 h-16 border border-[#f0f] bg-[#1a0a1a] text-[#f0f] flex items-center justify-center hover:bg-[#f0f] hover:text-black transition-colors">
                      <SkipForward size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBJECTS GRID */}
              <div>
                <h2 className="font-mono text-gray-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Terminal size={14} /> ACTIVE_MODULES
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((sub, i) => (
                    <div key={i} className="border border-[#222] bg-[#0d0d0d] p-5 hover:border-[#444] transition-colors relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: sub.color }}></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-white uppercase tracking-wide text-lg">{sub.name}</h3>
                        <span className="font-mono text-xs text-gray-500 bg-[#111] px-2 py-1 border border-[#333]">{sub.timeRemaining}</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-mono mb-2" style={{ color: sub.color }}>
                          <span>PROGRESS</span>
                          <span>{sub.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#222] overflow-hidden">
                          <div className="h-full" style={{ width: \`\${sub.progress}%\`, backgroundColor: sub.color, boxShadow: \`0 0 10px \${sub.color}\` }}></div>
                        </div>
                      </div>
                      
                      <div className="mb-6 space-y-2">
                        {sub.tasks.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-gray-600 font-mono mt-0.5">›</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-2 border border-white/20 text-white font-mono text-sm uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                        <Play size={14} /> INITIATE LINK
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - CHARTS & TASKS */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              
              {/* CHART */}
              <div className="border border-[#222] bg-[#0a0a0a] p-5">
                <h2 className="font-mono text-gray-400 mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <BarChart2 size={14} /> SYSTEM_PERFORMANCE
                </h2>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Tooltip 
                        cursor={{ fill: '#111' }}
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #0ff', borderRadius: 0, fontFamily: 'monospace' }}
                        itemStyle={{ color: '#0ff' }}
                      />
                      <Bar dataKey="minutes" fill="#0ff" radius={[0, 0, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={\`cell-\${index}\`} fill={entry.day === 'Wed' ? '#f0f' : '#0ff'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-500 mt-2">
                  {chartData.map(d => <span key={d.day} className={d.day === 'Wed' ? 'text-[#f0f]' : ''}>{d.day}</span>)}
                </div>
              </div>

              {/* MONTHLY DIRECTIVES */}
              <div className="border border-[#222] bg-[#0a0a0a] p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-mono text-gray-400 flex items-center gap-2 text-sm uppercase tracking-widest">
                    <CheckSquare size={14} /> MONTHLY_DIRECTIVES
                  </h2>
                  <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                </div>
                
                <div className="space-y-4 flex-1">
                  {tasks.map(task => (
                    <div key={task.id} className={\`flex gap-3 p-3 border \${task.done ? 'border-[#333] bg-[#111]' : 'border-[#333] bg-[#0d0d0d] hover:border-[#555]'} transition-colors\`}>
                      <button className={\`mt-0.5 w-4 h-4 border \${task.done ? 'bg-[#39ff14] border-[#39ff14] text-black' : 'border-gray-500'} flex items-center justify-center\`}>
                        {task.done && <CheckSquare size={12} className="opacity-0" />} 
                      </button>
                      <div className="flex-1">
                        <p className={\`text-sm \${task.done ? 'text-gray-500 line-through' : 'text-gray-200'}\`}>
                          {task.text}
                        </p>
                        <p className="text-xs font-mono text-gray-600 mt-1">{task.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 w-full py-2 border border-dashed border-[#444] text-gray-400 font-mono text-sm hover:border-[#0ff] hover:text-[#0ff] transition-colors">
                  + ADD_NEW_DIRECTIVE
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505;
          border-left: 1px solid #222;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f0f;
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="border border-[#222] bg-[#0a0a0a] p-4 flex flex-col justify-between h-24 hover:border-[#444] transition-colors relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-8 h-8 opacity-10 flex items-center justify-center transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform" style={{ color }}>
        {icon}
      </div>
      <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-black font-mono mt-2" style={{ color, textShadow: \`0 0 10px \${color}40\` }}>{value}</div>
    </div>
  );
}

function SidebarIcon({ icon, active, color }: { icon: React.ReactNode, active?: boolean, color?: string }) {
  return (
    <div className={\`p-3 flex items-center justify-center cursor-pointer transition-colors relative \${active ? 'bg-[#0ff]/10 text-[#0ff]' : 'text-gray-500 hover:text-white'}\`}>
      {active && <div className="absolute left-[-24px] top-0 bottom-0 w-1 bg-[#0ff] shadow-[0_0_10px_#0ff]"></div>}
      <div style={{ color: active ? '#0ff' : color }}>
        {icon}
      </div>
    </div>
  );
}
