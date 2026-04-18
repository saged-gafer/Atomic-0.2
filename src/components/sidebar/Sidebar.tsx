"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, SubjectFile } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { 
  Book, Atom, Pi, PenTool, FlaskConical, 
  Upload, FileText,
  Trash2, Sparkles, Loader2, X,
  ListTodo, BarChart2, Plus,
  CheckCircle2, Circle, Heart,
  ChevronLeft, ChevronRight, CalendarDays
} from 'lucide-react';
import MonthlyCalendar from '@/components/monthly/MonthlyCalendar';
import { parseFile, generateExam, generateSummary, generateNotes, generateAllContent, generateMindMap } from '@/services/aiFileParser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const iconMap: Record<string, React.ElementType> = { Book, Atom, Pi, Quill: PenTool, FlaskConical };

const AZKAR_DATA = [
  {
    category: "Morning & Evening",
    items: [
      { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", sub: "اذكار الصباح" },
      { text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور", sub: "اذكار الصباح" },
      { text: "رضيت بالله رباً وبالإسلام ديناً وبمحمد صلى الله عليه وسلم نبياً", sub: "يقال 3 مرات" }
    ]
  },
  {
    category: "Study & Success",
    items: [
      { text: "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً", sub: "دعاء نافع" },
      { text: "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً", sub: "لتيسير الأمور" },
      { text: "رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقهوا قولي", sub: "سورة طه" },
      { text: "اللهم انفعني بما علمتني، وعلمني ما ينفعني، وزدني علماً", sub: "طلب الزيادة" }
    ]
  },
  {
    category: "Forgiveness & Praise",
    items: [
      { text: "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه", sub: "الاستغفار" },
      { text: "سبحان الله وبحمده، عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته", sub: "التسبيح" },
      { text: "لا حول ولا قوة إلا بالله العلي العظيم", sub: "كنز من كنوز الجنة" }
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isCollapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const {
    userData,
    addFile,
    removeFile,
    addGeneratedContent,
    addSideTask,
    toggleSideTask,
    deleteSideTask,
    togglePrayer
  } = useAppContext();
  const { theme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'subjects' | 'tasks' | 'calendar' | 'azkar' | 'salat'>('subjects');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<string>('');
  const [newSideTask, setNewSideTask] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!userData) return null;

  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  const MAX_FILE_SIZE_MB = 5;
  const ALLOWED_TYPES = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, subjectId: string) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        continue;
      }
      if (ALLOWED_TYPES.length > 0 && file.type && !ALLOWED_TYPES.includes(file.type)) {
        alert(`File type "${file.type}" is not supported.`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target?.result as string;
        const safeFileName = file.name.replace(/[<>"'&]/g, '_').slice(0, 200);
        const subjectFile: SubjectFile = {
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: safeFileName,
          type: file.type || 'unknown',
          size: file.size,
          data: base64,
          uploadedAt: new Date().toISOString(),
        };
        addFile(subjectId, subjectFile);
      };
      reader.onerror = () => console.error(`Failed to read file: ${file.name}`);
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async (subjectId: string, type: 'exam' | 'summary' | 'notes' | 'mindmap' | 'all') => {
    const subject = userData.subjects.find(s => s.id === subjectId);
    if (!subject) return;
    setIsGenerating(true);
    setGeneratingType(type);
    try {
      const files = subject.files || [];
      let parsedContent;
      if (files.length > 0) {
        parsedContent = await parseFile(files[files.length - 1], subject.name);
      } else {
        parsedContent = {
          text: `General content for ${subject.name}`,
          topics: ['Core concepts', 'Key principles', 'Practice problems'],
          difficulty: 'intermediate' as const,
        };
      }
      if (type === 'all') {
        const contents = await generateAllContent(subject.name, parsedContent);
        contents.forEach(c => addGeneratedContent(subjectId, c));
      } else {
        let content;
        if (type === 'exam') content = await generateExam(subject.name, parsedContent);
        else if (type === 'summary') content = await generateSummary(subject.name, parsedContent);
        else if (type === 'notes') content = await generateNotes(subject.name);
        else content = await generateMindMap(subject.name, parsedContent);
        addGeneratedContent(subjectId, content);
      }
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
      setGeneratingType('');
    }
  };

  const format12h = (time: string) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    let hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${m} ${ampm}`;
  };

  const salatNames = {
    Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء'
  };

  const selectedSubjectData = userData.subjects.find(s => s.id === selectedSubject);

  const CollapseIcon = isRTL
    ? (isCollapsed ? ChevronLeft : ChevronRight)
    : (isCollapsed ? ChevronRight : ChevronLeft);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between min-h-[64px] shrink-0" style={{ borderColor:`${theme.primary}20` }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-black text-white text-sm"
            style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 15px ${theme.primary}40` }}>
            A
          </div>
          <AnimatePresence>
            {(!isCollapsed || isMobile) && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-black tracking-tighter text-white whitespace-nowrap overflow-hidden"
              >
                ATOMIC
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* On mobile: close button. On desktop: collapse toggle */}
        {isMobile ? (
          <button
            onClick={onMobileClose}
            className="shrink-0 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        ) : (
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shrink-0 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <CollapseIcon size={14} />
          </motion.button>
        )}
      </div>

      {/* Navigation Tabs */}
      <nav className="flex border-b shrink-0" style={{ borderColor:`${theme.primary}15`, background:`${theme.primary}04` }} role="tablist">
        {(['subjects', 'tasks', 'calendar', 'azkar', 'salat'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 px-1 flex justify-center transition-all relative"
              style={{ color: isActive ? theme.primary : 'rgba(180,180,200,0.4)' }}
            >
              {tab === 'subjects'  && <Book size={17} />}
              {tab === 'tasks'     && <ListTodo size={17} />}
              {tab === 'calendar'  && <CalendarDays size={17} />}
              {tab === 'azkar'     && <Heart size={17} />}
              {tab === 'salat'     && <CheckCircle2 size={17} />}
              {isActive && (
                <motion.div
                  layoutId="animeActiveTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
                  style={{ background:`linear-gradient(90deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 8px ${theme.primary}60` }}
                  transition={{ type:"spring", stiffness:300, damping:30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar px-3">
        {activeTab === 'subjects' && (
          <div className="space-y-1.5">
            {userData.subjects.map((subject) => {
              const Icon = iconMap[subject.icon] || Book;
              const isSelected = selectedSubject === subject.id;
              const fileCount = (subject.files || []).length;
              return (
                <motion.button
                  key={subject.id}
                  onClick={() => setSelectedSubject(isSelected ? null : subject.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all border"
                  style={{
                    background: isSelected ? `${theme.primary}12` : 'transparent',
                    borderColor: isSelected ? `${theme.primary}30` : 'transparent',
                    color: isSelected ? theme.primary : 'rgba(180,180,200,0.7)',
                    boxShadow: isSelected ? `0 2px 0 0 ${theme.primary}20` : 'none',
                  }}
                  whileHover={{ x: isRTL ? -4 : 4, backgroundColor: `${theme.primary}08` }}
                >
                  <div className="p-2 rounded-xl shrink-0" style={{ background: isSelected ? `${theme.primary}18` : `${subject.color}15` }}>
                    <Icon size={16} style={{ color: isSelected ? theme.primary : subject.color }} />
                  </div>
                  <AnimatePresence>
                    {(!isCollapsed || isMobile) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 text-left min-w-0"
                      >
                        <p className="text-sm font-bold truncate">{subject.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {fileCount > 0 && (
                            <span className="text-[10px] opacity-60 flex items-center gap-1">
                              <FileText size={10} /> {fileCount}
                            </span>
                          )}
                          {(subject.generatedContent || []).length > 0 && (
                            <span className="text-[10px] text-amber-500 flex items-center gap-1 font-black uppercase">
                              <Sparkles size={10} /> {(subject.generatedContent || []).length}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.side_tasks}</h3>
            <div className="flex gap-2">
              <Input
                value={newSideTask}
                onChange={(e) => setNewSideTask(e.target.value)}
                placeholder={t.new_task}
                className="h-10 bg-white/5 border-white/10 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && (addSideTask(newSideTask), setNewSideTask(''))}
              />
              <Button className="h-10 w-10 p-0 shrink-0" onClick={() => { if (newSideTask) { addSideTask(newSideTask); setNewSideTask(''); } }}>
                <Plus size={18} />
              </Button>
            </div>
            <div className="space-y-2">
              {(userData.sideTasks || []).map(task => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-primary/20 transition-all"
                >
                  <button
                    onClick={() => toggleSideTask(task.id)}
                    className={`shrink-0 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      task.completed ? 'bg-primary border-primary text-white' : 'border-slate-700 hover:border-primary'
                    }`}
                  >
                    {task.completed && <CheckCircle2 size={12} />}
                  </button>
                  <span className={`text-xs flex-1 font-medium transition-all ${task.completed ? 'line-through text-slate-600' : 'text-slate-300'}`}>{task.title}</span>
                  <button onClick={() => deleteSideTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-xl transition-all">
                    <Trash2 size={14} className="text-red-400/70" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'azkar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Azkar & Supplications</h3>
              <Heart size={12} className="text-primary animate-pulse" fill="currentColor" />
            </div>
            <div className="space-y-5">
              {AZKAR_DATA.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-[11px] font-black text-primary/60 uppercase tracking-widest px-1">{section.category}</h4>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl text-right"
                        dir="rtl"
                      >
                        <p className="text-sm font-bold text-slate-200 leading-relaxed mb-1">{item.text}</p>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.sub}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'salat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.prayer_times}</h3>
              <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">Active</div>
            </div>
            <div className="space-y-3">
              {Object.entries(userData.prayerTimes || {}).map(([name, time]) => {
                const arabicName = salatNames[name as keyof typeof salatNames] || name;
                const isCompleted = (userData.prayerLogs?.[new Date().toISOString().split('T')[0]] || []).includes(name);
                return (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-2xl border transition-all ${isCompleted ? 'bg-primary/10 border-primary/30' : 'bg-white/[0.03] border-white/5'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-lg font-black ${isCompleted ? 'text-primary' : 'text-slate-200'}`}>{arabicName}</span>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{format12h(time)}</p>
                      </div>
                      <button
                        onClick={() => togglePrayer(name)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-slate-600'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <MonthlyCalendar />
        )}
      </div>

      {/* Expanded Subject Panel */}
      <AnimatePresence>
        {selectedSubjectData && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-[#0a0f1e] border-t border-white/10 z-50 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${selectedSubjectData.color}20` }}>
                    <Sparkles size={18} style={{ color: selectedSubjectData.color }} />
                  </div>
                  <h3 className="text-lg font-black text-white">{selectedSubjectData.name}</h3>
                </div>
                <button onClick={() => setSelectedSubject(null)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input ref={fileInputRef} type="file" multiple onChange={(e) => handleFileUpload(e, selectedSubjectData.id)} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className="w-full py-6 glass-panel rounded-2xl border-dashed hover:border-primary/50 transition-all flex flex-col items-center gap-2">
                    <Upload size={20} className="text-primary" />
                    <span className="text-xs font-bold text-slate-400">Import Study Materials</span>
                  </button>
                </div>
                {(['exam', 'summary', 'notes', 'mindmap'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => handleGenerate(selectedSubjectData.id, type)}
                    disabled={isGenerating}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all text-left flex flex-col gap-2 group"
                  >
                    {isGenerating && generatingType === type ? <Loader2 size={16} className="animate-spin text-primary" /> : <Sparkles size={16} className="text-amber-500" />}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-200">{type}</span>
                  </button>
                ))}
              </div>
              {(selectedSubjectData.files || []).length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Materials</p>
                  {(selectedSubjectData.files || []).map(file => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group">
                      <FileText size={14} className="text-primary" />
                      <span className="text-xs font-bold text-slate-200 truncate flex-1">{file.name}</span>
                      <button onClick={() => removeFile(selectedSubjectData.id, file.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg">
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* Mobile backdrop — tap outside does NOT close; only X button closes */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Sidebar itself */}
      <motion.aside
        animate={
          isMobile
            ? { x: mobileOpen ? 0 : (isRTL ? 300 : -300), width: 280 }
            : { x: isCollapsed ? (isRTL ? 300 : -300) : 0, width: 280 }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full backdrop-blur-2xl z-40 flex flex-col overflow-hidden shadow-2xl`}
        style={{
          background: theme.cardBg,
          borderRight: !isRTL ? `2px solid ${theme.primary}20` : undefined,
          borderLeft:  isRTL  ? `2px solid ${theme.primary}20` : undefined,
        }}
        aria-label="Main Navigation"
        aria-hidden={!isMobile && isCollapsed}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
