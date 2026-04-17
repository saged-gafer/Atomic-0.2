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
  username?: string;
  password?: string;
  email?: string;
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
  login: (username: string, password: string) => boolean;
  setUserData: (data: UserData) => void;
  clearData: () => void;
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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hydrated.current) {
      // Defer state updates to avoid cascading renders during hydration
      setTimeout(() => {
        const saved = localStorage.getItem('study_planner_user_data');
        if (saved) {
          try {
            const data = JSON.parse(saved);
            setUserDataState(data);
            setIsAuthenticated(true);
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
      localStorage.setItem('study_planner_user_data', JSON.stringify(userData));
    }
  }, [userData]);

  const login = useCallback((username: string, password: string): boolean => {
    const saved = localStorage.getItem('study_planner_user_data');
    if (!saved) return false;
    const data: UserData = JSON.parse(saved);
    if (data.username === username && data.password === password) {
      setUserDataState(data);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const setUserData = useCallback((data: UserData) => {
    setUserDataState(data);
    setIsAuthenticated(true);
  }, []);

  const clearData = () => {
    const lang = userData?.language || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('study_planner_user_data') || '{}')?.language : 'en');
    const t = lang === 'ar' ?
      'هل أنت متأكد؟ سيتم حذف جميع بياناتك.' : 
      'Are you sure? This will delete all your data.';
    if (typeof window !== 'undefined' && window.confirm(t)) {
      localStorage.removeItem('study_planner_user_data');
      setUserDataState(null);
      setIsAuthenticated(false);
    }
  };

  const addTask = useCallback((subjectId: string, title: string) => {
    setUserDataState(prev => {
      if (!prev) return prev;
      const newTask = { id: Math.random().toString(36).substr(2, 9), title, completed: false, subjectId, date: new Date().toISOString().split('T')[0] };
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
    setUserDataState(prev => {
      if (!prev) return prev;
      const newTask = { id: Math.random().toString(36).substr(2, 9), title, completed: false, subjectId: 'side', date: new Date().toISOString().split('T')[0] };
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

  return <AppContext.Provider value={{
    userData,
    isAuthenticated,
    login,
    setUserData,
    clearData,
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
    isLoading
  }}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
