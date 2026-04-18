# ATOMIC — Anime Study Platform

## Overview
A full-featured study management app with a complete anime/manga visual redesign. Features a chibi mascot character, manga aesthetics, and two swappable themes.

## Architecture
- **Framework:** Next.js 16 (App Router) with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom anime design system
- **Animation:** Framer Motion
- **State:** React Context (AppContext + ThemeContext)
- **Port:** 5000

## Key Components

### Anime-Specific
- `src/components/anime/AnimeMascot.tsx` — Chibi SVG student character (5 poses, 5 expressions), MiniMascot, StarBurst
- `src/app/globals.css` — Full anime design system: Nebula + Jade themes, manga dots, speed lines, anime-card/btn CSS

### Auth Flow
- `src/components/auth/AuthScreen.tsx` — Anime login/register with mascot, floating stars, manga FX text
- `src/components/onboarding/OnboardingFlow.tsx` — 4-step registration (Profile/Subjects/Schedule/Goals) with per-step mascot

### Dashboard
- `src/components/dashboard/Dashboard.tsx` — Anime hero header, mascot speech bubbles, AnimeStatCard grid
- `src/components/dashboard/SubjectCard.tsx` — Manga-panel subject cards with screen-tone overlay
- `src/components/sidebar/Sidebar.tsx` — Theme-aware sidebar with anime-styled tabs and navigation

## Themes
Two themes togglable via "Change Design" button:
- **Nebula** (default): Deep purple-black (#030712), primary indigo (#6366f1), secondary purple (#8b5cf6)
- **Jade**: Deep forest (#040d08), primary emerald (#10b981), secondary amber (#f59e0b)

## Data
- `localStorage` key `study_planner_user_data` — full UserData JSON
- `localStorage` key `atomic_theme` — 'nebula' | 'jade'

## Anime Design Conventions
- Chunky 2–2.5px colored borders on cards
- 3px bottom shadow bar on buttons (`0 4px 0 0 color`)
- Rounded corners: 20–28px
- Manga halftone dot overlay (radial 1px @ 12–28px)
- Diagonal speed lines (-45deg repeating linear-gradient)
- Speech bubbles with double-triangle tail
- Framer Motion: only transform/opacity (never animate SVG `d` attribute)

## AI Services
- `src/services/aiFileParser.ts` — Generate exam/summary/notes/mindmap from uploaded files
- `src/services/aiVideoAnalyzer.ts` — Analyze YouTube/video links and create tasks
- `src/services/prayerTimes.ts` — Fetch prayer times by city/country
