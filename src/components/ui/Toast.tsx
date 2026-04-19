"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface ToastItem { id: string; type: ToastType; message: string; }

interface ToastContextType { toast: (type: ToastType, message: string) => void; }
const ToastCtx = createContext<ToastContextType | null>(null);

const STYLES: Record<ToastType, { bg: string; border: string; color: string; Icon: React.ElementType }> = {
  success: { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.4)',  color: '#34d399', Icon: CheckCircle },
  error:   { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.4)',   color: '#f87171', Icon: XCircle    },
  info:    { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.4)',  color: '#818cf8', Icon: Info        },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(p => [...p, { id, type, message }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = (id: string) => setToasts(p => p.filter(t => t.id !== id));

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none" style={{ width: 300 }}>
        <AnimatePresence>
          {toasts.map(t => {
            const s = STYLES[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ x: 80, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 80, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex items-start gap-3 px-4 py-3 rounded-2xl pointer-events-auto cursor-pointer select-none"
                style={{ background: s.bg, border: `1.5px solid ${s.border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                onClick={() => dismiss(t.id)}
              >
                <s.Icon size={17} style={{ color: s.color, flexShrink: 0, marginTop: 1 }} />
                <p className="text-sm font-bold flex-1 text-slate-200 leading-snug">{t.message}</p>
                <X size={13} style={{ color: s.color, flexShrink: 0, opacity: 0.6, marginTop: 2 }} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
