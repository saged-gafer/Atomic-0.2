import { UserData } from '@/context/AppContext';
export const suggestOptimization = (userData: UserData) => {
  const suggestions = [];
  const subjectsWithManyTasks = userData.subjects.filter(s => (s.tasks || []).filter(t => !t.completed).length > 3);
  if (subjectsWithManyTasks.length > 0) {
    suggestions.push({ type: 'reschedule', message: `You have many unfinished tasks in ${subjectsWithManyTasks[0].name}. Consider splitting its workload across two days.` });
  }
  return suggestions;
};
export const generateMotivationalMessage = (name: string) => {
  const messages = [`Keep going, ${name}!`, `Consistency is key, ${name}.`, `Believe in yourself, ${name}.`, `Every minute counts, ${name}.` ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const generateSuggestedSchedule = (userData: UserData): Record<string, string[]> => {
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const subjects = userData.subjects;
  const suggested: Record<string, string[]> = {};

  // Basic AI logic: Distribute subjects evenly, prioritizing those with more tasks
  const subjectTaskCounts = subjects.map(s => ({
    id: s.id,
    count: (s.tasks || []).filter(t => !t.completed).length
  })).sort((a, b) => b.count - a.count);

  DAYS.forEach((day, index) => {
    // Pick 2-3 subjects per day based on task counts and rotation
    const dailySubjects = [];
    const startIndex = (index * 2) % subjects.length;

    // Always include a high-priority subject if available
    if (subjectTaskCounts[index % subjectTaskCounts.length]) {
      dailySubjects.push(subjectTaskCounts[index % subjectTaskCounts.length].id);
    }

    // Add another subject for variety
    const secondSubject = subjects[(startIndex + 1) % subjects.length].id;
    if (!dailySubjects.includes(secondSubject)) {
      dailySubjects.push(secondSubject);
    }

    suggested[day] = dailySubjects;
  });

  return suggested;
};
