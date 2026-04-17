(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/onboarding/AuraDial.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuraDial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuraDial({ value, onChange, min = 1, max = 12, label = "Hours", primaryColor = '#ec4899', secondaryColor = '#f59e0b' }) {
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Core logic: Map angle to hour (30 degrees per hour)
    const calculateValueFromCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuraDial.useCallback[calculateValueFromCoords]": (clientX, clientY)=>{
            if (!dialRef.current) return value;
            const rect = dialRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // Calculate angle relative to 12 o'clock (top)
            // atan2 gives angle from X axis, we rotate by 90 to make Y negative (top) the 0
            let angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;
            // Each hour is 30 degrees. 0 deg is 12, 30 deg is 1, etc.
            let val = Math.round(angle / 30);
            if (val === 0) val = 12;
            if (val > 12) val = val % 12 || 12;
            return Math.max(min, Math.min(max, val));
        }
    }["AuraDial.useCallback[calculateValueFromCoords]"], [
        min,
        max,
        value
    ]);
    const handleUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuraDial.useCallback[handleUpdate]": (clientX, clientY)=>{
            const newVal = calculateValueFromCoords(clientX, clientY);
            if (newVal !== value) {
                onChange(newVal);
                if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.navigator.vibrate) {
                    window.navigator.vibrate(8);
                }
            }
        }
    }["AuraDial.useCallback[handleUpdate]"], [
        value,
        onChange,
        calculateValueFromCoords
    ]);
    // Event Listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuraDial.useEffect": ()=>{
            const onMove = {
                "AuraDial.useEffect.onMove": (e)=>isDragging && handleUpdate(e.clientX, e.clientY)
            }["AuraDial.useEffect.onMove"];
            const onTouchMove = {
                "AuraDial.useEffect.onTouchMove": (e)=>{
                    if (isDragging) {
                        if (e.cancelable) e.preventDefault();
                        handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }
            }["AuraDial.useEffect.onTouchMove"];
            const onEnd = {
                "AuraDial.useEffect.onEnd": ()=>setIsDragging(false)
            }["AuraDial.useEffect.onEnd"];
            if (isDragging) {
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onEnd);
                window.addEventListener('touchmove', onTouchMove, {
                    passive: false
                });
                window.addEventListener('touchend', onEnd);
            }
            return ({
                "AuraDial.useEffect": ()=>{
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onEnd);
                    window.removeEventListener('touchmove', onTouchMove);
                    window.removeEventListener('touchend', onEnd);
                }
            })["AuraDial.useEffect"];
        }
    }["AuraDial.useEffect"], [
        isDragging,
        handleUpdate
    ]);
    const handleStart = (clientX, clientY)=>{
        setIsDragging(true);
        handleUpdate(clientX, clientY);
    };
    const handleKeyDown = (e)=>{
        switch(e.key){
            case 'ArrowUp':
            case 'ArrowRight':
                onChange(Math.min(max, value + 1));
                break;
            case 'ArrowDown':
            case 'ArrowLeft':
                onChange(Math.max(min, value - 1));
                break;
            case 'Home':
                onChange(min);
                break;
            case 'End':
                onChange(max);
                break;
        }
    };
    // UI calculations
    const markers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuraDial.useMemo[markers]": ()=>Array.from({
                length: 12
            }, {
                "AuraDial.useMemo[markers]": (_, i)=>i + 1
            }["AuraDial.useMemo[markers]"])
    }["AuraDial.useMemo[markers]"], []);
    const handleRotation = value % 12 * 30;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: dialRef,
            onMouseDown: (e)=>handleStart(e.clientX, e.clientY),
            onTouchStart: (e)=>handleStart(e.touches[0].clientX, e.touches[0].clientY),
            onKeyDown: handleKeyDown,
            tabIndex: 0,
            role: "slider",
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": value,
            "aria-label": label,
            className: `relative w-72 h-72 sm:w-80 sm:h-80 rounded-full flex items-center justify-center cursor-pointer outline-none select-none transition-transform duration-500 ${isDragging ? 'scale-105' : 'hover:scale-[1.02]'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-0 rounded-full backdrop-blur-2xl border border-white/5",
                    style: {
                        background: 'rgba(15,5,8,0.6)'
                    },
                    animate: {
                        boxShadow: [
                            `0 0 50px ${primaryColor}15`,
                            `0 0 80px ${primaryColor}25`,
                            `0 0 50px ${primaryColor}15`
                        ]
                    },
                    transition: {
                        duration: 3,
                        repeat: Infinity
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "absolute inset-0 w-full h-full -rotate-90 pointer-events-none",
                    viewBox: "0 0 100 100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "50",
                            cy: "50",
                            r: "45",
                            fill: "none",
                            stroke: "rgba(255,255,255,0.04)",
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "50",
                            cy: "50",
                            r: "45",
                            fill: "none",
                            stroke: `${primaryColor}18`,
                            strokeWidth: "8",
                            strokeLinecap: "round",
                            strokeDasharray: "283",
                            strokeDashoffset: "0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                            cx: "50",
                            cy: "50",
                            r: "45",
                            fill: "none",
                            stroke: `url(#dialGrad)`,
                            strokeWidth: "8",
                            strokeLinecap: "round",
                            initial: {
                                pathLength: 0
                            },
                            animate: {
                                pathLength: value / 12
                            },
                            transition: {
                                type: "spring",
                                stiffness: 40,
                                damping: 15
                            },
                            style: {
                                filter: `drop-shadow(0 0 10px ${primaryColor}cc)`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                id: "dialGrad",
                                x1: "0%",
                                y1: "0%",
                                x2: "100%",
                                y2: "0%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: primaryColor
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: secondaryColor
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                markers.map((m)=>{
                    const angle = m * 30 - 90;
                    const rad = angle * Math.PI / 180;
                    const dist = 36;
                    const isActive = m <= value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute pointer-events-none transition-all duration-300",
                        style: {
                            left: `${50 + dist * Math.cos(rad)}%`,
                            top: `${50 + dist * Math.sin(rad)}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: isActive ? 1 : 0.15
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1.5 h-1.5 rounded-full",
                            style: {
                                background: isActive ? primaryColor : 'rgba(255,255,255,0.4)',
                                boxShadow: isActive ? `0 0 6px ${primaryColor}` : 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 184,
                            columnNumber: 15
                        }, this)
                    }, m, false, {
                        fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute z-20 pointer-events-none",
                    animate: {
                        rotate: handleRotation
                    },
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    },
                    style: {
                        width: '100%',
                        height: '100%'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 -translate-x-1/2 top-[1.5%]",
                        style: {
                            width: '26px',
                            height: '26px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full rounded-full bg-white",
                            style: {
                                border: `5px solid ${primaryColor}`,
                                boxShadow: `0 0 20px ${primaryColor}99, 0 0 40px ${primaryColor}44`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0.5,
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    scale: 1,
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    scale: 1.5,
                                    opacity: 0,
                                    y: -10
                                },
                                className: "font-black text-white leading-none select-none",
                                style: {
                                    fontSize: 'clamp(4rem, 14vw, 6rem)',
                                    textShadow: `0 0 40px ${primaryColor}60`
                                },
                                children: value
                            }, value, false, {
                                fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "mt-2 text-[10px] font-black uppercase tracking-[0.4em]",
                            animate: {
                                color: [
                                    `${primaryColor}80`,
                                    `${secondaryColor}80`,
                                    `${primaryColor}80`
                                ]
                            },
                            transition: {
                                duration: 3,
                                repeat: Infinity
                            },
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                isDragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 5
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "absolute -bottom-10 text-[9px] font-black uppercase tracking-widest",
                    style: {
                        color: primaryColor
                    },
                    children: "✦ Adjusting..."
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/AuraDial.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/onboarding/AuraDial.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/AuraDial.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(AuraDial, "5o8O3HcMBqZmEkFGits0j7KCvds=");
_c = AuraDial;
var _c;
__turbopack_context__.k.register(_c, "AuraDial");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FloatingInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$prayerTimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/prayerTimes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$AuraDial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/AuraDial.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
/* ─── Shared Register Theme ──────────────────────────── */ const THEME = {
    primary: '#ec4899',
    secondary: '#f59e0b',
    accent: '#10b981',
    glow1: 'rgba(236,72,153,0.2)',
    glow2: 'rgba(245,158,11,0.1)',
    gradient: 'linear-gradient(135deg, #0f0508 0%, #1a0710 40%, #120900 100%)',
    particles: [
        '#ec4899',
        '#f43f5e',
        '#f59e0b',
        '#fb923c',
        '#e879f9',
        '#fbbf24'
    ],
    beamColor: 'rgba(236,72,153,0.5)'
};
/* ─── Constellation ──────────────────────────────────── */ function Constellation() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Constellation.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const resize = {
                "Constellation.useEffect.resize": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["Constellation.useEffect.resize"];
            resize();
            window.addEventListener('resize', resize);
            const COUNT = window.innerWidth < 768 ? 35 : 60;
            const nodes = Array.from({
                length: COUNT
            }, {
                "Constellation.useEffect.nodes": ()=>({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.28,
                        vy: (Math.random() - 0.5) * 0.28,
                        r: 1 + Math.random() * 1.8,
                        opacity: 0.15 + Math.random() * 0.5,
                        color: THEME.particles[Math.floor(Math.random() * THEME.particles.length)],
                        pulse: Math.random() * Math.PI * 2
                    })
            }["Constellation.useEffect.nodes"]);
            let raf;
            const LINK = window.innerWidth < 768 ? 100 : 130;
            const draw = {
                "Constellation.useEffect.draw": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    nodes.forEach({
                        "Constellation.useEffect.draw": (n)=>{
                            n.x += n.vx;
                            n.y += n.vy;
                            n.pulse += 0.018;
                            if (n.x < 0) n.x = canvas.width;
                            if (n.x > canvas.width) n.x = 0;
                            if (n.y < 0) n.y = canvas.height;
                            if (n.y > canvas.height) n.y = 0;
                        }
                    }["Constellation.useEffect.draw"]);
                    for(let i = 0; i < nodes.length; i++){
                        for(let j = i + 1; j < nodes.length; j++){
                            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < LINK) {
                                ctx.beginPath();
                                ctx.moveTo(nodes[i].x, nodes[i].y);
                                ctx.lineTo(nodes[j].x, nodes[j].y);
                                ctx.strokeStyle = `${nodes[i].color}${Math.round(0.1 * (1 - dist / LINK) * 255).toString(16).padStart(2, '0')}`;
                                ctx.lineWidth = 0.6;
                                ctx.stroke();
                            }
                        }
                    }
                    nodes.forEach({
                        "Constellation.useEffect.draw": (n)=>{
                            const pr = n.r * (1 + 0.2 * Math.sin(n.pulse));
                            ctx.beginPath();
                            ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
                            ctx.fillStyle = n.color + Math.round(n.opacity * 255).toString(16).padStart(2, '0');
                            ctx.fill();
                        }
                    }["Constellation.useEffect.draw"]);
                    raf = requestAnimationFrame(draw);
                }
            }["Constellation.useEffect.draw"];
            draw();
            return ({
                "Constellation.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener('resize', resize);
                }
            })["Constellation.useEffect"];
        }
    }["Constellation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 w-full h-full pointer-events-none"
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
_s(Constellation, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = Constellation;
/* ─── Aurora ─────────────────────────────────────────── */ function Aurora() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute rounded-full blur-[150px]",
                style: {
                    width: '70vw',
                    height: '70vw',
                    top: '-20%',
                    left: '-15%',
                    background: `radial-gradient(circle, ${THEME.glow1} 0%, transparent 70%)`
                },
                animate: {
                    x: [
                        0,
                        35,
                        -20,
                        0
                    ],
                    y: [
                        0,
                        22,
                        -18,
                        0
                    ],
                    scale: [
                        1,
                        1.08,
                        0.95,
                        1
                    ]
                },
                transition: {
                    duration: 22,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute rounded-full blur-[130px]",
                style: {
                    width: '55vw',
                    height: '55vw',
                    bottom: '-15%',
                    right: '-12%',
                    background: `radial-gradient(circle, ${THEME.glow2} 0%, transparent 70%)`
                },
                animate: {
                    x: [
                        0,
                        -30,
                        18,
                        0
                    ],
                    y: [
                        0,
                        -18,
                        28,
                        0
                    ],
                    scale: [
                        1,
                        0.92,
                        1.07,
                        1
                    ]
                },
                transition: {
                    duration: 28,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 5
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute rounded-full blur-[100px]",
                style: {
                    width: '35vw',
                    height: '35vw',
                    top: '40%',
                    left: '30%',
                    background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)'
                },
                animate: {
                    x: [
                        0,
                        20,
                        -15,
                        0
                    ],
                    y: [
                        0,
                        -25,
                        15,
                        0
                    ]
                },
                transition: {
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 3
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c1 = Aurora;
/* ─── Beam Sweep ─────────────────────────────────────── */ function BeamSweep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute left-0 right-0 h-[1px] pointer-events-none z-30",
        style: {
            background: `linear-gradient(90deg, transparent, ${THEME.beamColor}, transparent)`
        },
        animate: {
            top: [
                '-2px',
                '102%'
            ]
        },
        transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2
        }
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c2 = BeamSweep;
/* ─── Step Indicator ─────────────────────────────────── */ const STEP_LABELS = [
    'Profile',
    'Subjects',
    'Schedule',
    'Goals'
];
const STEP_ICONS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
];
function StepIndicator({ step, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-0 mb-8 relative",
        children: Array.from({
            length: total
        }).map((_, i)=>{
            const Icon = STEP_ICONS[i];
            const done = i < step;
            const active = i === step;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: [
                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[1px] w-10 mx-1 relative overflow-hidden rounded-full",
                        style: {
                            background: 'rgba(255,255,255,0.08)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 rounded-full",
                            animate: {
                                scaleX: done ? 1 : 0,
                                opacity: done ? 1 : 0
                            },
                            style: {
                                background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.secondary})`,
                                transformOrigin: 'left'
                            },
                            transition: {
                                duration: 0.5,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1
                                ]
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 131,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "flex flex-col items-center gap-1.5",
                        animate: {
                            scale: active ? 1.1 : 1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 25
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "w-9 h-9 rounded-2xl flex items-center justify-center relative overflow-hidden",
                                animate: {
                                    borderColor: done ? 'rgba(0,0,0,0)' : active ? `${THEME.primary}60` : 'rgba(255,255,255,0.08)',
                                    boxShadow: active ? `0 0 20px ${THEME.primary}50` : done ? `0 0 10px ${THEME.primary}30` : 'none'
                                },
                                style: {
                                    border: '1px solid',
                                    background: done ? `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})` : active ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.04)'
                                },
                                transition: {
                                    duration: 0.4
                                },
                                children: [
                                    done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                            stiffness: 500,
                                            damping: 20
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 166,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 165,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 14,
                                        className: active ? 'text-pink-400' : 'text-slate-600'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 168,
                                        columnNumber: 21
                                    }, this),
                                    active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0 rounded-2xl",
                                        animate: {
                                            opacity: [
                                                0.3,
                                                0.7,
                                                0.3
                                            ]
                                        },
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity
                                        },
                                        style: {
                                            background: `radial-gradient(circle, ${THEME.primary}30 0%, transparent 70%)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 171,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[9px] font-black uppercase tracking-widest ${active ? 'text-pink-400' : done ? 'text-slate-500' : 'text-slate-700'}`,
                                children: STEP_LABELS[i]
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 178,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 139,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 129,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_c3 = StepIndicator;
/* ─── CTA / Primary Button ───────────────────────────── */ function PrimaryButton({ onClick, disabled, children, loading }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: onClick,
        disabled: disabled,
        whileHover: {
            scale: 1.02,
            y: -2
        },
        whileTap: {
            scale: 0.97
        },
        className: "flex-1 h-12 rounded-2xl font-black text-white text-sm relative overflow-hidden flex items-center justify-center gap-2 uppercase tracking-widest",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                animate: {
                    background: [
                        'linear-gradient(135deg, #be185d, #7c3aed, #d97706)',
                        'linear-gradient(135deg, #7c3aed, #d97706, #be185d)',
                        'linear-gradient(135deg, #d97706, #be185d, #7c3aed)'
                    ]
                },
                transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)'
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
                    repeatDelay: 0.8
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative z-10 flex items-center gap-2",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    size: 18,
                    className: "animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 211,
                    columnNumber: 20
                }, this) : children
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_c4 = PrimaryButton;
function SecondaryButton({ onClick, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: onClick,
        whileHover: {
            scale: 1.02
        },
        whileTap: {
            scale: 0.97
        },
        className: "flex-1 h-12 rounded-2xl font-bold text-slate-400 hover:text-white text-sm border transition-colors duration-200 flex items-center justify-center gap-2",
        style: {
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.08)'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_c5 = SecondaryButton;
/* ─── Animated section header ────────────────────────── */ function SectionHeader({ icon: Icon, title, subtitle, color = THEME.primary }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "flex items-start gap-4 mb-6",
        initial: {
            opacity: 0,
            y: -12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0",
                style: {
                    background: `${color}18`,
                    border: `1px solid ${color}30`
                },
                animate: {
                    boxShadow: [
                        `0 0 0px ${color}00`,
                        `0 0 20px ${color}40`,
                        `0 0 0px ${color}00`
                    ]
                },
                transition: {
                    duration: 2.5,
                    repeat: Infinity
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 20,
                    style: {
                        color
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-black text-white leading-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-500 mt-0.5",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 248,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_c6 = SectionHeader;
/* ─── Subject chip for schedule ──────────────────────── */ function SubjectChip({ subject, checked, onClick, delay }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        type: "button",
        onClick: onClick,
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            delay,
            type: 'spring',
            stiffness: 400,
            damping: 22
        },
        whileHover: {
            scale: 1.06,
            y: -1
        },
        whileTap: {
            scale: 0.93
        },
        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold relative overflow-hidden transition-colors duration-150",
        style: {
            background: checked ? `${subject.color}22` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${checked ? subject.color + '55' : 'rgba(255,255,255,0.07)'}`,
            color: checked ? subject.color : 'rgba(148,163,184,0.8)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "w-1.5 h-1.5 rounded-full shrink-0",
                animate: {
                    background: checked ? subject.color : 'rgba(100,116,139,0.4)',
                    boxShadow: checked ? `0 0 6px ${subject.color}` : 'none'
                },
                transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 25
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            subject.name,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0
                    },
                    animate: {
                        scale: 1
                    },
                    exit: {
                        scale: 0
                    },
                    transition: {
                        type: 'spring',
                        stiffness: 600,
                        damping: 20
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 10
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 280,
                        columnNumber: 13
                    }, this)
                }, "chk", false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
_c7 = SubjectChip;
function OnboardingFlow() {
    _s1();
    const { setUserData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
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
    const [prevStep, setPrevStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingFlow.useEffect": ()=>{
            setMounted(true);
        }
    }["OnboardingFlow.useEffect"], []);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][formData.language];
    const isRTL = formData.language === 'ar';
    const validateStep0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingFlow.useCallback[validateStep0]": ()=>{
            const e = {};
            if (!formData.name.trim()) e.name = t.name_required;
            if (!formData.username?.trim()) e.username = t.username_required;
            if (!formData.password?.trim()) e.password = t.password_required;
            if (!formData.city?.trim()) e.city = t.city_required;
            if (!formData.country?.trim()) e.country = t.country_required;
            setErrors(e);
            return Object.keys(e).length === 0;
        }
    }["OnboardingFlow.useCallback[validateStep0]"], [
        formData,
        t
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
            if (formData.city && formData.country) {
                prayerTimes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$prayerTimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPrayerTimes"])(formData.city, formData.country);
            }
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
                    '#ec4899',
                    '#f59e0b',
                    '#10b981',
                    '#6366f1',
                    '#8b5cf6',
                    '#06b6d4',
                    '#f43f5e',
                    '#a78bfa'
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
        newSubjectName
    ]);
    const direction = step > prevStep ? 1 : -1;
    const slideVariants = {
        initial: {
            opacity: 0,
            x: direction * (isRTL ? -60 : 60),
            filter: 'blur(8px)',
            scale: 0.97
        },
        animate: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            scale: 1
        },
        exit: {
            opacity: 0,
            x: direction * (isRTL ? 60 : -60),
            filter: 'blur(8px)',
            scale: 0.97
        }
    };
    const transition = {
        duration: 0.45,
        ease: [
            0.22,
            1,
            0.36,
            1
        ]
    };
    /* ── Step content ── */ const steps = [
        /* Step 0: Profile */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            variants: slideVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition: transition,
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                    title: t.welcome_title,
                    subtitle: t.welcome_subtitle
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 366,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBox, {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                            color: THEME.primary,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                label: t.what_is_name + ' *',
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
                                lineNumber: 371,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 370,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBox, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                                    color: THEME.secondary,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                        label: t.username + ' *',
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
                                        lineNumber: 380,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 379,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBox, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
                                    color: "#a78bfa",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                        label: t.password + ' *',
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
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 385,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 378,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBox, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
                                    color: THEME.accent,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                        label: t.city + ' *',
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
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 395,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBox, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
                                    color: "#06b6d4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FloatingInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingInput"], {
                                        label: t.country + ' *',
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
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 401,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 394,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 368,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3",
                            children: "Choose your language / اختر لغتك"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 412,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                {
                                    lang: 'en',
                                    label: 'English',
                                    emoji: '🇬🇧'
                                },
                                {
                                    lang: 'ar',
                                    label: 'العربية',
                                    emoji: '🇸🇦'
                                }
                            ].map(({ lang, label, emoji })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>{
                                        if (validateStep0()) {
                                            setFormData((fd)=>({
                                                    ...fd,
                                                    language: lang
                                                }));
                                            setTimeout(()=>goNext(), 10);
                                        }
                                    },
                                    whileHover: {
                                        scale: 1.03,
                                        y: -2
                                    },
                                    whileTap: {
                                        scale: 0.96
                                    },
                                    className: "flex items-center justify-center gap-2.5 h-12 rounded-2xl font-black text-sm relative overflow-hidden border",
                                    style: {
                                        background: formData.language === lang ? `${THEME.primary}18` : 'rgba(255,255,255,0.03)',
                                        borderColor: formData.language === lang ? `${THEME.primary}50` : 'rgba(255,255,255,0.08)',
                                        color: formData.language === lang ? THEME.primary : 'rgba(148,163,184,0.8)',
                                        boxShadow: formData.language === lang ? `0 0 20px ${THEME.primary}25` : 'none'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0",
                                            style: {
                                                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
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
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: emoji
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 435,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative z-10",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            size: 14,
                                            className: "relative z-10 opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, lang, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 413,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 411,
                    columnNumber: 7
                }, this)
            ]
        }, "s0", true, {
            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
            lineNumber: 365,
            columnNumber: 5
        }, this),
        /* Step 1: Subject Links */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            variants: slideVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition: transition,
            className: "space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"],
                    title: t.subject_links,
                    subtitle: "Add reference links for each subject",
                    color: THEME.secondary
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 446,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2.5 max-h-[42vh] overflow-y-auto pr-1 custom-scrollbar",
                    children: formData.subjects.map((sub, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 12
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: i * 0.05,
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            },
                            className: "rounded-2xl overflow-hidden border transition-all duration-200",
                            style: {
                                background: sub.link ? `${sub.color}08` : 'rgba(255,255,255,0.02)',
                                borderColor: sub.link ? `${sub.color}30` : 'rgba(255,255,255,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-4 pt-3 pb-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "w-2 h-2 rounded-full shrink-0",
                                            animate: {
                                                boxShadow: sub.link ? `0 0 8px ${sub.color}` : 'none',
                                                background: sub.link ? sub.color : 'rgba(100,116,139,0.4)'
                                            },
                                            transition: {
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 20
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-white flex-1",
                                            children: sub.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: sub.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    scale: 1,
                                                    opacity: 1
                                                },
                                                exit: {
                                                    scale: 0,
                                                    opacity: 0
                                                },
                                                className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                                                style: {
                                                    background: `${THEME.accent}15`,
                                                    color: THEME.accent,
                                                    border: `1px solid ${THEME.accent}30`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 8
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Linked"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 467,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 465,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 459,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 pb-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                    size: 12,
                                                    style: {
                                                        color: sub.link ? sub.color : 'rgba(100,116,139,0.4)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                placeholder: `https://... (${sub.name})`,
                                                value: sub.link || '',
                                                onChange: (e)=>setFormData((fd)=>({
                                                            ...fd,
                                                            subjects: fd.subjects.map((s)=>s.id === sub.id ? {
                                                                    ...s,
                                                                    link: e.target.value.trim() || undefined
                                                                } : s)
                                                        })),
                                                className: "w-full h-9 pl-8 pr-3 rounded-xl text-xs font-medium text-slate-300 outline-none transition-all duration-200 border",
                                                style: {
                                                    background: 'rgba(255,255,255,0.04)',
                                                    borderColor: sub.link ? `${sub.color}35` : 'rgba(255,255,255,0.06)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 481,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, sub.id, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 448,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryButton, {
                            onClick: goPrev,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 502,
                                    columnNumber: 43
                                }, this),
                                t.back
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 502,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                            onClick: goNext,
                            children: [
                                t.next,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 503,
                                    columnNumber: 49
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 503,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 501,
                    columnNumber: 7
                }, this)
            ]
        }, "s1", true, {
            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
            lineNumber: 445,
            columnNumber: 5
        }, this),
        /* Step 2: Schedule */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            variants: slideVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition: transition,
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                    title: t.weekly_schedule,
                    subtitle: "Choose which subjects to study each day",
                    color: THEME.primary
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 509,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "rounded-2xl border p-3 space-y-3",
                    style: {
                        background: 'rgba(255,255,255,0.02)',
                        borderColor: 'rgba(255,255,255,0.05)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-black text-slate-600 uppercase tracking-widest",
                            children: "Add a subject"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 515,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: newSubjectName,
                                        onChange: (e)=>setNewSubjectName(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addCustomSubject();
                                            }
                                        },
                                        placeholder: "Subject name...",
                                        className: "w-full h-10 px-3 rounded-xl text-sm font-medium text-white outline-none border transition-all duration-200",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            borderColor: 'rgba(255,255,255,0.08)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 518,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 517,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: addCustomSubject,
                                    whileHover: {
                                        scale: 1.08
                                    },
                                    whileTap: {
                                        scale: 0.92
                                    },
                                    className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-white",
                                    style: {
                                        background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 527,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 516,
                            columnNumber: 9
                        }, this),
                        formData.subjects.filter((s)=>!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSubjects"].find((ds)=>ds.id === s.id)).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: formData.subjects.filter((s)=>!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSubjects"].find((ds)=>ds.id === s.id)).map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        scale: 0
                                    },
                                    animate: {
                                        scale: 1
                                    },
                                    exit: {
                                        scale: 0
                                    },
                                    transition: {
                                        delay: i * 0.05,
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 25
                                    },
                                    className: "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold",
                                    style: {
                                        background: `${s.color}15`,
                                        color: s.color,
                                        border: `1px solid ${s.color}30`
                                    },
                                    children: [
                                        s.name,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            whileHover: {
                                                scale: 1.2
                                            },
                                            whileTap: {
                                                scale: 0.8
                                            },
                                            onClick: ()=>setFormData((fd)=>({
                                                        ...fd,
                                                        subjects: fd.subjects.filter((sub)=>sub.id !== s.id)
                                                    })),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 9,
                                                className: "hover:text-red-400 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 547,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 544,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.id, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 538,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 536,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 512,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 max-h-[30vh] overflow-y-auto pr-1 custom-scrollbar",
                    children: DAYS.map((day, di)=>{
                        const daySubjects = formData.weeklySchedule[day] || [];
                        const active = daySubjects.length > 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: di * 0.05,
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            },
                            className: "rounded-2xl border overflow-hidden",
                            style: {
                                background: active ? `${THEME.primary}06` : 'rgba(255,255,255,0.015)',
                                borderColor: active ? `${THEME.primary}25` : 'rgba(255,255,255,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 pt-2.5 pb-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-widest flex-1",
                                            children: day
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 571,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    scale: 0
                                                },
                                                className: "text-[9px] font-black px-1.5 py-0.5 rounded-full",
                                                style: {
                                                    background: `${THEME.primary}20`,
                                                    color: THEME.primary,
                                                    border: `1px solid ${THEME.primary}35`
                                                },
                                                children: daySubjects.length
                                            }, "cnt", false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 574,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 572,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 570,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1.5 px-3 pb-3",
                                    children: formData.subjects.map((sub, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectChip, {
                                            subject: sub,
                                            checked: formData.weeklySchedule[day]?.includes(sub.id) ?? false,
                                            onClick: ()=>{
                                                const cur = formData.weeklySchedule[day] || [];
                                                const checked = cur.includes(sub.id);
                                                setFormData((fd)=>({
                                                        ...fd,
                                                        weeklySchedule: {
                                                            ...fd.weeklySchedule,
                                                            [day]: checked ? cur.filter((id)=>id !== sub.id) : [
                                                                ...cur,
                                                                sub.id
                                                            ]
                                                        }
                                                    }));
                                            },
                                            delay: di * 0.02 + si * 0.02
                                        }, sub.id, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 586,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 584,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, day, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 556,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryButton, {
                            onClick: goPrev,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 603,
                                    columnNumber: 43
                                }, this),
                                t.back
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 603,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                            onClick: goNext,
                            children: [
                                t.next,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 604,
                                    columnNumber: 49
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 604,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 602,
                    columnNumber: 7
                }, this)
            ]
        }, "s2", true, {
            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
            lineNumber: 508,
            columnNumber: 5
        }, this),
        /* Step 3: Goal */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            variants: slideVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition: transition,
            className: "space-y-2 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                    title: t.daily_study_goal,
                    subtitle: t.daily_study_goal_subtitle || 'Consistency is the key to mastery',
                    color: THEME.secondary
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 610,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$AuraDial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: formData.dailyStudyHours,
                        onChange: (val)=>setFormData((fd)=>({
                                    ...fd,
                                    dailyStudyHours: val
                                })),
                        label: t.hours
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 614,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 613,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryButton, {
                            onClick: goPrev,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 623,
                                    columnNumber: 43
                                }, this),
                                t.back
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 623,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                            onClick: handleComplete,
                            loading: isFinishing,
                            children: !isFinishing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                        lineNumber: 625,
                                        columnNumber: 30
                                    }, this),
                                    t.start_planning
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 624,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 622,
                    columnNumber: 7
                }, this)
            ]
        }, "s3", true, {
            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
            lineNumber: 609,
            columnNumber: 5
        }, this)
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: THEME.gradient
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 634,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 636,
                columnNumber: 7
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Constellation, {}, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 639,
                columnNumber: 19
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Aurora, {}, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 640,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute pointer-events-none",
                style: {
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${THEME.glow1} 0%, transparent 65%)`,
                    top: '50%',
                    left: '50%',
                    marginLeft: -300,
                    marginTop: -300
                },
                animate: {
                    scale: [
                        1,
                        1.08,
                        0.96,
                        1
                    ]
                },
                transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 643,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 50,
                    scale: 0.94
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                transition: {
                    duration: 0.8,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                className: "relative w-full max-w-lg z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "relative rounded-[2rem] overflow-hidden",
                    animate: {
                        boxShadow: [
                            `0 0 0 1px ${THEME.primary}25, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.primary}20`,
                            `0 0 0 1px ${THEME.secondary}20, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.secondary}15`,
                            `0 0 0 1px ${THEME.primary}25, 0 40px 90px -20px rgba(0,0,0,0.9), 0 0 100px -20px ${THEME.primary}20`
                        ]
                    },
                    transition: {
                        duration: 4,
                        repeat: Infinity
                    },
                    style: {
                        background: 'rgba(5,7,20,0.97)',
                        backdropFilter: 'blur(32px)',
                        WebkitBackdropFilter: 'blur(32px)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BeamSweep, {}, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute top-0 left-0 right-0 h-[2px] z-30",
                            animate: {
                                background: [
                                    `linear-gradient(90deg, transparent, ${THEME.primary}, ${THEME.secondary}, transparent)`,
                                    `linear-gradient(90deg, transparent, ${THEME.secondary}, ${THEME.primary}, transparent)`
                                ]
                            },
                            transition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 670,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute -top-14 -right-14 w-36 h-36 rounded-full blur-[50px] pointer-events-none",
                            animate: {
                                background: [
                                    `${THEME.primary}35`,
                                    `${THEME.secondary}30`,
                                    `${THEME.primary}35`
                                ]
                            },
                            transition: {
                                duration: 4,
                                repeat: Infinity
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 679,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-[40px] pointer-events-none",
                            style: {
                                background: 'rgba(16,185,129,0.08)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 684,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 p-6 sm:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "w-9 h-9 rounded-2xl flex items-center justify-center shrink-0",
                                            animate: {
                                                background: [
                                                    `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`,
                                                    `linear-gradient(135deg, ${THEME.secondary}, ${THEME.primary})`
                                                ]
                                            },
                                            transition: {
                                                duration: 3,
                                                repeat: Infinity
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-black text-white",
                                                children: "A"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                lineNumber: 696,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 692,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base font-black text-white tracking-wider block leading-none",
                                                    children: "ATOMIC"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 699,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]",
                                                    children: [
                                                        "Setup — Step ",
                                                        step + 1,
                                                        " of 4"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 698,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0",
                                            style: {
                                                background: 'rgba(236,72,153,0.08)',
                                                borderColor: 'rgba(236,72,153,0.25)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "w-1.5 h-1.5 rounded-full",
                                                    style: {
                                                        background: THEME.primary
                                                    },
                                                    animate: {
                                                        opacity: [
                                                            1,
                                                            0.2,
                                                            1
                                                        ],
                                                        scale: [
                                                            1,
                                                            1.4,
                                                            1
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 1.5,
                                                        repeat: Infinity
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold",
                                                    style: {
                                                        color: THEME.primary
                                                    },
                                                    children: "New Account"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                            lineNumber: 702,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 691,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIndicator, {
                                    step: step,
                                    total: 4
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 714,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    custom: isRTL,
                                    children: steps[step]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 717,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 656,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 632,
        columnNumber: 5
    }, this);
}
_s1(OnboardingFlow, "DNLU6VHJAb3J61x+3zQS/UeYTS8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c8 = OnboardingFlow;
/* ─── InputBox wrapper ───────────────────────────────── */ function InputBox({ children, icon: Icon, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-5 pointer-events-none z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 13,
                    style: {
                        color: `${color}80`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 732,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 731,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pl-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 734,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 730,
        columnNumber: 5
    }, this);
}
_c9 = InputBox;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Constellation");
__turbopack_context__.k.register(_c1, "Aurora");
__turbopack_context__.k.register(_c2, "BeamSweep");
__turbopack_context__.k.register(_c3, "StepIndicator");
__turbopack_context__.k.register(_c4, "PrimaryButton");
__turbopack_context__.k.register(_c5, "SecondaryButton");
__turbopack_context__.k.register(_c6, "SectionHeader");
__turbopack_context__.k.register(_c7, "SubjectChip");
__turbopack_context__.k.register(_c8, "OnboardingFlow");
__turbopack_context__.k.register(_c9, "InputBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_onboarding_0lmk4z0._.js.map