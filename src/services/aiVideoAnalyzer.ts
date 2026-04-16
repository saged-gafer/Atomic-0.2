import { Task } from '@/context/AppContext';

export interface VideoTask {
  title: string;
  timestamp?: string;
  duration?: string;
}

export interface VideoAnalysisResult {
  videoTitle: string;
  extractedTasks: VideoTask[];
  relevanceScore: number;
}

// Simulated AI analysis - in production, this would call an actual AI API
export const analyzeVideoLink = async (url: string, subjectName: string): Promise<VideoAnalysisResult | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract domain to make mock data more realistic
  let domain = 'external-resource';
  try {
    domain = new URL(url).hostname.replace('www.', '');
  } catch {
    domain = url.split('/')[0] || 'external-resource';
  }
  
  // Mock analysis based on subject name
  const subjectKeywords: Record<string, string[]> = {
    'Arabic': ['grammar', 'reading', 'writing', 'vocabulary', 'comprehension'],
    'English': ['grammar', 'vocabulary', 'speaking', 'listening', 'writing'],
    'Physics': ['mechanics', 'electricity', 'waves', 'thermodynamics', 'optics'],
    'Chemistry': ['organic', 'inorganic', 'equations', 'periodic table', 'bonds'],
    'Mathematics': ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'],
  };
  
  const keywords = subjectKeywords[subjectName] || ['lesson', 'topic', 'exercise', 'review'];
  
  // Generate mock tasks based on keywords
  const mockTasks: VideoTask[] = keywords.slice(0, 3 + Math.floor(Math.random() * 3)).map((keyword, i) => ({
    title: `${subjectName} - ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${String.fromCharCode(65 + i)}`,
    timestamp: `${Math.floor(Math.random() * 20)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    duration: `${5 + Math.floor(Math.random() * 15)} min`,
  }));
  
  return {
    videoTitle: `${subjectName} Tutorial - ${domain}`,
    extractedTasks: mockTasks,
    relevanceScore: 85 + Math.floor(Math.random() * 15),
  };
};

export const createTasksFromVideo = (analysis: VideoAnalysisResult, subjectId: string): Task[] => {
  const today = new Date().toISOString().split('T')[0];
  
  return analysis.extractedTasks.map((task, index) => ({
    id: `video-${Date.now()}-${index}`,
    title: task.timestamp 
      ? `[${task.timestamp}] ${task.title} (${task.duration})`
      : `${task.title} (${task.duration})`,
    completed: false,
    subjectId,
    date: today,
  }));
};
