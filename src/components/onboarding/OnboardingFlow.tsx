"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, defaultSubjects, UserData } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { translations } from '@/lib/i18n';
import {
  Plus, Trash2, Check, Loader2, ArrowRight, ArrowLeft,
  User, BookOpen, Calendar, Target, Sparkles, Zap, Brain,
  Flame, Trophy, Clock, Star, Rocket, Heart,
} from 'lucide-react';
import { fetchPrayerTimes } from '@/services/prayerTimes';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DAY_EMOJI: Record<string,string> = {
  Monday:'🌅', Tuesday:'⚡', Wednesday:'🔥', Thursday:'🌙',
  Friday:'✨', Saturday:'🌟', Sunday:'☀️',
};

const STEP_CONFIG = [
  { label:'Profile',  icon:User,     hint:'Tell us about yourself!',     color:'from-violet-500 to-fuchsia-500' },
  { label:'Subjects', icon:BookOpen, hint:'Pick your subjects!',          color:'from-cyan-500 to-blue-500' },
  { label:'Schedule', icon:Calendar, hint:'Plan your week!',              color:'from-amber-500 to-rose-500' },
  { label:'Goals',    icon:Target,   hint:"Let's set your goals!",        color:'from-emerald-500 to-teal-500' },
];

const AVATARS = ['🦊','🐯','🦁','🐼','🦄','🐺','🦅','🦉','🐱','🐶','🐧','🦋'];

const SUBJECT_COLORS = [
  '#8b5cf6','#22d3ee','#10b981','#f59e0b','#ef4444','#ec4899',
  '#6366f1','#14b8a6','#f97316','#a855f7','#3b82f6','#84cc16',
];

/* ── Burst particles on step change ──────────────────── */
function BurstParticles({ trigger, color }: { trigger:number; color:string }) {
  return (
    <AnimatePresence>
      <motion.div key={trigger} className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
        {Array.from({ length:14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const dist = 80 + (i % 3) * 25;
          return (
            <motion.div key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background:color, boxShadow:`0 0 8px ${color}` }}
              initial={{ x:0, y:0, scale:0, opacity:1 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                scale:[0,1.2,0],
                opacity:[1,1,0],
              }}
              transition={{ duration:0.8, ease:'easeOut' }}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Hero orbital illustration per step ──────────────── */
function StepHero({ step, primary, secondary }: { step:number; primary:string; secondary:string }) {
  const stepCfg = STEP_CONFIG[step];
  const Icon = stepCfg.icon;
  const orbitIcons = [
    [Brain, Sparkles, Zap],            // Profile
    [BookOpen, Star, Heart],           // Subjects
    [Clock, Calendar, Flame],          // Schedule
    [Trophy, Rocket, Target],          // Goals
  ][step] || [Sparkles, Star, Zap];

  return (
    <div className="relative h-24 flex items-center justify-center mb-2">
      {/* Glow ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background:`radial-gradient(circle, ${primary}30 0%, transparent 70%)`,
        }}
        animate={{ scale:[1,1.25,1], opacity:[0.5,0.9,0.5] }}
        transition={{ duration:2.5, repeat:Infinity }}
      />
      {/* Orbit ring */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border-2"
        style={{ borderColor:`${primary}25` }}
        animate={{ rotate:360 }}
        transition={{ duration:14, repeat:Infinity, ease:'linear' }}
      />
      {/* Outer orbit */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-dashed"
        style={{ borderColor:`${secondary}20` }}
        animate={{ rotate:-360 }}
        transition={{ duration:20, repeat:Infinity, ease:'linear' }}
      />

      {/* Orbiting icons */}
      {orbitIcons.map((OrbIcon, i) => {
        const angle = (i / orbitIcons.length) * 360;
        const radius = 48;
        return (
          <motion.div key={i}
            className="absolute"
            animate={{ rotate:[angle, angle+360] }}
            transition={{ duration:9, repeat:Infinity, ease:'linear' }}
            style={{ width:radius*2, height:radius*2 }}
          >
            <motion.div
              className="absolute"
              style={{ left:'50%', top:0, transform:'translate(-50%,-50%)' }}
              animate={{ rotate:[-angle, -angle-360] }}
              transition={{ duration:9, repeat:Infinity, ease:'linear' }}
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{
                  background:`linear-gradient(135deg, ${primary}30, ${secondary}30)`,
                  border:`1.5px solid ${primary}50`,
                  boxShadow:`0 0 12px ${primary}60`,
                }}
              >
                <OrbIcon size={13} style={{ color:primary }}/>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center icon */}
      <motion.div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background:`linear-gradient(135deg, ${primary}, ${secondary})`,
          boxShadow:`0 10px 30px -5px ${primary}80, inset 0 1px 0 rgba(255,255,255,0.3)`,
        }}
        animate={{ y:[0,-3,0] }}
        transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
      >
        <motion.div
          animate={{ scale:[1,1.12,1] }}
          transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
        >
          <Icon size={26} className="text-white"/>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Anime step indicator with progress meter ────────── */
function StepIndicator({ step, total, primary, secondary }: { step:number; total:number; primary:string; secondary:string }) {
  const progress = ((step + 1) / total) * 100;
  return (
    <div className="mb-5">
      {/* Top: numeric progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color:`${primary}80` }}>
          Step {step + 1} / {total}
        </span>
        <span className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color:`${primary}80` }}>
          {Math.round(progress)}%
        </span>
      </div>
      {/* Progress bar */}
      <div className="relative h-1.5 rounded-full overflow-hidden mb-4" style={{ background:'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          animate={{ width:`${progress}%` }}
          transition={{ type:'spring', stiffness:120, damping:20 }}
          style={{
            background:`linear-gradient(90deg, ${primary}, ${secondary})`,
            boxShadow:`0 0 10px ${primary}80`,
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-12 rounded-full opacity-70"
          style={{ background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
          animate={{ x:['-50px','350px'] }}
          transition={{ duration:2.2, repeat:Infinity, ease:'linear' }}
        />
      </div>

      {/* Step circles */}
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length:total }).map((_, i) => {
          const cfg = STEP_CONFIG[i];
          const StepIcon = cfg.icon;
          const done   = i < step;
          const active = i === step;
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="h-[2px] w-6 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full"
                    animate={{ scaleX:done?1:0 }}
                    style={{ background:`linear-gradient(90deg,${primary},${secondary})`, transformOrigin:'left' }}
                    transition={{ duration:0.5 }}
                  />
                </div>
              )}
              <motion.div className="flex flex-col items-center gap-1"
                animate={{ scale:active?1.12:1 }}
                transition={{ type:'spring', stiffness:400, damping:25 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  animate={{
                    background: done
                      ? `linear-gradient(135deg,${primary},${secondary})`
                      : active
                        ? `${primary}22`
                        : 'rgba(255,255,255,0.04)',
                    boxShadow: active
                      ? `0 0 20px ${primary}60, 0 4px 0 0 ${primary}40`
                      : done
                        ? `0 0 12px ${primary}30, 0 3px 0 0 ${primary}40`
                        : '0 0 0px rgba(0,0,0,0)',
                    borderColor: active ? `${primary}80` : done ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)',
                  }}
                  style={{ border:'2px solid' }}
                  transition={{ duration:0.4 }}
                >
                  {done
                    ? <motion.span initial={{ scale:0, rotate:-45 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', stiffness:500 }} className="text-white"><Check size={14} strokeWidth={3.5}/></motion.span>
                    : <StepIcon size={14} style={{ color:active ? primary : 'rgba(255,255,255,0.4)' }} strokeWidth={2.5}/>
                  }
                </motion.div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${active?'':'opacity-50'}`} style={{ color:active?primary:'rgba(255,255,255,0.5)' }}>
                  {cfg.label}
                </span>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ── Primary anime button ────────────────────────────── */
function AnimeBtn({ onClick, disabled, loading, children, gradient, color }: {
  onClick:()=>void; disabled?:boolean; loading?:boolean;
  children:React.ReactNode; gradient:string; color:string;
}) {
  return (
    <motion.button onClick={onClick} disabled={disabled||loading}
      whileHover={{ scale:1.03, y:-3 }} whileTap={{ scale:0.96, y:0 }}
      className="flex-1 h-13 rounded-2xl font-black text-white text-sm uppercase tracking-widest relative overflow-hidden flex items-center justify-center gap-2"
      style={{ height:52, background:gradient, border:`2.5px solid ${color}`, boxShadow:`0 4px 0 0 ${color}80, 0 0 25px ${color}25` }}
    >
      <motion.div className="absolute inset-0"
        style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)' }}
        animate={{ x:['-120%','220%'] }} transition={{ duration:2, repeat:Infinity, repeatDelay:1 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {loading ? <Loader2 size={18} className="animate-spin" /> : children}
      </span>
    </motion.button>
  );
}

function BackBtn({ onClick, color }: { onClick:()=>void; color:string }) {
  return (
    <motion.button onClick={onClick}
      whileHover={{ scale:1.03 }} whileTap={{ scale:0.96 }}
      className="flex-1 h-[52px] rounded-2xl font-bold text-sm border flex items-center justify-center gap-2"
      style={{ background:'rgba(255,255,255,0.03)', borderColor:`${color}25`, color:'rgba(200,200,220,0.8)' }}
    >
      <ArrowLeft size={15}/> Back
    </motion.button>
  );
}

interface OnboardingFlowProps {
  initialName?: string;
  initialPassword?: string;
}

/* ── Main ───────────────────────────────────────────────*/
export default function OnboardingFlow({ initialName, initialPassword }: OnboardingFlowProps = {}) {
  const { setUserData } = useAppContext();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    name: initialName || '',
    password: initialPassword,
    language:'en', city:'', country:'', avatar:'🦊',
    weeklySchedule:{}, dailyStudyHours:4, subjects:defaultSubjects, sideTasks:[], logs:[],
  });
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const t = translations[formData.language];

  const validateStep0 = useCallback(() => {
    const e: Record<string,string> = {};
    if (!formData.name.trim())     e.name     = 'Name is required!';
    if (!formData.city?.trim())    e.city     = 'City is required!';
    if (!formData.country?.trim()) e.country  = 'Country is required!';
    setErrors(e); return Object.keys(e).length === 0;
  }, [formData]);

  const goNext = useCallback(() => {
    if (step === 0 && !validateStep0()) return;
    setPrevStep(step);
    setStep(s => s + 1);
    setBurstKey(k => k + 1);
  }, [step, validateStep0]);

  const goPrev = useCallback(() => {
    setPrevStep(step);
    setStep(s => s - 1);
    setBurstKey(k => k + 1);
  }, [step]);

  const handleComplete = useCallback(async () => {
    setIsFinishing(true);
    let prayerTimes = null;
    if (formData.city && formData.country) prayerTimes = await fetchPrayerTimes(formData.city, formData.country);
    setUserData({ ...formData, prayerTimes: prayerTimes || undefined });
  }, [formData, setUserData]);

  const addCustomSubject = useCallback(() => {
    if (newSubjectName.trim()) {
      const color = SUBJECT_COLORS[Math.floor(Math.random()*SUBJECT_COLORS.length)];
      setFormData(fd => ({
        ...fd,
        subjects:[...fd.subjects,{
          id:Math.random().toString(36).substring(2,11),
          name:newSubjectName.trim(),
          color, icon:'Book', tasks:[],
        }],
      }));
      setNewSubjectName('');
    }
  }, [newSubjectName]);

  const dir = step > prevStep ? 1 : -1;
  const slideV = {
    initial:  { opacity:0, x:dir*60, filter:'blur(8px)', scale:0.96 },
    animate:  { opacity:1, x:0,      filter:'blur(0px)', scale:1 },
    exit:     { opacity:0, x:dir*-60, filter:'blur(8px)', scale:0.96 },
  };
  const tr = { duration:0.5, ease:[0.22,1,0.36,1] as [number,number,number,number] };

  const stepCfg = STEP_CONFIG[step];

  // Schedule day count summary
  const dayCounts = useMemo(() => {
    const c: Record<string,number> = {};
    DAYS.forEach(d => c[d] = (formData.weeklySchedule[d]||[]).length);
    return c;
  }, [formData.weeklySchedule]);

  const totalScheduledSlots = useMemo(
    () => Object.values(dayCounts).reduce((a,b) => a+b, 0),
    [dayCounts]
  );

  // Goal-meter angle
  const goalProgress = (formData.dailyStudyHours - 1) / 11;

  return (
    <div className="min-h-screen w-full flex items-start justify-center relative overflow-hidden py-6"
      style={{ background:`radial-gradient(ellipse at 50% 20%, ${theme.bgDeep} 0%, ${theme.bg} 65%)` }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize:'28px 28px' }}
      />
      {/* Diagonal speed lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage:'repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 18px)' }}
      />

      {/* Animated blobs that shift per step */}
      <motion.div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none"
        animate={{ background:`${theme.primary}1a`, scale:[1,1.1,1] }}
        transition={{ background:{duration:0.6}, scale:{duration:9, repeat:Infinity, ease:'easeInOut'} }}
      />
      <motion.div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[100px] pointer-events-none"
        animate={{ background:`${theme.secondary}16`, scale:[1,1.15,1] }}
        transition={{ background:{duration:0.6}, scale:{duration:11, repeat:Infinity, ease:'easeInOut'} }}
      />

      {/* Floating particles */}
      {Array.from({ length:14 }).map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            top:`${(i*37)%100}%`, left:`${(i*53)%100}%`,
            background: i%2===0 ? `${theme.primary}60` : `${theme.secondary}60`,
          }}
          animate={{ y:[0,-20,0], opacity:[0.2,0.7,0.2] }}
          transition={{ duration:4+(i%3), repeat:Infinity, delay:i*0.3 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-lg px-4">
        {/* Header */}
        <motion.div className="text-center mb-3"
          initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        >
          <motion.div
            key={step}
            initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }}
            className="inline-block px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest mb-1"
            style={{ background:`${theme.primary}15`, border:`2px solid ${theme.primary}35`, color:theme.primary }}
          >
            ✨ {stepCfg.hint}
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-white text-xs"
              style={{ background:`linear-gradient(135deg,${theme.primary},${theme.secondary})` }}>A</div>
            <span className="text-xs font-black tracking-widest text-white uppercase">ATOMIC Setup</span>
          </div>
        </motion.div>

        {/* Card */}
        <div className="relative rounded-[28px] overflow-hidden"
          style={{
            background:theme.cardBg,
            border:`2.5px solid ${theme.primary}55`,
            boxShadow:`0 4px 0 0 ${theme.primary}40, 0 30px 80px -10px rgba(0,0,0,0.95), 0 0 50px -10px ${theme.primary}20`,
          }}
        >
          {/* Top beam */}
          <motion.div className="absolute top-0 left-0 right-0 h-[3px] z-20"
            animate={{ background:[
              `linear-gradient(90deg,transparent,${theme.primary},${theme.secondary},transparent)`,
              `linear-gradient(90deg,transparent,${theme.secondary},${theme.primary},transparent)`,
            ]}}
            transition={{ duration:2.5, repeat:Infinity }}
          />
          {/* Screen tone */}
          <div className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ backgroundImage:`radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`, backgroundSize:'12px 12px' }}
          />

          {/* Burst on transition */}
          <BurstParticles trigger={burstKey} color={theme.primary}/>

          <div className="relative z-10 p-6">
            {/* Step indicator */}
            <StepIndicator step={step} total={4} primary={theme.primary} secondary={theme.secondary}/>

            {/* Hero illustration */}
            <StepHero step={step} primary={theme.primary} secondary={theme.secondary}/>

            {/* Step content */}
            <div className="min-h-[380px] mt-2">
              <AnimatePresence mode="wait" initial={false}>
                {/* ── STEP 0: Profile ── */}
                {step === 0 && (
                  <motion.div key="s0" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-4">
                    <div className="text-center mb-3">
                      <h2 className="text-xl font-black text-white mb-0.5">Set Up Your Profile</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}80` }}>Tell us who you are, hero! 🎌</p>
                    </div>

                    {/* Avatar picker */}
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color:`${theme.primary}70` }}>
                        Choose Your Vibe
                      </p>
                      <div className="grid grid-cols-6 gap-1.5">
                        {AVATARS.map(av => {
                          const selected = formData.avatar === av;
                          return (
                            <motion.button key={av}
                              type="button"
                              whileHover={{ scale:1.15, y:-3 }} whileTap={{ scale:0.92 }}
                              onClick={() => setFormData(fd => ({...fd, avatar:av}))}
                              className="aspect-square rounded-2xl flex items-center justify-center text-2xl relative overflow-hidden"
                              style={{
                                background: selected ? `${theme.primary}20` : 'rgba(255,255,255,0.03)',
                                border: `2px solid ${selected ? theme.primary+'80' : 'rgba(255,255,255,0.06)'}`,
                                boxShadow: selected ? `0 0 18px ${theme.primary}50, inset 0 0 12px ${theme.primary}20` : 'none',
                              }}
                            >
                              {selected && (
                                <motion.div className="absolute inset-0"
                                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                                  style={{ background:`radial-gradient(circle, ${theme.primary}30, transparent 70%)` }}
                                />
                              )}
                              <motion.span
                                animate={selected ? { scale:[1,1.15,1], rotate:[0,-5,5,0] } : {}}
                                transition={{ duration:1.5, repeat:selected ? Infinity : 0 }}
                                className="relative z-10"
                              >{av}</motion.span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <FloatingInput label="Full Name *" value={formData.name}
                      onChange={e => { setFormData(fd => ({...fd,name:e.target.value})); setErrors({}); }}
                      error={errors.name}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FloatingInput label="City *" value={formData.city||''}
                        onChange={e => { setFormData(fd => ({...fd,city:e.target.value})); setErrors({}); }}
                        error={errors.city}
                      />
                      <FloatingInput label="Country *" value={formData.country||''}
                        onChange={e => { setFormData(fd => ({...fd,country:e.target.value})); setErrors({}); }}
                        error={errors.country}
                      />
                    </div>

                    {/* Language */}
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color:`${theme.primary}70` }}>
                        Language / اللغة
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[{lang:'en',label:'English',flag:'🇬🇧'},{lang:'ar',label:'العربية',flag:'🇸🇦'}].map(({lang,label,flag}) => (
                          <motion.button key={lang}
                            type="button"
                            onClick={() => setFormData(fd => ({...fd, language:lang as 'en'|'ar'}))}
                            whileHover={{ scale:1.03,y:-2 }} whileTap={{ scale:0.96 }}
                            className="flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-sm border relative overflow-hidden"
                            style={{
                              background: formData.language===lang ? `${theme.primary}15`:'rgba(255,255,255,0.02)',
                              borderColor: formData.language===lang ? `${theme.primary}60`:'rgba(255,255,255,0.08)',
                              color: formData.language===lang ? theme.primary:'rgba(200,200,220,0.7)',
                              boxShadow: formData.language===lang ? `0 0 15px ${theme.primary}25`:'none',
                            }}
                          >
                            <motion.div className="absolute inset-0"
                              style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.1) 50%,transparent 70%)' }}
                              animate={{ x:['-120%','220%'] }} transition={{ duration:2.2, repeat:Infinity, repeatDelay:1 }}
                            />
                            <span className="text-lg relative z-10">{flag}</span>
                            <span className="relative z-10">{label}</span>
                            {formData.language===lang && <Check size={12} className="relative z-10"/>}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 1: Subjects ── */}
                {step === 1 && (
                  <motion.div key="s1" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-3">
                    <div className="text-center mb-3">
                      <h2 className="text-xl font-black text-white mb-0.5">Your Study Arsenal</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}80` }}>Pick your weapons! ⚔️ <span style={{ color:theme.secondary }}>{formData.subjects.length} subjects</span></p>
                    </div>

                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 -mr-1">
                      {formData.subjects.map((sub,i) => {
                        const isEditing = editingSubjectId === sub.id;
                        return (
                          <motion.div key={sub.id}
                            initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                            transition={{ delay:i*0.04, type:'spring', stiffness:300, damping:25 }}
                            className="rounded-2xl border overflow-hidden"
                            style={{ background:`${sub.color}08`, borderColor:`${sub.color}40` }}
                          >
                            <div className="flex items-center gap-2 p-2.5">
                              <motion.button
                                type="button"
                                whileHover={{ scale:1.15, rotate:15 }} whileTap={{ scale:0.9 }}
                                onClick={() => setEditingSubjectId(isEditing ? null : sub.id)}
                                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 relative"
                                style={{
                                  background:`linear-gradient(135deg, ${sub.color}30, ${sub.color}15)`,
                                  border:`1.5px solid ${sub.color}60`,
                                  boxShadow:`0 0 10px ${sub.color}40`,
                                }}
                              >
                                <BookOpen size={14} style={{ color:sub.color }}/>
                                <motion.div
                                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
                                  style={{ background:sub.color, boxShadow:`0 0 6px ${sub.color}` }}
                                  animate={{ scale:[1,1.3,1] }}
                                  transition={{ duration:1.5, repeat:Infinity, delay:i*0.2 }}
                                />
                              </motion.button>
                              <div className="flex-1 min-w-0">
                                <FloatingInput label={`${sub.name} — link (optional)`} value={sub.link||''}
                                  onChange={e => setFormData(fd => ({
                                    ...fd, subjects:fd.subjects.map(s => s.id===sub.id ? {...s,link:e.target.value.trim()||undefined} : s)
                                  }))}
                                />
                              </div>
                              {!defaultSubjects.find(d => d.id===sub.id) && (
                                <motion.button type="button" whileHover={{ scale:1.2, rotate:10 }} whileTap={{ scale:0.9 }}
                                  onClick={() => setFormData(fd => ({...fd, subjects:fd.subjects.filter(s=>s.id!==sub.id)}))}
                                  className="p-1.5 rounded-xl text-red-400/70 hover:text-red-400"
                                >
                                  <Trash2 size={12}/>
                                </motion.button>
                              )}
                            </div>
                            {/* Color picker (expand) */}
                            <AnimatePresence>
                              {isEditing && (
                                <motion.div
                                  initial={{ height:0, opacity:0 }}
                                  animate={{ height:'auto', opacity:1 }}
                                  exit={{ height:0, opacity:0 }}
                                  transition={{ duration:0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-3 pb-3 pt-1 flex flex-wrap gap-1.5">
                                    {SUBJECT_COLORS.map(c => (
                                      <motion.button
                                        key={c}
                                        type="button"
                                        whileHover={{ scale:1.25 }} whileTap={{ scale:0.9 }}
                                        onClick={() => setFormData(fd => ({
                                          ...fd, subjects:fd.subjects.map(s => s.id===sub.id ? {...s, color:c} : s)
                                        }))}
                                        className="w-6 h-6 rounded-full relative"
                                        style={{
                                          background:c,
                                          boxShadow: sub.color===c ? `0 0 0 2px white, 0 0 12px ${c}` : `0 0 6px ${c}80`,
                                        }}
                                      >
                                        {sub.color===c && (
                                          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="absolute inset-0 flex items-center justify-center">
                                            <Check size={10} className="text-white" strokeWidth={4}/>
                                          </motion.div>
                                        )}
                                      </motion.button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Add subject */}
                    <div className="flex gap-2">
                      <input
                        value={newSubjectName}
                        onChange={e => setNewSubjectName(e.target.value)}
                        onKeyDown={e => e.key==='Enter' && addCustomSubject()}
                        placeholder="+ Add custom subject..."
                        className="flex-1 h-11 px-4 rounded-2xl text-sm font-bold text-white outline-none border placeholder:text-white/30"
                        style={{ background:'rgba(255,255,255,0.04)', borderColor:`${theme.primary}25` }}
                      />
                      <motion.button type="button" onClick={addCustomSubject}
                        whileHover={{ scale:1.1, rotate:90 }} whileTap={{ scale:0.9 }}
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background:`linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}20)`,
                          border:`2px solid ${theme.primary}60`,
                          color:theme.primary,
                          boxShadow:`0 0 12px ${theme.primary}30`,
                        }}
                      >
                        <Plus size={18}/>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Schedule ── */}
                {step === 2 && (
                  <motion.div key="s2" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-3">
                    <div className="text-center mb-3">
                      <h2 className="text-xl font-black text-white mb-0.5">Weekly Battle Plan</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}80` }}>
                        Tap subjects per day • <span style={{ color:theme.secondary }}>{totalScheduledSlots} slot{totalScheduledSlots!==1?'s':''} total</span>
                      </p>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 -mr-1">
                      {DAYS.map((day,di) => {
                        const count = dayCounts[day];
                        const hasAny = count > 0;
                        return (
                          <motion.div key={day}
                            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                            transition={{ delay:di*0.04 }}
                            className="rounded-2xl p-3 border transition-all"
                            style={{
                              background: hasAny ? `${theme.primary}08` : 'rgba(255,255,255,0.02)',
                              borderColor: hasAny ? `${theme.primary}30` : `${theme.primary}10`,
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base">{DAY_EMOJI[day]}</span>
                              <span className="text-xs font-black text-white flex-1">{day}</span>
                              <motion.div
                                key={count}
                                initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
                                className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                                style={{
                                  background: hasAny ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : 'rgba(255,255,255,0.05)',
                                  color: hasAny ? '#fff' : 'rgba(255,255,255,0.4)',
                                  boxShadow: hasAny ? `0 0 10px ${theme.primary}60` : 'none',
                                }}
                              >
                                {count} {count===1?'subj':'subjs'}
                              </motion.div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {formData.subjects.map((sub) => {
                                const checked = (formData.weeklySchedule[day]||[]).includes(sub.id);
                                return (
                                  <motion.button key={sub.id} type="button"
                                    whileHover={{ scale:1.06, y:-1 }} whileTap={{ scale:0.93 }}
                                    onClick={() => setFormData(fd => {
                                      const curr = fd.weeklySchedule[day]||[];
                                      const next = checked ? curr.filter(id=>id!==sub.id) : [...curr,sub.id];
                                      return {...fd, weeklySchedule:{...fd.weeklySchedule,[day]:next}};
                                    })}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold relative overflow-hidden"
                                    style={{
                                      background:checked ? `${sub.color}22`:'rgba(255,255,255,0.04)',
                                      border:`1.5px solid ${checked ? sub.color+'70':'rgba(255,255,255,0.07)'}`,
                                      color:checked ? sub.color:'rgba(150,150,180,0.7)',
                                      boxShadow:checked ? `0 0 8px ${sub.color}40`:'none',
                                    }}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background:checked?sub.color:'rgba(100,100,130,0.4)' }}/>
                                    {sub.name}
                                    {checked && <Check size={8}/>}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Goals ── */}
                {step === 3 && (
                  <motion.div key="s3" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-4">
                    <div className="text-center mb-3">
                      <h2 className="text-xl font-black text-white mb-0.5">Daily Power Level</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}80` }}>How many hours per day will you grind? 🔥</p>
                    </div>

                    {/* Circular meter */}
                    <div className="flex items-center justify-center my-2">
                      <div className="relative w-36 h-36">
                        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
                          <motion.circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke={`url(#goalGrad)`}
                            strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 42}
                            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - goalProgress) }}
                            transition={{ type:'spring', stiffness:120, damping:18 }}
                            style={{ filter:`drop-shadow(0 0 6px ${theme.primary})` }}
                          />
                          <defs>
                            <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={theme.primary}/>
                              <stop offset="100%" stopColor={theme.secondary}/>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div
                            key={formData.dailyStudyHours}
                            initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
                            transition={{ type:'spring', stiffness:300 }}
                            className="text-4xl font-black"
                            style={{ color:theme.primary, textShadow:`0 0 15px ${theme.primary}80` }}
                          >
                            {formData.dailyStudyHours}h
                          </motion.div>
                          <span className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color:`${theme.primary}70` }}>per day</span>
                        </div>
                      </div>
                    </div>

                    <input type="range" min={1} max={12} step={0.5} value={formData.dailyStudyHours}
                      onChange={e => setFormData(fd => ({...fd, dailyStudyHours:parseFloat(e.target.value)}))}
                      className="w-full"
                      style={{ accentColor:theme.primary }}
                    />
                    <div className="flex justify-between text-[9px] font-bold" style={{ color:`${theme.primary}50` }}>
                      <span>1h</span><span>3h</span><span>6h</span><span>9h</span><span>12h</span>
                    </div>

                    {/* Motivation messages */}
                    {[
                      { hours:[1,2],  msg:'Good start! Every minute counts! ⭐',  color:'#4ade80', icon:Star },
                      { hours:[3,4],  msg:'Solid dedication! You are committed! 🔥', color:theme.primary, icon:Flame },
                      { hours:[5,6],  msg:'Intense focus! Study hero material! ⚡',  color:theme.secondary, icon:Zap },
                      { hours:[7,12], msg:'LEGENDARY mode! Take breaks too! 🏆',    color:'#facc15', icon:Trophy },
                    ].filter(m => formData.dailyStudyHours >= m.hours[0] && formData.dailyStudyHours <= m.hours[1])
                      .map(m => (
                        <motion.div key={m.msg}
                          initial={{ scale:0.85, opacity:0, y:10 }} animate={{ scale:1, opacity:1, y:0 }}
                          className="flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-black"
                          style={{ background:`${m.color}15`, border:`2px solid ${m.color}40`, color:m.color, boxShadow:`0 0 18px ${m.color}25` }}
                        >
                          <motion.div animate={{ rotate:[0,-10,10,0] }} transition={{ duration:1.2, repeat:Infinity }}>
                            <m.icon size={14}/>
                          </motion.div>
                          <span>{m.msg}</span>
                        </motion.div>
                      ))
                    }

                    {/* Summary preview */}
                    <motion.div className="rounded-2xl p-4 space-y-2 relative overflow-hidden"
                      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                      style={{ background:`${theme.primary}08`, border:`2px solid ${theme.primary}25` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
                        style={{ background:`radial-gradient(circle, ${theme.primary}, transparent)` }}
                      />
                      <p className="text-xs font-black uppercase tracking-widest mb-3 relative z-10 flex items-center gap-1.5" style={{ color:`${theme.primary}` }}>
                        <Sparkles size={12}/> Your Atomic Setup
                      </p>
                      {[
                        { label:'Hero',     val:`${formData.avatar||'🦊'}  ${formData.name||'—'}` },
                        { label:'Location', val:`${formData.city||'—'}, ${formData.country||'—'}` },
                        { label:'Subjects', val:`${formData.subjects.length} subjects` },
                        { label:'Schedule', val:`${totalScheduledSlots} weekly slots` },
                        { label:'Language', val:formData.language==='ar'?'العربية 🇸🇦':'English 🇬🇧' },
                        { label:'Goal',     val:`${formData.dailyStudyHours}h / day` },
                      ].map((r,i) => (
                        <motion.div key={r.label}
                          initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                          transition={{ delay:0.2+i*0.05 }}
                          className="flex justify-between items-center relative z-10">
                          <span className="text-[10px] font-bold" style={{ color:`${theme.primary}80` }}>{r.label}</span>
                          <span className="text-[10px] font-black text-white">{r.val}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-5 pt-4" style={{ borderTop:`1px solid ${theme.primary}15` }}>
              {step > 0 && <BackBtn onClick={goPrev} color={theme.primary}/>}
              {step < 3
                ? <AnimeBtn onClick={goNext} gradient={theme.ctaGradient} color={theme.primary}>
                    Next <ArrowRight size={15}/>
                  </AnimeBtn>
                : <AnimeBtn onClick={handleComplete} loading={isFinishing} gradient={theme.ctaGradient} color={theme.primary}>
                    Start Adventure! 🚀
                  </AnimeBtn>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
