"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Check, X, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateSuggestedSchedule } from '@/services/aiOptimizer';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ScheduleEditor() {
  const { userData, setUserData } = useAppContext();
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [suggested, setSuggested] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        setSchedule(userData.weeklySchedule);
        setSuggested(generateSuggestedSchedule(userData));
      }, 0);
    }
  }, [userData]);

  if (!userData) return null;
  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  const toggleSubject = (day: string, subjectId: string) => {
    const current = schedule[day] || [];
    const next = current.includes(subjectId)
      ? current.filter(id => id !== subjectId)
      : [...current, subjectId];
    setSchedule({ ...schedule, [day]: next });
  };

  const handleSave = () => {
    setUserData({ ...userData, weeklySchedule: schedule });
    setIsOpen(false);
  };

  const handleAcceptAI = () => {
    setSchedule(suggested);
  };

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 h-9 px-3 rounded-xl text-sm font-bold border transition-all"
        style={{
          background: 'rgba(99,102,241,0.08)',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#818cf8',
        }}
      >
        <Calendar size={16} />
        <span className="hidden sm:inline">{t.edit_schedule}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-muted flex flex-col overflow-hidden"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="p-6 border-b border-muted flex justify-between items-center bg-muted/30">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="text-primary" />
                  {t.edit_schedule}
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current/Edit Side */}
                <div className="space-y-6">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Check size={16} className="text-emerald-500" />
                    {t.current_schedule}
                  </h3>
                  <div className="space-y-3">
                    {DAYS.map((day) => (
                      <div key={day} className="p-3 bg-muted/50 rounded-2xl border border-muted">
                        <p className="text-xs font-bold mb-2">{day}</p>
                        <div className="flex flex-wrap gap-2">
                          {userData.subjects.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => toggleSubject(day, sub.id)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                                schedule[day]?.includes(sub.id)
                                  ? 'bg-primary text-primary-foreground shadow-sm'
                                  : 'bg-card text-muted-foreground border border-muted'
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestion Side */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      {t.suggested_schedule}
                    </h3>
                    <Button
                      variant="outline"
                      onClick={handleAcceptAI}
                      className="text-[10px] py-1 px-2 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10"
                    >
                      <RefreshCw size={12} className="mr-1" />
                      {t.accept_suggestion}
                    </Button>
                  </div>
                  <div className="space-y-3 opacity-80">
                    {DAYS.map((day) => (
                      <div key={day} className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                        <p className="text-xs font-bold mb-2">{day}</p>
                        <div className="flex flex-wrap gap-2">
                          {userData.subjects.filter(s => suggested[day]?.includes(s.id)).map((sub) => (
                            <span
                              key={sub.id}
                              className="px-2 py-1 rounded-lg text-[10px] font-medium bg-amber-500/20 text-amber-600"
                            >
                              {sub.name}
                            </span>
                          ))}
                          {(!suggested[day] || suggested[day].length === 0) && <span className="text-[10px] text-muted-foreground italic">Rest day</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-muted bg-muted/30 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>{t.back}</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                  <Save size={18} />
                  {t.save_changes}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
