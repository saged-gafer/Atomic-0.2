import { UserData } from '@/context/AppContext';

export const migrateUnfinishedTasks = (userData: UserData): UserData => {
  const today = new Date().toISOString().split('T')[0];
  
  const nextSubjects = userData.subjects.map(subject => {
    const tasks = subject.tasks || [];
    const unfinishedTasks = tasks.filter(t => !t.completed && t.date < today);
    if (unfinishedTasks.length === 0) return subject;

    const remainingTasks = tasks.filter(t => !(!t.completed && t.date < today));
    const migratedTasks = unfinishedTasks.map(t => ({
      ...t,
      date: today
    }));

    return {
      ...subject,
      tasks: [...remainingTasks, ...migratedTasks]
    };
  });

  return { ...userData, subjects: nextSubjects };
};

export const checkAndMigrate = (userData: UserData, setUserData: (d: UserData) => void) => {
  const lastCheck = localStorage.getItem('last_migration_check');
  const today = new Date().toISOString().split('T')[0];

  if (lastCheck !== today) {
    const migratedData = migrateUnfinishedTasks(userData);
    setTimeout(() => setUserData(migratedData), 0);
    localStorage.setItem('last_migration_check', today);
  }
};
