"use client";
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
  LineChart, Line,
  Cell, PieChart, Pie
} from 'recharts';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  Activity,
  Clock, CheckCircle2, ListTodo,
  Coffee, ArrowRightLeft,
  LayoutGrid, BarChart3, TrendingUp, Hash, Target
} from 'lucide-react';

type ChartStyle = 'area' | 'bar' | 'line';
type MetricMode = 'duration' | 'sessions';

interface ChartDataPoint {
  name: string;
  study: number;
  break: number;
  total: number;
}

export default function TrackingView() {
  const { userData } = useAppContext();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('area');
  const [metricMode, setMetricMode] = useState<MetricMode>('duration');
  const [goalAxis, setGoalAxis] = useState(false);

  if (!userData) return null;
  const t = translations[userData.language || 'en'];

  const dailyGoal = userData.dailyStudyHours || 4;

  // Compute the Y-axis max based on timeRange
  const yGoalMax = timeRange === 'monthly' ? dailyGoal * 7 : dailyGoal;
  const goalTicks = Array.from({ length: Math.ceil(yGoalMax) }, (_, i) => i + 1).filter(v => v <= yGoalMax);

  // Y-axis props for duration charts
  const yAxisProps = (goalAxis && metricMode === 'duration')
    ? { domain: [0, yGoalMax] as [number, number], ticks: goalTicks }
    : {};

  // Aggregate real logs
  const logs = userData.logs || [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getChartData = () => {
    const subjects = userData.subjects || [];

    if (timeRange === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      const todayLogs = logs.filter(l => l.date.split('T')[0] === today);
      return subjects.map(s => {
        const subLogs = todayLogs.filter(l => l.subjectId === s.id);
        const studyLogs = subLogs.filter(l => l.type === 'study');
        const breakLogs = subLogs.filter(l => l.type === 'break');

        const studyDuration = parseFloat((studyLogs.reduce((sum, l) => sum + l.duration, 0) / 3600).toFixed(2));
        const breakDuration = parseFloat((breakLogs.reduce((sum, l) => sum + l.duration, 0) / 3600).toFixed(2));

        return {
          name: s.name,
          study: metricMode === 'duration' ? studyDuration : studyLogs.length,
          break: metricMode === 'duration' ? breakDuration : breakLogs.length,
          total: metricMode === 'duration' ? parseFloat((studyDuration + breakDuration).toFixed(2)) : (studyLogs.length + breakLogs.length)
        };
      });
    }

    if (timeRange === 'monthly') {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const now = new Date();
      return weeks.map((w, i) => {
        const weekLogs = logs.filter(l => {
          const logDate = new Date(l.date);
          return logDate.getMonth() === now.getMonth() && Math.floor(logDate.getDate() / 7) === i;
        });
        const studyLogs = weekLogs.filter(l => l.type === 'study');
        const breakLogs = weekLogs.filter(l => l.type === 'break');

        const studyDuration = parseFloat((studyLogs.reduce((sum, l) => sum + l.duration, 0) / 3600).toFixed(2));
        const breakDuration = parseFloat((breakLogs.reduce((sum, l) => sum + l.duration, 0) / 3600).toFixed(2));

        return {
          name: w,
          study: metricMode === 'duration' ? studyDuration : studyLogs.length,
          break: metricMode === 'duration' ? breakDuration : breakLogs.length,
          total: metricMode === 'duration' ? parseFloat((studyDuration + breakDuration).toFixed(2)) : (studyLogs.length + breakLogs.length)
        };
      });
    }

    // Weekly (default)
    return days.map(dayName => {
      const dayLogs = logs.filter(log => {
        const logDay = new Date(log.date).getDay();
        return days[logDay] === dayName;
      });
      const studyLogs = dayLogs.filter(l => l.type === 'study');
      const breakLogs = dayLogs.filter(l => l.type === 'break');

      const studyDuration = studyLogs.reduce((sum, log) => sum + log.duration, 0);
      const breakDuration = breakLogs.reduce((sum, log) => sum + log.duration, 0);

      return {
        name: dayName,
        study: metricMode === 'duration' ? parseFloat((studyDuration / 3600).toFixed(2)) : studyLogs.length,
        break: metricMode === 'duration' ? parseFloat((breakDuration / 3600).toFixed(2)) : breakLogs.length,
        total: metricMode === 'duration' ? parseFloat(((studyDuration + breakDuration) / 3600).toFixed(2)) : (studyLogs.length + breakLogs.length)
      };
    });
  };

  const chartData = getChartData();

  const taskStats = (() => {
    const allTasks = [
      ...userData.subjects.flatMap(s => s.tasks || []),
      ...(userData.sideTasks || [])
    ];
    const completed = allTasks.filter(t => t && t.completed).length;
    const pending = allTasks.length - completed;
    return [
      { name: 'Completed', value: completed, color: '#10b981' },
      { name: 'Pending', value: pending, color: '#334155' }
    ];
  })();

  const prayerStats = days.map((dayName, index) => {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() - (today.getDay() - index));
    const dateStr = targetDate.toISOString().split('T')[0];
    const completedCount = (userData.prayerLogs?.[dateStr] || []).length;
    return { name: dayName, count: completedCount };
  });

  const renderChart = (data: ChartDataPoint[], dataKey: keyof ChartDataPoint, color: string, gradientId: string) => {
    if (chartStyle === 'bar') {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} {...yAxisProps} />
          <Tooltip
            contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: '#f1f5f9' }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} name={dataKey === 'study' ? t.study : t.break} />
        </BarChart>
      );
    }

    if (chartStyle === 'line') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} {...yAxisProps} />
          <Tooltip
            contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: '#f1f5f9' }}
          />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ fill: color, r: 4 }} activeDot={{ r: 6 }} name={dataKey === 'study' ? t.study : t.break} />
        </LineChart>
      );
    }

    return (
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} {...yAxisProps} />
        <Tooltip
          contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: '#f1f5f9' }}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#${gradientId})`} name={dataKey === 'study' ? t.study : t.break} />
      </AreaChart>
    );
  };

  return (
    <div id="tracking-section" className="mt-16 space-y-12 scroll-mt-24 pb-20">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Activity size={22} />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.performance_tracking}</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">Detailed breakdown of your academic and spiritual consistency</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex bg-slate-800/50 backdrop-blur-md rounded-2xl p-1 border border-white/5">
            {(['daily', 'weekly', 'monthly'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${
                  timeRange === range
                    ? 'bg-primary shadow-lg shadow-primary/40 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex bg-slate-800/50 backdrop-blur-md rounded-2xl p-1 border border-white/5">
            <button
              onClick={() => setMetricMode('duration')}
              className={`p-2 rounded-xl transition-all ${
                metricMode === 'duration' ? 'bg-blue-500 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Duration (Hours)"
            >
              <Clock size={18} />
            </button>
            <button
              onClick={() => setMetricMode('sessions')}
              className={`p-2 rounded-xl transition-all ${
                metricMode === 'sessions' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Session Count"
            >
              <Hash size={18} />
            </button>
          </div>

          {/* Chart Style Selector */}
          <div className="flex bg-slate-800/50 backdrop-blur-md rounded-2xl p-1 border border-white/5">
            <button
              onClick={() => setChartStyle('area')}
              className={`p-2 rounded-xl transition-all ${
                chartStyle === 'area' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Area Chart"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setChartStyle('bar')}
              className={`p-2 rounded-xl transition-all ${
                chartStyle === 'bar' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Bar Chart"
            >
              <BarChart3 size={18} />
            </button>
            <button
              onClick={() => setChartStyle('line')}
              className={`p-2 rounded-xl transition-all ${
                chartStyle === 'line' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Line Chart"
            >
              <TrendingUp size={18} />
            </button>
          </div>

          {/* Goal Axis Toggle — only relevant for duration mode */}
          {metricMode === 'duration' && (
            <button
              onClick={() => setGoalAxis(v => !v)}
              title={goalAxis ? 'Switch to auto scale' : `Scale Y-axis to goal (${yGoalMax}h)`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                goalAxis
                  ? 'bg-primary/20 border-primary/40 text-primary'
                  : 'bg-slate-800/50 border-white/5 text-slate-500 hover:text-slate-300'
              }`}
            >
              <Target size={14} />
              {goalAxis ? `${yGoalMax}h` : 'Auto'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 1: STUDY HOURS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-black text-white">
                {metricMode === 'duration' ? 'Study Hours' : 'Study Sessions'}
              </h3>
            </div>
            <span className="text-2xl font-black text-blue-400">
              {chartData.reduce((s, d) => s + d.study, 0).toFixed(metricMode === 'duration' ? 1 : 0)}
              {metricMode === 'duration' ? 'h' : ''}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(chartData, 'study', '#3b82f6', 'colorStudy')}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SECTION 2: BREAK SESSIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Coffee size={20} />
              </div>
              <h3 className="text-lg font-black text-white">
                {metricMode === 'duration' ? 'Break Hours' : 'Break Intervals'}
              </h3>
            </div>
            <span className="text-2xl font-black text-amber-500">
              {chartData.reduce((s, d) => s + d.break, 0).toFixed(metricMode === 'duration' ? 1 : 0)}
              {metricMode === 'duration' ? 'h' : ''}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(chartData, 'break', '#f59e0b', 'colorBreak')}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SECTION 3: COMPARISON CHART */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ArrowRightLeft size={20} />
              </div>
              <h3 className="text-lg font-black text-white">Productivity vs Recovery</h3>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.study}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.break}</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} {...yAxisProps} />
                <Tooltip
                  cursor={{fill: 'rgba(255,255,255,0.05)', radius: 8}}
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: '#f1f5f9' }}
                />
                <Bar dataKey="study" fill="#3b82f6" radius={[6, 6, 0, 0]} name={t.study} />
                <Bar dataKey="break" fill="#f59e0b" radius={[6, 6, 0, 0]} name={t.break} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SECTION 4: TASKS & PRAYERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <ListTodo size={20} />
            </div>
            <h3 className="text-lg font-black text-white">Task Achievement</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="h-40 w-40 sm:h-48 sm:w-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-4">
              {taskStats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.name}</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                    <span className="text-sm font-bold text-slate-600 mb-1">Tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-lg font-black text-white">Prayer Consistency</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prayerStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} domain={[0, 5]} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0f172a', color: '#f1f5f9', fontSize: '10px' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)', radius: 4}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {prayerStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count === 5 ? '#10b981' : '#3b82f6'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span>Weekly Average: {(prayerStats.reduce((s,d) => s+d.count, 0)/7).toFixed(1)}/5</span>
            <span className="text-emerald-500">Goal: 5.0</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
