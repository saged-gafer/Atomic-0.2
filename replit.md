# ATOMIC — Anime Study Platform

## Overview
A full-featured study management app with an anime/liquid-glass visual design. Features a gender-adaptive chibi Atomic mascot, 5 theme presets, emotional intelligence (Study Bond XP system, time-of-day greetings), and scene-specific micro-interactions.

## Architecture
- **Framework:** Next.js 16 (App Router) with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom anime design system
- **Animation:** Framer Motion
- **State:** React Context (AppContext + ThemeContext)
- **Port:** 5000

## Key Components

### Anime / Identity
- `src/components/anime/AnimeMascot.tsx` — Gender-aware chibi SVG mascot (male/female variants), 5 poses, 5 expressions, focus headband, MiniMascot (supports `focusMode` + headband), StarBurst
- `src/components/anime/GenderSelectScreen.tsx` — First-launch companion selection screen (Male/Female Atomic)
- `src/app/globals.css` — Full anime design system: 5 themes (Nebula/Cyberpunk/Midnight/Jade/Pastel), `.deep-work-active` edge-glow keyframe

### UI Effects
- `src/components/ui/StudyBondMeter.tsx` — XP progress bar, level names, compact + full variants
- `src/components/ui/ParticleEffect.tsx` + `useParticles` — Heart/sparkle particle bursts
- `src/components/ui/ConfettiEffect.tsx` — Confetti burst on task/milestone completion
- `src/components/ui/TabVisibilityTracker.tsx` — 30s inactivity tab-visibility notification
- `src/components/ui/ThemePickerModal.tsx` — 5-theme picker modal
- `src/components/ui/FloatingInput.tsx` — Floating-label input with built-in password reveal + `onRevealToggle` callback

### Auth Flow (Fully Rebuilt)
- `src/components/auth/AuthScreen.tsx` — 3-scene hero entry experience:
  - **Scene 1 (Study Room):** Full-screen anime study room with CSS character, desk lamp, window+curtains (ambient sway), bookshelf, moon, twinkling stars, dust particles, floating icons (Timer/Book/CheckSquare/Sparkles)
  - **Scene 2 (Auth Landing):** Neon ATOMICS logo with glow pulse, orbiting rings, particle field, glassmorphism "Create Account" + "Sign In" buttons
  - **Scene 3 (Auth Form):** Dark purple morphing form with FloatingInput fields, shimmer submit button, toast notifications (no traditional error messages), power-up overlay on login
- `src/components/ui/Toast.tsx` — Global toast notification system (success/error/info), spring animations, auto-dismiss after 3.5s
- `src/components/onboarding/OnboardingFlow.tsx` — 4-step registration with per-step mascot

### Dashboard
- `src/components/dashboard/Dashboard.tsx` — Main dashboard with anime hero header
- `src/components/dashboard/FocusMode.tsx` — Focus timer with XP reward on session complete, deep-work body glow (`deep-work-active`), MiniMascot with focus headband during active sessions
- `src/components/dashboard/TaskList.tsx` — Task list with XP reward (+20 XP) and confetti burst on task completion
- `src/components/sidebar/Sidebar.tsx` — StudyBondMeter + MiniMascot in header, XP reward on side-task completion

### Context
- `src/context/AppContext.tsx` — `gender`, `studyXP`, `studyBondLevel`, `addStudyXP`, `setGender` alongside core user data
- `src/context/ThemeContext.tsx` — 5 themes: nebula | jade | cyberpunk | midnight | pastel

## XP System
- +20 XP per completed task (subject tasks + side tasks)
- +5 XP per minute on completed focus sessions (min 10 XP)
- Level formula: `floor(sqrt(xp/100)) + 1`
- Persisted in `study_planner_user_data` localStorage

## Themes (5 presets)
- **Nebula** (default): Deep purple-black, indigo primary
- **Jade**: Forest green, emerald primary
- **Cyberpunk**: Dark navy, neon cyan primary
- **Midnight**: Near-black, violet primary
- **Pastel**: Dark with soft pink/lavender primary

## Data
- `localStorage` key `study_planner_user_data` — full UserData JSON (includes `studyXP`)
- `localStorage` key `atomic_gender` — 'male' | 'female' (persists independently of auth)
- `localStorage` key `atomic_theme` — theme name
- `localStorage` key `focus_sessions` — array of FocusSession records

## App Flow
1. First launch → GenderSelectScreen (gender stored in `atomic_gender`)
2. AuthScreen (time-of-day greeting, theme picker, power-up on login)
3. OnboardingFlow (new users only)
4. Dashboard (Sidebar with StudyBondMeter, FocusMode with deep-work glow + headband)

## AI Services
- `src/services/aiFileParser.ts` — Generate exam/summary/notes/mindmap from uploaded files
- `src/services/aiVideoAnalyzer.ts` — Analyze YouTube/video links and create tasks
- `src/services/prayerTimes.ts` — Fetch prayer times by city/country
