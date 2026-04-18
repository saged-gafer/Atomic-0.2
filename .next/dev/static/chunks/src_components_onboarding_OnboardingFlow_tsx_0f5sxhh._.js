(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/onboarding/OnboardingFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FloatingInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$prayerTimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/prayerTimes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$anime$2f$AnimeMascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/anime/AnimeMascot.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
const STEP_CONFIG = [
    {
        label: 'Profile',
        emoji: '👤',
        mascotPose: 'wave',
        mascotExpr: 'happy',
        hint: 'Tell us about yourself!'
    },
    {
        label: 'Subjects',
        emoji: '📚',
        mascotPose: 'study',
        mascotExpr: 'focused',
        hint: 'Pick your subjects!'
    },
    {
        label: 'Schedule',
        emoji: '📅',
        mascotPose: 'think',
        mascotExpr: 'focused',
        hint: 'Plan your week!'
    },
    {
        label: 'Goals',
        emoji: '🎯',
        mascotPose: 'success',
        mascotExpr: 'excited',
        hint: "Let's set your goals!"
    }
];
/* ── Anime step indicator ────────────────────────────── */ function StepIndicator({ step, total, primary, secondary }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-1 mb-6",
        children: Array.from({
            length: total
        }).map((_, i)=>{
            const cfg = STEP_CONFIG[i];
            const done = i < step;
            const active = i === step;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "h-[3px] w-8 rounded-full overflow-hidden",
                        style: {
                            background: 'rgba(255,255,255,0.08)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "h-full rounded-full",
                            animate: {
                                scaleX: done ? 1 : 0
                            },
                            style: {
                                background: `linear-gradient(90deg,${primary},${secondary})`,
                                transformOrigin: 'left'
                            },
                            transition: {
                                duration: 0.5
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 33,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 32,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "flex flex-col items-center gap-1",
                        animate: {
                            scale: active ? 1.12 : 1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 25
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black relative overflow-hidden",
                                animate: {
                                    background: done ? `linear-gradient(135deg,${primary},${secondary})` : active ? `${primary}22` : 'rgba(255,255,255,0.04)',
                                    boxShadow: active ? `0 0 20px ${primary}60, 0 4px 0 0 ${primary}40` : done ? `0 0 12px ${primary}30, 0 3px 0 0 ${primary}40` : '0 0 0px rgba(0,0,0,0)',
                                    borderColor: active ? `${primary}80` : done ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)'
                                },
                                style: {
                                    border: '2.5px solid'
                                },
                                transition: {
                                    duration: 0.4
                                },
                                children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        scale: 0,
                                        rotate: -45
                                    },
                                    animate: {
                                        scale: 1,
                                        rotate: 0
                                    },
                                    transition: {
                                        type: 'spring',
                                        stiffness: 500
                                    },
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 63,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: cfg.emoji
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 64,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[8px] font-black uppercase tracking-widest ${active ? '' : 'opacity-50'}`,
                                style: {
                                    color: active ? primary : 'rgba(255,255,255,0.5)'
                                },
                                children: cfg.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 30,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = StepIndicator;
/* ── Primary anime button ────────────────────────────── */ function AnimeBtn({ onClick, disabled, loading, children, gradient, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: onClick,
        disabled: disabled || loading,
        whileHover: {
            scale: 1.03,
            y: -3
        },
        whileTap: {
            scale: 0.96,
            y: 0
        },
        className: "flex-1 h-13 rounded-2xl font-black text-white text-sm uppercase tracking-widest relative overflow-hidden flex items-center justify-center gap-2",
        style: {
            height: 52,
            background: gradient,
            border: `2.5px solid ${color}`,
            boxShadow: `0 4px 0 0 ${color}80, 0 0 25px ${color}25`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)'
                },
                animate: {
                    x: [
                        '-120%',
                        '220%'
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative z-10 flex items-center gap-2",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    size: 18,
                    className: "animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 94,
                    columnNumber: 20
                }, this) : children
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c1 = AnimeBtn;
function BackBtn({ onClick, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: onClick,
        whileHover: {
            scale: 1.03
        },
        whileTap: {
            scale: 0.96
        },
        className: "flex-1 h-[52px] rounded-2xl font-bold text-sm border flex items-center justify-center gap-2",
        style: {
            background: 'rgba(255,255,255,0.03)',
            borderColor: `${color}25`,
            color: 'rgba(200,200,220,0.8)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            " Back"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c2 = BackBtn;
function OnboardingFlow() {
    _s();
    const { setUserData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [prevStep, setPrevStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        username: '',
        password: '',
        language: 'en',
        city: '',
        country: '',
        weeklySchedule: {},
        dailyStudyHours: 4,
        subjects: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSubjects"],
        sideTasks: [],
        logs: []
    });
    const [newSubjectName, setNewSubjectName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isFinishing, setIsFinishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingFlow.useEffect": ()=>{
            setMounted(true);
        }
    }["OnboardingFlow.useEffect"], []);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][formData.language];
    const validateStep0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[validateStep0]": ()=>{
            const e = {};
            if (!formData.name.trim()) e.name = 'Name is required!';
            if (!formData.username?.trim()) e.username = 'Username is required!';
            if (!formData.password?.trim()) e.password = 'Password is required!';
            if (!formData.city?.trim()) e.city = 'City is required!';
            if (!formData.country?.trim()) e.country = 'Country is required!';
            setErrors(e);
            return Object.keys(e).length === 0;
        }
    }["OnboardingFlow.useCallback[validateStep0]"], [
        formData
    ]);
    const goNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[goNext]": ()=>{
            if (step === 0 && !validateStep0()) return;
            setPrevStep(step);
            setStep({
                "OnboardingFlow.useCallback[goNext]": (s)=>s + 1
            }["OnboardingFlow.useCallback[goNext]"]);
        }
    }["OnboardingFlow.useCallback[goNext]"], [
        step,
        validateStep0
    ]);
    const goPrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[goPrev]": ()=>{
            setPrevStep(step);
            setStep({
                "OnboardingFlow.useCallback[goPrev]": (s)=>s - 1
            }["OnboardingFlow.useCallback[goPrev]"]);
        }
    }["OnboardingFlow.useCallback[goPrev]"], [
        step
    ]);
    const handleComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[handleComplete]": async ()=>{
            setIsFinishing(true);
            let prayerTimes = null;
            if (formData.city && formData.country) prayerTimes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$prayerTimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPrayerTimes"])(formData.city, formData.country);
            setUserData({
                ...formData,
                prayerTimes: prayerTimes || undefined
            });
        }
    }["OnboardingFlow.useCallback[handleComplete]"], [
        formData,
        setUserData
    ]);
    const addCustomSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[addCustomSubject]": ()=>{
            if (newSubjectName.trim()) {
                const colors = [
                    theme.primary,
                    theme.secondary,
                    theme.accent,
                    '#facc15',
                    '#4ade80',
                    '#f97316',
                    '#e879f9'
                ];
                setFormData({
                    "OnboardingFlow.useCallback[addCustomSubject]": (fd)=>({
                            ...fd,
                            subjects: [
                                ...fd.subjects,
                                {
                                    id: Math.random().toString(36).substr(2, 9),
                                    name: newSubjectName.trim(),
                                    color: colors[Math.floor(Math.random() * colors.length)],
                                    icon: 'Book',
                                    tasks: []
                                }
                            ]
                        })
                }["OnboardingFlow.useCallback[addCustomSubject]"]);
                setNewSubjectName('');
            }
        }
    }["OnboardingFlow.useCallback[addCustomSubject]"], [
        newSubjectName,
        theme
    ]);
    const dir = step > prevStep ? 1 : -1;
    const slideV = {
        initial: {
            opacity: 0,
            x: dir * 50,
            filter: 'blur(6px)'
        },
        animate: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)'
        },
        exit: {
            opacity: 0,
            x: dir * -50,
            filter: 'blur(6px)'
        }
    };
    const tr = {
        duration: 0.4,
        ease: [
            0.22,
            1,
            0.36,
            1
        ]
    };
    const stepCfg = STEP_CONFIG[step];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full flex items-start justify-center relative overflow-hidden py-6",
        style: {
            background: `radial-gradient(ellipse at 50% 20%, ${theme.bgDeep} 0%, ${theme.bg} 65%)`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    backgroundImage: `radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none opacity-[0.03]",
                style: {
                    backgroundImage: 'repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 18px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none",
                style: {
                    background: `${theme.primary}18`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[100px] pointer-events-none",
                style: {
                    background: `${theme.secondary}14`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-lg px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-center mb-4",
                        initial: {
                            y: -20,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            duration: 0.6,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ]
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mb-1",
                                children: mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$anime$2f$AnimeMascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    pose: stepCfg.mascotPose,
                                    expression: stepCfg.mascotExpr,
                                    size: 100,
                                    primaryColor: theme.primary
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "inline-block px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest mb-1",
                                style: {
                                    background: `${theme.primary}15`,
                                    border: `2px solid ${theme.primary}35`,
                                    color: theme.primary
                                },
                                children: stepCfg.hint
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-lg flex items-center justify-center font-black text-white text-xs",
                                        style: {
                                            background: `linear-gradient(135deg,${theme.primary},${theme.secondary})`
                                        },
                                        children: "A"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-black tracking-widest text-white uppercase",
                                        children: "ATOMIC Setup"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative rounded-[28px] overflow-hidden",
                        style: {
                            background: theme.cardBg,
                            border: `2.5px solid ${theme.primary}55`,
                            boxShadow: `0 4px 0 0 ${theme.primary}40, 0 30px 80px -10px rgba(0,0,0,0.95), 0 0 50px -10px ${theme.primary}20`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute top-0 left-0 right-0 h-[3px] z-20",
                                animate: {
                                    background: [
                                        `linear-gradient(90deg,transparent,${theme.primary},${theme.secondary},transparent)`,
                                        `linear-gradient(90deg,transparent,${theme.secondary},${theme.primary},transparent)`
                                    ]
                                },
                                transition: {
                                    duration: 2.5,
                                    repeat: Infinity
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 opacity-25 pointer-events-none",
                                style: {
                                    backgroundImage: `radial-gradient(circle, ${theme.primary}07 1px, transparent 1px)`,
                                    backgroundSize: '12px 12px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                        step: step,
                                        total: 4,
                                        primary: theme.primary,
                                        secondary: theme.secondary
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-h-[380px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            initial: false,
                                            children: [
                                                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    variants: slideV,
                                                    initial: "initial",
                                                    animate: "animate",
                                                    exit: "exit",
                                                    transition: tr,
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-black text-white mb-0.5",
                                                                    children: "Set Up Your Profile"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-medium",
                                                                    style: {
                                                                        color: `${theme.primary}70`
                                                                    },
                                                                    children: "Tell us who you are, hero! 🎌"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                            label: "Full Name *",
                                                            value: formData.name,
                                                            onChange: (e)=>{
                                                                setFormData((fd)=>({
                                                                        ...fd,
                                                                        name: e.target.value
                                                                    }));
                                                                setErrors({});
                                                            },
                                                            error: errors.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                                    label: "Username *",
                                                                    value: formData.username || '',
                                                                    onChange: (e)=>{
                                                                        setFormData((fd)=>({
                                                                                ...fd,
                                                                                username: e.target.value
                                                                            }));
                                                                        setErrors({});
                                                                    },
                                                                    error: errors.username,
                                                                    autoComplete: "username"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                                    label: "Password *",
                                                                    type: "password",
                                                                    value: formData.password || '',
                                                                    onChange: (e)=>{
                                                                        setFormData((fd)=>({
                                                                                ...fd,
                                                                                password: e.target.value
                                                                            }));
                                                                        setErrors({});
                                                                    },
                                                                    error: errors.password,
                                                                    autoComplete: "new-password"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                                    label: "City *",
                                                                    value: formData.city || '',
                                                                    onChange: (e)=>{
                                                                        setFormData((fd)=>({
                                                                                ...fd,
                                                                                city: e.target.value
                                                                            }));
                                                                        setErrors({});
                                                                    },
                                                                    error: errors.city
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                                    label: "Country *",
                                                                    value: formData.country || '',
                                                                    onChange: (e)=>{
                                                                        setFormData((fd)=>({
                                                                                ...fd,
                                                                                country: e.target.value
                                                                            }));
                                                                        setErrors({});
                                                                    },
                                                                    error: errors.country
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[9px] font-black uppercase tracking-widest mb-2",
                                                                    style: {
                                                                        color: `${theme.primary}60`
                                                                    },
                                                                    children: "Language / اللغة"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-2 gap-2",
                                                                    children: [
                                                                        {
                                                                            lang: 'en',
                                                                            label: 'English',
                                                                            flag: '🇬🇧'
                                                                        },
                                                                        {
                                                                            lang: 'ar',
                                                                            label: 'العربية',
                                                                            flag: '🇸🇦'
                                                                        }
                                                                    ].map(({ lang, label, flag })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                            onClick: ()=>{
                                                                                if (validateStep0()) {
                                                                                    setFormData((fd)=>({
                                                                                            ...fd,
                                                                                            language: lang
                                                                                        }));
                                                                                    setTimeout(goNext, 10);
                                                                                }
                                                                            },
                                                                            whileHover: {
                                                                                scale: 1.03,
                                                                                y: -2
                                                                            },
                                                                            whileTap: {
                                                                                scale: 0.96
                                                                            },
                                                                            className: "flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-sm border relative overflow-hidden",
                                                                            style: {
                                                                                background: formData.language === lang ? `${theme.primary}15` : 'rgba(255,255,255,0.02)',
                                                                                borderColor: formData.language === lang ? `${theme.primary}60` : 'rgba(255,255,255,0.08)',
                                                                                color: formData.language === lang ? theme.primary : 'rgba(200,200,220,0.7)',
                                                                                boxShadow: formData.language === lang ? `0 0 15px ${theme.primary}20` : 'none'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                    className: "absolute inset-0",
                                                                                    style: {
                                                                                        background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.1) 50%,transparent 70%)'
                                                                                    },
                                                                                    animate: {
                                                                                        x: [
                                                                                            '-120%',
                                                                                            '220%'
                                                                                        ]
                                                                                    },
                                                                                    transition: {
                                                                                        duration: 2.2,
                                                                                        repeat: Infinity,
                                                                                        repeatDelay: 1
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 312,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-lg relative z-10",
                                                                                    children: flag
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 316,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "relative z-10",
                                                                                    children: label
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 317,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                                    size: 12,
                                                                                    className: "relative z-10 opacity-50"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 318,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, lang, true, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 296,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, "s0", true, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 19
                                                }, this),
                                                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    variants: slideV,
                                                    initial: "initial",
                                                    animate: "animate",
                                                    exit: "exit",
                                                    transition: tr,
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-black text-white mb-0.5",
                                                                    children: "Your Study Subjects"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-medium",
                                                                    style: {
                                                                        color: `${theme.primary}70`
                                                                    },
                                                                    children: "What are you studying? Pick your weapons! ⚔️"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 331,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2 max-h-[260px] overflow-y-auto pr-1",
                                                            children: formData.subjects.map((sub, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        opacity: 0,
                                                                        x: 20
                                                                    },
                                                                    animate: {
                                                                        opacity: 1,
                                                                        x: 0
                                                                    },
                                                                    transition: {
                                                                        delay: i * 0.05,
                                                                        type: 'spring',
                                                                        stiffness: 300,
                                                                        damping: 25
                                                                    },
                                                                    className: "flex items-center gap-3 p-3 rounded-2xl border",
                                                                    style: {
                                                                        background: `${sub.color}08`,
                                                                        borderColor: `${sub.color}30`
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-3 h-3 rounded-full shrink-0",
                                                                            style: {
                                                                                background: sub.color,
                                                                                boxShadow: `0 0 6px ${sub.color}`
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 342,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                                                            label: `${sub.name} — link (optional)`,
                                                                            value: sub.link || '',
                                                                            onChange: (e)=>setFormData((fd)=>({
                                                                                        ...fd,
                                                                                        subjects: fd.subjects.map((s)=>s.id === sub.id ? {
                                                                                                ...s,
                                                                                                link: e.target.value.trim() || undefined
                                                                                            } : s)
                                                                                    }))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 343,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSubjects"].find((d)=>d.id === sub.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                            whileHover: {
                                                                                scale: 1.2
                                                                            },
                                                                            whileTap: {
                                                                                scale: 0.9
                                                                            },
                                                                            onClick: ()=>setFormData((fd)=>({
                                                                                        ...fd,
                                                                                        subjects: fd.subjects.filter((s)=>s.id !== sub.id)
                                                                                    })),
                                                                            className: "p-1.5 rounded-xl text-red-400/70 hover:text-red-400",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                size: 12
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                lineNumber: 353,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 349,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, sub.id, true, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    value: newSubjectName,
                                                                    onChange: (e)=>setNewSubjectName(e.target.value),
                                                                    onKeyDown: (e)=>e.key === 'Enter' && addCustomSubject(),
                                                                    placeholder: "+ Add custom subject...",
                                                                    className: "flex-1 h-10 px-4 rounded-2xl text-sm font-bold text-white outline-none border",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.04)',
                                                                        borderColor: `${theme.primary}25`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                    onClick: addCustomSubject,
                                                                    whileHover: {
                                                                        scale: 1.1
                                                                    },
                                                                    whileTap: {
                                                                        scale: 0.9
                                                                    },
                                                                    className: "w-10 h-10 rounded-2xl flex items-center justify-center",
                                                                    style: {
                                                                        background: `${theme.primary}20`,
                                                                        border: `2px solid ${theme.primary}40`,
                                                                        color: theme.primary
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, "s1", true, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 19
                                                }, this),
                                                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    variants: slideV,
                                                    initial: "initial",
                                                    animate: "animate",
                                                    exit: "exit",
                                                    transition: tr,
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-black text-white mb-0.5",
                                                                    children: "Weekly Schedule"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 385,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-medium",
                                                                    style: {
                                                                        color: `${theme.primary}70`
                                                                    },
                                                                    children: "Plan your battles! Choose subjects for each day 📅"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3 max-h-[300px] overflow-y-auto pr-1",
                                                            children: DAYS.map((day, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        opacity: 0,
                                                                        y: 10
                                                                    },
                                                                    animate: {
                                                                        opacity: 1,
                                                                        y: 0
                                                                    },
                                                                    transition: {
                                                                        delay: di * 0.04
                                                                    },
                                                                    className: "rounded-2xl p-3 border",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.02)',
                                                                        borderColor: `${theme.primary}15`
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 mb-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-2 h-2 rounded-full",
                                                                                    style: {
                                                                                        background: theme.primary
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 398,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs font-black text-white",
                                                                                    children: day
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 399,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 397,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-wrap gap-1.5",
                                                                            children: formData.subjects.map((sub)=>{
                                                                                const checked = (formData.weeklySchedule[day] || []).includes(sub.id);
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                                    whileHover: {
                                                                                        scale: 1.06
                                                                                    },
                                                                                    whileTap: {
                                                                                        scale: 0.93
                                                                                    },
                                                                                    onClick: ()=>setFormData((fd)=>{
                                                                                            const curr = fd.weeklySchedule[day] || [];
                                                                                            const next = checked ? curr.filter((id)=>id !== sub.id) : [
                                                                                                ...curr,
                                                                                                sub.id
                                                                                            ];
                                                                                            return {
                                                                                                ...fd,
                                                                                                weeklySchedule: {
                                                                                                    ...fd.weeklySchedule,
                                                                                                    [day]: next
                                                                                                }
                                                                                            };
                                                                                        }),
                                                                                    className: "flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold",
                                                                                    style: {
                                                                                        background: checked ? `${sub.color}22` : 'rgba(255,255,255,0.04)',
                                                                                        border: `1.5px solid ${checked ? sub.color + '55' : 'rgba(255,255,255,0.07)'}`,
                                                                                        color: checked ? sub.color : 'rgba(150,150,180,0.7)'
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "w-1.5 h-1.5 rounded-full",
                                                                                            style: {
                                                                                                background: checked ? sub.color : 'rgba(100,100,130,0.4)'
                                                                                            }
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                            lineNumber: 419,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        sub.name,
                                                                                        checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                            size: 8
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                            lineNumber: 421,
                                                                                            columnNumber: 47
                                                                                        }, this)
                                                                                    ]
                                                                                }, sub.id, true, {
                                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                    lineNumber: 405,
                                                                                    columnNumber: 33
                                                                                }, this);
                                                                            })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 401,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, day, true, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, "s2", true, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 19
                                                }, this),
                                                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    variants: slideV,
                                                    initial: "initial",
                                                    animate: "animate",
                                                    exit: "exit",
                                                    transition: tr,
                                                    className: "space-y-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-black text-white mb-0.5",
                                                                    children: "Daily Study Goal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-medium",
                                                                    style: {
                                                                        color: `${theme.primary}70`
                                                                    },
                                                                    children: "How many hours per day will you study? 🔥"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-bold text-white",
                                                                            children: "Daily Hours"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 443,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-3xl font-black",
                                                                            style: {
                                                                                color: theme.primary
                                                                            },
                                                                            children: [
                                                                                formData.dailyStudyHours,
                                                                                "h"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 444,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 442,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative h-3 rounded-full overflow-hidden",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.08)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        className: "absolute left-0 top-0 bottom-0 rounded-full",
                                                                        animate: {
                                                                            width: `${formData.dailyStudyHours / 12 * 100}%`
                                                                        },
                                                                        style: {
                                                                            background: `linear-gradient(90deg,${theme.primary},${theme.secondary})`,
                                                                            boxShadow: `0 0 10px ${theme.primary}60`
                                                                        },
                                                                        transition: {
                                                                            type: 'spring',
                                                                            stiffness: 200,
                                                                            damping: 25
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 446,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "range",
                                                                    min: 1,
                                                                    max: 12,
                                                                    step: 0.5,
                                                                    value: formData.dailyStudyHours,
                                                                    onChange: (e)=>setFormData((fd)=>({
                                                                                ...fd,
                                                                                dailyStudyHours: parseFloat(e.target.value)
                                                                            })),
                                                                    className: "w-full accent-purple-500",
                                                                    style: {
                                                                        accentColor: theme.primary
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between text-[9px] font-bold",
                                                                    style: {
                                                                        color: `${theme.primary}50`
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "1h"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "3h"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 40
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "6h"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 55
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "9h"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 70
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "12h"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 85
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 21
                                                        }, this),
                                                        [
                                                            {
                                                                hours: [
                                                                    1,
                                                                    2
                                                                ],
                                                                msg: 'Good start! Every minute counts! ⭐',
                                                                color: '#4ade80'
                                                            },
                                                            {
                                                                hours: [
                                                                    3,
                                                                    4
                                                                ],
                                                                msg: 'Solid dedication! You are committed! 🔥',
                                                                color: theme.primary
                                                            },
                                                            {
                                                                hours: [
                                                                    5,
                                                                    6
                                                                ],
                                                                msg: 'Intense focus! Study hero material! ⚡',
                                                                color: theme.secondary
                                                            },
                                                            {
                                                                hours: [
                                                                    7,
                                                                    12
                                                                ],
                                                                msg: 'LEGENDARY mode! Take breaks too! 🏆',
                                                                color: '#facc15'
                                                            }
                                                        ].filter((m)=>formData.dailyStudyHours >= m.hours[0] && formData.dailyStudyHours <= m.hours[1]).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    scale: 0.9,
                                                                    opacity: 0
                                                                },
                                                                animate: {
                                                                    scale: 1,
                                                                    opacity: 1
                                                                },
                                                                className: "p-3 rounded-2xl text-xs font-black text-center",
                                                                style: {
                                                                    background: `${m.color}12`,
                                                                    border: `2px solid ${m.color}30`,
                                                                    color: m.color
                                                                },
                                                                children: m.msg
                                                            }, m.msg, false, {
                                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                lineNumber: 471,
                                                                columnNumber: 25
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: "rounded-2xl p-4 space-y-2",
                                                            style: {
                                                                background: `${theme.primary}08`,
                                                                border: `2px solid ${theme.primary}25`
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-black uppercase tracking-widest mb-3",
                                                                    style: {
                                                                        color: `${theme.primary}80`
                                                                    },
                                                                    children: "✨ Your Setup Summary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 23
                                                                }, this),
                                                                [
                                                                    {
                                                                        label: 'Name',
                                                                        val: formData.name
                                                                    },
                                                                    {
                                                                        label: 'Username',
                                                                        val: formData.username || ''
                                                                    },
                                                                    {
                                                                        label: 'City',
                                                                        val: `${formData.city || ''}, ${formData.country || ''}`
                                                                    },
                                                                    {
                                                                        label: 'Subjects',
                                                                        val: `${formData.subjects.length} subjects`
                                                                    },
                                                                    {
                                                                        label: 'Language',
                                                                        val: formData.language === 'ar' ? 'العربية' : 'English'
                                                                    },
                                                                    {
                                                                        label: 'Study',
                                                                        val: `${formData.dailyStudyHours}h/day`
                                                                    }
                                                                ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-bold",
                                                                                style: {
                                                                                    color: `${theme.primary}60`
                                                                                },
                                                                                children: r.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                lineNumber: 495,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-black text-white",
                                                                                children: r.val
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                                lineNumber: 496,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, r.label, true, {
                                                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, "s3", true, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 mt-5 pt-4",
                                        style: {
                                            borderTop: `1px solid ${theme.primary}15`
                                        },
                                        children: [
                                            step > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackBtn, {
                                                onClick: goPrev,
                                                color: theme.primary
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 507,
                                                columnNumber: 28
                                            }, this),
                                            step < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimeBtn, {
                                                onClick: goNext,
                                                gradient: theme.ctaGradient,
                                                color: theme.primary,
                                                children: [
                                                    "Next ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 509,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimeBtn, {
                                                onClick: handleComplete,
                                                loading: isFinishing,
                                                gradient: theme.ctaGradient,
                                                color: theme.primary,
                                                children: "Start Adventure! 🚀"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 506,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_s(OnboardingFlow, "AiEKcn8rjJ0MkHMLO5ZRSABedDA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c3 = OnboardingFlow;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "StepIndicator");
__turbopack_context__.k.register(_c1, "AnimeBtn");
__turbopack_context__.k.register(_c2, "BackBtn");
__turbopack_context__.k.register(_c3, "OnboardingFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_onboarding_OnboardingFlow_tsx_0f5sxhh._.js.map