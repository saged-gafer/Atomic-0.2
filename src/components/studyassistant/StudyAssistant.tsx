"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, GeneratedContent } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { FileText, BookOpen, ClipboardList, ChevronDown, ChevronUp, Share2, Download, Copy, Check, Trash2 } from 'lucide-react';
import MindMap from './MindMap';

const typeIcons = {
  exam: ClipboardList,
  summary: BookOpen,
  notes: FileText,
  mindmap: Share2,
};

const typeColors = {
  exam: 'text-blue-400',
  summary: 'text-emerald-400',
  notes: 'text-amber-400',
  mindmap: 'text-purple-400',
};

const typeBgColors = {
  exam: 'bg-blue-500/10 border-blue-500/20',
  summary: 'bg-emerald-500/10 border-emerald-500/20',
  notes: 'bg-amber-500/10 border-amber-500/20',
  mindmap: 'bg-purple-500/10 border-purple-500/20',
};

export default function StudyAssistant() {
  const { userData, setUserData } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!userData) return null;

  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  const allContent: (GeneratedContent & { subjectName: string; subjectColor: string; subjectId: string })[] = [];
  userData.subjects.forEach(subject => {
    (subject.generatedContent || []).forEach(gc => {
      allContent.push({ ...gc, subjectName: subject.name, subjectColor: subject.color, subjectId: subject.id });
    });
  });

  if (allContent.length === 0) return null;

  const handleDownload = (content: GeneratedContent & { subjectName: string }) => {
    const blob = new Blob([content.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.subjectName}_${content.type}_${new Date(content.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (content: GeneratedContent) => {
    try {
      await navigator.clipboard.writeText(content.content);
      setCopiedId(content.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = content.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(content.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDelete = (subjectId: string, contentId: string) => {
    const updated = {
      ...userData,
      subjects: userData.subjects.map(s =>
        s.id === subjectId
          ? { ...s, generatedContent: (s.generatedContent || []).filter(gc => gc.id !== contentId) }
          : s
      ),
    };
    setUserData(updated);
    if (expandedId === contentId) setExpandedId(null);
  };

  return (
    <div className="mt-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-xl font-bold mb-4 text-card-foreground flex items-center gap-2">
        <BookOpen className="text-amber-500" size={24} />
        {t.study_assistant || 'Study Assistant'}
        <span className="ml-auto text-xs font-medium text-slate-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          {allContent.length}
        </span>
      </h2>

      <div className="space-y-3">
        {allContent.map((content, index) => {
          const Icon = typeIcons[content.type];
          const isExpanded = expandedId === content.id;
          const isCopied = copiedId === content.id;

          return (
            <motion.div
              key={content.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              className={`rounded-xl border ${typeBgColors[content.type]} overflow-hidden`}
            >
              {/* Header */}
              <div className="w-full p-4 flex items-center gap-3">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : content.id)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                >
                  <div className="p-2 rounded-lg bg-card shrink-0">
                    <Icon size={18} className={typeColors[content.type]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-card-foreground truncate">{content.title}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="inline-block w-2 h-2 rounded-full mr-1 align-middle" style={{ backgroundColor: content.subjectColor }} />
                      {content.subjectName}
                      <span className="mx-1.5 opacity-40">·</span>
                      <span className="opacity-60">{new Date(content.createdAt).toLocaleDateString(isRTL ? 'ar' : 'en-GB')}</span>
                    </p>
                  </div>
                </button>

                {/* Action buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  {content.type !== 'mindmap' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(content)}
                        title={isCopied ? t.copied : t.copy}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isCopied
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDownload(content)}
                        title={t.download}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                      >
                        <Download size={14} />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(content.subjectId, content.id)}
                    title="Delete"
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-white/5 transition-all"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : content.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <div className="px-4 pb-4">
                      {content.type === 'mindmap' ? (
                        <MindMap data={content.content} color={content.subjectColor} />
                      ) : (
                        <div className="p-4 bg-card rounded-lg whitespace-pre-wrap text-sm text-card-foreground leading-relaxed font-mono">
                          {content.content}
                        </div>
                      )}

                      {/* Bottom action bar inside expanded content */}
                      {content.type !== 'mindmap' && (
                        <div className="flex gap-2 mt-3 justify-end">
                          <button
                            onClick={() => handleCopy(content)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isCopied
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {isCopied ? <Check size={12} /> : <Copy size={12} />}
                            {isCopied ? t.copied : t.copy}
                          </button>
                          <button
                            onClick={() => handleDownload(content)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
                          >
                            <Download size={12} />
                            {t.download}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
