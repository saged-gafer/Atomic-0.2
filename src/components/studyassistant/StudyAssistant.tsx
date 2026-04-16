"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, GeneratedContent } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { FileText, BookOpen, ClipboardList, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
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
  const { userData } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!userData) return null;

  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  // Collect all generated content across subjects
  const allContent: (GeneratedContent & { subjectName: string; subjectColor: string })[] = [];
  userData.subjects.forEach(subject => {
    (subject.generatedContent || []).forEach(gc => {
      allContent.push({ ...gc, subjectName: subject.name, subjectColor: subject.color });
    });
  });

  if (allContent.length === 0) return null;

  return (
    <div className="mt-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-xl font-bold mb-4 text-card-foreground flex items-center gap-2">
        <BookOpen className="text-amber-500" size={24} />
        {t.study_assistant || 'Study Assistant'}
      </h2>

      <div className="space-y-3">
        {allContent.map((content, index) => {
          const Icon = typeIcons[content.type];
          const isExpanded = expandedId === content.id;

          return (
            <motion.div
              key={content.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              className={`rounded-xl border ${typeBgColors[content.type]} overflow-hidden`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : content.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div className="p-2 rounded-lg bg-card">
                  <Icon size={18} className={typeColors[content.type]} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-card-foreground truncate">{content.title}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: content.subjectColor }} />
                    {content.subjectName}
                  </p>
                </div>
                <div className="shrink-0">
                  {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </div>
              </button>

              {/* Content */}
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
