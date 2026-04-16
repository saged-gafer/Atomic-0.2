# StudyPlanner - Global Study-Planning Application

## 1. Development Plan
The development will follow an agile approach, starting with the core infrastructure and moving towards the AI-driven features.

### Phase 1: Foundation & Onboarding
- Setup Next.js, Tailwind, and Supabase.
- Implement the multi-step onboarding flow (Schedule, Subjects, Tasks).
- Multi-language support (Arabic/English) using `next-intl`.

### Phase 2: Core Functionality
- Home screen with daily subject cards.
- Task management (CRUD operations).
- Study & Break stopwatches with local storage/DB persistence.

### Phase 3: AI & Dashboards
- Integrate OpenAI for smart scheduling and motivational messages.
- Build the "EduSmart" logic to move unfinished tasks.
- Create visual dashboards using Recharts/Tremor.

### Phase 4: PWA & Polish
- Configure PWA for desktop/mobile "downloadable" experience.
- Add startup animations and subject-specific themes.
- Final UI/UX refinements.

## 2. Recommended Technologies
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion.
- **Backend**: Supabase (Auth, Postgres, Edge Functions).
- **AI**: OpenAI GPT-4o-mini API.
- **Visualization**: Tremor / Recharts.
- **Deployment**: Vercel.

## 3. UI/UX Design Proposals
- **Theme**: "Clean Slate" - A high-contrast, minimalist design that reduces cognitive load.
- **Subject Visuals**:
  - **Arabic**: Emerald & Gold (Icon: Quill).
  - **English**: Navy & Silver (Icon: Book).
  - **Physics**: Violet & Electric Blue (Icon: Atom).
  - **Chemistry**: Teal & Rose (Icon: Flask).
  - **Mathematics**: Amber & Indigo (Icon: Pi).
- **Animations**: Spring-based transitions for card openings and task completions.

## 4. Internal AI System Design
- **Task Migrator**: Runs daily at midnight to push incomplete tasks to the next available slot.
- **Schedule Optimizer**: Analyzes study session durations vs. task completion to suggest better time blocks.
- **Personalizer**: Uses the user's name and history to generate contextual encouragement.

## 5. Business Model
- **Freemium Model**:
  - **Free**: 5 Core subjects, basic schedule, manual task movement.
  - **Pro ($2.99/mo)**: Unlimited subjects, AI Auto-scheduling, Advanced analytics, Cloud sync.

## 6. Application Architecture
- **Client**: React components (Next.js) consuming Supabase Client.
- **Server**: Supabase Edge Functions for AI processing and daily task migrations.
- **Database**: 
  - `profiles`: User settings and names.
  - `subjects`: Core and custom subject data.
  - `tasks`: Individual study items.
  - `study_sessions`: Logs for stopwatches (start, end, duration).
  - `schedules`: Weekly recurring plan.

## 7. User Flow
1. **First Launch**: Logo Animation -> Language Choice -> User Name Input.
2. **Setup**: Define Study Hours -> Select Subjects -> Assign Subjects to Days -> Add Tasks.
3. **Daily Use**: View Today's Tasks -> Start Stopwatch -> Log Break -> Mark Complete.
4. **Weekly Review**: Check Progress Dashboard -> AI Suggestions for next week.

## 8. Launch & Marketing Plan
- **Pre-Launch**: Teaser on TikTok/Reels using the "Study-with-me" aesthetic.
- **Launch**: Product Hunt & Student forums.
- **Growth**: Referral program (Invite a friend to get 1 month of Pro).
- **Retention**: Daily motivational push notifications.
