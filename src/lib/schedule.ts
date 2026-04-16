import { UserData, Subject } from '@/context/AppContext';
export const getTodayName = () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
export const getSubjectsForDay = (userData: UserData, day: string): Subject[] => {
  const subjectIds = (userData.weeklySchedule && userData.weeklySchedule[day]) || [];
  return userData.subjects.filter(s => subjectIds.includes(s.id));
};
export const getTodaySubjects = (userData: UserData): Subject[] => getSubjectsForDay(userData, getTodayName());
