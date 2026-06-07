# AI Handoff

## Current State
Root: `C:\Users\barbo\OneDrive\Área de Trabalho\PROJETOS\ECOTUCA`.

The ECOTUCA MVP runs on `http://localhost:3020/demo`. Port 3000 is occupied by another local project.

## Round 2 Completed
- Demo hub improved with presentation cards, user guidance, 12-step checklist and fullscreen action.
- Demo users improved with copy email/password and local demo session selection.
- App/Admin shells now show current demo profile, role/status and logout.
- Student area improved with journey map, continue card, activities, richer lessons and certificate mock.
- Video progress localStorage key is now `ecotuca:video-progress:{userId}:{lessonId}`.
- Route list now has search and filters.
- Route detail now has gallery and a localStorage interest form with success confirmation.
- Admin dashboard now has more metrics, charts, CSV export and approval queue mock.
- Teacher, guide and tourist areas are stronger for demo.
- Supabase scripts and Bruno setup guide were added.

## Supabase Status
- `.env.local` contains the required Supabase variables.
- `npm run supabase:check` works when run with `NODE_OPTIONS=--use-system-ca`.
- `profiles` table was reachable in the safe check.
- SQL was not applied automatically.
- Auth demo users were not created automatically.
- `SUPABASE_SETUP_FOR_BRUNO.md` explains the safe path.

## Round 3 Completed
- Frontend auth is now hybrid: Supabase Auth first, demo fallback second.
- `features/auth/*` centralizes current user, logout, demo user activation and role guard helpers.
- `components/demo/data-source-badge.tsx` and `/demo/status` expose safe operational status without secrets.
- `EcoVideoPlayer` saves localStorage always and attempts `lesson_progress` only for real UUID IDs.
- `RouteInterestForm` attempts `route_bookings` and falls back to localStorage.
- `/app/turista/reservas` reads real/local/mock bookings.
- `ApprovalQueue` attempts pending profile approval/rejection through Supabase, then simulates locally.
- Teacher content upload attempts `lesson-materials` storage, then uses a demo fallback.
- `scripts/create-demo-users.ts` is idempotent, supports `--dry-run`, and requires explicit confirmation for writes.
- Dry-run was executed successfully; no real Auth users were created.

## Verification
- `npm run lint`: passed.
- `npm run build`: passed.
- `NODE_OPTIONS=--use-system-ca npm run supabase:check`: passed.
- `npm run supabase:prepare-sql`: passed without applying SQL.
- `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run`: passed without mutation.
- Versionable secret scan: no matches.
- Browser route checks passed for the main presentation routes and role pages.
- Video resume was visually confirmed after player adjustment.

## Important Files
- `app/demo/page.tsx`
- `components/demo/demo-user-switcher.tsx`
- `components/demo/demo-session-pill.tsx`
- `features/video/eco-video-player.tsx`
- `features/student/student-dashboard.tsx`
- `features/student/student-journey-map.tsx`
- `features/routes/route-browser.tsx`
- `features/routes/route-interest-form.tsx`
- `features/routes/tourist-bookings-list.tsx`
- `features/admin/admin-dashboard.tsx`
- `features/admin/approval-queue.tsx`
- `features/demo/demo-status-panel.tsx`
- `features/teacher/content-upload-demo.tsx`
- `lib/data/*`
- `SUPABASE_SETUP_FOR_BRUNO.md`
- `docs/progress-reports/STEP_12_ROUND_3_SUPABASE_INTEGRATION.md`
- `docs/progress-reports/STEP_11_ROUND_2_CONSOLIDATION.md`

## Do Not Forget
- Do not document real tokens.
- Do not expose service role in client components.
- Keep mock fallback even after connecting Supabase.
- Do not replace placeholder logos unless official assets are available.

## Next Prompt
"Apply reviewed Supabase SQL, create real demo Auth users with the safe script, seed UUID-backed lessons/routes, and validate real login/progress/bookings while preserving demo fallback."
