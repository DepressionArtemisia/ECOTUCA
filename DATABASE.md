# Database

## Tables
The database model includes:
- `profiles`, `student_profiles`, `teacher_profiles`, `guide_profiles`, `tourist_profiles`.
- `learning_tracks`, `learning_modules`, `lessons`, `lesson_progress`, `track_enrollments`.
- `student_activity_logs`, `certificates`, `student_achievements`.
- `tour_routes`, `route_bookings`, `route_favorites`, `route_reviews`.
- `forum_topics`, `forum_replies`, `notifications`, `impact_metrics`, `media_assets`, `system_settings`.

## Enums
Roles: `visitor`, `tourist`, `student`, `teacher`, `guide`, `admin`, `super_admin`.
Statuses: `pending`, `approved`, `rejected`, `suspended`, `inactive`.
Content status: `draft`, `published`, `archived`.
Progress status: `not_started`, `in_progress`, `completed`.

## RLS Strategy
- Users see and edit their own profile.
- Admin/super_admin sees and manages all.
- Students see published content and their own progress.
- Teachers see related student progress and manage their content.
- Tourists see published routes and their own bookings/favorites.
- Guides edit their own guide data and see related bookings.

## Storage Buckets
`avatars`, `brand-assets`, `lesson-materials`, `route-images`, `certificates`, `documents`, `video-thumbnails`.

## Files
SQL lives in `supabase/schema.sql`, `supabase/seed.sql`, `supabase/rls.sql`, `supabase/storage.sql`.

## Current Status
The SQL files were created but not applied remotely. Review `supabase/README.md` before running them because demo profile IDs must match Supabase Auth users.

## Round 2 Supabase Utilities
- `scripts/check-supabase.ts`: verifies env vars, Auth Admin and `profiles` reachability without printing secrets.
- `scripts/apply-supabase-schema.ts`: creates `supabase/combined-apply.sql` and intentionally does not apply SQL automatically.
- `scripts/create-demo-users.ts`: creates Auth demo users and upserts `profiles` after schema exists.
- `SUPABASE_SETUP_FOR_BRUNO.md`: step-by-step manual setup.

In this environment `npm run supabase:check` required `NODE_OPTIONS=--use-system-ca` because Node needed the Windows CA store.

## Round 3 Hybrid Persistence
- Frontend services live in `lib/data/*` and try Supabase before falling back to mock/localStorage.
- `lesson_progress` is attempted only when `user_id` and `lesson_id` are UUIDs; mock lesson IDs stay local.
- `route_bookings` is attempted when a real `route_id` is available; current route showcase falls back locally because mock route IDs are not UUIDs.
- `profiles` pending approvals are attempted through Supabase when a real authenticated admin/super_admin session exists.
- Storage upload is prepared for `lesson-materials`, `avatars`, `route-images` and `certificates`, with a safe demo fallback.
- `scripts/create-demo-users.ts` now supports `--dry-run`, confirmation, idempotent Auth updates, `profiles` upsert and role-specific profile records.
