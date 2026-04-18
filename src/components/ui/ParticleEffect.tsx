"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Particle = {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'sparkle' | 'star';
  color: string;
  size: number;
  vx: number;
  vy: number;
};

let globalId = 0;

interface ParticleEffectProps {
  trigger?: boolean;
  x?: number;
  y?: number;
  count?: number;
  primaryColor?: string;
  type?: 'hearts' | 'sparkles' | 'mixed';
}

export default function ParticleEffect({
  trigger = false,
  x = 50,
  y = 50,
  count = 8,
  primaryColor = '#a855f7',
  type = 'mixed',
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawnParticles = useCallback(() => {
    const colors = [primaryColor, '#facc15', '#f472b6', '#34d399', '#60a5fa'];
    const types: Particle['type'][] = type === 'hearts' ? ['heart'] : type === 'sparkles' ? ['sparkle', 'star'] : ['heart', 'sparkle', 'star'];
    const newParticles: Particle[] = Array.from({ length: count }).map(() => ({
      id: ++globalId,
      x,
      y,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 10 + Math.random() * 14,
      vx: (Math.random() - 0.5) * 120,
      vy: -(40 + Math.random() * 80),
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1400);
  }, [x, y, count, primaryColor, type]);

  useEffect(() => {
    if (trigger) spawnParticles();
  }, [trigger, spawnParticles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, x: p.vx, y: p.vy }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.type === 'heart' ? (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill={p.color}/>
              </svg>
            ) : p.type === 'sparkle' ? (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24">
                <g stroke={p.color} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="7"/>
                  <line x1="12" y1="17" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="7" y2="12"/>
                  <line x1="17" y1="12" x2="22" y2="12"/>
                  <line x1="4.9" y1="4.9" x2="8.4" y2="8.4"/>
                  <line x1="15.6" y1="15.6" x2="19.1" y2="19.1"/>
                  <line x1="19.1" y1="4.9" x2="15.6" y2="8.4"/>
                  <line x1="8.4" y1="15.6" x2="4.9" y2="19.1"/>
                </g>
                <circle cx="12" cy="12" r="3" fill={p.color}/>
              </svg>
            ) : (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24">
                <path d="M12 2L13.8 9.2L21 8L15.5 13L17.6 20L12 16L6.4 20L8.5 13L3 8L10.2 9.2Z"
                  fill={p.color} stroke={p.color} strokeWidth="0.5" strokeLinejoin="round"/>
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useParticles() {
  const [burst, setBurst] = useState<{ x: number; y: number; key: number } | null>(null);

  const triggerBurst = useCallback((x: number = 50, y: number = 50) => {
    setBurst({ x, y, key: Date.now() });
    setTimeout(() => setBurst(null), 100);
  }, []);

  return { burst, triggerBurst };
}
