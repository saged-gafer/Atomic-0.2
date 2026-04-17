"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, defaultSubjects, UserData } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { GlassCard } from '@/components/ui/GlassCard';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, Sparkles, Check, Loader2 } from 'lucide-react';
import { fetchPrayerTimes } from '@/services/prayerTimes';
import AuraDial from './AuraDial';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex justify-center gap-3 mb-10">
    {[...Array(totalSteps)].map((_, i) => (
      <motion.div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i <= currentStep ? 'bg-primary' : 'bg-white/10'
        }`}
        initial={{ width: 12 }}
        animate={{ 
          width: i === currentStep ? 32 : 12,
          opacity: i <= currentStep ? 1 : 0.3
        }}
      />
    ))}
  </div>
);

const pageVariants = {
  initial: (isRTL: boolean) => ({ 
    x: isRTL ? 50 : -50,
    opacity: 0,
    filter: "blur(10px)"
  }),
  animate: { 
    x: 0, 
    opacity: 1,
    filter: "blur(0px)",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  },
  exit: (isRTL: boolean) => ({ 
    x: isRTL ? -50 : 50,
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.4 }
  })
};

export default function OnboardingFlow() {
  const { setUserData } = useAppContext();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    name: '', username: '', password: '', language: 'en', city: '', country: '', weeklySchedule: {}, dailyStudyHours: 4, subjects: defaultSubjects, sideTasks: [], logs: [],
  });
  const [newSubjectName, setNewSubjectName] = useState('');
  const [errors, setErrors] = useState<{name?: string; username?: string; password?: string; city?: string; country?: string}>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const t = translations[formData.language];
  const isRTL = formData.language === 'ar';

  const validateStep0 = () => {
    const newErrors: {name?: string; username?: string; password?: string; city?: string; country?: string} = {};
    if (!formData.name.trim()) newErrors.name = t.name_required;
    if (!formData.username?.trim()) newErrors.username = t.username_required;
    if (!formData.password?.trim()) newErrors.password = t.password_required;
    if (!formData.city?.trim()) newErrors.city = t.city_required;
    if (!formData.country?.trim()) newErrors.country = t.country_required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);
  const handleComplete = async () => {
    setIsFinishing(true);
    let prayerTimes = null;
    if (formData.city && formData.country) {
      prayerTimes = await fetchPrayerTimes(formData.city, formData.country);
    }
    setUserData({ ...formData, prayerTimes: prayerTimes || undefined });
    // Don't setIsFinishing(false) here because setUserData will unmount this component
  };

  const addCustomSubject = () => {
    if (newSubjectName.trim()) {
      const newSub = {
        id: Math.random().toString(36).substr(2, 9),
        name: newSubjectName.trim(),
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        icon: 'Book',
        tasks: []
      };
      setFormData({ ...formData, subjects: [...formData.subjects, newSub] });
      setNewSubjectName('');
    }
  };

  const updateSubjectLink = (subjectId: string, link: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.map(s => s.id === subjectId ? { ...s, link: link.trim() || undefined } : s)
    });
  };

  const steps = [
    // Step 0: Welcome
    (
      <motion.div key="step0" custom={isRTL} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.welcome_title}
          </h1>
          <p className="text-slate-400 text-sm">{t.welcome_subtitle}</p>
        </div>
        
        <div className="space-y-6 px-2">
          <FloatingInput
            label={t.what_is_name + " *"}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
          />
          <div className="grid grid-cols-2 gap-6">
            <FloatingInput
              label={t.username + " *"}
              value={formData.username || ''}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              error={errors.username}
            />
            <FloatingInput
              type="password"
              label={t.password + " *"}
              value={formData.password || ''}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              error={errors.password}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FloatingInput
              label={t.city + " *"}
              value={formData.city || ''}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              error={errors.city}
            />
            <FloatingInput
              label={t.country + " *"}
              value={formData.country || ''}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              error={errors.country}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <Button onClick={() => { if (validateStep0()) { setFormData({...formData, language: 'en'}); nextStep(); } }} className="flex-1" variant="glass">English</Button>
          <Button onClick={() => { if (validateStep0()) { setFormData({...formData, language: 'ar'}); nextStep(); } }} className="flex-1" variant="glass">العربية</Button>
        </div>
      </motion.div>
    ),
    // Step 1: Links
    (
      <motion.div key="step1" custom={isRTL} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 text-primary"><Sparkles size={24} /></div>
          <h2 className="text-2xl font-bold">{t.subject_links}</h2>
        </div>
        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {formData.subjects.map((sub) => (
            <div key={sub.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{sub.name}</span>
                {sub.link && <Check size={14} className="text-emerald-400" />}
              </div>
              <Input placeholder={`${t.add_link_for} ${sub.name}...`} value={sub.link || ''} onChange={(e) => updateSubjectLink(sub.id, e.target.value)} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={prevStep} className="flex-1">{t.back}</Button>
          <Button onClick={nextStep} className="flex-1">{t.next}</Button>
        </div>
      </motion.div>
    ),
    // Step 2: Schedule
    (
      <motion.div key="step2" custom={isRTL} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-secondary/20 text-secondary"><Calendar size={24} /></div>
          <h2 className="text-2xl font-bold">{t.weekly_schedule}</h2>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Add Subject</p>
          <div className="flex gap-2">
            <Input value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} placeholder="Subject Name..." />
            <Button onClick={addCustomSubject} className="aspect-square p-0 w-11"><Plus size={20} /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.subjects.filter(s => !defaultSubjects.find(ds => ds.id === s.id)).map(s => (
              <span key={s.id} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold flex items-center gap-1">
                {s.name}
                <Trash2 size={10} className="cursor-pointer hover:text-red-400" onClick={() => setFormData({...formData, subjects: formData.subjects.filter(sub => sub.id !== s.id)})} />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-[32vh] overflow-y-auto pr-1 custom-scrollbar">
          {DAYS.map((day, dayIdx) => {
            const daySubjects = formData.weeklySchedule[day] || [];
            const hasSubjects = daySubjects.length > 0;
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: hasSubjects ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.015)',
                  borderColor: hasSubjects ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex-1">{day}</span>
                  <AnimatePresence>
                    {hasSubjects && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full"
                      >
                        {daySubjects.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap gap-1.5 px-3 pb-3">
                  {formData.subjects.map((sub, subIdx) => {
                    const checked = formData.weeklySchedule[day]?.includes(sub.id) ?? false;
                    return (
                      <motion.button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          const current = formData.weeklySchedule[day] || [];
                          const next = checked ? current.filter(id => id !== sub.id) : [...current, sub.id];
                          setFormData({ ...formData, weeklySchedule: { ...formData.weeklySchedule, [day]: next } });
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: dayIdx * 0.03 + subIdx * 0.03, type: 'spring', stiffness: 400, damping: 20 }}
                        whileHover={{ scale: 1.08, y: -1 }}
                        whileTap={{ scale: 0.92 }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 relative overflow-hidden"
                        style={{
                          background: checked ? `${sub.color}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${checked ? sub.color + '50' : 'rgba(255,255,255,0.07)'}`,
                          color: checked ? sub.color : 'rgba(148,163,184,0.8)',
                        }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          animate={{
                            background: checked ? sub.color : 'rgba(100,116,139,0.4)',
                            boxShadow: checked ? `0 0 6px ${sub.color}` : 'none',
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        />
                        {sub.name}
                        <AnimatePresence>
                          {checked && (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                            >
                              <Check size={10} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={prevStep} className="flex-1">{t.back}</Button>
          <Button onClick={nextStep} className="flex-1">{t.next}</Button>
        </div>
      </motion.div>
    ),
    // Step 3: Goal
    (
      <motion.div key="step3" custom={isRTL} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white">{t.daily_study_goal}</h2>
          <p className="text-slate-500 text-sm font-medium">{t.daily_study_goal_subtitle || 'Consistency is the key to mastery'}</p>
        </div>
        
        <AuraDial
          value={formData.dailyStudyHours}
          onChange={(val) => setFormData({...formData, dailyStudyHours: val})}
          label={t.hours}
        />

        <div className="flex gap-3 pt-6">
          <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-2xl">{t.back}</Button>
          <Button
            onClick={handleComplete}
            disabled={isFinishing}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-primary to-indigo-400 shadow-lg shadow-primary/25 font-black uppercase tracking-widest"
          >
            {isFinishing ? <Loader2 className="animate-spin" size={20} /> : t.start_planning}
          </Button>
        </div>
      </motion.div>
    )
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <GlassCard className="w-full max-w-lg shadow-2xl border-white/5 overflow-visible" reflection={false}>
        <StepIndicator currentStep={step} totalSteps={4} />
        <AnimatePresence mode="wait" custom={isRTL}>
          {steps[step]}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
