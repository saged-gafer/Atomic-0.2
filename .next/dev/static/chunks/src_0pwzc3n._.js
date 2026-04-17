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
function AppProvider({ children }) {
    _s();
    const [userData, setUserDataState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && !hydrated.current) {
                // Defer state updates to avoid cascading renders during hydration
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
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 275,
        columnNumber: 10
    }, this);
}
_s(AppProvider, "Hbxis6/kSvihrkezBfRr7IZciZ8=");
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
]);

//# sourceMappingURL=src_0pwzc3n._.js.map