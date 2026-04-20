"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { userData } = useAppContext();
  if (!userData) return null;
  const t = translations[userData.language || 'en'];

  const logs = userData.logs || [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = days.map(dayName => {
    const dayLogs = logs.filter(log => {
      const logDay = new Date(log.date).getDay();
      return days[logDay] === dayName && log.type === 'study';
    });
    const totalSeconds = dayLogs.reduce((sum, log) => sum + log.duration, 0);
    return { name: dayName, hours: parseFloat((totalSeconds / 3600).toFixed(2)) };
  });

  const totalHours = chartData.reduce((s, d) => s + d.hours, 0).toFixed(1);
  const goalDays = chartData.filter(d => d.hours >= (userData.dailyStudyHours || 2)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/5 mt-8"
      style={{ background: 'linear-gradient(135deg, rgba(10,14,32,0.9) 0%, rgba(15,18,42,0.9) 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-black text-white">{t.weekly_progress}</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Total hours stat */}
            <div className="px-4 py-2 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Total</p>
              <p className="text-lg font-black text-white">{totalHours}<span className="text-xs text-slate-500 ml-0.5">h</span></p>
            </div>
            {/* Goal days stat */}
            <div className="px-4 py-2 rounded-2xl border border-primary/15" style={{ background: 'rgba(99,102,241,0.06)' }}>
              <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-0.5">Goal Days</p>
              <div className="flex items-center gap-1">
                <Award size={14} className="text-primary" />
                <p className="text-lg font-black text-primary">{goalDays}<span className="text-xs text-primary/50 ml-0.5">/7</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-52 w-full" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }}
                width={28}
                domain={[0, (userData.dailyStudyHours || 4) * 1.15]}
              />
              <ReferenceLine
                y={userData.dailyStudyHours || 4}
                stroke="rgba(99,102,241,0.45)"
                strokeDasharray="4 3"
                strokeWidth={1.5}
              />
              <Tooltip
                cursor={{ fill: 'rgba(99,102,241,0.06)', radius: 8 }}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(99,102,241,0.2)',
                  backgroundColor: 'rgba(10,14,32,0.95)',
                  color: '#f1f5f9',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              />
              <Bar dataKey="hours" radius={[8, 8, 0, 0]} maxBarSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.hours >= (userData.dailyStudyHours || 2) ? '#6366f1' : '#1e293b'}
                    style={{
                      filter: entry.hours >= (userData.dailyStudyHours || 2)
                        ? 'drop-shadow(0 0 8px rgba(99,102,241,0.5))'
                        : 'none',
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Goal indicator */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary" style={{ filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.6))' }} />
            <span className="text-slate-500">Goal reached</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slate-700" />
            <span className="text-slate-600">Below goal</span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">{t.goal}: <span className="text-primary">{userData.dailyStudyHours}h</span></span>
        </div>
      </div>
    </motion.div>
  );
}
