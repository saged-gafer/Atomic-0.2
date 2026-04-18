"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, defaultSubjects, UserData } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, Check, Loader2, User, Lock, MapPin, Globe, Link2, ArrowRight, ArrowLeft } from 'lucide-react';
import { fetchPrayerTimes } from '@/services/prayerTimes';
import AnimeMascot from '@/components/anime/AnimeMascot';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const STEP_CONFIG = [
  { label:'Profile',  emoji:'👤', mascotPose:'wave'    as const, mascotExpr:'happy'    as const, hint:'Tell us about yourself!' },
  { label:'Subjects', emoji:'📚', mascotPose:'study'   as const, mascotExpr:'focused'  as const, hint:'Pick your subjects!' },
  { label:'Schedule', emoji:'📅', mascotPose:'think'   as const, mascotExpr:'focused'  as const, hint:'Plan your week!' },
  { label:'Goals',    emoji:'🎯', mascotPose:'success' as const, mascotExpr:'excited'  as const, hint:"Let's set your goals!" },
];

/* ── Anime step indicator ────────────────────────────── */
function StepIndicator({ step, total, primary, secondary }: { step:number; total:number; primary:string; secondary:string }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {Array.from({ length:total }).map((_,i) => {
        const cfg = STEP_CONFIG[i];
        const done   = i < step;
        const active = i === step;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <motion.div className="h-[3px] w-8 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
                <motion.div className="h-full rounded-full"
                  animate={{ scaleX:done?1:0 }}
                  style={{ background:`linear-gradient(90deg,${primary},${secondary})`, transformOrigin:'left' }}
                  transition={{ duration:0.5 }}
                />
              </motion.div>
            )}
            <motion.div className="flex flex-col items-center gap-1"
              animate={{ scale:active?1.12:1 }}
              transition={{ type:'spring', stiffness:400, damping:25 }}
            >
              <motion.div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black relative overflow-hidden"
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
                style={{ border:'2.5px solid' }}
                transition={{ duration:0.4 }}
              >
                {done
                  ? <motion.span initial={{ scale:0, rotate:-45 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', stiffness:500 }}>✓</motion.span>
                  : <span>{cfg.emoji}</span>
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

/* ── Main ───────────────────────────────────────────────*/
export default function OnboardingFlow() {
  const { setUserData } = useAppContext();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name:'', username:'', password:'', language:'en', city:'', country:'',
    weeklySchedule:{}, dailyStudyHours:4, subjects:defaultSubjects, sideTasks:[], logs:[],
  });
  const [newSubjectName, setNewSubjectName] = useState('');
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const t = translations[formData.language];

  const validateStep0 = useCallback(() => {
    const e: Record<string,string> = {};
    if (!formData.name.trim())     e.name     = 'Name is required!';
    if (!formData.username?.trim()) e.username = 'Username is required!';
    if (!formData.password?.trim()) e.password = 'Password is required!';
    if (!formData.city?.trim())    e.city     = 'City is required!';
    if (!formData.country?.trim()) e.country  = 'Country is required!';
    setErrors(e); return Object.keys(e).length === 0;
  }, [formData]);

  const goNext = useCallback(() => {
    if (step === 0 && !validateStep0()) return;
    setPrevStep(step); setStep(s => s + 1);
  }, [step, validateStep0]);

  const goPrev = useCallback(() => { setPrevStep(step); setStep(s => s - 1); }, [step]);

  const handleComplete = useCallback(async () => {
    setIsFinishing(true);
    let prayerTimes = null;
    if (formData.city && formData.country) prayerTimes = await fetchPrayerTimes(formData.city, formData.country);
    setUserData({ ...formData, prayerTimes: prayerTimes || undefined });
  }, [formData, setUserData]);

  const addCustomSubject = useCallback(() => {
    if (newSubjectName.trim()) {
      const colors = [theme.primary, theme.secondary, theme.accent, '#facc15','#4ade80','#f97316','#e879f9'];
      setFormData(fd => ({
        ...fd,
        subjects:[...fd.subjects,{
          id:Math.random().toString(36).substr(2,9),
          name:newSubjectName.trim(),
          color:colors[Math.floor(Math.random()*colors.length)],
          icon:'Book', tasks:[],
        }],
      }));
      setNewSubjectName('');
    }
  }, [newSubjectName, theme]);

  const dir = step > prevStep ? 1 : -1;
  const slideV = {
    initial:  { opacity:0, x:dir*50, filter:'blur(6px)' },
    animate:  { opacity:1, x:0,      filter:'blur(0px)' },
    exit:     { opacity:0, x:dir*-50, filter:'blur(6px)' },
  };
  const tr = { duration:0.4, ease:[0.22,1,0.36,1] as [number,number,number,number] };

  const stepCfg = STEP_CONFIG[step];

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

      {/* Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none"
        style={{ background:`${theme.primary}18` }}/>
      <div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[100px] pointer-events-none"
        style={{ background:`${theme.secondary}14` }}/>

      <div className="relative z-10 w-full max-w-lg px-4">
        {/* Header with mascot */}
        <motion.div className="text-center mb-4"
          initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        >
          <div className="flex justify-center mb-1">
            {mounted && (
              <AnimeMascot
                pose={stepCfg.mascotPose}
                expression={stepCfg.mascotExpr}
                size={100}
                primaryColor={theme.primary}
              />
            )}
          </div>
          <motion.div
            className="inline-block px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest mb-1"
            style={{ background:`${theme.primary}15`, border:`2px solid ${theme.primary}35`, color:theme.primary }}
          >
            {stepCfg.hint}
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

          <div className="relative z-10 p-7">
            {/* Step indicator */}
            <StepIndicator step={step} total={4} primary={theme.primary} secondary={theme.secondary}/>

            {/* Step content */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait" initial={false}>
                {/* ── STEP 0: Profile ── */}
                {step === 0 && (
                  <motion.div key="s0" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-black text-white mb-0.5">Set Up Your Profile</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}70` }}>Tell us who you are, hero! 🎌</p>
                    </div>

                    <FloatingInput label="Full Name *" value={formData.name}
                      onChange={e => { setFormData(fd => ({...fd,name:e.target.value})); setErrors({}); }}
                      error={errors.name}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FloatingInput label="Username *" value={formData.username||''}
                        onChange={e => { setFormData(fd => ({...fd,username:e.target.value})); setErrors({}); }}
                        error={errors.username} autoComplete="username"
                      />
                      <FloatingInput label="Password *" type="password" value={formData.password||''}
                        onChange={e => { setFormData(fd => ({...fd,password:e.target.value})); setErrors({}); }}
                        error={errors.password} autoComplete="new-password"
                      />
                    </div>
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
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color:`${theme.primary}60` }}>
                        Language / اللغة
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[{lang:'en',label:'English',flag:'🇬🇧'},{lang:'ar',label:'العربية',flag:'🇸🇦'}].map(({lang,label,flag}) => (
                          <motion.button key={lang}
                            onClick={() => {
                              if (validateStep0()) {
                                setFormData(fd => ({...fd, language:lang as 'en'|'ar'}));
                                setTimeout(goNext, 10);
                              }
                            }}
                            whileHover={{ scale:1.03,y:-2 }} whileTap={{ scale:0.96 }}
                            className="flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-sm border relative overflow-hidden"
                            style={{
                              background: formData.language===lang ? `${theme.primary}15`:'rgba(255,255,255,0.02)',
                              borderColor: formData.language===lang ? `${theme.primary}60`:'rgba(255,255,255,0.08)',
                              color: formData.language===lang ? theme.primary:'rgba(200,200,220,0.7)',
                              boxShadow: formData.language===lang ? `0 0 15px ${theme.primary}20`:'none',
                            }}
                          >
                            <motion.div className="absolute inset-0"
                              style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.1) 50%,transparent 70%)' }}
                              animate={{ x:['-120%','220%'] }} transition={{ duration:2.2, repeat:Infinity, repeatDelay:1 }}
                            />
                            <span className="text-lg relative z-10">{flag}</span>
                            <span className="relative z-10">{label}</span>
                            <ArrowRight size={12} className="relative z-10 opacity-50"/>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 1: Subjects ── */}
                {step === 1 && (
                  <motion.div key="s1" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-black text-white mb-0.5">Your Study Subjects</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}70` }}>What are you studying? Pick your weapons! ⚔️</p>
                    </div>

                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                      {formData.subjects.map((sub,i) => (
                        <motion.div key={sub.id}
                          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                          transition={{ delay:i*0.05, type:'spring', stiffness:300, damping:25 }}
                          className="flex items-center gap-3 p-3 rounded-2xl border"
                          style={{ background:`${sub.color}08`, borderColor:`${sub.color}30` }}
                        >
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ background:sub.color, boxShadow:`0 0 6px ${sub.color}` }}/>
                          <FloatingInput label={`${sub.name} — link (optional)`} value={sub.link||''}
                            onChange={e => setFormData(fd => ({
                              ...fd, subjects:fd.subjects.map(s => s.id===sub.id ? {...s,link:e.target.value.trim()||undefined} : s)
                            }))}
                          />
                          {!defaultSubjects.find(d => d.id===sub.id) && (
                            <motion.button whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}
                              onClick={() => setFormData(fd => ({...fd, subjects:fd.subjects.filter(s=>s.id!==sub.id)}))}
                              className="p-1.5 rounded-xl text-red-400/70 hover:text-red-400"
                            >
                              <Trash2 size={12}/>
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Add subject */}
                    <div className="flex gap-2">
                      <input
                        value={newSubjectName}
                        onChange={e => setNewSubjectName(e.target.value)}
                        onKeyDown={e => e.key==='Enter' && addCustomSubject()}
                        placeholder="+ Add custom subject..."
                        className="flex-1 h-10 px-4 rounded-2xl text-sm font-bold text-white outline-none border"
                        style={{ background:'rgba(255,255,255,0.04)', borderColor:`${theme.primary}25` }}
                      />
                      <motion.button onClick={addCustomSubject}
                        whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ background:`${theme.primary}20`, border:`2px solid ${theme.primary}40`, color:theme.primary }}
                      >
                        <Plus size={16}/>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Schedule ── */}
                {step === 2 && (
                  <motion.div key="s2" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-black text-white mb-0.5">Weekly Schedule</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}70` }}>Plan your battles! Choose subjects for each day 📅</p>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {DAYS.map((day,di) => (
                        <motion.div key={day}
                          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                          transition={{ delay:di*0.04 }}
                          className="rounded-2xl p-3 border"
                          style={{ background:'rgba(255,255,255,0.02)', borderColor:`${theme.primary}15` }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ background:theme.primary }}/>
                            <span className="text-xs font-black text-white">{day}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {formData.subjects.map((sub) => {
                              const checked = (formData.weeklySchedule[day]||[]).includes(sub.id);
                              return (
                                <motion.button key={sub.id}
                                  whileHover={{ scale:1.06 }} whileTap={{ scale:0.93 }}
                                  onClick={() => setFormData(fd => {
                                    const curr = fd.weeklySchedule[day]||[];
                                    const next = checked ? curr.filter(id=>id!==sub.id) : [...curr,sub.id];
                                    return {...fd, weeklySchedule:{...fd.weeklySchedule,[day]:next}};
                                  })}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold"
                                  style={{
                                    background:checked ? `${sub.color}22`:'rgba(255,255,255,0.04)',
                                    border:`1.5px solid ${checked ? sub.color+'55':'rgba(255,255,255,0.07)'}`,
                                    color:checked ? sub.color:'rgba(150,150,180,0.7)',
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
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Goals ── */}
                {step === 3 && (
                  <motion.div key="s3" variants={slideV} initial="initial" animate="animate" exit="exit" transition={tr} className="space-y-5">
                    <div className="mb-4">
                      <h2 className="text-xl font-black text-white mb-0.5">Daily Study Goal</h2>
                      <p className="text-xs font-medium" style={{ color:`${theme.primary}70` }}>How many hours per day will you study? 🔥</p>
                    </div>

                    {/* Hours selector */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">Daily Hours</span>
                        <span className="text-3xl font-black" style={{ color:theme.primary }}>{formData.dailyStudyHours}h</span>
                      </div>
                      <div className="relative h-3 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
                        <motion.div className="absolute left-0 top-0 bottom-0 rounded-full"
                          animate={{ width:`${(formData.dailyStudyHours/12)*100}%` }}
                          style={{ background:`linear-gradient(90deg,${theme.primary},${theme.secondary})`, boxShadow:`0 0 10px ${theme.primary}60` }}
                          transition={{ type:'spring', stiffness:200, damping:25 }}
                        />
                      </div>
                      <input type="range" min={1} max={12} step={0.5} value={formData.dailyStudyHours}
                        onChange={e => setFormData(fd => ({...fd, dailyStudyHours:parseFloat(e.target.value)}))}
                        className="w-full accent-purple-500"
                        style={{ accentColor:theme.primary }}
                      />
                      <div className="flex justify-between text-[9px] font-bold" style={{ color:`${theme.primary}50` }}>
                        <span>1h</span><span>3h</span><span>6h</span><span>9h</span><span>12h</span>
                      </div>
                    </div>

                    {/* Motivation messages */}
                    {[
                      { hours:[1,2],  msg:'Good start! Every minute counts! ⭐',  color:'#4ade80' },
                      { hours:[3,4],  msg:'Solid dedication! You are committed! 🔥', color:theme.primary },
                      { hours:[5,6],  msg:'Intense focus! Study hero material! ⚡',  color:theme.secondary },
                      { hours:[7,12], msg:'LEGENDARY mode! Take breaks too! 🏆',    color:'#facc15' },
                    ].filter(m => formData.dailyStudyHours >= m.hours[0] && formData.dailyStudyHours <= m.hours[1])
                      .map(m => (
                        <motion.div key={m.msg}
                          initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
                          className="p-3 rounded-2xl text-xs font-black text-center"
                          style={{ background:`${m.color}12`, border:`2px solid ${m.color}30`, color:m.color }}
                        >
                          {m.msg}
                        </motion.div>
                      ))
                    }

                    {/* Summary preview */}
                    <motion.div className="rounded-2xl p-4 space-y-2"
                      style={{ background:`${theme.primary}08`, border:`2px solid ${theme.primary}25` }}
                    >
                      <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:`${theme.primary}80` }}>✨ Your Setup Summary</p>
                      {[
                        { label:'Name',     val:formData.name },
                        { label:'Username', val:formData.username||'' },
                        { label:'City',     val:`${formData.city||''}, ${formData.country||''}` },
                        { label:'Subjects', val:`${formData.subjects.length} subjects` },
                        { label:'Language', val:formData.language==='ar'?'العربية':'English' },
                        { label:'Study',    val:`${formData.dailyStudyHours}h/day` },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between items-center">
                          <span className="text-[10px] font-bold" style={{ color:`${theme.primary}60` }}>{r.label}</span>
                          <span className="text-[10px] font-black text-white">{r.val}</span>
                        </div>
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
