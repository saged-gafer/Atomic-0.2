"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  rotation: number;
  shape: 'rect' | 'circle' | 'star';
}

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
  count?: number;
  primaryColor?: string;
}

export default function ConfettiEffect({ active, duration = 3000, count = 40, primaryColor = '#a855f7' }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const colors = [primaryColor, '#facc15', '#f472b6', '#34d399', '#60a5fa', '#fb923c', '#a78bfa'];
    const newPieces: ConfettiPiece[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      delay: Math.random() * 0.8,
      rotation: Math.random() * 720 - 360,
      shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
    }));
    setPieces(newPieces);
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [active, duration, count, primaryColor]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
          {pieces.map(p => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: `${p.x}%`, top: -20 }}
              initial={{ y: -20, opacity: 1, rotate: 0, x: 0 }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 40 : 900,
                opacity: [1, 1, 1, 0],
                rotate: p.rotation,
                x: (Math.random() - 0.5) * 200,
              }}
              transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeIn' }}
            >
              {p.shape === 'rect' ? (
                <div style={{ width: p.size * 1.5, height: p.size * 0.7, background: p.color, borderRadius: 2 }}/>
              ) : p.shape === 'circle' ? (
                <div style={{ width: p.size, height: p.size, background: p.color, borderRadius: '50%' }}/>
              ) : (
                <svg width={p.size} height={p.size} viewBox="0 0 24 24">
                  <path d="M12 2L14 9L21 9L15.5 14L17.5 21L12 17L6.5 21L8.5 14L3 9L10 9Z" fill={p.color}/>
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
