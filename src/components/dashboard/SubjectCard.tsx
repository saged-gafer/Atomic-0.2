"use client";
import React, { useState } from 'react';
import { Subject, useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Atom, Pi, PenTool, FlaskConical, ExternalLink, Sparkles, X, Plus, Loader2 } from 'lucide-react';
import TaskList from './TaskList';
import Stopwatch from './Stopwatch';
import { translations, Language } from '@/lib/i18n';
import { analyzeVideoLink, VideoAnalysisResult, createTasksFromVideo } from '@/services/aiVideoAnalyzer';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';

const iconMap: Record<string, React.ElementType> = { Book, Atom, Pi, Quill: PenTool, FlaskConical };

function CompletionArc({ pct, color }: { pct: number; color: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
      <circle cx="24" cy="24" r={r} strokeWidth="3" stroke="rgba(255,255,255,0.05)" fill="none" />
      <motion.circle
        cx="24" cy="24" r={r}
        strokeWidth="3"
        stroke={color}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
      />
      <text
        x="24" y="24"
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90"
        style={{ transform: 'rotate(90deg)', transformOrigin: '24px 24px', fill: color, fontSize: '10px', fontWeight: '900', fontFamily: 'Inter' }}
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

const SubjectCard = React.memo(({
  subject, index, language
}: {
  subject: Subject;
  index: number;
  language: Language;
}) => {
  const { setUserData, userData } = useAppContext();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState<VideoAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const Icon = iconMap[subject.icon] || Book;
  const t = translations[language || 'en'];
  const isRTL = language === 'ar';

  const tasks = subject.tasks || [];
  const completed = tasks.filter(t => t.completed).length;
  const pct = tasks.length > 0 ? completed / tasks.length : 0;

  const handleAnalyze = async () => {
    if (!subject.link) return;
    setIsAnalyzing(true);
    const result = await analyzeVideoLink(subject.link, subject.name);
    setAnalysis(result);
    setIsAnalyzing(false);
    setShowAnalysis(true);
  };

  const handleAddTasks = () => {
    if (!analysis || !userData) return;
    const newTasks = createTasksFromVideo(analysis, subject.id);
    const updatedSubjects = userData.subjects.map(s =>
      s.id === subject.id ? { ...s, tasks: [...s.tasks, ...newTasks] } : s
    );
    setUserData({ ...userData, subjects: updatedSubjects });
    setShowAnalysis(false);
  };

  return (
    <GlassCard
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group shadow-2xl card-hover"
      style={{
        borderLeft: isRTL ? undefined : `3px solid ${subject.color}`,
        borderRight: isRTL ? `3px solid ${subject.color}` : undefined,
      }}
    >
      {/* Color top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-0 rounded-t-[2rem] opacity-30"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${subject.color}40, transparent 70%)` }}
      />

      <div className="relative z-10 space-y-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            {/* Icon box */}
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0"
              style={{ backgroundColor: `${subject.color}18` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <Icon size={26} style={{ color: subject.color }} />
            </motion.div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight truncate">{subject.name}</h2>
                {subject.link && (
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={subject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="p-1 rounded-lg text-amber-500/50 hover:text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-40"
                    >
                      {isAnalyzing ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">Daily Curriculum</p>

              {/* Task count badge */}
              {tasks.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{ background: `${subject.color}15`, color: subject.color, border: `1px solid ${subject.color}30` }}>
                    <span>{completed}</span>
                    <span className="opacity-40">/</span>
                    <span className="opacity-70">{tasks.length}</span>
                    <span className="opacity-50 ml-0.5">tasks</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Completion arc */}
          {tasks.length > 0 && (
            <div className="shrink-0">
              <CompletionArc pct={pct} color={subject.color} />
            </div>
          )}
        </div>

        {/* Stopwatch */}
        <div className="px-1">
          <Stopwatch
            subjectId={subject.id}
            subjectName={subject.name}
            subjectColor={subject.color}
            language={language}
          />
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, ${subject.color}20, transparent)` }} />

        {/* Tasks */}
        <TaskList subjectId={subject.id} tasks={subject.tasks} language={language} />
      </div>

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {showAnalysis && analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
            onClick={() => setShowAnalysis(false)}
          >
            <GlassCard
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-lg w-full border-white/10"
              dir={isRTL ? 'rtl' : 'ltr'}
              onClick={e => e.stopPropagation()}
              tilt={false}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500"><Sparkles size={20} /></div>
                  <h3 className="text-xl font-black text-white">{t.ai_analysis}</h3>
                </div>
                <button onClick={() => setShowAnalysis(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{t.video_title}</p>
                  <p className="font-bold text-white">{analysis.videoTitle}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.relevanceScore}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-black text-emerald-400">{analysis.relevanceScore}%</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {analysis.extractedTasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <span className="text-sm text-slate-300">{task.title}</span>
                      {task.duration && (
                        <span className="text-[10px] font-black text-slate-600 bg-white/5 px-2 py-0.5 rounded-md">{task.duration}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowAnalysis(false)} className="flex-1 rounded-xl">{t.back}</Button>
                  <Button
                    onClick={handleAddTasks}
                    className="flex-1 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
                  >
                    <Plus size={16} className="mr-2" />
                    {t.add_extracted_tasks}
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
});

SubjectCard.displayName = 'SubjectCard';

export default SubjectCard;
