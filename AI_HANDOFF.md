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

## Round 4 Presentation Freeze
- No SQL was applied and no real Auth users were created.
- `/demo` now has a "Comece por aqui" card, recommended flow card, mobile/status buttons and a safe local demo reset button.
- Client-facing texts were softened: technical labels such as LocalStorage/mock/fallback were replaced with presentation language outside `/demo/status`.
- New meeting files were created at project root: `ROTEIRO_DE_APRESENTACAO.md`, `CHECKLIST_REUNIAO.md`, `PERGUNTAS_REUNIAO_PRIORITARIAS.md`, `RELATORIO_PENDENCIAS_POS_REUNIAO.md`, `TESTE_FINAL_15_MIN.md`, `PLANO_B_APRESENTACAO.md`, `RESUMO_EXECUTIVO_MVP.md`.
- `MEETING_QUESTIONS.md` was reorganized and `docs/progress-reports/STEP_13_ROUND_4_PRESENTATION_FREEZE.md` tracks the freeze.

## Verification
- `npm run lint`: passed.
- `npm run build`: passed.
- `NODE_OPTIONS=--use-system-ca npm run supabase:check`: passed.
- `npm run supabase:prepare-sql`: passed without applying SQL.
- `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run`: passed without mutation.
- Versionable secret scan: no matches.
- Browser route checks passed for the main presentation routes and role pages.
- Video resume was visually confirmed after player adjustment.
- Round 4 browser QA passed for `/demo`, `/demo/status`, `/demo-mobile`, `/`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`.
- Reset local, route interest form, demo-mobile tab switch and mobile 390x844 were verified.

## Important Files
- `app/demo/page.tsx`
- `components/demo/reset-demo-data-button.tsx`
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
- `docs/progress-reports/STEP_13_ROUND_4_PRESENTATION_FREEZE.md`
- `docs/progress-reports/STEP_11_ROUND_2_CONSOLIDATION.md`

## Do Not Forget
- Do not document real tokens.
- Do not expose service role in client components.
- Keep mock fallback even after connecting Supabase.
- Do not replace placeholder logos unless official assets are available.

## Next Prompt
"After the meeting, apply reviewed Supabase SQL only if approved, create real demo Auth users with the safe script, replace official assets/content, seed UUID-backed lessons/routes, and validate real login/progress/bookings while preserving demo fallback."
