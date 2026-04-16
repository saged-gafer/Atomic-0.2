import { SubjectFile, GeneratedContent } from '@/context/AppContext';

// Simulated AI file parser - in production, this would call an actual AI API (e.g., OpenAI, Gemini)
// to parse uploaded files and generate educational content

interface ParsedFileContent {
  text: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const subjectExamTemplates: Record<string, { questions: string[]; answers: string[] }[]> = {
  'Arabic': [
    { questions: ['ما هو الفعل الماضي؟', 'أعرب الكلمة التالية', 'ما نوع الجملة التالية؟'], answers: ['فعل يدل على حدث وقع في الماضي', 'فاعل مرفوع', 'جملة فعلية'] },
    { questions: ['ما جمع الكلمة؟', 'ما هو المبتدأ والخبر؟', 'أكمل الفراغ بحرف جر مناسب'], answers: ['جمع تكسير/مذكر سالم', 'المبتدأ: مرفوع، الخبر: مرفوع/منصوب', 'حسب السياق'] },
  ],
  'English': [
    { questions: ['What is the past tense of "go"?', 'Identify the adjective in the sentence', 'Rewrite in passive voice'], answers: ['went', 'the descriptive word', 'subject becomes object'] },
    { questions: ['What is a synonym for "happy"?', 'Complete: If I ___ rich, I would travel', 'What type of clause is this?'], answers: ['joyful/glad', 'were', 'conditional clause'] },
  ],
  'Physics': [
    { questions: ['What is Newton\'s second law?', 'Calculate the force: m=5kg, a=3m/s²', 'What is the unit of energy?'], answers: ['F = ma', '15 N', 'Joule'] },
    { questions: ['Define velocity', 'What is Ohm\'s law?', 'Calculate kinetic energy: m=2kg, v=4m/s'], answers: ['displacement/time', 'V = IR', '16 J'] },
  ],
  'Chemistry': [
    { questions: ['What is the pH of a neutral solution?', 'Balance: H₂ + O₂ → H₂O', 'What is an ionic bond?'], answers: ['7', '2H₂ + O₂ → 2H₂O', 'bond between metal and non-metal'] },
    { questions: ['What is Avogadro\'s number?', 'Name the first 10 elements', 'What is a covalent bond?'], answers: ['6.022 × 10²³', 'H, He, Li, Be, B, C, N, O, F, Ne', 'sharing of electrons'] },
  ],
  'Mathematics': [
    { questions: ['Solve: 2x + 5 = 13', 'What is the area of a circle?', 'Find the derivative of x³'], answers: ['x = 4', 'πr²', '3x²'] },
    { questions: ['What is the Pythagorean theorem?', 'Solve: x² - 9 = 0', 'What is sin(90°)?'], answers: ['a² + b² = c²', 'x = ±3', '1'] },
  ],
};

const subjectSummaryTemplates: Record<string, { keyPoints: string[]; overview: string }> = {
  'Arabic': { keyPoints: ['النحو والصرف', 'البلاغة والعروض', 'القراءة والفهم', 'الكتابة الإبداعية'], overview: 'تتناول هذه المادة قواعد اللغة العربية الأساسية والمتقدمة، بما في ذلك النحو والصرف والبلاغة، مع التركيز على مهارات القراءة والكتابة.' },
  'English': { keyPoints: ['Grammar & Syntax', 'Vocabulary Building', 'Reading Comprehension', 'Writing Skills'], overview: 'This subject covers English language fundamentals including grammar rules, vocabulary expansion, reading strategies, and academic writing techniques.' },
  'Physics': { keyPoints: ['Mechanics & Motion', 'Electricity & Magnetism', 'Waves & Optics', 'Thermodynamics'], overview: 'Physics explores the fundamental laws governing the universe, from classical mechanics to modern physics, with emphasis on problem-solving and mathematical applications.' },
  'Chemistry': { keyPoints: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Equilibrium & Kinetics'], overview: 'Chemistry studies matter, its properties, composition, and transformations. Topics range from atomic theory to organic reactions and chemical equilibrium.' },
  'Mathematics': { keyPoints: ['Algebra & Equations', 'Geometry & Trigonometry', 'Calculus Fundamentals', 'Statistics & Probability'], overview: 'Mathematics develops logical thinking and problem-solving skills through algebra, geometry, calculus, and statistical analysis.' },
};

const subjectNotesTemplates: Record<string, { sections: { title: string; points: string[] }[] }> = {
  'Arabic': { sections: [
    { title: 'النحو', points: ['الفاعل والمفعول به', 'المبتدأ والخبر', 'الأسماء الخمسة', 'الممنوع من الصرف'] },
    { title: 'الصرف', points: ['الميزان الصرفي', 'المشتقات', 'الإعلال والإبدال', 'التضعيف'] },
    { title: 'البلاغة', points: ['التشبيه وأنواعه', 'الاستعارة', 'الكناية', 'الجناس'] },
  ]},
  'English': { sections: [
    { title: 'Grammar', points: ['Tenses: Past, Present, Future', 'Active vs Passive Voice', 'Conditional Sentences', 'Relative Clauses'] },
    { title: 'Vocabulary', points: ['Academic Word List', 'Prefixes & Suffixes', 'Collocations', 'Idioms & Phrasal Verbs'] },
    { title: 'Writing', points: ['Essay Structure', 'Thesis Statement', 'Citation & Referencing', 'Coherence & Cohesion'] },
  ]},
  'Physics': { sections: [
    { title: 'Mechanics', points: ['Newton\'s Laws of Motion', 'Work, Energy & Power', 'Momentum & Impulse', 'Circular Motion'] },
    { title: 'Electricity', points: ['Ohm\'s Law & Circuits', 'Electric Fields', 'Capacitance', 'Magnetic Forces'] },
    { title: 'Waves', points: ['Wave Properties', 'Sound Waves', 'Light & Optics', 'Electromagnetic Spectrum'] },
  ]},
  'Chemistry': { sections: [
    { title: 'Atomic Theory', points: ['Electron Configuration', 'Periodic Trends', 'Quantum Numbers', 'Orbital Diagrams'] },
    { title: 'Bonding', points: ['Ionic vs Covalent', 'Lewis Structures', 'VSEPR Theory', 'Molecular Polarity'] },
    { title: 'Reactions', points: ['Balancing Equations', 'Stoichiometry', 'Reaction Types', 'Equilibrium Constant'] },
  ]},
  'Mathematics': { sections: [
    { title: 'Algebra', points: ['Linear & Quadratic Equations', 'Inequalities', 'Functions & Graphs', 'Systems of Equations'] },
    { title: 'Geometry', points: ['Triangles & Proofs', 'Circle Theorems', 'Coordinate Geometry', 'Transformations'] },
    { title: 'Calculus', points: ['Limits & Continuity', 'Differentiation Rules', 'Integration Techniques', 'Applications of Derivatives'] },
  ]},
};

export const parseFile = async (file: SubjectFile, subjectName: string): Promise<ParsedFileContent> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  
  // Simulate parsed content based on file type and subject
  const topics = subjectSummaryTemplates[subjectName]?.keyPoints || ['Topic 1', 'Topic 2', 'Topic 3'];
  
  return {
    text: `Parsed content from ${file.name} (${ext} file) for ${subjectName}.`,
    topics: topics.slice(0, 2 + Math.floor(Math.random() * 3)),
    difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as 'beginner' | 'intermediate' | 'advanced',
  };
};

export const generateExam = async (subjectName: string, parsedContent: ParsedFileContent): Promise<GeneratedContent> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const templates = subjectExamTemplates[subjectName] || subjectExamTemplates['Mathematics'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const questions = template.questions.map((q, i) => 
    `Q${i + 1}: ${q}\nA${i + 1}: ${template.answers[i]}`
  ).join('\n\n');

  const content = `📋 EXAM - ${subjectName}\n${'='.repeat(40)}\n\nDifficulty: ${parsedContent.difficulty}\nTopics: ${parsedContent.topics.join(', ')}\n\n${questions}\n\n${'='.repeat(40)}\nTotal Questions: ${template.questions.length}\nTime: ${template.questions.length * 5} minutes`;

  return {
    id: `exam-${Date.now()}`,
    type: 'exam',
    title: `${subjectName} Exam - ${new Date().toLocaleDateString()}`,
    content,
    createdAt: new Date().toISOString(),
  };
};

export const generateSummary = async (subjectName: string, parsedContent: ParsedFileContent): Promise<GeneratedContent> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const template = subjectSummaryTemplates[subjectName] || subjectSummaryTemplates['Mathematics'];
  
  const keyPointsList = template.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n');
  
  const content = `📝 SUMMARY - ${subjectName}\n${'='.repeat(40)}\n\n${template.overview}\n\n🔑 Key Points:\n${keyPointsList}\n\n📊 Topics Covered:\n${parsedContent.topics.map(t => `• ${t}`).join('\n')}\n\n💡 Study Tips:\n• Review key concepts daily\n• Practice with past exams\n• Create flashcards for definitions\n• Teach concepts to others`;

  return {
    id: `summary-${Date.now()}`,
    type: 'summary',
    title: `${subjectName} Summary - ${new Date().toLocaleDateString()}`,
    content,
    createdAt: new Date().toISOString(),
  };
};

export const generateNotes = async (subjectName: string): Promise<GeneratedContent> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const template = subjectNotesTemplates[subjectName] || subjectNotesTemplates['Mathematics'];
  
  const sectionsContent = template.sections.map(section => {
    const pointsList = section.points.map(p => `  → ${p}`).join('\n');
    return `📌 ${section.title}\n${pointsList}`;
  }).join('\n\n');

  const content = `📒 STUDY NOTES - ${subjectName}\n${'='.repeat(40)}\n\n${sectionsContent}\n\n${'='.repeat(40)}\n✅ Review Checklist:\n${template.sections.flatMap(s => s.points.slice(0, 2)).map(p => `☐ ${p}`).join('\n')}`;

  return {
    id: `notes-${Date.now()}`,
    type: 'notes',
    title: `${subjectName} Notes - ${new Date().toLocaleDateString()}`,
    content,
    createdAt: new Date().toISOString(),
  };
};

export const generateMindMap = async (subjectName: string, parsedContent: ParsedFileContent): Promise<GeneratedContent> => {
  await new Promise(resolve => setTimeout(resolve, 1800));

  const mindMapData = {
    name: subjectName,
    children: parsedContent.topics.map(topic => ({
      name: topic,
      children: [
        { name: 'Concept A' },
        { name: 'Concept B' },
        { name: 'Practice' }
      ]
    }))
  };

  return {
    id: `mindmap-${Date.now()}`,
    type: 'mindmap',
    title: `${subjectName} Mind Map - ${new Date().toLocaleDateString()}`,
    content: JSON.stringify(mindMapData),
    createdAt: new Date().toISOString(),
  };
};

export const generateAllContent = async (subjectName: string, parsedContent: ParsedFileContent): Promise<GeneratedContent[]> => {
  const [exam, summary, notes, mindmap] = await Promise.all([
    generateExam(subjectName, parsedContent),
    generateSummary(subjectName, parsedContent),
    generateNotes(subjectName),
    generateMindMap(subjectName, parsedContent),
  ]);
  return [exam, summary, notes, mindmap];
};
