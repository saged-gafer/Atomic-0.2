module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "defaultSubjects",
    ()=>defaultSubjects,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
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
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function xpToLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}
function AppProvider({ children }) {
    const [userData, setUserDataState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [standaloneGender, setStandaloneGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        userData
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((username, password)=>{
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
    }, []);
    const setUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        const dataWithCount = {
            ...data,
            loginCount: data.loginCount ?? 1
        };
        setUserDataState(dataWithCount);
        setIsAuthenticated(true);
    }, []);
    const clearData = ()=>{
        const lang = userData?.language || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'en');
        const t = lang === 'ar' ? 'هل أنت متأكد؟ سيتم حذف جميع بياناتك.' : 'Are you sure? This will delete all your data.';
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.confirm(t)) //TURBOPACK unreachable
        ;
    };
    const sanitizeText = (text, maxLength = 500)=>text.replace(/[<>"'`]/g, '').trim().slice(0, maxLength);
    const addTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, title)=>{
        const safe = sanitizeText(title);
        if (!safe) return;
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const newTask = {
                id: Math.random().toString(36).substr(2, 9),
                title: safe,
                completed: false,
                subjectId,
                date: new Date().toISOString().split('T')[0]
            };
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    tasks: [
                        ...s.tasks,
                        newTask
                    ]
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const toggleTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    tasks: s.tasks.map((t)=>t.id === taskId ? {
                            ...t,
                            completed: !t.completed
                        } : t)
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const deleteTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    tasks: s.tasks.filter((t)=>t.id !== taskId)
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const addFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, file)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    files: [
                        ...s.files || [],
                        file
                    ]
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const removeFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, fileId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    files: (s.files || []).filter((f)=>f.id !== fileId)
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const addGeneratedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((subjectId, content)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSubjects = prev.subjects.map((s)=>s.id === subjectId ? {
                    ...s,
                    generatedContent: [
                        ...s.generatedContent || [],
                        content
                    ]
                } : s);
            return {
                ...prev,
                subjects: nextSubjects
            };
        });
    }, []);
    const addLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((log)=>{
        if (log.duration <= 0) return;
        setUserDataState((prev)=>{
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
        });
    }, []);
    const addSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((title)=>{
        const safe = sanitizeText(title);
        if (!safe) return;
        setUserDataState((prev)=>{
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
        });
    }, []);
    const toggleSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSideTasks = (prev.sideTasks || []).map((t)=>t.id === taskId ? {
                    ...t,
                    completed: !t.completed
                } : t);
            return {
                ...prev,
                sideTasks: nextSideTasks
            };
        });
    }, []);
    const deleteSideTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const nextSideTasks = (prev.sideTasks || []).filter((t)=>t.id !== taskId);
            return {
                ...prev,
                sideTasks: nextSideTasks
            };
        });
    }, []);
    const addSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((suggestion)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            return {
                ...prev,
                suggestions: [
                    ...prev.suggestions || [],
                    suggestion
                ]
            };
        });
    }, []);
    const togglePrayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((prayerId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const today = new Date().toISOString().split('T')[0];
            const currentLogs = prev.prayerLogs || {};
            const todayLogs = currentLogs[today] || [];
            const nextTodayLogs = todayLogs.includes(prayerId) ? todayLogs.filter((id)=>id !== prayerId) : [
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
        });
    }, []);
    const updateUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            return {
                ...prev,
                ...data
            };
        });
    }, []);
    const addMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((date, title)=>{
        setUserDataState((prev)=>{
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
        });
    }, []);
    const toggleMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((date, taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const current = prev.monthlyTasks || {};
            return {
                ...prev,
                monthlyTasks: {
                    ...current,
                    [date]: (current[date] || []).map((t)=>t.id === taskId ? {
                            ...t,
                            completed: !t.completed
                        } : t)
                }
            };
        });
    }, []);
    const deleteMonthlyTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((date, taskId)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const current = prev.monthlyTasks || {};
            return {
                ...prev,
                monthlyTasks: {
                    ...current,
                    [date]: (current[date] || []).filter((t)=>t.id !== taskId)
                }
            };
        });
    }, []);
    const addStudyXP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((amount)=>{
        setUserDataState((prev)=>{
            if (!prev) return prev;
            const newXP = (prev.studyXP || 0) + amount;
            return {
                ...prev,
                studyXP: newXP,
                studyBondLevel: xpToLevel(newXP)
            };
        });
    }, []);
    const setGender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((gender)=>{
        setStandaloneGender(gender);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setUserDataState((prev)=>prev ? {
                ...prev,
                gender
            } : prev);
    }, []);
    const gender = userData?.gender || standaloneGender;
    const studyXP = userData?.studyXP || 0;
    const studyBondLevel = userData?.studyBondLevel || xpToLevel(studyXP);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
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
const useAppContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};
}),
"[project]/src/context/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
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
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    theme: THEMES.nebula,
    themeName: 'nebula',
    setTheme: ()=>{},
    toggleTheme: ()=>{}
});
function ThemeProvider({ children }) {
    const [themeName, setThemeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('nebula');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('atomic_theme');
        if (saved && THEMES[saved]) {
            setThemeName(saved);
            applyThemeVars(saved);
        } else {
            applyThemeVars('nebula');
        }
    }, []);
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
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((t)=>{
        setThemeName(t);
        localStorage.setItem('atomic_theme', t);
        applyThemeVars(t);
    }, []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setThemeName((prev)=>{
            const idx = THEME_ORDER.indexOf(prev);
            const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
            localStorage.setItem('atomic_theme', next);
            applyThemeVars(next);
            return next;
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
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
const useTheme = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
}),
"[project]/src/components/AdhkarService.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdhkarService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
"use client";
;
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
    const [currentDua, setCurrentDua] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const showDua = ()=>{
            const randomDua = ADHKAR[Math.floor(Math.random() * ADHKAR.length)];
            setCurrentDua(randomDua);
            setIsVisible(true);
            // Auto-hide after 15 seconds for a "quick side message"
            setTimeout(()=>{
                setIsVisible(false);
            }, 15000);
        };
        // Show first one after 30 seconds, then strictly every 15 minutes
        const initialTimer = setTimeout(showDua, 30000);
        const intervalTimer = setInterval(showDua, 15 * 60 * 1000);
        return ()=>{
            clearTimeout(initialTimer);
            clearInterval(intervalTimer);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && currentDua && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0f172a]/90 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-blue-500/20 flex items-start gap-4 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdhkarService.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[10px] text-blue-400/60 font-bold uppercase tracking-widest mb-1 text-right",
                                children: "ذكار اليوم"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdhkarService.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsVisible(false),
                        className: "p-1 hover:bg-white/5 rounded-full transition-colors relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
}),
"[project]/src/components/ui/CursorGlow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CursorGlow",
    ()=>CursorGlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-template.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const CursorGlow = ()=>{
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 25,
        stiffness: 150
    };
    const dx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, springConfig);
    const dy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, springConfig);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>window.removeEventListener('mousemove', handleMouseMove);
    }, [
        mouseX,
        mouseY
    ]);
    const background = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionTemplate"]`radial-gradient(circle 600px at ${dx}px ${dy}px, rgba(99, 102, 241, 0.05), transparent 80%)`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed inset-0 pointer-events-none z-[100] overflow-hidden",
        style: {
            background
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0iu-60t._.js.map