(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "defaultSubjects",
    ()=>defaultSubjects,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const defaultSubjects = [
    {
        id: '1',
        name: 'Arabic',
        color: '#059669',
        icon: 'Quill',
        tasks: []
    },
    {
        id: '2',
        name: 'English',
        color: '#2563eb',
        icon: 'Book',
        tasks: []
    },
    {
        id: '3',
        name: 'Physics',
        color: '#7c3aed',
        icon: 'Atom',
        tasks: []
    },
    {
        id: '4',
        name: 'Chemistry',
        color: '#be185d',
        icon: 'FlaskConical',
        tasks: []
    },
    {
        id: '5',
        name: 'Mathematics',
        color: '#b45309',
        icon: 'Pi',
        tasks: []
    }
];
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function xpToLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}
function AppProvider({ children }) {
    _s();
    const [userData, setUserDataState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [standaloneGender, setStandaloneGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && !hydrated.current) {
                setTimeout({
                    "AppProvider.useEffect": ()=>{
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
                        const savedGender = localStorage.getItem('atomic_gender');
                        if (savedGender) setStandaloneGender(savedGender);
                        setIsLoading(false);
                    }
                }["AppProvider.useEffect"], 0);
                hydrated.current = true;
            }
        }
    }["AppProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (userData && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                localStorage.setItem('study_planner_user_data', JSON.stringify(userData));
            }
        }
    }["AppProvider.useEffect"], [
        userData
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[login]": (username, password)=>{
            const saved = localStorage.getItem('study_planner_user_data');
            if (!saved) return false;
            let data;
            try {
                data = JSON.parse(saved);
            } catch  {
                return false;
            }
            if (data.username === username && data.password === password) {
                const updatedData = {
                    ...data,
                    loginCount: (data.loginCount || 0) + 1
                };
                localStorage.setItem('study_planner_user_data', JSON.stringify(updatedData));
                setUserDataState(updatedData);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
    }["AppProvider.useCallback[login]"], []);
    const setUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[setUserData]": (data)=>{
            const dataWithCount = {
                ...data,
                loginCount: data.loginCount ?? 1
            };
            setUserDataState(dataWithCount);
            setIsAuthenticated(true);
        }
    }["AppProvider.useCallback[setUserData]"], []);
    const clearData = ()=>{
        const lang = userData?.language || (("TURBOPACK compile-time truthy", 1) ? JSON.parse(localStorage.getItem('study_planner_user_data') || '{}')?.language : "TURBOPACK unreachable");
        const t = lang === 'ar' ? 'هل أنت متأكد؟ سيتم حذف جميع بياناتك.' : 'Are you sure? This will delete all your data.';
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.confirm(t)) {
            localStorage.removeItem('study_planner_user_data');
            setUserDataState(null);
            setIsAuthenticated(false);
        }
    };
    const sanitizeText = (text, maxLength = 500)=>text.replace(/[<>"'`]/g, '').trim().slice(0, maxLength);
    const addTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addTask]": (subjectId, title)=>{
            const safe = sanitizeText(title);
            if (!safe) return;
            setUserDataState({
                "AppProvider.useCallback[addTask]": (prev)=>{
                    if (!prev) return prev;
                    const newTask = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: safe,
                        completed: false,
                        subjectId,
                        date: new Date().toISOString().split('T')[0]
                    };
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[addTask].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                tasks: [
                                    ...s.tasks,
                                    newTask
                                ]
                            } : s
                    }["AppProvider.useCallback[addTask].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[addTask]"]);
        }
    }["AppProvider.useCallback[addTask]"], []);
    const toggleTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleTask]": (subjectId, taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[toggleTask]": (prev)=>{
                    if (!prev) return prev;
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[toggleTask].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                tasks: s.tasks.map({
                                    "AppProvider.useCallback[toggleTask].nextSubjects": (t)=>t.id === taskId ? {
                                            ...t,
                                            completed: !t.completed
                                        } : t
                                }["AppProvider.useCallback[toggleTask].nextSubjects"])
                            } : s
                    }["AppProvider.useCallback[toggleTask].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[toggleTask]"]);
        }
    }["AppProvider.useCallback[toggleTask]"], []);
    const deleteTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteTask]": (subjectId, taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[deleteTask]": (prev)=>{
                    if (!prev) return prev;
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[deleteTask].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                tasks: s.tasks.filter({
                                    "AppProvider.useCallback[deleteTask].nextSubjects": (t)=>t.id !== taskId
                                }["AppProvider.useCallback[deleteTask].nextSubjects"])
                            } : s
                    }["AppProvider.useCallback[deleteTask].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[deleteTask]"]);
        }
    }["AppProvider.useCallback[deleteTask]"], []);
    const addFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addFile]": (subjectId, file)=>{
            setUserDataState({
                "AppProvider.useCallback[addFile]": (prev)=>{
                    if (!prev) return prev;
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[addFile].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                files: [
                                    ...s.files || [],
                                    file
                                ]
                            } : s
                    }["AppProvider.useCallback[addFile].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[addFile]"]);
        }
    }["AppProvider.useCallback[addFile]"], []);
    const removeFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[removeFile]": (subjectId, fileId)=>{
            setUserDataState({
                "AppProvider.useCallback[removeFile]": (prev)=>{
                    if (!prev) return prev;
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[removeFile].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                files: (s.files || []).filter({
                                    "AppProvider.useCallback[removeFile].nextSubjects": (f)=>f.id !== fileId
                                }["AppProvider.useCallback[removeFile].nextSubjects"])
                            } : s
                    }["AppProvider.useCallback[removeFile].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[removeFile]"]);
        }
    }["AppProvider.useCallback[removeFile]"], []);
    const addGeneratedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addGeneratedContent]": (subjectId, content)=>{
            setUserDataState({
                "AppProvider.useCallback[addGeneratedContent]": (prev)=>{
                    if (!prev) return prev;
                    const nextSubjects = prev.subjects.map({
                        "AppProvider.useCallback[addGeneratedContent].nextSubjects": (s)=>s.id === subjectId ? {
                                ...s,
                                generatedContent: [
                                    ...s.generatedContent || [],
                                    content
                                ]
                            } : s
                    }["AppProvider.useCallback[addGeneratedContent].nextSubjects"]);
                    return {
                        ...prev,
                        subjects: nextSubjects
                    };
                }
            }["AppProvider.useCallback[addGeneratedContent]"]);
        }
    }["AppProvider.useCallback[addGeneratedContent]"], []);
    const addLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addLog]": (log)=>{
            if (log.duration <= 0) return;
            setUserDataState({
                "AppProvider.useCallback[addLog]": (prev)=>{
                    if (!prev) return prev;
                    return {
                        ...prev,
                        logs: [
                            ...prev.logs || [],
                            {
                                ...log,
                                date: log.date || new Date().toISOString()
                            }
                        ]
                    };
                }
            }["AppProvider.useCallback[addLog]"]);
        }
    }["AppProvider.useCallback[addLog]"], []);
    const addSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addSideTask]": (title)=>{
            const safe = sanitizeText(title);
            if (!safe) return;
            setUserDataState({
                "AppProvider.useCallback[addSideTask]": (prev)=>{
                    if (!prev) return prev;
                    const newTask = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: safe,
                        completed: false,
                        subjectId: 'side',
                        date: new Date().toISOString().split('T')[0]
                    };
                    return {
                        ...prev,
                        sideTasks: [
                            ...prev.sideTasks || [],
                            newTask
                        ]
                    };
                }
            }["AppProvider.useCallback[addSideTask]"]);
        }
    }["AppProvider.useCallback[addSideTask]"], []);
    const toggleSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleSideTask]": (taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[toggleSideTask]": (prev)=>{
                    if (!prev) return prev;
                    const nextSideTasks = (prev.sideTasks || []).map({
                        "AppProvider.useCallback[toggleSideTask].nextSideTasks": (t)=>t.id === taskId ? {
                                ...t,
                                completed: !t.completed
                            } : t
                    }["AppProvider.useCallback[toggleSideTask].nextSideTasks"]);
                    return {
                        ...prev,
                        sideTasks: nextSideTasks
                    };
                }
            }["AppProvider.useCallback[toggleSideTask]"]);
        }
    }["AppProvider.useCallback[toggleSideTask]"], []);
    const deleteSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteSideTask]": (taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[deleteSideTask]": (prev)=>{
                    if (!prev) return prev;
                    const nextSideTasks = (prev.sideTasks || []).filter({
                        "AppProvider.useCallback[deleteSideTask].nextSideTasks": (t)=>t.id !== taskId
                    }["AppProvider.useCallback[deleteSideTask].nextSideTasks"]);
                    return {
                        ...prev,
                        sideTasks: nextSideTasks
                    };
                }
            }["AppProvider.useCallback[deleteSideTask]"]);
        }
    }["AppProvider.useCallback[deleteSideTask]"], []);
    const addSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addSuggestion]": (suggestion)=>{
            setUserDataState({
                "AppProvider.useCallback[addSuggestion]": (prev)=>{
                    if (!prev) return prev;
                    return {
                        ...prev,
                        suggestions: [
                            ...prev.suggestions || [],
                            suggestion
                        ]
                    };
                }
            }["AppProvider.useCallback[addSuggestion]"]);
        }
    }["AppProvider.useCallback[addSuggestion]"], []);
    const togglePrayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[togglePrayer]": (prayerId)=>{
            setUserDataState({
                "AppProvider.useCallback[togglePrayer]": (prev)=>{
                    if (!prev) return prev;
                    const today = new Date().toISOString().split('T')[0];
                    const currentLogs = prev.prayerLogs || {};
                    const todayLogs = currentLogs[today] || [];
                    const nextTodayLogs = todayLogs.includes(prayerId) ? todayLogs.filter({
                        "AppProvider.useCallback[togglePrayer]": (id)=>id !== prayerId
                    }["AppProvider.useCallback[togglePrayer]"]) : [
                        ...todayLogs,
                        prayerId
                    ];
                    return {
                        ...prev,
                        prayerLogs: {
                            ...currentLogs,
                            [today]: nextTodayLogs
                        }
                    };
                }
            }["AppProvider.useCallback[togglePrayer]"]);
        }
    }["AppProvider.useCallback[togglePrayer]"], []);
    const updateUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[updateUserData]": (data)=>{
            setUserDataState({
                "AppProvider.useCallback[updateUserData]": (prev)=>{
                    if (!prev) return prev;
                    return {
                        ...prev,
                        ...data
                    };
                }
            }["AppProvider.useCallback[updateUserData]"]);
        }
    }["AppProvider.useCallback[updateUserData]"], []);
    const addMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addMonthlyTask]": (date, title)=>{
            setUserDataState({
                "AppProvider.useCallback[addMonthlyTask]": (prev)=>{
                    if (!prev) return prev;
                    const newTask = {
                        id: Math.random().toString(36).substr(2, 9),
                        title,
                        completed: false,
                        date
                    };
                    const current = prev.monthlyTasks || {};
                    return {
                        ...prev,
                        monthlyTasks: {
                            ...current,
                            [date]: [
                                ...current[date] || [],
                                newTask
                            ]
                        }
                    };
                }
            }["AppProvider.useCallback[addMonthlyTask]"]);
        }
    }["AppProvider.useCallback[addMonthlyTask]"], []);
    const toggleMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleMonthlyTask]": (date, taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[toggleMonthlyTask]": (prev)=>{
                    if (!prev) return prev;
                    const current = prev.monthlyTasks || {};
                    return {
                        ...prev,
                        monthlyTasks: {
                            ...current,
                            [date]: (current[date] || []).map({
                                "AppProvider.useCallback[toggleMonthlyTask]": (t)=>t.id === taskId ? {
                                        ...t,
                                        completed: !t.completed
                                    } : t
                            }["AppProvider.useCallback[toggleMonthlyTask]"])
                        }
                    };
                }
            }["AppProvider.useCallback[toggleMonthlyTask]"]);
        }
    }["AppProvider.useCallback[toggleMonthlyTask]"], []);
    const deleteMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteMonthlyTask]": (date, taskId)=>{
            setUserDataState({
                "AppProvider.useCallback[deleteMonthlyTask]": (prev)=>{
                    if (!prev) return prev;
                    const current = prev.monthlyTasks || {};
                    return {
                        ...prev,
                        monthlyTasks: {
                            ...current,
                            [date]: (current[date] || []).filter({
                                "AppProvider.useCallback[deleteMonthlyTask]": (t)=>t.id !== taskId
                            }["AppProvider.useCallback[deleteMonthlyTask]"])
                        }
                    };
                }
            }["AppProvider.useCallback[deleteMonthlyTask]"]);
        }
    }["AppProvider.useCallback[deleteMonthlyTask]"], []);
    const addStudyXP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addStudyXP]": (amount)=>{
            setUserDataState({
                "AppProvider.useCallback[addStudyXP]": (prev)=>{
                    if (!prev) return prev;
                    const newXP = (prev.studyXP || 0) + amount;
                    return {
                        ...prev,
                        studyXP: newXP,
                        studyBondLevel: xpToLevel(newXP)
                    };
                }
            }["AppProvider.useCallback[addStudyXP]"]);
        }
    }["AppProvider.useCallback[addStudyXP]"], []);
    const setGender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[setGender]": (gender)=>{
            setStandaloneGender(gender);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('atomic_gender', gender);
            }
            setUserDataState({
                "AppProvider.useCallback[setGender]": (prev)=>prev ? {
                        ...prev,
                        gender
                    } : prev
            }["AppProvider.useCallback[setGender]"]);
        }
    }["AppProvider.useCallback[setGender]"], []);
    const gender = userData?.gender || standaloneGender;
    const studyXP = userData?.studyXP || 0;
    const studyBondLevel = userData?.studyBondLevel || xpToLevel(studyXP);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
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
            isLoading,
            addStudyXP,
            setGender,
            gender,
            studyXP,
            studyBondLevel
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 310,
        columnNumber: 10
    }, this);
}
_s(AppProvider, "LUk++rooZTfOdo3p2Ir2B8h+djI=");
_c = AppProvider;
const useAppContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};
_s1(useAppContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEMES",
    ()=>THEMES,
    "THEME_ORDER",
    ()=>THEME_ORDER,
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const THEMES = {
    nebula: {
        id: 'nebula',
        name: 'Nebula',
        nameAr: 'سديم',
        bg: '#030712',
        bgDeep: '#020510',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        primaryGlow: 'rgba(99,102,241,0.5)',
        secondaryGlow: 'rgba(139,92,246,0.4)',
        blob1: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
        blob2: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
        blob3: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
        blob4: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        cardBg: 'rgba(5,8,26,0.96)',
        cardBorder: 'rgba(99,102,241,0.25)',
        ctaGradient: 'linear-gradient(135deg,#4338ca,#6d28d9,#1d4ed8)',
        glowClass: 'nebula-glow',
        emoji: '🌌'
    },
    jade: {
        id: 'jade',
        name: 'Nature',
        nameAr: 'الطبيعة',
        bg: '#040d08',
        bgDeep: '#030a05',
        primary: '#10b981',
        secondary: '#f59e0b',
        accent: '#34d399',
        primaryGlow: 'rgba(16,185,129,0.5)',
        secondaryGlow: 'rgba(245,158,11,0.4)',
        blob1: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
        blob2: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
        blob3: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
        blob4: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        cardBg: 'rgba(4,14,8,0.96)',
        cardBorder: 'rgba(16,185,129,0.25)',
        ctaGradient: 'linear-gradient(135deg,#065f46,#b45309,#047857)',
        glowClass: 'jade-glow',
        emoji: '🌿'
    },
    cyberpunk: {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        nameAr: 'سايبربانك',
        bg: '#000a0e',
        bgDeep: '#00060a',
        primary: '#00ffe7',
        secondary: '#ff003c',
        accent: '#ffe600',
        primaryGlow: 'rgba(0,255,231,0.5)',
        secondaryGlow: 'rgba(255,0,60,0.4)',
        blob1: 'radial-gradient(circle, rgba(0,255,231,0.2) 0%, transparent 70%)',
        blob2: 'radial-gradient(circle, rgba(255,0,60,0.15) 0%, transparent 70%)',
        blob3: 'radial-gradient(circle, rgba(255,230,0,0.12) 0%, transparent 70%)',
        blob4: 'radial-gradient(circle, rgba(0,255,231,0.07) 0%, transparent 70%)',
        cardBg: 'rgba(0,12,18,0.97)',
        cardBorder: 'rgba(0,255,231,0.3)',
        ctaGradient: 'linear-gradient(135deg,#00665c,#660018,#006655)',
        glowClass: 'cyberpunk-glow',
        emoji: '⚡'
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight',
        nameAr: 'منتصف الليل',
        bg: '#05071a',
        bgDeep: '#030514',
        primary: '#60a5fa',
        secondary: '#a78bfa',
        accent: '#f0abfc',
        primaryGlow: 'rgba(96,165,250,0.5)',
        secondaryGlow: 'rgba(167,139,250,0.4)',
        blob1: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
        blob2: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
        blob3: 'radial-gradient(circle, rgba(240,171,252,0.13) 0%, transparent 70%)',
        blob4: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
        cardBg: 'rgba(6,8,28,0.97)',
        cardBorder: 'rgba(96,165,250,0.25)',
        ctaGradient: 'linear-gradient(135deg,#1e3a5f,#4c1d95,#1e3a5f)',
        glowClass: 'midnight-glow',
        emoji: '🌙'
    },
    pastel: {
        id: 'pastel',
        name: 'Pastel',
        nameAr: 'باستيل',
        bg: '#0f0a14',
        bgDeep: '#0a0710',
        primary: '#f9a8d4',
        secondary: '#c4b5fd',
        accent: '#86efac',
        primaryGlow: 'rgba(249,168,212,0.5)',
        secondaryGlow: 'rgba(196,181,253,0.4)',
        blob1: 'radial-gradient(circle, rgba(249,168,212,0.2) 0%, transparent 70%)',
        blob2: 'radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 70%)',
        blob3: 'radial-gradient(circle, rgba(134,239,172,0.12) 0%, transparent 70%)',
        blob4: 'radial-gradient(circle, rgba(249,168,212,0.07) 0%, transparent 70%)',
        cardBg: 'rgba(18,10,22,0.97)',
        cardBorder: 'rgba(249,168,212,0.25)',
        ctaGradient: 'linear-gradient(135deg,#7c2d5a,#5b21b6,#1f5e3a)',
        glowClass: 'pastel-glow',
        emoji: '🌸'
    }
};
const THEME_ORDER = [
    'nebula',
    'jade',
    'cyberpunk',
    'midnight',
    'pastel'
];
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: THEMES.nebula,
    themeName: 'nebula',
    setTheme: ()=>{},
    toggleTheme: ()=>{}
});
function ThemeProvider({ children }) {
    _s();
    const [themeName, setThemeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('nebula');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const saved = localStorage.getItem('atomic_theme');
            if (saved && THEMES[saved]) {
                setThemeName(saved);
                applyThemeVars(saved);
            } else {
                applyThemeVars('nebula');
            }
        }
    }["ThemeProvider.useEffect"], []);
    const applyThemeVars = (t)=>{
        const cfg = THEMES[t];
        const root = document.documentElement;
        root.setAttribute('data-theme', t);
        root.style.setProperty('--theme-primary', cfg.primary);
        root.style.setProperty('--theme-secondary', cfg.secondary);
        root.style.setProperty('--theme-accent', cfg.accent);
        root.style.setProperty('--theme-bg', cfg.bg);
        root.style.setProperty('--blob1', cfg.blob1);
        root.style.setProperty('--blob2', cfg.blob2);
        root.style.setProperty('--blob3', cfg.blob3);
        root.style.setProperty('--blob4', cfg.blob4);
    };
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[setTheme]": (t)=>{
            setThemeName(t);
            localStorage.setItem('atomic_theme', t);
            applyThemeVars(t);
        }
    }["ThemeProvider.useCallback[setTheme]"], []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[toggleTheme]": ()=>{
            setThemeName({
                "ThemeProvider.useCallback[toggleTheme]": (prev)=>{
                    const idx = THEME_ORDER.indexOf(prev);
                    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
                    localStorage.setItem('atomic_theme', next);
                    applyThemeVars(next);
                    return next;
                }
            }["ThemeProvider.useCallback[toggleTheme]"]);
        }
    }["ThemeProvider.useCallback[toggleTheme]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme: THEMES[themeName],
            themeName,
            setTheme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "vbQVzy2c8g/j+dkAdMh5IChwH+w=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
};
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const ToastCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STYLES = {
    success: {
        bg: 'rgba(16,185,129,0.12)',
        border: 'rgba(16,185,129,0.4)',
        color: '#34d399',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
    },
    error: {
        bg: 'rgba(239,68,68,0.12)',
        border: 'rgba(239,68,68,0.4)',
        color: '#f87171',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"]
    },
    info: {
        bg: 'rgba(99,102,241,0.12)',
        border: 'rgba(99,102,241,0.4)',
        color: '#818cf8',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
    }
};
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[toast]": (type, message)=>{
            const id = Math.random().toString(36).slice(2);
            setToasts({
                "ToastProvider.useCallback[toast]": (p)=>[
                        ...p,
                        {
                            id,
                            type,
                            message
                        }
                    ]
            }["ToastProvider.useCallback[toast]"]);
            setTimeout({
                "ToastProvider.useCallback[toast]": ()=>setToasts({
                        "ToastProvider.useCallback[toast]": (p)=>p.filter({
                                "ToastProvider.useCallback[toast]": (t)=>t.id !== id
                            }["ToastProvider.useCallback[toast]"])
                    }["ToastProvider.useCallback[toast]"])
            }["ToastProvider.useCallback[toast]"], 3500);
        }
    }["ToastProvider.useCallback[toast]"], []);
    const dismiss = (id)=>setToasts((p)=>p.filter((t)=>t.id !== id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastCtx.Provider, {
        value: {
            toast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none",
                style: {
                    width: 300
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: toasts.map((t)=>{
                        const s = STYLES[t.type];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                x: 80,
                                opacity: 0,
                                scale: 0.9
                            },
                            animate: {
                                x: 0,
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                x: 80,
                                opacity: 0,
                                scale: 0.9
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 400,
                                damping: 30
                            },
                            className: "flex items-start gap-3 px-4 py-3 rounded-2xl pointer-events-auto cursor-pointer select-none",
                            style: {
                                background: s.bg,
                                border: `1.5px solid ${s.border}`,
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                            },
                            onClick: ()=>dismiss(t.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(s.Icon, {
                                    size: 17,
                                    style: {
                                        color: s.color,
                                        flexShrink: 0,
                                        marginTop: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-bold flex-1 text-slate-200 leading-snug",
                                    children: t.message
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 13,
                                    style: {
                                        color: s.color,
                                        flexShrink: 0,
                                        opacity: 0.6,
                                        marginTop: 2
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, t.id, true, {
                            fileName: "[project]/src/components/ui/Toast.tsx",
                            lineNumber: 37,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Toast.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "OPZKGrTNnwp+klP+pH502F/rcGc=");
_c = ToastProvider;
function useToast() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastCtx);
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}
_s1(useToast, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdhkarService.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdhkarService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ADHKAR = [
    "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
    "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً",
    "اللهم انفعني بما علمتني، وعلمني ما ينفعني، وزدني علماً",
    "اللهم إني أعوذ بك من علم لا ينفع، ومن قلب لا يخشع",
    "رب زدني علماً",
    "سبحان الله وبحمده، سبحان الله العظيم",
    "لا إله إلا أنت سبحانك إني كنت من الظالمين",
    "أستغفر الله وأتوب إليه",
    "اللهم صل وسلم على نبينا محمد",
    "يا حي يا قيوم برحمتك أستغيث",
    "اللهم إني أعوذ بك من النسيان، اللهم ذكرني ما نسيت وعلمني ما جهلت",
    "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
    "اللهم بارك لي في وقتي وجهدي",
    "رب اشرح لي صدري ويسر لي أمري"
];
function AdhkarService() {
    _s();
    const [currentDua, setCurrentDua] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdhkarService.useEffect": ()=>{
            const showDua = {
                "AdhkarService.useEffect.showDua": ()=>{
                    const randomDua = ADHKAR[Math.floor(Math.random() * ADHKAR.length)];
                    setCurrentDua(randomDua);
                    setIsVisible(true);
                    // Auto-hide after 15 seconds for a "quick side message"
                    setTimeout({
                        "AdhkarService.useEffect.showDua": ()=>{
                            setIsVisible(false);
                        }
                    }["AdhkarService.useEffect.showDua"], 15000);
                }
            }["AdhkarService.useEffect.showDua"];
            // Show first one after 30 seconds, then strictly every 15 minutes
            const initialTimer = setTimeout(showDua, 30000);
            const intervalTimer = setInterval(showDua, 15 * 60 * 1000);
            return ({
                "AdhkarService.useEffect": ()=>{
                    clearTimeout(initialTimer);
                    clearInterval(intervalTimer);
                }
            })["AdhkarService.useEffect"];
        }
    }["AdhkarService.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && currentDua && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                x: 400,
                opacity: 0,
                scale: 0.8
            },
            animate: {
                x: 0,
                opacity: 1,
                scale: 1
            },
            exit: {
                x: 400,
                opacity: 0,
                scale: 0.8
            },
            className: "fixed bottom-24 right-6 z-[200] max-w-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0f172a]/90 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-blue-500/20 flex items-start gap-4 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            size: 20,
                            className: "animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdhkarService.tsx",
                            lineNumber: 63,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 62,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[10px] text-blue-400/60 font-bold uppercase tracking-widest mb-1 text-right",
                                children: "ذكار اليوم"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdhkarService.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-bold text-white leading-relaxed text-right",
                                dir: "rtl",
                                children: currentDua
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdhkarService.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsVisible(false),
                        className: "p-1 hover:bg-white/5 rounded-full transition-colors relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16,
                            className: "text-slate-500 hover:text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdhkarService.tsx",
                            lineNumber: 77,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-1 bg-gradient-to-l from-blue-600 to-blue-400",
                        initial: {
                            width: "100%"
                        },
                        animate: {
                            width: "0%"
                        },
                        transition: {
                            duration: 15,
                            ease: "linear"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdhkarService.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdhkarService.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AdhkarService.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(AdhkarService, "SON0oYd1jobO+32kAg8D2NLs/VA=");
_c = AdhkarService;
var _c;
__turbopack_context__.k.register(_c, "AdhkarService");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/CursorGlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CursorGlow",
    ()=>CursorGlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-template.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CursorGlow = ()=>{
    _s();
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 25,
        stiffness: 150
    };
    const dx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, springConfig);
    const dy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, springConfig);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CursorGlow.useEffect": ()=>{
            const handleMouseMove = {
                "CursorGlow.useEffect.handleMouseMove": (e)=>{
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                }
            }["CursorGlow.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            return ({
                "CursorGlow.useEffect": ()=>window.removeEventListener('mousemove', handleMouseMove)
            })["CursorGlow.useEffect"];
        }
    }["CursorGlow.useEffect"], [
        mouseX,
        mouseY
    ]);
    const background = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionTemplate"]`radial-gradient(circle 600px at ${dx}px ${dy}px, rgba(99, 102, 241, 0.05), transparent 80%)`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed inset-0 pointer-events-none z-[100] overflow-hidden",
        style: {
            background
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]",
            style: {
                x: dx,
                y: dy,
                translateX: '-50%',
                translateY: '-50%'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/CursorGlow.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CursorGlow.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CursorGlow, "l8f4iVkXUVx9ZH/t1hlaRVUAAP8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = CursorGlow;
var _c;
__turbopack_context__.k.register(_c, "CursorGlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/TabVisibilityTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TabVisibilityTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function TabVisibilityTracker() {
    _s();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const notifSentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hiddenTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TabVisibilityTracker.useEffect": ()=>{
            if (!isAuthenticated) return;
            const handleVisibilityChange = {
                "TabVisibilityTracker.useEffect.handleVisibilityChange": ()=>{
                    if (document.hidden) {
                        hiddenTimeRef.current = Date.now();
                        notifSentRef.current = false;
                    } else {
                        hiddenTimeRef.current = null;
                    }
                }
            }["TabVisibilityTracker.useEffect.handleVisibilityChange"];
            const checkInactivity = {
                "TabVisibilityTracker.useEffect.checkInactivity": ()=>{
                    if (document.hidden && hiddenTimeRef.current && !notifSentRef.current) {
                        const elapsed = Date.now() - hiddenTimeRef.current;
                        if (elapsed > 30000) {
                            notifSentRef.current = true;
                            if ('Notification' in window && Notification.permission === 'granted') {
                                new Notification('Hey! Atomic is still here waiting... 📚', {
                                    body: 'Come back and continue your study session!',
                                    icon: '/icon-192x192.png'
                                });
                            }
                        }
                    }
                }
            }["TabVisibilityTracker.useEffect.checkInactivity"];
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
            document.addEventListener('visibilitychange', handleVisibilityChange);
            const interval = setInterval(checkInactivity, 10000);
            return ({
                "TabVisibilityTracker.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    clearInterval(interval);
                }
            })["TabVisibilityTracker.useEffect"];
        }
    }["TabVisibilityTracker.useEffect"], [
        isAuthenticated
    ]);
    return null;
}
_s(TabVisibilityTracker, "h2n0a39E2jgIp6dfBxL4PRWLMCk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c = TabVisibilityTracker;
var _c;
__turbopack_context__.k.register(_c, "TabVisibilityTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0zjwxo.._.js.map