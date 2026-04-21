module.exports = [
"[project]/src/lib/schedule.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSubjectsForDay",
    ()=>getSubjectsForDay,
    "getTodayName",
    ()=>getTodayName,
    "getTodaySubjects",
    ()=>getTodaySubjects
]);
const getTodayName = ()=>[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ][new Date().getDay()];
const getSubjectsForDay = (userData, day)=>{
    const subjectIds = userData.weeklySchedule && userData.weeklySchedule[day] || [];
    return userData.subjects.filter((s)=>subjectIds.includes(s.id));
};
const getTodaySubjects = (userData)=>getSubjectsForDay(userData, getTodayName());
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/lib/i18n.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        welcome: "Hello",
        welcome_back: "Welcome back",
        today_is: "Today is",
        subjects_to_study: "subjects to study",
        no_subjects: "No subjects scheduled for today. Enjoy your break!",
        weekly_progress: "Weekly Progress",
        goal: "Goal",
        hours_per_day: "hours per day",
        study: "Study",
        break: "Break",
        save_break: "Save Break",
        new_task: "New task...",
        start_planning: "Start Planning!",
        next: "Next",
        back: "Back",
        what_is_name: "What's your name?",
        subject_links: "Subject Learning Resources",
        add_link_for: "Add video/link for",
        weekly_schedule: "Your Weekly Schedule",
        assign_subjects: "Assign subjects to each day",
        daily_study_goal: "How many hours do you want to study daily?",
        daily_study_goal_subtitle: "Consistency is the key to mastery",
        welcome_start: "Welcome! Let's get started.",
        settings: "Settings",
        clear_data: "Clear All Data",
        clear_data_confirm: "Are you sure? This will delete all your data.",
        email: "Email",
        login: "Login",
        logout: "Logout",
        logged_in_as: "Logged in as",
        analyze_video: "Analyze Video",
        analyzing: "Analyzing...",
        ai_analysis: "AI Analysis",
        video_title: "Video Title",
        relevance_score: "Relevance",
        add_extracted_tasks: "Add Extracted Tasks",
        tasks_added: "tasks added successfully!",
        no_video_link: "No video link available for this subject.",
        welcome_title: "ATOMIC",
        username: "Username",
        password: "Password",
        password_required: "Password is required",
        username_required: "Username is required",
        name_required: "Name is required",
        please_fill_all: "Please fill all required fields",
        welcome_subtitle: "Advanced Tracking and Organization for Maximum Individualized Course Success",
        step: "Step",
        of: "of",
        city: "City",
        country: "Country",
        city_required: "City is required",
        country_required: "Country is required",
        upload_file: "Upload Files",
        ai_generate: "AI Generate",
        generate_exam: "Generate Exam",
        generate_summary: "Generate Summary",
        generate_notes: "Generate Notes",
        generate_all: "Generate All",
        generated_content: "Generated Content",
        study_assistant: "Study Assistant",
        no_files: "No files uploaded",
        file_uploaded: "File uploaded successfully",
        generating: "Generating...",
        exam: "Exam",
        summary: "Summary",
        notes_type: "Notes",
        open_widget: "Widget",
        close_widget: "Close widget",
        widget_timer: "Timer Widget",
        reminders_title: "Islamic Reminders & Dua",
        dua_title: "Study Supplication (Dua)",
        dua_content: "O Allah, I ask You for beneficial knowledge, a good provision, and deeds that will be accepted.",
        reminder_1: "Seek knowledge from the cradle to the grave.",
        reminder_2: "Whosoever follows a path to seek knowledge, Allah will make the path to Jannah (Paradise) easy for them.",
        reminder_3: "The best of you are those who learn the Qur'an and teach it.",
        close: "Close",
        prayer_times: "Prayer Times",
        side_tasks: "Side Tasks",
        suggestions_feedback: "Suggestions & Feedback",
        performance_tracking: "Performance Tracking",
        weekly_schedule_edit: "Weekly Schedule",
        add_suggestion_placeholder: "Enter your suggestion or idea...",
        submit: "Submit",
        thank_you_feedback: "Thank you for your feedback!",
        no_side_tasks: "No side tasks. Add one below!",
        add: "Add",
        current_schedule: "Current Schedule",
        suggested_schedule: "AI Suggested Schedule",
        accept_suggestion: "Accept AI Suggestion",
        edit_schedule: "Edit Schedule",
        save_changes: "Save Changes",
        generate_mindmap: "Generate Mind Map",
        mindmap: "Mind Map",
        session_duration: "Current Session",
        prayer_progress: "Prayer Progress",
        azkar: "Azkar & Supplications",
        full_screen: "Full Screen",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        save: "Save",
        hours: "Hours",
        end_session_confirm: "End Session",
        download: "Download",
        copy: "Copy",
        copied: "Copied!",
        sidebar_open: "Open sidebar",
        sidebar_close: "Close sidebar",
        focus_mode: "Focus Mode",
        analytics: "Analytics"
    },
    ar: {
        welcome: "مرحباً",
        welcome_back: "مرحباً بالعودة",
        today_is: "اليوم هو",
        subjects_to_study: "مواد للدراسة",
        no_subjects: "لا يوجد مواد مجدولة اليوم. استمتع بوقتك!",
        weekly_progress: "التقدم الأسبوعي",
        goal: "الهدف",
        hours_per_day: "ساعة في اليوم",
        study: "دراسة",
        break: "استراحة",
        save_break: "حفظ الاستراحة",
        new_task: "مهمة جديدة...",
        start_planning: "ابدأ التخطيط!",
        next: "التالي",
        back: "السابق",
        what_is_name: "ما هو اسمك؟",
        subject_links: "مصادر تعلم المواد",
        add_link_for: "أضف فيديو/رابط لـ",
        weekly_schedule: "جدولك الأسبوعي",
        assign_subjects: "خصص المواد لكل يوم",
        daily_study_goal: "كم ساعة تود الدراسة يومياً؟",
        daily_study_goal_subtitle: "الاستمرارية هي مفتاح الإتقان",
        welcome_start: "أهلاً بك! لنبدأ.",
        settings: "الإعدادات",
        clear_data: "مسح جميع البيانات",
        clear_data_confirm: "هل أنت متأكد؟ سيتم حذف جميع بياناتك.",
        email: "البريد الإلكتروني",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        logged_in_as: "مسجل الدخول كـ",
        analyze_video: "تحليل الفيديو",
        analyzing: "جاري التحليل...",
        ai_analysis: "تحليل الذكاء الاصطناعي",
        video_title: "عنوان الفيديو",
        relevance_score: "المدى",
        add_extracted_tasks: "إضافة المهام المستخرجة",
        tasks_added: "تمت إضافة المهام بنجاح!",
        no_video_link: "لا يوجد رابط فيديو متاح لهذه المادة.",
        welcome_title: "ATOMIC",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        password_required: "كلمة المرور مطلوبة",
        username_required: "اسم المستخدم مطلوب",
        name_required: "الاسم مطلوب",
        please_fill_all: "يرجى ملء جميع الحقول المطلوبة",
        welcome_subtitle: "نظام متقدم للتتبع والتنظيم لتحقيق النجاح الفردي في المقررات الدراسية",
        step: "خطوة",
        of: "من",
        city: "المدينة",
        country: "الدولة",
        city_required: "المدينة مطلوبة",
        country_required: "الدولة مطلوبة",
        upload_file: "رفع ملفات",
        ai_generate: "توليد بالذكاء الاصطناعي",
        generate_exam: "توليد امتحان",
        generate_summary: "توليد ملخص",
        generate_notes: "توليد ملاحظات",
        generate_all: "توليد الكل",
        generated_content: "المحتوى المُولّد",
        study_assistant: "مساعد الدراسة",
        no_files: "لا يوجد ملفات مرفوعة",
        file_uploaded: "تم رفع الملف بنجاح",
        generating: "جاري التوليد...",
        exam: "امتحان",
        summary: "ملخص",
        notes_type: "ملاحظات",
        open_widget: "ودجت",
        close_widget: "إغلاق الودجت",
        widget_timer: "ودجت المؤقت",
        reminders_title: "تذكيرات إسلامية ودعاء",
        dua_title: "دعاء المذاكرة",
        dua_content: "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
        reminder_1: "اطلب العلم من المهد إلى اللحد.",
        reminder_2: "من سلك طريقاً يلتمس فيه علماً، سهل الله له به طريقاً إلى الجنة.",
        reminder_3: "خيركم من تعلم القرآن وعلمه.",
        close: "إغلاق",
        prayer_times: "مواقيت الصلاة",
        side_tasks: "مهام جانبية",
        suggestions_feedback: "الاقتراحات والآراء",
        performance_tracking: "تتبع الأداء",
        weekly_schedule_edit: "الجدول الأسبوعي",
        add_suggestion_placeholder: "أدخل اقتراحك أو فكرتك...",
        submit: "إرسال",
        thank_you_feedback: "شكراً لآرائك!",
        no_side_tasks: "لا يوجد مهام جانبية. أضف واحدة أدناه!",
        add: "إضافة",
        current_schedule: "الجدول الحالي",
        suggested_schedule: "الجدول المقترح بالذكاء الاصطناعي",
        accept_suggestion: "قبول اقتراح الذكاء الاصطناعي",
        edit_schedule: "تعديل الجدول",
        save_changes: "حفظ التغييرات",
        generate_mindmap: "توليد خريطة ذهنية",
        mindmap: "خريطة ذهنية",
        session_duration: "مدة الجلسة الحالية",
        prayer_progress: "تقدم الصلوات",
        azkar: "الأذكار والأدعية",
        full_screen: "ملء الشاشة",
        start: "بدء",
        pause: "إيقاف",
        reset: "إعادة ضبط",
        save: "حفظ",
        hours: "ساعات",
        end_session_confirm: "إنهاء الجلسة",
        download: "تحميل",
        copy: "نسخ",
        copied: "تم النسخ!",
        sidebar_open: "فتح الشريط الجانبي",
        sidebar_close: "إغلاق الشريط الجانبي",
        focus_mode: "وضع التركيز",
        analytics: "التحليلات"
    }
};
}),
"[project]/src/services/aiVideoAnalyzer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeVideoLink",
    ()=>analyzeVideoLink,
    "createTasksFromVideo",
    ()=>createTasksFromVideo
]);
const analyzeVideoLink = async (url, subjectName)=>{
    // Simulate API delay
    await new Promise((resolve)=>setTimeout(resolve, 1500));
    // Extract domain to make mock data more realistic
    let domain = 'external-resource';
    try {
        domain = new URL(url).hostname.replace('www.', '');
    } catch  {
        domain = url.split('/')[0] || 'external-resource';
    }
    // Mock analysis based on subject name
    const subjectKeywords = {
        'Arabic': [
            'grammar',
            'reading',
            'writing',
            'vocabulary',
            'comprehension'
        ],
        'English': [
            'grammar',
            'vocabulary',
            'speaking',
            'listening',
            'writing'
        ],
        'Physics': [
            'mechanics',
            'electricity',
            'waves',
            'thermodynamics',
            'optics'
        ],
        'Chemistry': [
            'organic',
            'inorganic',
            'equations',
            'periodic table',
            'bonds'
        ],
        'Mathematics': [
            'algebra',
            'geometry',
            'calculus',
            'statistics',
            'trigonometry'
        ]
    };
    const keywords = subjectKeywords[subjectName] || [
        'lesson',
        'topic',
        'exercise',
        'review'
    ];
    // Generate mock tasks based on keywords
    const mockTasks = keywords.slice(0, 3 + Math.floor(Math.random() * 3)).map((keyword, i)=>({
            title: `${subjectName} - ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${String.fromCharCode(65 + i)}`,
            timestamp: `${Math.floor(Math.random() * 20)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            duration: `${5 + Math.floor(Math.random() * 15)} min`
        }));
    return {
        videoTitle: `${subjectName} Tutorial - ${domain}`,
        extractedTasks: mockTasks,
        relevanceScore: 85 + Math.floor(Math.random() * 15)
    };
};
const createTasksFromVideo = (analysis, subjectId)=>{
    const today = new Date().toISOString().split('T')[0];
    return analysis.extractedTasks.map((task, index)=>({
            id: `video-${Date.now()}-${index}`,
            title: task.timestamp ? `[${task.timestamp}] ${task.title} (${task.duration})` : `${task.title} (${task.duration})`,
            completed: false,
            subjectId,
            date: today
        }));
};
}),
"[project]/src/services/aiFileParser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateAllContent",
    ()=>generateAllContent,
    "generateExam",
    ()=>generateExam,
    "generateMindMap",
    ()=>generateMindMap,
    "generateNotes",
    ()=>generateNotes,
    "generateSummary",
    ()=>generateSummary,
    "parseFile",
    ()=>parseFile
]);
const subjectExamTemplates = {
    'Arabic': [
        {
            questions: [
                'ما هو الفعل الماضي؟',
                'أعرب الكلمة التالية',
                'ما نوع الجملة التالية؟'
            ],
            answers: [
                'فعل يدل على حدث وقع في الماضي',
                'فاعل مرفوع',
                'جملة فعلية'
            ]
        },
        {
            questions: [
                'ما جمع الكلمة؟',
                'ما هو المبتدأ والخبر؟',
                'أكمل الفراغ بحرف جر مناسب'
            ],
            answers: [
                'جمع تكسير/مذكر سالم',
                'المبتدأ: مرفوع، الخبر: مرفوع/منصوب',
                'حسب السياق'
            ]
        }
    ],
    'English': [
        {
            questions: [
                'What is the past tense of "go"?',
                'Identify the adjective in the sentence',
                'Rewrite in passive voice'
            ],
            answers: [
                'went',
                'the descriptive word',
                'subject becomes object'
            ]
        },
        {
            questions: [
                'What is a synonym for "happy"?',
                'Complete: If I ___ rich, I would travel',
                'What type of clause is this?'
            ],
            answers: [
                'joyful/glad',
                'were',
                'conditional clause'
            ]
        }
    ],
    'Physics': [
        {
            questions: [
                'What is Newton\'s second law?',
                'Calculate the force: m=5kg, a=3m/s²',
                'What is the unit of energy?'
            ],
            answers: [
                'F = ma',
                '15 N',
                'Joule'
            ]
        },
        {
            questions: [
                'Define velocity',
                'What is Ohm\'s law?',
                'Calculate kinetic energy: m=2kg, v=4m/s'
            ],
            answers: [
                'displacement/time',
                'V = IR',
                '16 J'
            ]
        }
    ],
    'Chemistry': [
        {
            questions: [
                'What is the pH of a neutral solution?',
                'Balance: H₂ + O₂ → H₂O',
                'What is an ionic bond?'
            ],
            answers: [
                '7',
                '2H₂ + O₂ → 2H₂O',
                'bond between metal and non-metal'
            ]
        },
        {
            questions: [
                'What is Avogadro\'s number?',
                'Name the first 10 elements',
                'What is a covalent bond?'
            ],
            answers: [
                '6.022 × 10²³',
                'H, He, Li, Be, B, C, N, O, F, Ne',
                'sharing of electrons'
            ]
        }
    ],
    'Mathematics': [
        {
            questions: [
                'Solve: 2x + 5 = 13',
                'What is the area of a circle?',
                'Find the derivative of x³'
            ],
            answers: [
                'x = 4',
                'πr²',
                '3x²'
            ]
        },
        {
            questions: [
                'What is the Pythagorean theorem?',
                'Solve: x² - 9 = 0',
                'What is sin(90°)?'
            ],
            answers: [
                'a² + b² = c²',
                'x = ±3',
                '1'
            ]
        }
    ]
};
const subjectSummaryTemplates = {
    'Arabic': {
        keyPoints: [
            'النحو والصرف',
            'البلاغة والعروض',
            'القراءة والفهم',
            'الكتابة الإبداعية'
        ],
        overview: 'تتناول هذه المادة قواعد اللغة العربية الأساسية والمتقدمة، بما في ذلك النحو والصرف والبلاغة، مع التركيز على مهارات القراءة والكتابة.'
    },
    'English': {
        keyPoints: [
            'Grammar & Syntax',
            'Vocabulary Building',
            'Reading Comprehension',
            'Writing Skills'
        ],
        overview: 'This subject covers English language fundamentals including grammar rules, vocabulary expansion, reading strategies, and academic writing techniques.'
    },
    'Physics': {
        keyPoints: [
            'Mechanics & Motion',
            'Electricity & Magnetism',
            'Waves & Optics',
            'Thermodynamics'
        ],
        overview: 'Physics explores the fundamental laws governing the universe, from classical mechanics to modern physics, with emphasis on problem-solving and mathematical applications.'
    },
    'Chemistry': {
        keyPoints: [
            'Atomic Structure',
            'Chemical Bonding',
            'Organic Chemistry',
            'Equilibrium & Kinetics'
        ],
        overview: 'Chemistry studies matter, its properties, composition, and transformations. Topics range from atomic theory to organic reactions and chemical equilibrium.'
    },
    'Mathematics': {
        keyPoints: [
            'Algebra & Equations',
            'Geometry & Trigonometry',
            'Calculus Fundamentals',
            'Statistics & Probability'
        ],
        overview: 'Mathematics develops logical thinking and problem-solving skills through algebra, geometry, calculus, and statistical analysis.'
    }
};
const subjectNotesTemplates = {
    'Arabic': {
        sections: [
            {
                title: 'النحو',
                points: [
                    'الفاعل والمفعول به',
                    'المبتدأ والخبر',
                    'الأسماء الخمسة',
                    'الممنوع من الصرف'
                ]
            },
            {
                title: 'الصرف',
                points: [
                    'الميزان الصرفي',
                    'المشتقات',
                    'الإعلال والإبدال',
                    'التضعيف'
                ]
            },
            {
                title: 'البلاغة',
                points: [
                    'التشبيه وأنواعه',
                    'الاستعارة',
                    'الكناية',
                    'الجناس'
                ]
            }
        ]
    },
    'English': {
        sections: [
            {
                title: 'Grammar',
                points: [
                    'Tenses: Past, Present, Future',
                    'Active vs Passive Voice',
                    'Conditional Sentences',
                    'Relative Clauses'
                ]
            },
            {
                title: 'Vocabulary',
                points: [
                    'Academic Word List',
                    'Prefixes & Suffixes',
                    'Collocations',
                    'Idioms & Phrasal Verbs'
                ]
            },
            {
                title: 'Writing',
                points: [
                    'Essay Structure',
                    'Thesis Statement',
                    'Citation & Referencing',
                    'Coherence & Cohesion'
                ]
            }
        ]
    },
    'Physics': {
        sections: [
            {
                title: 'Mechanics',
                points: [
                    'Newton\'s Laws of Motion',
                    'Work, Energy & Power',
                    'Momentum & Impulse',
                    'Circular Motion'
                ]
            },
            {
                title: 'Electricity',
                points: [
                    'Ohm\'s Law & Circuits',
                    'Electric Fields',
                    'Capacitance',
                    'Magnetic Forces'
                ]
            },
            {
                title: 'Waves',
                points: [
                    'Wave Properties',
                    'Sound Waves',
                    'Light & Optics',
                    'Electromagnetic Spectrum'
                ]
            }
        ]
    },
    'Chemistry': {
        sections: [
            {
                title: 'Atomic Theory',
                points: [
                    'Electron Configuration',
                    'Periodic Trends',
                    'Quantum Numbers',
                    'Orbital Diagrams'
                ]
            },
            {
                title: 'Bonding',
                points: [
                    'Ionic vs Covalent',
                    'Lewis Structures',
                    'VSEPR Theory',
                    'Molecular Polarity'
                ]
            },
            {
                title: 'Reactions',
                points: [
                    'Balancing Equations',
                    'Stoichiometry',
                    'Reaction Types',
                    'Equilibrium Constant'
                ]
            }
        ]
    },
    'Mathematics': {
        sections: [
            {
                title: 'Algebra',
                points: [
                    'Linear & Quadratic Equations',
                    'Inequalities',
                    'Functions & Graphs',
                    'Systems of Equations'
                ]
            },
            {
                title: 'Geometry',
                points: [
                    'Triangles & Proofs',
                    'Circle Theorems',
                    'Coordinate Geometry',
                    'Transformations'
                ]
            },
            {
                title: 'Calculus',
                points: [
                    'Limits & Continuity',
                    'Differentiation Rules',
                    'Integration Techniques',
                    'Applications of Derivatives'
                ]
            }
        ]
    }
};
const parseFile = async (file, subjectName)=>{
    // Simulate AI processing delay
    await new Promise((resolve)=>setTimeout(resolve, 2000));
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    // Simulate parsed content based on file type and subject
    const topics = subjectSummaryTemplates[subjectName]?.keyPoints || [
        'Topic 1',
        'Topic 2',
        'Topic 3'
    ];
    return {
        text: `Parsed content from ${file.name} (${ext} file) for ${subjectName}.`,
        topics: topics.slice(0, 2 + Math.floor(Math.random() * 3)),
        difficulty: [
            'beginner',
            'intermediate',
            'advanced'
        ][Math.floor(Math.random() * 3)]
    };
};
const generateExam = async (subjectName, parsedContent)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1500));
    const templates = subjectExamTemplates[subjectName] || subjectExamTemplates['Mathematics'];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const questions = template.questions.map((q, i)=>`Q${i + 1}: ${q}\nA${i + 1}: ${template.answers[i]}`).join('\n\n');
    const content = `📋 EXAM - ${subjectName}\n${'='.repeat(40)}\n\nDifficulty: ${parsedContent.difficulty}\nTopics: ${parsedContent.topics.join(', ')}\n\n${questions}\n\n${'='.repeat(40)}\nTotal Questions: ${template.questions.length}\nTime: ${template.questions.length * 5} minutes`;
    return {
        id: `exam-${Date.now()}`,
        type: 'exam',
        title: `${subjectName} Exam - ${new Date().toLocaleDateString()}`,
        content,
        createdAt: new Date().toISOString()
    };
};
const generateSummary = async (subjectName, parsedContent)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1200));
    const template = subjectSummaryTemplates[subjectName] || subjectSummaryTemplates['Mathematics'];
    const keyPointsList = template.keyPoints.map((p, i)=>`${i + 1}. ${p}`).join('\n');
    const content = `📝 SUMMARY - ${subjectName}\n${'='.repeat(40)}\n\n${template.overview}\n\n🔑 Key Points:\n${keyPointsList}\n\n📊 Topics Covered:\n${parsedContent.topics.map((t)=>`• ${t}`).join('\n')}\n\n💡 Study Tips:\n• Review key concepts daily\n• Practice with past exams\n• Create flashcards for definitions\n• Teach concepts to others`;
    return {
        id: `summary-${Date.now()}`,
        type: 'summary',
        title: `${subjectName} Summary - ${new Date().toLocaleDateString()}`,
        content,
        createdAt: new Date().toISOString()
    };
};
const generateNotes = async (subjectName)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1000));
    const template = subjectNotesTemplates[subjectName] || subjectNotesTemplates['Mathematics'];
    const sectionsContent = template.sections.map((section)=>{
        const pointsList = section.points.map((p)=>`  → ${p}`).join('\n');
        return `📌 ${section.title}\n${pointsList}`;
    }).join('\n\n');
    const content = `📒 STUDY NOTES - ${subjectName}\n${'='.repeat(40)}\n\n${sectionsContent}\n\n${'='.repeat(40)}\n✅ Review Checklist:\n${template.sections.flatMap((s)=>s.points.slice(0, 2)).map((p)=>`☐ ${p}`).join('\n')}`;
    return {
        id: `notes-${Date.now()}`,
        type: 'notes',
        title: `${subjectName} Notes - ${new Date().toLocaleDateString()}`,
        content,
        createdAt: new Date().toISOString()
    };
};
const generateMindMap = async (subjectName, parsedContent)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1800));
    const mindMapData = {
        name: subjectName,
        children: parsedContent.topics.map((topic)=>({
                name: topic,
                children: [
                    {
                        name: 'Concept A'
                    },
                    {
                        name: 'Concept B'
                    },
                    {
                        name: 'Practice'
                    }
                ]
            }))
    };
    return {
        id: `mindmap-${Date.now()}`,
        type: 'mindmap',
        title: `${subjectName} Mind Map - ${new Date().toLocaleDateString()}`,
        content: JSON.stringify(mindMapData),
        createdAt: new Date().toISOString()
    };
};
const generateAllContent = async (subjectName, parsedContent)=>{
    const [exam, summary, notes, mindmap] = await Promise.all([
        generateExam(subjectName, parsedContent),
        generateSummary(subjectName, parsedContent),
        generateNotes(subjectName),
        generateMindMap(subjectName, parsedContent)
    ]);
    return [
        exam,
        summary,
        notes,
        mindmap
    ];
};
}),
"[project]/src/services/aiMigrator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAndMigrate",
    ()=>checkAndMigrate,
    "migrateUnfinishedTasks",
    ()=>migrateUnfinishedTasks
]);
const migrateUnfinishedTasks = (userData)=>{
    const today = new Date().toISOString().split('T')[0];
    const nextSubjects = userData.subjects.map((subject)=>{
        const tasks = subject.tasks || [];
        const unfinishedTasks = tasks.filter((t)=>!t.completed && t.date < today);
        if (unfinishedTasks.length === 0) return subject;
        const remainingTasks = tasks.filter((t)=>!(!t.completed && t.date < today));
        const migratedTasks = unfinishedTasks.map((t)=>({
                ...t,
                date: today
            }));
        return {
            ...subject,
            tasks: [
                ...remainingTasks,
                ...migratedTasks
            ]
        };
    });
    return {
        ...userData,
        subjects: nextSubjects
    };
};
const checkAndMigrate = (userData, setUserData)=>{
    const lastCheck = localStorage.getItem('last_migration_check');
    const today = new Date().toISOString().split('T')[0];
    if (lastCheck !== today) {
        const migratedData = migrateUnfinishedTasks(userData);
        setTimeout(()=>setUserData(migratedData), 0);
        localStorage.setItem('last_migration_check', today);
    }
};
}),
"[project]/src/services/aiOptimizer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateMotivationalMessage",
    ()=>generateMotivationalMessage,
    "generateSuggestedSchedule",
    ()=>generateSuggestedSchedule,
    "suggestOptimization",
    ()=>suggestOptimization
]);
const suggestOptimization = (userData)=>{
    const suggestions = [];
    const subjectsWithManyTasks = userData.subjects.filter((s)=>(s.tasks || []).filter((t)=>!t.completed).length > 3);
    if (subjectsWithManyTasks.length > 0) {
        suggestions.push({
            type: 'reschedule',
            message: `You have many unfinished tasks in ${subjectsWithManyTasks[0].name}. Consider splitting its workload across two days.`
        });
    }
    return suggestions;
};
const generateMotivationalMessage = (name)=>{
    const messages = [
        `Keep going, ${name}!`,
        `Consistency is key, ${name}.`,
        `Believe in yourself, ${name}.`,
        `Every minute counts, ${name}.`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};
const generateSuggestedSchedule = (userData)=>{
    if (!userData.subjects || userData.subjects.length === 0) return {};
    const DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const subjects = userData.subjects;
    const suggested = {};
    // Basic AI logic: Distribute subjects evenly, prioritizing those with more tasks
    const subjectTaskCounts = subjects.map((s)=>({
            id: s.id,
            count: (s.tasks || []).filter((t)=>!t.completed).length
        })).sort((a, b)=>b.count - a.count);
    DAYS.forEach((day, index)=>{
        // Pick 2-3 subjects per day based on task counts and rotation
        const dailySubjects = [];
        const startIndex = index * 2 % subjects.length;
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
}),
"[project]/src/services/prayerTimes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchPrayerTimes",
    ()=>fetchPrayerTimes
]);
const fetchPrayerTimes = async (city, country)=>{
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`);
        const data = await response.json();
        if (data.code === 200 && data.data && data.data.timings) {
            const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
            return {
                Fajr,
                Dhuhr,
                Asr,
                Maghrib,
                Isha
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        return null;
    }
};
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/Dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingFlow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/OnboardingFlow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$splash$2f$SplashScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/splash/SplashScreen.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function Home() {
    const { isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    const [splashState, setSplashState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('pending');
    const [authStep, setAuthStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('auth');
    const [pendingCreds, setPendingCreds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const seen = sessionStorage.getItem('atomic_splash_seen');
        if (seen) {
            setSplashState('done');
        } else {
            setSplashState('showing');
        }
    }, []);
    const handleSplashComplete = ()=>{
        sessionStorage.setItem('atomic_splash_seen', 'true');
        setSplashState('done');
    };
    if (splashState === 'pending') return null;
    if (splashState === 'showing') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$splash$2f$SplashScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            onComplete: handleSplashComplete
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, this);
    }
    if (isLoading) return null;
    if (!isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: [
                authStep === 'auth' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.4
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onSignup: (name, password)=>{
                            setPendingCreds({
                                name,
                                password
                            });
                            setAuthStep('onboarding');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this)
                }, "auth", false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this),
                authStep === 'onboarding' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.4
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingFlow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        initialName: pendingCreds?.name,
                        initialPassword: pendingCreds?.password
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this)
                }, "onboarding", false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 77,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=src_0txu3wp._.js.map