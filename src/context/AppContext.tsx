"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type Task = { id: string; title: string; completed: boolean; subjectId: string; date: string; };
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
  prayerLogs?: Record<string, string[]>; // date -> completed prayer ids
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
      // Do not auto-login — just signal that hydration is done.
      // userData stays null until the user explicitly logs in or registers.
      setTimeout(() => setIsLoading(false), 0);
      hydrated.current = true;
    }
  }, []);

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
    localStorage.setItem('study_planner_user_data', JSON.stringify(data));
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

  const addTask = (subjectId: string, title: string) => {
    if (!userData) return;
    const newTask = { id: Math.random().toString(36).substr(2, 9), title, completed: false, subjectId, date: new Date().toISOString().split('T')[0] };
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, tasks: [...s.tasks, newTask] } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const toggleTask = (subjectId: string, taskId: string) => {
    if (!userData) return;
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const deleteTask = (subjectId: string, taskId: string) => {
    if (!userData) return;
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const addFile = (subjectId: string, file: SubjectFile) => {
    if (!userData) return;
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, files: [...(s.files || []), file] } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const removeFile = (subjectId: string, fileId: string) => {
    if (!userData) return;
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, files: (s.files || []).filter(f => f.id !== fileId) } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const addGeneratedContent = (subjectId: string, content: GeneratedContent) => {
    if (!userData) return;
    const nextSubjects = userData.subjects.map(s => s.id === subjectId ? { ...s, generatedContent: [...(s.generatedContent || []), content] } : s);
    setUserData({ ...userData, subjects: nextSubjects });
  };

  const addLog = (log: StudyLog) => {
    if (!userData) return;
    if (log.duration <= 0) return;
    setUserData({ ...userData, logs: [...(userData.logs || []), { ...log, date: log.date || new Date().toISOString() }] });
  };

  const addSideTask = (title: string) => {
    if (!userData) return;
    const newTask = { id: Math.random().toString(36).substr(2, 9), title, completed: false, subjectId: 'side', date: new Date().toISOString().split('T')[0] };
    setUserData({ ...userData, sideTasks: [...(userData.sideTasks || []), newTask] });
  };

  const toggleSideTask = (taskId: string) => {
    if (!userData) return;
    const nextSideTasks = (userData.sideTasks || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setUserData({ ...userData, sideTasks: nextSideTasks });
  };

  const deleteSideTask = (taskId: string) => {
    if (!userData) return;
    const nextSideTasks = (userData.sideTasks || []).filter(t => t.id !== taskId);
    setUserData({ ...userData, sideTasks: nextSideTasks });
  };

  const addSuggestion = (suggestion: string) => {
    if (!userData) return;
    setUserData({ ...userData, suggestions: [...(userData.suggestions || []), suggestion] });
  };

  const togglePrayer = (prayerId: string) => {
    if (!userData) return;
    const today = new Date().toISOString().split('T')[0];
    const currentLogs = userData.prayerLogs || {};
    const todayLogs = currentLogs[today] || [];

    const nextTodayLogs = todayLogs.includes(prayerId)
      ? todayLogs.filter(id => id !== prayerId)
      : [...todayLogs, prayerId];

    setUserData({
      ...userData,
      prayerLogs: { ...currentLogs, [today]: nextTodayLogs }
    });
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (!userData) return;
    setUserData({ ...userData, ...data });
  };

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
    isLoading
  }}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
