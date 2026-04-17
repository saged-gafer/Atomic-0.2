"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, defaultSubjects, UserData } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { translations } from '@/lib/i18n';
import {
  Plus, Trash2, Calendar, Sparkles, Check, Loader2,
  User, Lock, MapPin, Globe, Link2, Rocket, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { fetchPrayerTimes } from '@/services/prayerTimes';
import AuraDial from './AuraDial';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* ─── Shared Register Theme ──────────────────────────── */
const THEME = {
  primary: '#ec4899',
  secondary: '#f59e0b',
  accent: '#10b981',
  glow1: 'rgba(236,72,153,0.2)',
  glow2: 'rgba(245,158,11,0.1)',
  gradient: 'linear-gradient(135deg, #0f0508 0%, #1a0710 40%, #120900 100%)',
  particles: ['#ec4899', '#f43f5e', '#f59e0b', '#fb923c', '#e879f9', '#fbbf24'],
  beamColor: 'rgba(236,72,153,0.5)',
};

/* ─── Constellation ──────────────────────────────────── */
function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const COUNT = window.innerWidth < 768 ? 35 : 60;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: 1 + Math.random() * 1.8, opacity: 0.15 + Math.random() * 0.5,
      color: THEME.particles[Math.floor(Math.random() * THEME.particles.length)],
      pulse: Math.random() * Math.PI * 2,
    }));
    let raf: number;
    const LINK = window.innerWidth < 768 ? 100 : 130;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.018;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${nodes[i].color}${Math.round(0.1 * (1 - dist / LINK) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const pr = n.r * (1 + 0.2 * Math.sin(n.pulse));
        ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.round(n.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Aurora ─────────────────────────────────────────── */
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div className="absolute rounded-full blur-[150px]"
        style={{ width: '70vw', height: '70vw', top: '-20%', left: '-15%', background: `radial-gradient(circle, ${THEME.glow1} 0%, transparent 70%)` }}
        animate={{ x: [0, 35, -20, 0], y: [0, 22, -18, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute rounded-full blur-[130px]"
        style={{ width: '55vw', height: '55vw', bottom: '-15%', right: '-12%', background: `radial-gradient(circle, ${THEME.glow2} 0%, transparent 70%)` }}
        animate={{ x: [0, -30, 18, 0], y: [0, -18, 28, 0], scale: [1, 0.92, 1.07, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      <motion.div className="absolute rounded-full blur-[100px]"
        style={{ width: '35vw', height: '35vw', top: '40%', left: '30%', background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, -15, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

/* ─── Beam Sweep ─────────────────────────────────────── */
function BeamSweep() {
  return (
    <motion.div className="absolute left-0 right-0 h-[1px] pointer-events-none z-30"
      style={{ background: `linear-gradient(90deg, transparent, ${THEME.beamColor}, transparent)` }}
      animate={{ top: ['-2px', '102%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  );
}

/* ─── Step Indicator ─────────────────────────────────── */
const STEP_LABELS = ['Profile', 'Subjects', 'Schedule', 'Goals'];
const STEP_ICONS = [User, Link2, Calendar, Sparkles];

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 relative">
      {Array.from({ length: total }).map((_, i) => {
        const Icon = STEP_ICONS[i];
        const done = i < step;
        const active = i === step;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className="h-[1px] w-10 mx-1 relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div className="absolute inset-0 rounded-full"
                  animate={{ scaleX: done ? 1 : 0, opacity: done ? 1 : 0 }}
                  style={{ background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.secondary})`, transformOrigin: 'left' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
            <motion.div
              className="flex flex-col items-center gap-1.5"
              animate={{ scale: active ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="w-9 h-9 rounded-2xl flex items-center justify-center relative overflow-hidden"
                animate={{
                  borderColor: done
                    ? 'rgba(0,0,0,0)'
                    : active
                      ? `${THEME.primary}60`
                      : 'rgba(255,255,255,0.08)',
                  boxShadow: active ? `0 0 20px ${THEME.primary}50` : done ? `0 0 10px ${THEME.primary}30` : 'none',
                }}
                style={{
                  border: '1px solid',
                  background: done
                    ? `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`
                    : active
                      ? 'rgba(236,72,153,0.2)'
                      : 'rgba(255,255,255,0.04)',
                }}
                transition={{ duration: 0.4 }}
              >
                {done
                  ? <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
                      <Check size={14} className="text-white" />
                    </motion.div>
                  : <Icon size={14} className={active ? 'text-pink-400' : 'text-slate-600'} />
                }
                {active && (
                  <motion.div className="absolute inset-0 rounded-2xl"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: `radial-gradient(circle, ${THEME.primary}30 0%, transparent 70%)` }}
                  />
                )}
              </motion.div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-pink-400' : done ? 'text-slate-500' : 'text-slate-700'}`}>
                {STEP_LABELS[i]}
              </span>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── CTA / Primary Button ───────────────────────────── */
function PrimaryButton({
  onClick, disabled, children, loading,
}: { onClick: () => void; disabled?: boolean; children: React.ReactNode; loading?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex-1 h-12 rounded-2xl font-black text-white text-sm relative overflow-hidden flex items-center justify-center gap-2 uppercase tracking-widest"
    >
      <motion.div className="absolute inset-0"
        animate={{ background: ['linear-gradient(135deg, #be185d, #7c3aed, #d97706)', 'linear-gradient(135deg, #7c3aed, #d97706, #be185d)', 'linear-gradient(135deg, #d97706, #be185d, #7c3aed)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)' }}
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {loading ? <Loader2 size={18} className="animate-spin" /> : children}
      </span>
    </motion.button>
  );
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex-1 h-12 rounded-2xl font-bold text-slate-400 hover:text-white text-sm border transition-colors duration-200 flex items-center justify-center gap-2"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Animated section header ────────────────────────── */
function SectionHeader({ icon: Icon, title, subtitle, color = THEME.primary }: {
  icon: React.ElementType; title: string; subtitle?: string; color?: string;
}) {
  return (
    <motion.div className="flex items-start gap-4 mb-6"
      initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
    >
      <motion.div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}40`, `0 0 0px ${color}00`] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Icon size={20} style={{ color }} />
      </motion.div>
      <div>
        <h2 className="text-xl font-black text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

/* ─── Subject chip for schedule ──────────────────────── */
function SubjectChip({
  subject, checked, onClick, delay,
}: { subject: { id: string; name: string; color: string }; checked: boolean; onClick: () => void; delay: number }) {
  return (
    <motion.button type="button" onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 22 }}
      whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.93 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold relative overflow-hidden transition-colors duration-150"
      style={{
        background: checked ? `${subject.color}22` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${checked ? subject.color + '55' : 'rgba(255,255,255,0.07)'}`,
        color: checked ? subject.color : 'rgba(148,163,184,0.8)',
      }}
    >
      <motion.div className="w-1.5 h-1.5 rounded-full shrink-0"
        animate={{ background: checked ? subject.color : 'rgba(100,116,139,0.4)', boxShadow: checked ? `0 0 6px ${subject.color}` : 'none' }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      />
      {subject.name}
      <AnimatePresence>
        {checked && (
          <motion.div key="chk" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 20 }}
          >
            <Check size={10} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function OnboardingFlow() {
  const { setUserData } = useAppContext();
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: '', username: '', password: '', language: 'en', city: '', country: '',
    weeklySchedule: {}, dailyStudyHours: 4, subjects: defaultSubjects, sideTasks: [], logs: [],
  });
  const [newSubjectName, setNewSubjectName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const [prevStep, setPrevStep] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const t = translations[formData.language];
  const isRTL = formData.language === 'ar';

  const validateStep0 = useCallback(() => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = t.name_required;
    if (!formData.username?.trim()) e.username = t.username_required;
    if (!formData.password?.trim()) e.password = t.password_required;
    if (!formData.city?.trim()) e.city = t.city_required;
    if (!formData.country?.trim()) e.country = t.country_required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData, t]);

  const goNext = useCallback(() => {
    if (step === 0 && !validateStep0()) return;
    setPrevStep(step);
    setStep(s => s + 1);
  }, [step, validateStep0]);

  const goPrev = useCallback(() => {
    setPrevStep(step);
    setStep(s => s - 1);
  }, [step]);

  const handleComplete = useCallback(async () => {
    setIsFinishing(true);
    let prayerTimes = null;
    if (formData.city && formData.country) {
      prayerTimes = await fetchPrayerTimes(formData.city, formData.country);
    }
    setUserData({ ...formData, prayerTimes: prayerTimes || undefined });
  }, [formData, setUserData]);

  const addCustomSubject = useCallback(() => {
    if (newSubjectName.trim()) {
      const colors = ['#ec4899', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6', '#06b6d4', '#f43f5e', '#a78bfa'];
      setFormData(fd => ({
        ...fd,
        subjects: [...fd.subjects, {
          id: Math.random().toString(36).substr(2, 9),
          name: newSubjectName.trim(),
          color: colors[Math.floor(Math.random() * colors.length)],
          icon: 'Book', tasks: [],
        }],
      }));
      setNewSubjectName('');
    }
  }, [newSubjectName]);

  const direction = step > prevStep ? 1 : -1;
  const slideVariants = {
    initial: { opacity: 0, x: direction * (isRTL ? -60 : 60), filter: 'blur(8px)', scale: 0.97 },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 },
    exit: { opacity: 0, x: direction * (isRTL ? 60 : -60), filter: 'blur(8px)', scale: 0.97 },
  };
  const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  /* ── Step content ── */
  const steps = [
    /* Step 0: Profile */
    <motion.div key="s0" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="space-y-6">
      <SectionHeader icon={User} title={t.welcome_title} subtitle={t.welcome_subtitle} />

      <div className="space-y-5">
        {/* Name */}
        <InputBox icon={User} color={THEME.primary}>
          <FloatingInput label={t.what_is_name + ' *'} value={formData.name}
            onChange={e => { setFormData(fd => ({ ...fd, name: e.target.value })); setErrors({}); }}
            error={errors.name}
          />
        </InputBox>

        {/* Username + Password */}
        <div className="grid grid-cols-2 gap-4">
          <InputBox icon={User} color={THEME.secondary}>
            <FloatingInput label={t.username + ' *'} value={formData.username || ''}
              onChange={e => { setFormData(fd => ({ ...fd, username: e.target.value })); setErrors({}); }}
              error={errors.username} autoComplete="username"
            />
          </InputBox>
          <InputBox icon={Lock} color="#a78bfa">
            <FloatingInput label={t.password + ' *'} type="password" value={formData.password || ''}
              onChange={e => { setFormData(fd => ({ ...fd, password: e.target.value })); setErrors({}); }}
              error={errors.password} autoComplete="new-password"
            />
          </InputBox>
        </div>

        {/* City + Country */}
        <div className="grid grid-cols-2 gap-4">
          <InputBox icon={MapPin} color={THEME.accent}>
            <FloatingInput label={t.city + ' *'} value={formData.city || ''}
              onChange={e => { setFormData(fd => ({ ...fd, city: e.target.value })); setErrors({}); }}
              error={errors.city}
            />
          </InputBox>
          <InputBox icon={Globe} color="#06b6d4">
            <FloatingInput label={t.country + ' *'} value={formData.country || ''}
              onChange={e => { setFormData(fd => ({ ...fd, country: e.target.value })); setErrors({}); }}
              error={errors.country}
            />
          </InputBox>
        </div>
      </div>

      {/* Language select */}
      <div className="pt-1">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Choose your language / اختر لغتك</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { lang: 'en', label: 'English', emoji: '🇬🇧' },
            { lang: 'ar', label: 'العربية', emoji: '🇸🇦' },
          ].map(({ lang, label, emoji }) => (
            <motion.button key={lang}
              onClick={() => { if (validateStep0()) { setFormData(fd => ({ ...fd, language: lang as 'en' | 'ar' })); setTimeout(() => goNext(), 10); } }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2.5 h-12 rounded-2xl font-black text-sm relative overflow-hidden border"
              style={{
                background: formData.language === lang ? `${THEME.primary}18` : 'rgba(255,255,255,0.03)',
                borderColor: formData.language === lang ? `${THEME.primary}50` : 'rgba(255,255,255,0.08)',
                color: formData.language === lang ? THEME.primary : 'rgba(148,163,184,0.8)',
                boxShadow: formData.language === lang ? `0 0 20px ${THEME.primary}25` : 'none',
              }}
            >
              <motion.div className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)' }}
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="text-lg">{emoji}</span>
              <span className="relative z-10">{label}</span>
              <ArrowRight size={14} className="relative z-10 opacity-50" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>,

    /* Step 1: Subject Links */
    <motion.div key="s1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="space-y-5">
      <SectionHeader icon={Link2} title={t.subject_links} subtitle="Add reference links for each subject" color={THEME.secondary} />

      <div className="space-y-2.5 max-h-[42vh] overflow-y-auto pr-1 custom-scrollbar">
        {formData.subjects.map((sub, i) => (
          <motion.div key={sub.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-2xl overflow-hidden border transition-all duration-200"
            style={{
              background: sub.link ? `${sub.color}08` : 'rgba(255,255,255,0.02)',
              borderColor: sub.link ? `${sub.color}30` : 'rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-3 px-4 pt-3 pb-1.5">
              <motion.div className="w-2 h-2 rounded-full shrink-0"
                animate={{ boxShadow: sub.link ? `0 0 8px ${sub.color}` : 'none', background: sub.link ? sub.color : 'rgba(100,116,139,0.4)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              />
              <span className="text-sm font-bold text-white flex-1">{sub.name}</span>
              <AnimatePresence>
                {sub.link && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                    style={{ background: `${THEME.accent}15`, color: THEME.accent, border: `1px solid ${THEME.accent}30` }}
                  >
                    <Check size={8} /> Linked
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="px-3 pb-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Link2 size={12} style={{ color: sub.link ? sub.color : 'rgba(100,116,139,0.4)' }} />
                </div>
                <input
                  type="url"
                  placeholder={`https://... (${sub.name})`}
                  value={sub.link || ''}
                  onChange={e => setFormData(fd => ({
                    ...fd,
                    subjects: fd.subjects.map(s => s.id === sub.id ? { ...s, link: e.target.value.trim() || undefined } : s),
                  }))}
                  className="w-full h-9 pl-8 pr-3 rounded-xl text-xs font-medium text-slate-300 outline-none transition-all duration-200 border"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: sub.link ? `${sub.color}35` : 'rgba(255,255,255,0.06)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <SecondaryButton onClick={goPrev}><ArrowLeft size={16} />{t.back}</SecondaryButton>
        <PrimaryButton onClick={goNext}>{t.next}<ArrowRight size={16} /></PrimaryButton>
      </div>
    </motion.div>,

    /* Step 2: Schedule */
    <motion.div key="s2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="space-y-4">
      <SectionHeader icon={Calendar} title={t.weekly_schedule} subtitle="Choose which subjects to study each day" color={THEME.primary} />

      {/* Add subject */}
      <motion.div className="rounded-2xl border p-3 space-y-3"
        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Add a subject</p>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              value={newSubjectName}
              onChange={e => setNewSubjectName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSubject(); } }}
              placeholder="Subject name..."
              className="w-full h-10 px-3 rounded-xl text-sm font-medium text-white outline-none border transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            />
          </div>
          <motion.button onClick={addCustomSubject}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-white"
            style={{ background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})` }}
          >
            <Plus size={18} />
          </motion.button>
        </div>
        {formData.subjects.filter(s => !defaultSubjects.find(ds => ds.id === s.id)).length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {formData.subjects.filter(s => !defaultSubjects.find(ds => ds.id === s.id)).map((s, i) => (
              <motion.span key={s.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 500, damping: 25 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold"
                style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
              >
                {s.name}
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                  onClick={() => setFormData(fd => ({ ...fd, subjects: fd.subjects.filter(sub => sub.id !== s.id) }))}
                >
                  <Trash2 size={9} className="hover:text-red-400 transition-colors" />
                </motion.button>
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Days */}
      <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1 custom-scrollbar">
        {DAYS.map((day, di) => {
          const daySubjects = formData.weeklySchedule[day] || [];
          const active = daySubjects.length > 0;
          return (
            <motion.div key={day}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: di * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-2xl border overflow-hidden"
              style={{
                background: active ? `${THEME.primary}06` : 'rgba(255,255,255,0.015)',
                borderColor: active ? `${THEME.primary}25` : 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex-1">{day}</span>
                <AnimatePresence>
                  {active && (
                    <motion.span key="cnt"
                      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                      className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ background: `${THEME.primary}20`, color: THEME.primary, border: `1px solid ${THEME.primary}35` }}
                    >
                      {daySubjects.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-wrap gap-1.5 px-3 pb-3">
                {formData.subjects.map((sub, si) => (
                  <SubjectChip key={sub.id} subject={sub}
                    checked={formData.weeklySchedule[day]?.includes(sub.id) ?? false}
                    onClick={() => {
                      const cur = formData.weeklySchedule[day] || [];
                      const checked = cur.includes(sub.id);
                      setFormData(fd => ({ ...fd, weeklySchedule: { ...fd.weeklySchedule, [day]: checked ? cur.filter(id => id !== sub.id) : [...cur, sub.id] } }));
                    }}
                    delay={di * 0.02 + si * 0.02}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <SecondaryButton onClick={goPrev}><ArrowLeft size={16} />{t.back}</SecondaryButton>
        <PrimaryButton onClick={goNext}>{t.next}<ArrowRight size={16} /></PrimaryButton>
      </div>
    </motion.div>,

    /* Step 3: Goal */
    <motion.div key="s3" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="space-y-2 text-center">
      <SectionHeader icon={Sparkles} title={t.daily_study_goal} subtitle={t.daily_study_goal_subtitle || 'Consistency is the key to mastery'} color={THEME.secondary} />

      {/* Themed AuraDial */}
      <div className="relative">
        <AuraDial
          value={formData.dailyStudyHours}
          onChange={val => setFormData(fd => ({ ...fd, dailyStudyHours: val }))}
          label={t.hours}
        />
      </div>

      {/* Final action */}
      <div className="flex gap-3 pt-2">
        <SecondaryButton onClick={goPrev}><ArrowLeft size={16} />{t.back}</SecondaryButton>
        <PrimaryButton onClick={handleComplete} loading={isFinishing}>
          {!isFinishing && <><Rocket size={16} />{t.start_planning}</>}
        </PrimaryButton>
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: THEME.gradient }} />
      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px)' }}
      />
      {mounted && <Constellation />}
      {mounted && <Aurora />}

      {/* Floating glow orb */}
      <motion.div className="absolute pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${THEME.glow1} 0%, transparent 65%)`, top: '50%', left: '50%', marginLeft: -300, marginTop: -300 }}
        animate={{ scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg z-10"
      >
        <motion.div className="relative rounded-[2rem] overflow-hidden"
          animate={{
            boxShadow: [
              `0 0 0 1px ${THEME.primary}25, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.primary}20`,
              `0 0 0 1px ${THEME.secondary}20, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.secondary}15`,
              `0 0 0 1px ${THEME.primary}25, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.primary}20`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ background: 'rgba(5,7,20,0.97)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}
        >
          <BeamSweep />

          {/* Animated top border */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
            animate={{ background: [
              `linear-gradient(90deg, transparent, ${THEME.primary}, ${THEME.secondary}, transparent)`,
              `linear-gradient(90deg, transparent, ${THEME.secondary}, ${THEME.primary}, transparent)`,
            ] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner glow top-right */}
          <motion.div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-[50px] pointer-events-none"
            animate={{ background: [`${THEME.primary}35`, `${THEME.secondary}30`, `${THEME.primary}35`] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* Corner glow bottom-left */}
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-[40px] pointer-events-none"
            style={{ background: 'rgba(16,185,129,0.08)' }}
          />

          {/* Inner content */}
          <div className="relative z-10 p-6 sm:p-8">
            {/* Brand row */}
            <div className="flex items-center gap-3 mb-7">
              <motion.div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
                animate={{ background: [`linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`, `linear-gradient(135deg, ${THEME.secondary}, ${THEME.primary})`] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-black text-white">A</span>
              </motion.div>
              <div>
                <span className="text-base font-black text-white tracking-wider block leading-none">ATOMIC</span>
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">Setup — Step {step + 1} of 4</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0"
                style={{ background: 'rgba(236,72,153,0.08)', borderColor: 'rgba(236,72,153,0.25)' }}
              >
                <motion.div className="w-1.5 h-1.5 rounded-full"
                  style={{ background: THEME.primary }}
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[10px] font-bold" style={{ color: THEME.primary }}>New Account</span>
              </div>
            </div>

            {/* Step indicator */}
            <StepIndicator step={step} total={4} />

            {/* Step content */}
            <AnimatePresence mode="wait" custom={isRTL}>
              {steps[step]}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── InputBox wrapper ───────────────────────────────── */
function InputBox({ children, icon: Icon, color }: { children: React.ReactNode; icon: React.ElementType; color: string }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-5 pointer-events-none z-20">
        <Icon size={13} style={{ color: `${color}80` }} />
      </div>
      <div className="pl-5">{children}</div>
    </div>
  );
}
