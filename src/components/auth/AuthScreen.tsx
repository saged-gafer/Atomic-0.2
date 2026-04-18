"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { FloatingInput } from '@/components/ui/FloatingInput';
import {
  Loader2, Shield, TrendingUp, Brain, Lock, ArrowRight,
  Sparkles, Users, BookOpen, Zap, Rocket, Star, Check,
  GraduationCap, Target, FlaskConical, ChevronRight,
} from 'lucide-react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

type Mode = 'login' | 'register';

/* ─── Theme ──────────────────────────────────────────── */
const T = {
  login: {
    orbs:      ['#4f46e5','#7c3aed','#0891b2','#312e81','#6366f1','#0e7490'],
    primary:   '#6366f1',
    secondary: '#8b5cf6',
    accent:    '#06b6d4',
    cta:       'linear-gradient(135deg,#4338ca,#6d28d9,#1d4ed8)',
    glow:      'rgba(99,102,241,0.22)',
    border:    'rgba(99,102,241,0.25)',
    tag:       '#818cf8',
    bg:        '#020510',
  },
  register: {
    orbs:      ['#9d174d','#b45309','#7c3aed','#831843','#c2410c','#6d28d9'],
    primary:   '#ec4899',
    secondary: '#f59e0b',
    accent:    '#10b981',
    cta:       'linear-gradient(135deg,#be185d,#7c3aed,#d97706)',
    glow:      'rgba(236,72,153,0.22)',
    border:    'rgba(236,72,153,0.25)',
    tag:       '#f472b6',
    bg:        '#0a0308',
  },
};

/* ─── Fluid Orbs Background ──────────────────────────── */
const ORB_PATHS = [
  { x: ['-5%','12%','-8%','-5%'],  y: ['-15%','5%','20%','-15%'],  s: [1,1.15,0.9,1],  dur: 22 },
  { x: ['55%','45%','65%','55%'],  y: ['-10%','15%','-5%','-10%'], s: [1,0.85,1.1,1],  dur: 28 },
  { x: ['25%','10%','40%','25%'],  y: ['60%','75%','55%','60%'],   s: [1,1.2,0.95,1],  dur: 18 },
  { x: ['-8%','5%','-12%','-8%'], y: ['45%','30%','65%','45%'],   s: [1,0.9,1.1,1],   dur: 32 },
  { x: ['68%','75%','60%','68%'],  y: ['55%','40%','70%','55%'],   s: [1,1.1,0.88,1],  dur: 24 },
  { x: ['35%','50%','20%','35%'],  y: ['5%','20%','12%','5%'],     s: [1,0.92,1.08,1], dur: 20 },
];

function FluidOrbs({ mode }: { mode: Mode }) {
  const colors = T[mode].orbs;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORB_PATHS.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? '55vw' : '40vw',
            height: i % 2 === 0 ? '55vw' : '40vw',
            filter: 'blur(120px)',
            opacity: 0.28,
            background: `radial-gradient(circle, ${colors[i]}cc 0%, ${colors[i]}22 60%, transparent 100%)`,
            left: p.x[0], top: p.y[0],
          }}
          animate={{ x: p.x, y: p.y, scale: p.s }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', times: [0,0.33,0.67,1] }}
        />
      ))}
      {/* Mode transition flash */}
      <AnimatePresence>
        <motion.div key={mode} className="absolute inset-0"
          initial={{ opacity: 0.5 }} animate={{ opacity: 0 }} transition={{ duration: 1.2 }}
          style={{ background: mode === 'login'
            ? 'radial-gradient(ellipse at 40% 40%, rgba(99,102,241,0.3) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 60% 60%, rgba(236,72,153,0.3) 0%, transparent 65%)' }}
        />
      </AnimatePresence>
    </div>
  );
}

/* ─── Scanlines ──────────────────────────────────────── */
const Scanlines = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30"
    style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.013) 0px,rgba(255,255,255,0.013) 1px,transparent 1px,transparent 4px)' }}
  />
);

/* ─── Typewriter ─────────────────────────────────────── */
function Typewriter({ texts, color }: { texts: string[]; color: string }) {
  const [idx, setIdx]     = useState(0);
  const [chars, setChars] = useState(0);
  const [del, setDel]     = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!del && chars < cur.length)   { const t = setTimeout(() => setChars(c => c+1), 52);  return () => clearTimeout(t); }
    if (!del && chars === cur.length) { const t = setTimeout(() => setDel(true), 2400);        return () => clearTimeout(t); }
    if (del  && chars > 0)            { const t = setTimeout(() => setChars(c => c-1), 28);   return () => clearTimeout(t); }
    if (del  && chars === 0)          { setDel(false); setIdx(i => (i+1) % texts.length); }
  }, [chars, del, idx, texts]);
  return (
    <span className="inline-flex items-center">
      <span style={{ color }} className="font-semibold">{texts[idx].slice(0, chars)}</span>
      <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.75, repeat: Infinity }}
        style={{ display: 'inline-block', width: 2, height: '1em', background: color, borderRadius: 1, marginLeft: 3 }}
      />
    </span>
  );
}

/* ─── Orbit Ring ─────────────────────────────────────── */
function OrbitRing({ size, dur, cw=true, color, dash=false }: { size:number; dur:number; cw?:boolean; color:string; dash?:boolean }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width:size, height:size, border:`1px ${dash?'dashed':'solid'} ${color}`, marginLeft:-size/2, marginTop:-size/2 }}
      animate={{ rotate: cw ? 360 : -360 }}
      transition={{ duration:dur, repeat:Infinity, ease:'linear' }}
    >
      <motion.div className="absolute w-2.5 h-2.5 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
        style={{ background:color, boxShadow:`0 0 12px 4px ${color}` }}
        animate={{ scale:[1,1.5,1] }}
        transition={{ duration: dur/3, repeat:Infinity }}
      />
    </motion.div>
  );
}

/* ─── Beam Sweep ─────────────────────────────────────── */
function BeamSweep({ color }: { color:string }) {
  return (
    <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-30"
      style={{ background:`linear-gradient(90deg,transparent,${color},transparent)` }}
      animate={{ top:['-1px','101%'] }}
      transition={{ duration:4, repeat:Infinity, ease:'linear', repeatDelay:2 }}
    />
  );
}

/* ─── Mouse Tilt Card ────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0); const my = useMotionValue(0);
  const rx  = useSpring(useTransform(my,[-0.5,0.5],[6,-6]),{stiffness:100,damping:18});
  const ry  = useSpring(useTransform(mx,[-0.5,0.5],[-6,6]),{stiffness:100,damping:18});
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX-r.left)/r.width-0.5);
    my.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d', perspective:900 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glitch Logo ────────────────────────────────────── */
function GlitchLogo({ color, accent }: { color:string; accent:string }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 380); }, 5000 + Math.random()*3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative select-none inline-block">
      <motion.span
        className="font-black tracking-tighter text-white"
        animate={g ? { x:[0,-4,4,-2,0], textShadow:[`0 0 0px rgba(0,0,0,0)`,`-3px 0 ${color}cc,3px 0 ${accent}cc`,`0 0 0px rgba(0,0,0,0)`] } : { textShadow:`0 0 40px ${color}60` }}
        transition={{ duration:0.35 }}
      >ATOMIC</motion.span>
      <AnimatePresence>
        {g && <>
          <motion.span className="absolute inset-0 font-black tracking-tighter pointer-events-none"
            style={{ color:`${color}80`, clipPath:'polygon(0 20%,100% 20%,100% 45%,0 45%)' }}
            initial={{ x:0 }} animate={{ x:[-6,6,0] }} transition={{ duration:0.3 }}
          >ATOMIC</motion.span>
          <motion.span className="absolute inset-0 font-black tracking-tighter pointer-events-none"
            style={{ color:`${accent}80`, clipPath:'polygon(0 58%,100% 58%,100% 78%,0 78%)' }}
            initial={{ x:0 }} animate={{ x:[5,-5,0] }} transition={{ duration:0.3 }}
          >ATOMIC</motion.span>
        </>}
      </AnimatePresence>
    </div>
  );
}

/* ─── Animated Counter ───────────────────────────────── */
function Counter({ to, suffix='' }: { to:number; suffix?:string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0; const step = to/(2.5*60);
    const id = setInterval(() => { v+=step; if(v>=to){setN(to);clearInterval(id);}else setN(Math.floor(v)); },1000/60);
    return () => clearInterval(id);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

/* ════════════════════════════════════════════════════════
   LOGIN LEFT PANEL
═══════════════════════════════════════════════════════ */
const LOGIN_STATS = [
  { icon:Users,    label:'Students',  to:12400, suffix:'+', color:'#818cf8' },
  { icon:BookOpen, label:'Sessions',  to:98000, suffix:'+', color:'#f472b6' },
  { icon:Zap,      label:'AI Insights',to:340,  suffix:'k', color:'#34d399' },
];
const LOGIN_FEATS = [
  { icon:Brain,      title:'AI Planning',    desc:'Personalized study schedules built by AI', color:'#818cf8' },
  { icon:TrendingUp, title:'Deep Analytics', desc:'Visual progress & streak tracking',        color:'#34d399' },
  { icon:Shield,     title:'100% Private',   desc:'All data stays on your device',             color:'#fb923c' },
];

function LoginLeft() {
  const th = T.login;
  return (
    <motion.div key="ll" initial={{ opacity:0,x:-50 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-50 }}
      transition={{ duration:0.75, ease:[0.22,1,0.36,1] }} className="flex flex-col gap-10"
    >
      {/* Hero text */}
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.35em] mb-4"
          style={{ color:`${th.primary}90` }}
          initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }}
        >Welcome back</motion.p>
        <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-black tracking-tighter leading-[0.9] text-white mb-4">
          <GlitchLogo color={th.primary} accent={th.accent} />
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          <Typewriter texts={['Elevate your learning with AI.','Every session counts.','Smarter study, better results.']} color={th.tag} />
        </p>
      </div>

      {/* Stats row */}
      <div className="flex gap-6">
        {LOGIN_STATS.map((s,i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3+i*0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
            className="flex flex-col gap-1"
          >
            <span className="text-2xl font-black text-white"><Counter to={s.to} suffix={s.suffix}/></span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color:s.color }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="flex flex-col gap-3">
        {LOGIN_FEATS.map((f,i) => (
          <motion.div key={f.title}
            initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.4+i*0.12, duration:0.65, ease:[0.22,1,0.36,1] }}
            whileHover={{ x:8, scale:1.02 }}
            className="flex items-center gap-4 p-4 rounded-2xl border cursor-default relative overflow-hidden group"
            style={{ background:`${f.color}08`, borderColor:`${f.color}22` }}
          >
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background:`linear-gradient(135deg,${f.color}06,rgba(0,0,0,0))` }}
            />
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background:`${f.color}18` }}>
              <f.icon size={18} style={{ color:f.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{f.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{f.desc}</p>
            </div>
            <motion.div animate={{ x:[0,4,0] }} transition={{ duration:2, repeat:Infinity, delay:i*0.4 }}>
              <ChevronRight size={14} style={{ color:`${f.color}60` }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   REGISTER LEFT PANEL
═══════════════════════════════════════════════════════ */
const REG_STEPS = [
  { icon:Rocket,          label:'Create your profile',     color:'#f472b6', desc:'Choose your username & language' },
  { icon:Brain,           label:'Build your study plan',   color:'#fbbf24', desc:'Pick subjects & set daily goals' },
  { icon:GraduationCap,   label:'Track your progress',     color:'#34d399', desc:'Sessions, streaks & analytics' },
  { icon:Star,            label:'Level up with AI',         color:'#a78bfa', desc:'Smart scheduling & insights' },
];

function RegisterLeft() {
  const th = T.register;
  return (
    <motion.div key="rl" initial={{ opacity:0,x:-50 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-50 }}
      transition={{ duration:0.75, ease:[0.22,1,0.36,1] }} className="flex flex-col gap-10"
    >
      <div>
        <motion.p className="text-xs font-black uppercase tracking-[0.35em] mb-4"
          style={{ color:`${th.primary}90` }}
          initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }}
        >Start your journey</motion.p>
        <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-black tracking-tighter leading-[0.9] text-white mb-4">
          <GlitchLogo color={th.primary} accent={th.accent} />
        </h1>
        <p className="text-xl text-slate-400">
          <Typewriter texts={['Your AI-powered study companion.','Learn smarter, not harder.','Achieve more every day.']} color={th.tag} />
        </p>
      </div>

      {/* Orbit visualization */}
      <motion.div className="relative w-52 h-52 flex items-center justify-center"
        initial={{ opacity:0,scale:0.5 }} animate={{ opacity:1,scale:1 }}
        transition={{ delay:0.4, duration:1, ease:[0.22,1,0.36,1] }}
      >
        <motion.div className="absolute rounded-full blur-[60px] w-48 h-48"
          style={{ background:`${th.primary}20` }}
          animate={{ scale:[1,1.3,1], opacity:[0.4,0.9,0.4] }}
          transition={{ duration:4, repeat:Infinity }}
        />
        <OrbitRing size={208} dur={20} color={`${th.primary}45`} />
        <OrbitRing size={158} dur={14} cw={false} color={`${th.secondary}40`} dash />
        <OrbitRing size={108} dur={8}  color={`${th.accent}45`} />
        <motion.div className="absolute z-10 w-20 h-20 rounded-[1.6rem] flex items-center justify-center"
          style={{ background:`linear-gradient(135deg,${th.primary},${th.secondary})` }}
          animate={{ boxShadow:[`0 0 30px ${th.primary}60,0 0 60px ${th.primary}20`,`0 0 50px ${th.secondary}70,0 0 80px ${th.secondary}25`,`0 0 30px ${th.primary}60,0 0 60px ${th.primary}20`], rotate:[0,4,-4,0] }}
          transition={{ duration:4, repeat:Infinity }}
        >
          <motion.span className="text-3xl font-black text-white select-none"
            animate={{ scale:[1,1.08,1] }} transition={{ duration:3, repeat:Infinity }}
          >A</motion.span>
        </motion.div>
      </motion.div>

      {/* Timeline steps */}
      <div className="flex flex-col gap-0">
        {REG_STEPS.map((s,i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.5+i*0.12, duration:0.6, ease:[0.22,1,0.36,1] }}
            className="flex items-start gap-4 relative"
          >
            {/* timeline line */}
            {i < REG_STEPS.length-1 && (
              <div className="absolute left-4 top-9 bottom-0 w-px" style={{ background:`linear-gradient(to bottom,${s.color}40,transparent)` }} />
            )}
            <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 relative z-10"
              style={{ background:`${s.color}20`, border:`1px solid ${s.color}35` }}
              whileHover={{ scale:1.15, rotate:10 }} transition={{ type:'spring',stiffness:400,damping:15 }}
            >
              <s.icon size={14} style={{ color:s.color }} />
            </motion.div>
            <div className="pb-5 flex-1">
              <p className="text-sm font-bold text-white">{s.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   LOGIN FORM CARD
═══════════════════════════════════════════════════════ */
function LoginCard({ username, password, setUsername, setPassword, errors, setErrors, shake, isSubmitting, onSubmit, onSwitch, hasStored }: {
  username:string; password:string; setUsername:(v:string)=>void; setPassword:(v:string)=>void;
  errors:Record<string,string|undefined>; setErrors:(e:Record<string,string|undefined>)=>void;
  shake:boolean; isSubmitting:boolean; onSubmit:()=>void; onSwitch:()=>void; hasStored:boolean;
}) {
  const th = T.login;
  return (
    <motion.div key="login-card"
      initial={{ opacity:0, x:40, filter:'blur(10px)' }}
      animate={{ opacity:1, x:0, filter:'blur(0px)' }}
      exit={{ opacity:0, x:-40, filter:'blur(10px)' }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
    >
      <TiltCard>
        <div className="relative rounded-[2.2rem] overflow-hidden"
          style={{ background:'rgba(6,8,26,0.97)', backdropFilter:'blur(40px)', boxShadow:`0 0 0 1px ${th.border},0 40px 100px -15px rgba(0,0,0,0.98),0 0 80px -15px ${th.primary}40` }}
        >
          <BeamSweep color={`${th.primary}80`} />

          {/* Top gradient bar */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
            animate={{ background:[
              `linear-gradient(90deg,rgba(0,0,0,0),${th.primary},${th.secondary},rgba(0,0,0,0))`,
              `linear-gradient(90deg,rgba(0,0,0,0),${th.secondary},${th.primary},rgba(0,0,0,0))`,
            ]}}
            transition={{ duration:3, repeat:Infinity, ease:'linear' }}
          />

          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[60px] pointer-events-none" style={{ background:`${th.primary}25` }} />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-[50px] pointer-events-none" style={{ background:`${th.accent}15` }} />

          <div className="relative z-10 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  animate={{ background:`linear-gradient(135deg,${th.primary},${th.secondary})` }} transition={{ duration:0.8 }}
                >
                  <Sparkles size={14} className="text-white" />
                </motion.div>
                <span className="text-sm font-black text-white tracking-wider">ATOMIC</span>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)' }}>
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity:[1,0.2,1], scale:[1,1.4,1] }} transition={{ duration:1.4, repeat:Infinity }}
                  />
                  <span className="text-[10px] font-bold text-emerald-400">Online</span>
                </div>
              </div>
              <motion.h2 className="text-3xl font-black text-white mb-1 tracking-tight"
                initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
              >Welcome back 👋</motion.h2>
              <motion.p className="text-slate-500 text-sm"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
              >Sign in to continue your learning journey</motion.p>
            </div>

            {/* Form */}
            <motion.form
              animate={shake ? { x:[-8,8,-5,5,-2,2,0] } : { x:0 }}
              transition={{ duration:0.45 }}
              onSubmit={e => { e.preventDefault(); onSubmit(); }}
              className="space-y-4"
            >
              <FloatingInput label="Username" value={username}
                onChange={e => { setUsername(e.target.value); setErrors({}); }}
                error={errors.username} autoComplete="username"
              />
              <FloatingInput label="Password" type="password" value={password}
                onChange={e => { setPassword(e.target.value); setErrors({}); }}
                error={errors.password} autoComplete="current-password"
              />
              <input type="submit" className="hidden" />
            </motion.form>

            <AnimatePresence>
              {errors.credentials && (
                <motion.div initial={{ opacity:0,y:-8,scale:0.95 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,scale:0.95 }}
                  className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                  style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}
                >
                  <Lock size={12} className="text-red-400 shrink-0" />
                  <p className="text-xs font-bold text-red-400">{errors.credentials}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <CTAButton label="Sign In" gradient={th.cta} color={th.primary} loading={isSubmitting} onClick={onSubmit} className="mt-6" />

            {/* Switch */}
            {!hasStored && (
              <motion.p className="mt-5 text-center text-xs text-slate-600"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
              >
                No account yet?{' '}
                <button onClick={onSwitch} className="font-bold hover:underline underline-offset-2" style={{ color:T.register.primary }}>
                  Create one free →
                </button>
              </motion.p>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   REGISTER FORM CARD
═══════════════════════════════════════════════════════ */
function RegisterCard({ onStart, onSwitch, hasStored }: { onStart:()=>void; onSwitch:()=>void; hasStored:boolean }) {
  const th = T.register;
  return (
    <motion.div key="reg-card"
      initial={{ opacity:0, x:40, filter:'blur(10px)' }}
      animate={{ opacity:1, x:0, filter:'blur(0px)' }}
      exit={{ opacity:0, x:-40, filter:'blur(10px)' }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
    >
      <TiltCard>
        <div className="relative rounded-[2.2rem] overflow-hidden"
          style={{ background:'rgba(10,4,16,0.97)', backdropFilter:'blur(40px)', boxShadow:`0 0 0 1px ${th.border},0 40px 100px -15px rgba(0,0,0,0.98),0 0 80px -15px ${th.primary}40` }}
        >
          <BeamSweep color={`${th.primary}80`} />

          {/* Top bar */}
          <motion.div className="absolute top-0 left-0 right-0 h-[2px] z-30"
            animate={{ background:[
              `linear-gradient(90deg,rgba(0,0,0,0),${th.primary},${th.secondary},rgba(0,0,0,0))`,
              `linear-gradient(90deg,rgba(0,0,0,0),${th.secondary},${th.primary},rgba(0,0,0,0))`,
            ]}}
            transition={{ duration:3, repeat:Infinity, ease:'linear' }}
          />

          <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[60px] pointer-events-none" style={{ background:`${th.primary}25` }} />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-[50px] pointer-events-none" style={{ background:`${th.accent}12` }} />

          <div className="relative z-10 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  animate={{ background:`linear-gradient(135deg,${th.primary},${th.secondary})` }} transition={{ duration:0.8 }}
                >
                  <Rocket size={14} className="text-white" />
                </motion.div>
                <span className="text-sm font-black text-white tracking-wider">ATOMIC</span>
                <div className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{ background:`${th.primary}18`, border:`1px solid ${th.primary}35`, color:th.primary }}
                >Free Forever</div>
              </div>
              <motion.h2 className="text-3xl font-black text-white mb-1 tracking-tight"
                initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
              >Join ATOMIC 🚀</motion.h2>
              <motion.p className="text-slate-500 text-sm"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
              >Set up your account in under 2 minutes</motion.p>
            </div>

            {/* Steps preview */}
            <div className="space-y-3 mb-6">
              {REG_STEPS.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.15+i*0.09, ease:[0.22,1,0.36,1] }}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border"
                  style={{ background:`${s.color}07`, borderColor:`${s.color}20` }}
                >
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background:`${s.color}20` }}>
                    <s.icon size={13} style={{ color:s.color }} />
                  </div>
                  <span className="text-xs font-bold text-white flex-1">{i+1}. {s.label}</span>
                  <motion.div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background:`${s.color}20` }}
                    animate={{ scale:[1,1.2,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.5 }}
                  >
                    <Check size={9} style={{ color:s.color }} />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <CTAButton label="Get Started Free" gradient={th.cta} color={th.primary} loading={false} onClick={onStart} />

            {hasStored && (
              <motion.p className="mt-5 text-center text-xs text-slate-600"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
              >
                Already registered?{' '}
                <button onClick={onSwitch} className="font-bold hover:underline underline-offset-2" style={{ color:T.login.primary }}>
                  Sign in →
                </button>
              </motion.p>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─── CTA Button ─────────────────────────────────────── */
function CTAButton({ label, gradient, color, loading, onClick, className='' }: {
  label:string; gradient:string; color:string; loading:boolean; onClick:()=>void; className?:string;
}) {
  const [burst, setBurst] = useState(false);
  const handle = () => { setBurst(true); setTimeout(() => setBurst(false), 600); onClick(); };
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {burst && Array.from({length:10},(_,i) => {
          const a = (i/10)*Math.PI*2;
          return (
            <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-50"
              style={{ background:color, left:'50%', top:'50%' }}
              initial={{ x:0,y:0,opacity:1,scale:1 }}
              animate={{ x:Math.cos(a)*45, y:Math.sin(a)*35, opacity:0, scale:0 }}
              transition={{ duration:0.55, ease:'easeOut' }}
            />
          );
        })}
      </AnimatePresence>
      <motion.button onClick={handle} disabled={loading}
        whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.96 }}
        className="relative w-full overflow-hidden rounded-2xl font-black text-white"
        style={{ height:54 }}
      >
        <motion.div className="absolute inset-0" animate={{ background:gradient }} transition={{ duration:0.8 }} />
        <motion.div className="absolute inset-0"
          style={{ background:'linear-gradient(105deg,rgba(0,0,0,0) 30%,rgba(255,255,255,0.2) 50%,rgba(0,0,0,0) 70%)' }}
          animate={{ x:['-100%','200%'] }} transition={{ duration:2.4, repeat:Infinity, repeatDelay:0.8 }}
        />
        <motion.div className="absolute inset-0 rounded-2xl"
          animate={{ boxShadow:[`0 0 0px ${color}00`,`0 0 28px ${color}55`,`0 0 0px ${color}00`] }}
          transition={{ duration:2.5, repeat:Infinity }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[13px] tracking-widest uppercase">
          {loading ? <Loader2 size={18} className="animate-spin" />
            : <>
                {label}
                <motion.div animate={{ x:[0,5,0] }} transition={{ duration:1.5, repeat:Infinity }}>
                  <ArrowRight size={16} />
                </motion.div>
              </>
          }
        </span>
      </motion.button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export default function AuthScreen() {
  const { login } = useAppContext();
  const [hasStored,      setHasStored]      = useState(false);
  const [mode,           setMode]           = useState<Mode>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username,       setUsername]       = useState('');
  const [password,       setPassword]       = useState('');
  const [errors,         setErrors]         = useState<Record<string,string|undefined>>({});
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [shake,          setShake]          = useState(false);
  const [mounted,        setMounted]        = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const s = localStorage.getItem('study_planner_user_data');
      setHasStored(!!s);
      setMode(s ? 'login' : 'register');
    }, 0);
  }, []);

  const triggerShake = useCallback(() => { setShake(true); setTimeout(() => setShake(false), 600); }, []);

  const handleLogin = useCallback(() => {
    const e: Record<string,string> = {};
    if (!username.trim()) e.username = 'Username is required';
    if (!password.trim()) e.password = 'Password is required';
    if (Object.keys(e).length) { setErrors(e); triggerShake(); return; }
    setIsSubmitting(true);
    const ok = login(username.trim(), password.trim());
    if (!ok) { setErrors({ credentials:'Incorrect username or password.' }); setIsSubmitting(false); triggerShake(); }
  }, [username, password, login, triggerShake]);

  const switchMode = (next: Mode) => { setErrors({}); setMode(next); };

  if (showOnboarding) return <OnboardingFlow />;

  const th = T[mode];

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      {/* Base background */}
      <motion.div className="absolute inset-0"
        animate={{ background: mode === 'login'
          ? 'radial-gradient(ellipse at 20% 50%,#07082e 0%,#020510 50%,#020816 100%)'
          : 'radial-gradient(ellipse at 80% 50%,#1a0614 0%,#0a0308 50%,#0a0510 100%)' }}
        transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
      />

      <Scanlines />
      {mounted && <FluidOrbs mode={mode} />}

      {/* ══ Mode toggle – top center on mobile ══ */}
      <motion.div
        className="absolute top-5 left-1/2 -translate-x-1/2 flex rounded-2xl p-1 z-50 lg:hidden"
        style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)' }}
      >
        <motion.div className="absolute top-1 bottom-1 rounded-xl z-0"
          animate={{ left:mode==='login'?4:'50%', right:mode==='login'?'50%':4, background:`${th.primary}30` }}
          transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
        />
        {(['login','register'] as Mode[]).map(m => (
          <motion.button key={m} onClick={() => switchMode(m)} whileTap={{ scale:0.94 }}
            className={`px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] relative z-10 rounded-xl transition-colors duration-300 ${mode===m?(m==='login'?'text-indigo-400':'text-pink-400'):'text-slate-600'}`}
          >{m==='login'?'Sign In':'Register'}</motion.button>
        ))}
      </motion.div>

      {/* ══ LEFT PANEL ══ */}
      <div className="hidden lg:flex flex-col justify-center flex-1 relative overflow-hidden px-14 xl:px-20">
        {/* Vertical divider */}
        <motion.div className="absolute right-0 top-[10%] bottom-[10%] w-px"
          animate={{ background:`linear-gradient(to bottom,rgba(0,0,0,0),${th.primary}25,rgba(0,0,0,0))` }}
          transition={{ duration:0.9 }}
        />

        <div className="relative z-10 max-w-lg">
          <AnimatePresence mode="wait">
            {mode === 'login' ? <LoginLeft key="ll"/> : <RegisterLeft key="rl"/>}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="flex-1 lg:max-w-[500px] flex items-center justify-center p-5 sm:p-8 relative min-h-screen lg:min-h-0">
        {/* Panel glow */}
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background:`radial-gradient(ellipse at 50% 50%,${th.glow} 0%,rgba(0,0,0,0) 65%)` }}
          transition={{ duration:1 }}
        />

        {/* Mode toggle – desktop, inside right panel */}
        <motion.div
          className="absolute top-6 right-8 hidden lg:flex rounded-2xl p-1 z-50"
          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)' }}
        >
          <motion.div className="absolute top-1 bottom-1 rounded-xl z-0"
            animate={{ left:mode==='login'?4:'50%', right:mode==='login'?'50%':4, background:`${th.primary}30` }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
          />
          {(['login','register'] as Mode[]).map(m => (
            <motion.button key={m} onClick={() => switchMode(m)} whileTap={{ scale:0.94 }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] relative z-10 rounded-xl transition-colors duration-300 ${mode===m?(m==='login'?'text-indigo-400':'text-pink-400'):'text-slate-600'}`}
            >{m==='login'?'Sign In':'Register'}</motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ y:30,opacity:0 }} animate={{ y:0,opacity:1 }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          className="relative w-full max-w-md z-10"
        >
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <LoginCard key="lc"
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                errors={errors} setErrors={setErrors}
                shake={shake} isSubmitting={isSubmitting}
                onSubmit={handleLogin}
                onSwitch={() => switchMode('register')}
                hasStored={hasStored}
              />
            ) : (
              <RegisterCard key="rc"
                onStart={() => setShowOnboarding(true)}
                onSwitch={() => switchMode('login')}
                hasStored={hasStored}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
