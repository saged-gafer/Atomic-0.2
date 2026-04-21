"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type Task = { id: string; title: string; completed: boolean; subjectId: string; date: string; };
export type MonthlyTask = { id: string; title: string; completed: boolean; date: string; };
export type SubjectFile = { id: string; name: string; type: string; size: number; data: string; uploadedAt: string; };
export type GeneratedContent = { id: string; type: 'exam' | 'summary' | 'notes' | 'mindmap'; title: string; content: string; createdAt: string; };
export type Subject = { id: string; name: string; color: string; icon: string; link?: string; tasks: Task[]; files?: SubjectFile[]; generatedContent?: GeneratedContent[]; };
export type StudyLog = { date: string; duration: number; type: 'study' | 'break'; subjectId: string; };
export type UserData = {
  name: string;
  email?: string;
  avatar?: string;
  password?: string;
  language: 'en' | 'ar';
  city?: string;
  country?: string;
  weeklySchedule: Record<string, string[]>;
  dailyStudyHours: number;
  subjects: Subject[];
  sideTasks: Task[];
  logs: StudyLog[];
  suggestions?: string[];
  prayerTimes?: Record<string, string>;
  prayerLogs?: Record<string, string[]>;
  monthlyTasks?: Record<string, MonthlyTask[]>;
  sessionStartTime?: string;
  loginCount?: number;
  studyXP?: number;
  studyBondLevel?: number;
  themeStyle?: string;
};

export const defaultSubjects: Subject[] = [
  { id: '1', name: 'Arabic', color: '#059669', icon: 'Quill', tasks: [] },
  { id: '2', name: 'English', color: '#2563eb', icon: 'Book', tasks: [] },
  { id: '3', name: 'Physics', color: '#7c3aed', icon: 'Atom', tasks: [] },
  { id: '4', name: 'Chemistry', color: '#be185d', icon: 'FlaskConical', tasks: [] },
  { id: '5', name: 'Mathematics', color: '#b45309', icon: 'Pi', tasks: [] },
];

type AppContextType = {
  userData: UserData | null;
  isAuthenticated: boolean;
  hasAccount: boolean;
  setUserData: (data: UserData) => void;
  clearData: () => void;
  logout: () => void;
  login: (name: string, password: string) => { ok: boolean; error?: string };
  addTask: (subjectId: string, title: string) => void;
  toggleTask: (subjectId: string, taskId: string) => void;
  deleteTask: (subjectId: string, taskId: string) => void;
  addFile: (subjectId: string, file: SubjectFile) => void;
  removeFile: (subjectId: string, fileId: string) => void;
  addGeneratedContent: (subjectId: string, content: GeneratedContent) => void;
  addLog: (log: StudyLog) => void;
  addSideTask: (title: string) => void;
  toggleSideTask: (taskId: string) => void;
  deleteSideTask: (taskId: string) => void;
  addSuggestion: (suggestion: string) => void;
  togglePrayer: (prayerId: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
  addMonthlyTask: (date: string, title: string) => void;
  toggleMonthlyTask: (date: string, taskId: string) => void;
  deleteMonthlyTask: (date: string, taskId: string) => void;
  isLoading: boolean;
  addStudyXP: (amount: number) => void;
  studyXP: number;
  studyBondLevel: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

const SESSION_KEY = 'atomic_session_active';
const USER_KEY = 'study_planner_user_data';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hydrated.current) {
      setTimeout(() => {
        const saved = localStorage.getItem(USER_KEY);
        const sessionActive = localStorage.getItem(SESSION_KEY) === '1';
        if (saved) {
          try {
            const data = JSON.parse(saved);
            setHasAccount(true);
            if (sessionActive) {
              setUserDataState(data);
              setIsAuthenticated(true);
            }
          } catch (e) {
            console.error('Failed to parse saved user data:', e);
          }
        }
        setIsLoading(false);
      }, 0);
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (userData && typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  }, [userData]);


  const setUserData = useCallback((data: UserData) => {
    const dataWithCount = { ...data, loginCount: data.loginCount ?? 1 };
    setUserDataState(dataWithCount);
    setIsAuthenticated(true);
    setHasAccount(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, '1');
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserDataState(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, '0');
    }
  }, []);

  const login = useCallback((name: string, password: string): { ok: boolean; error?: string } => {
    if (typeof window === 'undefined') return { ok: false, error: 'Unavailable' };
    const saved = localStorage.getItem(USER_KEY);
    if (!saved) return { ok: false, error: 'no_account' };
    try {
      const data: UserData = JSON.parse(saved);
      const lang = data.language || 'en';
      const isAr = lang === 'ar';
      if (data.name.trim().toLowerCase() !== name.trim().toLowerCase()) {
        return { ok: false, error: isAr ? 'الاسم غير صحيح' : 'Name does not match' };
      }
      if ((data.password || '') !== password) {
        return { ok: false, error: isAr ? 'كلمة المرور غير صحيحة' : 'Wrong password' };
      }
      const updated = { ...data, loginCount: (data.loginCount || 0) + 1 };
      setUserDataState(updated);
      setIsAuthenticated(true);
      setHasAccount(true);
      localStorage.setItem(SESSION_KEY, '1');
      return { ok: true };
    } catch {
      return { ok: false, error: 'Failed to read account' };
    }
  }, []);

  const clearData = () => {
    const lang = userData?.language || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(USER_KEY) || '{}')?.language : 'en');
    const t = lang === 'ar' ?
      'هل أنت متأكد؟ سيتم حذف جميع بياناتك.' : 
      'Are you sure? This will delete all your data.';
    if (typeof window !== 'undefined' && window.confirm(t)) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(SESSION_KEY);
      setUserDataState(null);
      setIsAuthenticated(false);
      setHasAccount(false);
    }
  };

  const sanitizeText = (text: string, maxLength = 500): string =>
    text.replace(/[<>"'`]/g, '').trim().slice(0, maxLength);

  const addTask = useCallback((subjectId: string, title: string) => {
    const safe = sanitizeText(title);
    if (!safe) return;
    setUserDataState(prev => {
      if (!prev) return prev;
      const newTask = { id: Math.random().toString(36).substr(2, 9), title: safe, completed: false, subjectId, date: new Date().toISOString().split('T')[0] };
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, tasks: [...s.tasks, newTask] } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const toggleTask = useCallback((subjectId: string, taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const deleteTask = useCallback((subjectId: string, taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const addFile = useCallback((subjectId: string, file: SubjectFile) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, files: [...(s.files || []), file] } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const removeFile = useCallback((subjectId: string, fileId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, files: (s.files || []).filter(f => f.id !== fileId) } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const addGeneratedContent = useCallback((subjectId: string, content: GeneratedContent) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSubjects = prev.subjects.map(s => s.id === subjectId ? { ...s, generatedContent: [...(s.generatedContent || []), content] } : s);
      return { ...prev, subjects: nextSubjects };
    });
  }, []);

  const addLog = useCallback((log: StudyLog) => {
    if (log.duration <= 0) return;
    setUserDataState(prev => {
      if (!prev) return prev;
      return { ...prev, logs: [...(prev.logs || []), { ...log, date: log.date || new Date().toISOString() }] };
    });
  }, []);

  const addSideTask = useCallback((title: string) => {
    const safe = sanitizeText(title);
    if (!safe) return;
    setUserDataState(prev => {
      if (!prev) return prev;
      const newTask = { id: Math.random().toString(36).substr(2, 9), title: safe, completed: false, subjectId: 'side', date: new Date().toISOString().split('T')[0] };
      return { ...prev, sideTasks: [...(prev.sideTasks || []), newTask] };
    });
  }, []);

  const toggleSideTask = useCallback((taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSideTasks = (prev.sideTasks || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      return { ...prev, sideTasks: nextSideTasks };
    });
  }, []);

  const deleteSideTask = useCallback((taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const nextSideTasks = (prev.sideTasks || []).filter(t => t.id !== taskId);
      return { ...prev, sideTasks: nextSideTasks };
    });
  }, []);

  const addSuggestion = useCallback((suggestion: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      return { ...prev, suggestions: [...(prev.suggestions || []), suggestion] };
    });
  }, []);

  const togglePrayer = useCallback((prayerId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const today = new Date().toISOString().split('T')[0];
      const currentLogs = prev.prayerLogs || {};
      const todayLogs = currentLogs[today] || [];
      const nextTodayLogs = todayLogs.includes(prayerId)
        ? todayLogs.filter(id => id !== prayerId)
        : [...todayLogs, prayerId];
      return { ...prev, prayerLogs: { ...currentLogs, [today]: nextTodayLogs } };
    });
  }, []);

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
  }, []);

  const addMonthlyTask = useCallback((date: string, title: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const newTask: MonthlyTask = { id: Math.random().toString(36).substr(2, 9), title, completed: false, date };
      const current = prev.monthlyTasks || {};
      return { ...prev, monthlyTasks: { ...current, [date]: [...(current[date] || []), newTask] } };
    });
  }, []);

  const toggleMonthlyTask = useCallback((date: string, taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const current = prev.monthlyTasks || {};
      return { ...prev, monthlyTasks: { ...current, [date]: (current[date] || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } };
    });
  }, []);

  const deleteMonthlyTask = useCallback((date: string, taskId: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const current = prev.monthlyTasks || {};
      return { ...prev, monthlyTasks: { ...current, [date]: (current[date] || []).filter(t => t.id !== taskId) } };
    });
  }, []);

  const addStudyXP = useCallback((amount: number) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const newXP = (prev.studyXP || 0) + amount;
      return { ...prev, studyXP: newXP, studyBondLevel: xpToLevel(newXP) };
    });
  }, []);

  const studyXP = userData?.studyXP || 0;
  const studyBondLevel = userData?.studyBondLevel || xpToLevel(studyXP);

  return <AppContext.Provider value={{
    userData,
    isAuthenticated,
    hasAccount,
    setUserData,
    clearData,
    logout,
    login,
    addTask,
    toggleTask,
    deleteTask,
    addFile,
    removeFile,
    addGeneratedContent,
    addLog,
    addSideTask,
    toggleSideTask,
    deleteSideTask,
    addSuggestion,
    togglePrayer,
    updateUserData,
    addMonthlyTask,
    toggleMonthlyTask,
    deleteMonthlyTask,
    isLoading,
    addStudyXP,
    studyXP,
    studyBondLevel,
  }}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
