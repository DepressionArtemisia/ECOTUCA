# Architecture

## Structure
- `app/`: Next.js App Router pages and route layouts.
- `components/`: reusable UI, layout, brand, demo and mobile components.
- `features/`: role-specific surfaces for student, teacher, admin, guide, tourist, routes, video and community.
- `lib/`: utilities, constants, Supabase clients, mock data and demo helpers.
- `hooks/`: client hooks.
- `types/`: shared TypeScript types.
- `supabase/`: SQL schema, seed, RLS and storage setup.
- `docs/`: brand material and progress reports.
- `public/`: brand placeholders, PWA manifest and mock images.

## Data Layer
The frontend now uses a hybrid data layer in `lib/data/*`. Services try Supabase when public env config and session/context allow it, then fall back to mock data or localStorage without breaking the UI.

Key services:
- `auth.ts`: Supabase Auth login with demo fallback.
- `profiles.ts` and `admin.ts`: pending approvals and status updates.
- `progress.ts`: localStorage-first video progress with optional `lesson_progress` sync.
- `bookings.ts`: route booking insert/list with localStorage fallback.
- `uploads.ts`: Storage upload wrapper with demo fallback.
- `data-source-status.ts`: safe status for badges and `/demo/status`.

## Auth Flow
Login attempts Supabase Auth first. In preview mode, it can fall back to demo users in localStorage. Real sessions are read by `AuthProvider`; demo selections still work through `DemoUserSwitcher` when preview fallback is enabled. Production can disable this with `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`.

## Role Protection
For local preview, role pages remain navigable by default. Production route policy lives in `lib/auth/access-policy.ts` and is applied by `features/auth/app-access-guard.tsx` inside `AppShell` and `AdminShell`. Set `NEXT_PUBLIC_ACCESS_CONTROL_MODE=enforce` to block missing sessions, demo sessions, wrong roles and non-approved statuses. Final production protection must still combine this UI guard with server checks and Supabase RLS.

## Deploy Strategy
Primary deploy target is Vercel. Future VPS deployment can use Docker/Nginx with environment variables and Supabase as managed backend.

## Mobile Strategy
The mobile-first web app and `/demo-mobile` mockup validate UX before a native app. Components are designed to be portable to a later mobile stack.
