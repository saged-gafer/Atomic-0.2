"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { translations } from '@/lib/i18n';
import { Settings, Trash2, LogOut, X, User, ShieldAlert } from 'lucide-react';

export default function SettingsPanel() {
  const { userData, setUserData, clearData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!userData) return null;

  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';

  const handleLogout = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, password, ...rest } = userData;
    setUserData({ ...rest, username: undefined, password: undefined } as typeof userData);
    setIsOpen(false);
  };

  const handleClear = () => {
    if (window.confirm(t.clear_data_confirm)) {
      clearData();
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        title={t.settings}
        aria-label={t.settings}
      >
        <Settings size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Panel — bottom sheet on mobile, centered modal on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-50 w-full sm:max-w-md sm:w-full
                         bottom-0 left-0 right-0
                         sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                         rounded-t-[2rem] sm:rounded-[2rem]
                         border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: 'rgba(10,12,30,0.97)', backdropFilter: 'blur(24px)' }}
              dir={isRTL ? 'rtl' : 'ltr'}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle — mobile only */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Settings size={18} className="text-primary" />
                  </div>
                  <h2 className="text-lg font-black text-white">{t.settings}</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] sm:max-h-none overflow-y-auto">
                {/* Account Section */}
                <div className="p-4 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-white text-sm">
                    <User size={16} className="text-primary" />
                    {t.username}
                  </h3>

                  {userData.username ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-black shrink-0">
                          {userData.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">@{userData.username}</p>
                          {userData.name && <p className="text-xs text-slate-500 truncate">{userData.name}</p>}
                        </div>
                      </div>
                      {userData.email && (
                        <p className="text-xs text-slate-500 px-1">{userData.email}</p>
                      )}
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 border-red-500/25 hover:bg-red-500/10 hover:text-red-400 text-red-400/80 h-11 rounded-xl"
                      >
                        <LogOut size={15} />
                        {t.logout}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">{t.please_fill_all}</p>
                  )}
                </div>

                {/* Language info */}
                {userData.city && (
                  <div className="p-4 rounded-2xl border border-white/5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm font-bold text-white">{userData.city}, {userData.country}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">
                      {userData.language === 'ar' ? 'العربية' : 'English'}
                    </div>
                  </div>
                )}

                {/* Danger Zone */}
                <div className="p-4 rounded-2xl border border-red-500/20" style={{ background: 'rgba(239,68,68,0.06)' }}>
                  <h3 className="font-bold mb-3 text-red-400 flex items-center gap-2 text-sm">
                    <ShieldAlert size={16} />
                    {t.clear_data}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    This will permanently delete all your data including subjects, tasks, logs, and settings.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="w-full border-red-500/30 hover:bg-red-500/20 hover:text-red-300 text-red-400 h-11 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Trash2 size={15} />
                    {t.clear_data}
                  </Button>
                </div>
              </div>

              {/* Safe area spacer for mobile */}
              <div className="sm:hidden h-safe-bottom pb-4" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
