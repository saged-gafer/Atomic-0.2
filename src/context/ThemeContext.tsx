"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppTheme = 'nebula' | 'jade';

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
  },
  jade: {
    id: 'jade',
    name: 'Jade Dusk',
    nameAr: 'الزمرد',
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
  },
};

type ThemeContextType = {
  theme: ThemeConfig;
  themeName: AppTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.nebula,
  themeName: 'nebula',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<AppTheme>('nebula');

  useEffect(() => {
    const saved = localStorage.getItem('atomic_theme') as AppTheme | null;
    if (saved && THEMES[saved]) {
      setThemeName(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'nebula');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName(prev => {
      const next: AppTheme = prev === 'nebula' ? 'jade' : 'nebula';
      localStorage.setItem('atomic_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeName], themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
