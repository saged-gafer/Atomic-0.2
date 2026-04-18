"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { Zap } from 'lucide-react';

const LEVEL_NAMES = ['Stranger','Acquaintance','Friend','Study Buddy','Trusted Partner','Soul Bond','Legendary'];

function xpForLevel(level: number): number {
  return (level - 1) * (level - 1) * 100;
}

function xpForNextLevel(level: number): number {
  return level * level * 100;
}

interface StudyBondMeterProps {
  compact?: boolean;
  showLabel?: boolean;
}

export default function StudyBondMeter({ compact = false, showLabel = true }: StudyBondMeterProps) {
  const { studyXP, studyBondLevel } = useAppContext();
  const { theme } = useTheme();

  const currentLevelXP = xpForLevel(studyBondLevel);
  const nextLevelXP = xpForNextLevel(studyBondLevel);
  const progress = Math.min(((studyXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100, 100);
  const levelName = LEVEL_NAMES[Math.min(studyBondLevel - 1, LEVEL_NAMES.length - 1)];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1" style={{ color: theme.primary }}>
          <Zap size={12} fill={theme.primary}/>
          <span className="text-[11px] font-black">Lv.{studyBondLevel}</span>
        </div>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${theme.primary}20` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl"
      style={{ background: `${theme.primary}0a`, border: `1.5px solid ${theme.primary}20` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
            <Zap size={12} fill="white" color="white"/>
          </div>
          {showLabel && <span className="text-xs font-black text-white">Study Bond</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold" style={{ color: `${theme.primary}80` }}>{levelName}</span>
          <span className="text-xs font-black" style={{ color: theme.primary }}>Lv.{studyBondLevel}</span>
        </div>
      </div>

      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: `${theme.primary}18` }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-y-0 rounded-full opacity-60"
          style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)', width: `${progress}%` }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold" style={{ color: `${theme.primary}60` }}>
          {studyXP - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
        </span>
        <span className="text-[10px] font-bold" style={{ color: `${theme.primary}60` }}>
          Next: Lv.{studyBondLevel + 1}
        </span>
      </div>
    </div>
  );
}
