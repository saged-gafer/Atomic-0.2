import type { StudyLog } from '@/context/AppContext';

/** Returns the current consecutive-day study streak, counting today (or yesterday if no study today yet). */
export function computeStreak(logs: StudyLog[] = []): number {
  if (!logs || logs.length === 0) return 0;

  const studyDays = new Set<string>();
  for (const log of logs) {
    if (log.type !== 'study' || log.duration <= 0) continue;
    const day = (log.date || '').slice(0, 10);
    if (day) studyDays.add(day);
  }
  if (studyDays.size === 0) return 0;

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start counting from today if studied today, else from yesterday so a streak doesn't reset before the day ends.
  const cursor = new Date(today);
  if (!studyDays.has(fmt(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!studyDays.has(fmt(cursor))) return 0;
  }

  let streak = 0;
  while (studyDays.has(fmt(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Returns the longest historical streak in the logs. */
export function computeBestStreak(logs: StudyLog[] = []): number {
  const studyDays = new Set<string>();
  for (const log of logs) {
    if (log.type !== 'study' || log.duration <= 0) continue;
    const day = (log.date || '').slice(0, 10);
    if (day) studyDays.add(day);
  }
  if (studyDays.size === 0) return 0;

  const sorted = Array.from(studyDays).sort();
  let best = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00');
    const curr = new Date(sorted[i] + 'T00:00:00');
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }
  return best;
}
