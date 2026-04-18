"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppTheme = 'nebula' | 'jade' | 'cyberpunk' | 'midnight' | 'pastel';

export type ThemeConfig = {
  id: AppTheme;
  name: string;
  nameAr: string;
  bg: string;
  bgDeep: string;
  primary: string;
  secondary: string;
  accent: string;
  primaryGlow: string;
  secondaryGlow: string;
  blob1: string;
  blob2: string;
  blob3: string;
  blob4: string;
  cardBg: string;
  cardBorder: string;
  ctaGradient: string;
  glowClass: string;
  emoji: string;
};

export const THEMES: Record<AppTheme, ThemeConfig> = {
  nebula: {
    id: 'nebula',
    name: 'Nebula',
    nameAr: 'سديم',
    bg: '#030712',
    bgDeep: '#020510',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    primaryGlow: 'rgba(99,102,241,0.5)',
    secondaryGlow: 'rgba(139,92,246,0.4)',
    blob1: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
    blob3: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
    blob4: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
    cardBg: 'rgba(5,8,26,0.96)',
    cardBorder: 'rgba(99,102,241,0.25)',
    ctaGradient: 'linear-gradient(135deg,#4338ca,#6d28d9,#1d4ed8)',
    glowClass: 'nebula-glow',
    emoji: '🌌',
  },
  jade: {
    id: 'jade',
    name: 'Nature',
    nameAr: 'الطبيعة',
    bg: '#040d08',
    bgDeep: '#030a05',
    primary: '#10b981',
    secondary: '#f59e0b',
    accent: '#34d399',
    primaryGlow: 'rgba(16,185,129,0.5)',
    secondaryGlow: 'rgba(245,158,11,0.4)',
    blob1: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
    blob3: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
    blob4: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
    cardBg: 'rgba(4,14,8,0.96)',
    cardBorder: 'rgba(16,185,129,0.25)',
    ctaGradient: 'linear-gradient(135deg,#065f46,#b45309,#047857)',
    glowClass: 'jade-glow',
    emoji: '🌿',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    nameAr: 'سايبربانك',
    bg: '#000a0e',
    bgDeep: '#00060a',
    primary: '#00ffe7',
    secondary: '#ff003c',
    accent: '#ffe600',
    primaryGlow: 'rgba(0,255,231,0.5)',
    secondaryGlow: 'rgba(255,0,60,0.4)',
    blob1: 'radial-gradient(circle, rgba(0,255,231,0.2) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(255,0,60,0.15) 0%, transparent 70%)',
    blob3: 'radial-gradient(circle, rgba(255,230,0,0.12) 0%, transparent 70%)',
    blob4: 'radial-gradient(circle, rgba(0,255,231,0.07) 0%, transparent 70%)',
    cardBg: 'rgba(0,12,18,0.97)',
    cardBorder: 'rgba(0,255,231,0.3)',
    ctaGradient: 'linear-gradient(135deg,#00665c,#660018,#006655)',
    glowClass: 'cyberpunk-glow',
    emoji: '⚡',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    nameAr: 'منتصف الليل',
    bg: '#05071a',
    bgDeep: '#030514',
    primary: '#60a5fa',
    secondary: '#a78bfa',
    accent: '#f0abfc',
    primaryGlow: 'rgba(96,165,250,0.5)',
    secondaryGlow: 'rgba(167,139,250,0.4)',
    blob1: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
    blob3: 'radial-gradient(circle, rgba(240,171,252,0.13) 0%, transparent 70%)',
    blob4: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
    cardBg: 'rgba(6,8,28,0.97)',
    cardBorder: 'rgba(96,165,250,0.25)',
    ctaGradient: 'linear-gradient(135deg,#1e3a5f,#4c1d95,#1e3a5f)',
    glowClass: 'midnight-glow',
    emoji: '🌙',
  },
  pastel: {
    id: 'pastel',
    name: 'Pastel',
    nameAr: 'باستيل',
    bg: '#0f0a14',
    bgDeep: '#0a0710',
    primary: '#f9a8d4',
    secondary: '#c4b5fd',
    accent: '#86efac',
    primaryGlow: 'rgba(249,168,212,0.5)',
    secondaryGlow: 'rgba(196,181,253,0.4)',
    blob1: 'radial-gradient(circle, rgba(249,168,212,0.2) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 70%)',
    blob3: 'radial-gradient(circle, rgba(134,239,172,0.12) 0%, transparent 70%)',
    blob4: 'radial-gradient(circle, rgba(249,168,212,0.07) 0%, transparent 70%)',
    cardBg: 'rgba(18,10,22,0.97)',
    cardBorder: 'rgba(249,168,212,0.25)',
    ctaGradient: 'linear-gradient(135deg,#7c2d5a,#5b21b6,#1f5e3a)',
    glowClass: 'pastel-glow',
    emoji: '🌸',
  },
};

export const THEME_ORDER: AppTheme[] = ['nebula', 'jade', 'cyberpunk', 'midnight', 'pastel'];

type ThemeContextType = {
  theme: ThemeConfig;
  themeName: AppTheme;
  setTheme: (t: AppTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.nebula,
  themeName: 'nebula',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<AppTheme>('nebula');

  useEffect(() => {
    const saved = localStorage.getItem('atomic_theme') as AppTheme | null;
    if (saved && THEMES[saved]) {
      setThemeName(saved);
      applyThemeVars(saved);
    } else {
      applyThemeVars('nebula');
    }
  }, []);

  const applyThemeVars = (t: AppTheme) => {
    const cfg = THEMES[t];
    const root = document.documentElement;
    root.setAttribute('data-theme', t);
    root.style.setProperty('--theme-primary', cfg.primary);
    root.style.setProperty('--theme-secondary', cfg.secondary);
    root.style.setProperty('--theme-accent', cfg.accent);
    root.style.setProperty('--theme-bg', cfg.bg);
    root.style.setProperty('--blob1', cfg.blob1);
    root.style.setProperty('--blob2', cfg.blob2);
    root.style.setProperty('--blob3', cfg.blob3);
    root.style.setProperty('--blob4', cfg.blob4);
  };

  const setTheme = useCallback((t: AppTheme) => {
    setThemeName(t);
    localStorage.setItem('atomic_theme', t);
    applyThemeVars(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName(prev => {
      const idx = THEME_ORDER.indexOf(prev);
      const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      localStorage.setItem('atomic_theme', next);
      applyThemeVars(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeName], themeName, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
