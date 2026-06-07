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
Login attempts Supabase Auth first and falls back to demo users in localStorage. Real sessions are read by `AuthProvider`; demo selections still work through `DemoUserSwitcher`. Pending users route to `/app/aguardando-aprovacao`.

## Role Protection
For the presentation, role pages remain navigable. `RoleGuard` exists for client-side UI boundaries, but production protection must combine middleware, server checks and RLS.

## Deploy Strategy
Primary deploy target is Vercel. Future VPS deployment can use Docker/Nginx with environment variables and Supabase as managed backend.

## Mobile Strategy
The mobile-first web app and `/demo-mobile` mockup validate UX before a native app. Components are designed to be portable to a later mobile stack.
