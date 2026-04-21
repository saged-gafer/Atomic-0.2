"use client";
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/i18n';
import { Settings, Trash2, X, User, ShieldAlert, MapPin, Globe, LogOut, Download, Upload, Database } from 'lucide-react';

export default function SettingsPanel() {
  const { userData, clearData, logout, setUserData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [importMsg, setImportMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for global commands from CommandPalette
  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    const exportFromCmd = () => handleExport();
    const importFromCmd = () => fileInputRef.current?.click();
    window.addEventListener('atomic:open-settings', openSettings);
    window.addEventListener('atomic:export-data', exportFromCmd);
    window.addEventListener('atomic:import-data', importFromCmd);
    return () => {
      window.removeEventListener('atomic:open-settings', openSettings);
      window.removeEventListener('atomic:export-data', exportFromCmd);
      window.removeEventListener('atomic:import-data', importFromCmd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleExport = () => {
    if (!userData) return;
    try {
      const payload = { version: 1, exportedAt: new Date().toISOString(), data: userData };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const safeName = (userData.name || 'user').replace(/[^a-z0-9_-]/gi, '_');
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `atomic-backup-${safeName}-${date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const data = parsed?.data || parsed;
      if (!data || typeof data !== 'object' || !data.name) {
        throw new Error('invalid');
      }
      setUserData(data);
      const ar = data.language === 'ar';
      setImportMsg({ type: 'ok', text: ar ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully' });
      setTimeout(() => setImportMsg(null), 3500);
    } catch {
      const ar = userData?.language === 'ar';
      setImportMsg({ type: 'err', text: ar ? 'الملف غير صالح' : 'Invalid backup file' });
      setTimeout(() => setImportMsg(null), 3500);
    }
  };

  if (!userData) return null;

  const t = translations[userData.language || 'en'];
  const isRTL = userData.language === 'ar';


  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearData();
    setIsOpen(false);
    setConfirmClear(false);
  };

  const close = () => {
    setIsOpen(false);
    setConfirmClear(false);
    setConfirmLogout(false);
  };

  const handleLogout = () => {
    if (!confirmLogout) {
      setConfirmLogout(true);
      return;
    }
    logout();
    setIsOpen(false);
    setConfirmLogout(false);
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

      {typeof document !== 'undefined' && ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 bg-black/65 z-[700] backdrop-blur-sm"
              />

            {/* Modal — centered on all screen sizes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-[710] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(8,10,24,0.98)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Gradient top border */}
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.4), transparent)' }} />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <Settings size={16} className="text-indigo-400" />
                  </div>
                  <h2 className="text-base font-black text-white">{t.settings}</h2>
                </div>
                <button
                  onClick={close}
                  className="p-1.5 rounded-xl hover:bg-white/8 text-slate-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 200px)' }}>

                {/* Account */}
                <div className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <User size={13} className="text-indigo-400" />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{t.username}</span>
                  </div>

                  {userData.name ? (
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm font-black shrink-0 shadow-lg">
                          {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black text-white truncate">{userData.name}</p>
                          {userData.city && (
                            <p className="text-xs text-slate-500 truncate">{userData.city}, {userData.country}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <p className="text-sm text-slate-500">{t.please_fill_all}</p>
                    </div>
                  )}
                </div>

                {/* Location / Language */}
                {userData.city && (
                  <div className="rounded-2xl border border-white/5 p-4 flex items-center justify-between gap-3" style={{ background: 'rgba(255,255,255,0.025)' }}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <MapPin size={14} className="text-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-white truncate">{userData.city}, {userData.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                      <Globe size={10} className="text-indigo-400" />
                      <span className="text-[10px] font-bold text-indigo-400">
                        {userData.language === 'ar' ? 'العربية' : 'English'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Backup & Restore */}
                <div className="rounded-2xl border border-cyan-500/15 overflow-hidden" style={{ background: 'rgba(6,182,212,0.04)' }}>
                  <div className="px-4 py-3 border-b border-cyan-500/10 flex items-center gap-2">
                    <Database size={13} className="text-cyan-400" />
                    <span className="text-[11px] font-black text-cyan-400/80 uppercase tracking-widest">
                      {isRTL ? 'نسخ احتياطي' : 'Backup & Restore'}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isRTL
                        ? 'احفظ كل بياناتك في ملف، أو استرجع نسخة سابقة. مهم لو غيّرت جهاز أو متصفح.'
                        : 'Save all your data to a file, or restore a previous backup. Important if you switch devices or browsers.'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleExport}
                        className="h-10 flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/8 text-cyan-300 text-xs font-black hover:bg-cyan-500/15 transition-all"
                      >
                        <Download size={13} />
                        {isRTL ? 'تصدير' : 'Export'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="h-10 flex items-center justify-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-500/8 text-pink-300 text-xs font-black hover:bg-pink-500/15 transition-all"
                      >
                        <Upload size={13} />
                        {isRTL ? 'استيراد' : 'Import'}
                      </motion.button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/json,.json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                    <AnimatePresence>
                      {importMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`text-xs font-bold text-center ${importMsg.type === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}
                        >
                          {importMsg.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Logout */}
                <div className="rounded-2xl border border-amber-500/20 overflow-hidden" style={{ background: 'rgba(245,158,11,0.05)' }}>
                  <div className="px-4 py-3 border-b border-amber-500/10 flex items-center gap-2">
                    <LogOut size={13} className="text-amber-400" />
                    <span className="text-[11px] font-black text-amber-400/80 uppercase tracking-widest">{t.logout}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isRTL
                        ? 'سجل الخروج من حسابك. بياناتك ستظل محفوظة و يمكنك الدخول مجدداً باستخدام اسمك و كلمة المرور.'
                        : 'Sign out of your account. Your data stays saved — log back in with your name and password.'}
                    </p>
                    <AnimatePresence mode="wait">
                      {!confirmLogout ? (
                        <motion.button
                          key="lo-first"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/8 text-amber-400 text-sm font-bold hover:bg-amber-500/15 transition-all"
                        >
                          <LogOut size={14} />
                          {t.logout}
                        </motion.button>
                      ) : (
                        <motion.div
                          key="lo-confirm"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2"
                        >
                          <p className="text-xs font-black text-amber-400 text-center">
                            {isRTL ? 'تأكيد تسجيل الخروج؟' : 'Confirm logout?'}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setConfirmLogout(false)}
                              className="flex-1 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-400 text-sm font-bold hover:text-white transition-all"
                            >
                              {isRTL ? 'إلغاء' : 'Cancel'}
                            </button>
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={handleLogout}
                              className="flex-1 h-10 rounded-xl bg-amber-500 text-white text-sm font-black flex items-center justify-center gap-1.5 hover:bg-amber-600 transition-all"
                            >
                              <LogOut size={13} />
                              {t.logout}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-red-500/18 overflow-hidden" style={{ background: 'rgba(239,68,68,0.05)' }}>
                  <div className="px-4 py-3 border-b border-red-500/10 flex items-center gap-2">
                    <ShieldAlert size={13} className="text-red-400" />
                    <span className="text-[11px] font-black text-red-400/70 uppercase tracking-widest">{t.clear_data}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      This will permanently delete all your subjects, tasks, logs, and settings.
                    </p>

                    <AnimatePresence mode="wait">
                      {!confirmClear ? (
                        <motion.button
                          key="first"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleClear}
                          className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/5 text-red-400 text-sm font-bold hover:bg-red-500/12 transition-all"
                        >
                          <Trash2 size={14} />
                          {t.clear_data}
                        </motion.button>
                      ) : (
                        <motion.div
                          key="confirm"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2"
                        >
                          <p className="text-xs font-black text-red-400 text-center">Are you sure? This cannot be undone.</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setConfirmClear(false)}
                              className="flex-1 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-400 text-sm font-bold hover:text-white transition-all"
                            >
                              Cancel
                            </button>
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={handleClear}
                              className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-black flex items-center justify-center gap-1.5 hover:bg-red-600 transition-all"
                            >
                              <Trash2 size={13} />
                              Delete All
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>

              {/* Bottom accent */}
              <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)' }} />
            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
