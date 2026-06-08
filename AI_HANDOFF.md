# AI Handoff

## Prompt 8 Final QA / Presentation Ready
- Date: 2026-06-08.
- Production URL: `https://ecotuca.vercel.app`.
- Validated deployment: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.
- Current branch before merge: `design/territory-real-images-premium-ui`.
- No SQL was applied, no real Auth users were created and no secrets were edited.
- Production HTTP QA passed for 14 required routes.
- Local HTTP QA passed for the same 14 required routes on `http://localhost:3020`.
- Browser production QA passed: 56 visual responsive checks, no real horizontal overflow, no visible broken images, no visible missing/empty alt text and no forbidden client-facing terms.
- Browser local QA passed: 28 visual responsive checks on priority routes.
- Interactions passed in production: theme toggle, student login, logout, admin login, player start/resume after reload, route form, route filter, reset demo, demo mobile tabs and admin approvals.
- Brand/PWA QA passed: favicon, PWA icons, manifest and `from-manual` logo assets responded in production; no temporary lockup was detected as primary logo.
- `npm run lint` passed.
- `npm run build` passed, 36 routes.
- Final QA report: `docs/progress-reports/STEP_17_FINAL_PRESENTATION_QA.md`.
- Do not make more UI/code changes before the meeting unless a production-breaking bug appears.
- Merge completed locally: `design/territory-real-images-premium-ui` fast-forwarded into `master`.
- Final local commit on `master`: `e9b39c3 chore: final production QA for ECOTUCA meeting`.
- Push was not executed because no Git remote is configured and no GitHub repository URL was found locally.

## Round 7 Completed Locally / Ready To Deploy
- Active branch: `design/territory-real-images-premium-ui`.
- Checkpoint before the round: `3dd3b40 checkpoint: before deep design territory audit`.
- Do not apply SQL, do not create real Auth users, do not touch service role.
- New media model: `types/media.ts`.
- New image catalog: `lib/mock-data/media-assets.ts`.
- New local image folders: `public/media/territory/*`.
- Main docs: `docs/design/VERCEL_SITE_DEEP_AUDIT.md`, `docs/research/COMPLEXO_ALEMAO_TERRITORY_RESEARCH.md`, `docs/media/*`, `docs/progress-reports/STEP_16_ROUND_7_TERRITORY_PREMIUM_UI.md`.
- Route model now has required fields such as `subtitle`, `longDescription`, `coverAlt`, `mediaAssetIds`, `validationStatus`, `whyItMatters`, `visitorExperience` and `careNotes`.
- If adding Supabase-backed routes later, map/fallback these new fields before passing data to `RouteCard`.
- `npm run lint` passed after final code edits.
- `npm run build` passed after final code edits, generating 36 routes.
- Browser QA passed across 126 route/viewport combinations: 14 required routes x 9 viewports (`320`, `360`, `390`, `414`, `768`, `1024`, `1280`, `1440`, `1920`).
- Browser interactions passed: theme toggle, demo mobile tab switch, route search filter, route interest form, player start/reset, reset demo, login demo and logout.
- Deployment completed: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`, aliased to `https://ecotuca.vercel.app`.
- Remote HTTP verification passed for all 14 required routes after deployment.

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

## Round 5 Premium Design Attack
- Branch: `design/premium-brand-attack`.
- Do not apply SQL and do not create real Auth users in this round.
- Historical note: Round 5 analyzed the wrong/incomplete PDF for logo extraction and generated temporary palette-faithful lockups.
- `components/brand/official-logo.tsx` is the source of truth for logo rendering and fallback behavior.
- Key UI upgraded: Home, `/demo`, `/demo-mobile`, `/login`, routes, student dashboard, lesson/player, professor, guide, tourist and admin.
- New docs: `docs/brand/BRAND_ASSET_EXTRACTION_REPORT.md`, `docs/brand/LOGO_USAGE_STRATEGY.md`, `docs/design/*`, `docs/progress-reports/STEP_14_ROUND_5_PREMIUM_DESIGN_ATTACK.md`.

## Round 6 Real Logo Extraction
- Correct manual confirmed in `docs/brand/MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf` and copied to `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.
- Real raster logos were extracted from PDF pages 4, 5, 6 and 11 using `scripts/extract-brand-assets.mjs`.
- Preferred assets live in `public/brand/official/from-manual/png/`.
- WebP, source crops and previews live under `public/brand/official/from-manual/`.
- Contact sheet: `docs/brand/extraction/logo-contact-sheet.png`.
- Extraction manifest: `docs/brand/extraction/extracted-assets.json`.
- Temporary Round 5 lockups were moved/rebased to `public/brand/temporary-lockups/` and are fallback only.
- PWA/favicon icons were regenerated from the extracted ECOTUCA symbol.
- `OfficialLogo` now prefers `from-manual` assets and only falls back to temporary lockups if image loading fails.
- Responsive fixes landed in `DemoSessionPill`, `PerifaCard`, `MetricCard` and `AdminDashboard` grids.
- Reset demo data now uses an inline two-click confirmation instead of `window.confirm`.

## Verification
- Round 7 `npm run lint`: passed.
- Round 7 `npm run build`: passed, 36 routes.
- Round 7 browser QA: 126 route/breakpoint combinations passed with no real horizontal overflow, no visible broken images and no visible missing/empty alt text.
- Round 7 browser interactions passed: theme toggle, demo mobile tabs, route filter, route interest form, player start/reset, reset demo, login demo and logout.
- Round 7 Vercel deploy passed and 14 production routes returned HTTP 200.
- `npm run lint`: passed.
- `npm run build`: passed.
- Round 6 browser QA: 84 route/breakpoint combinations passed at 320, 390, 414, 768, 1024 and 1440 with no overflow, no broken images and `from-manual` logos detected.
- Round 6 interactions passed before reset refactor: theme toggle, login demo, logout, route interest form, player start and player reset.
- Reset refactor: build passed and `/demo` serves the new inline flow; the previous native confirm blocked the browser automation surface.
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
- Do not treat Round 5 temporary lockups as primary logos.
- Use `public/brand/official/from-manual/png/` for demo unless better official files are provided.
- Production should request SVG/AI/PDF vector assets from the designer.

## Next Prompt
"After the meeting, apply reviewed Supabase SQL only if approved, create real demo Auth users with the safe script, replace official assets/content, seed UUID-backed lessons/routes, and validate real login/progress/bookings while preserving demo fallback."

## Round 8 Handoff
- Current branch: `design/round-8-desktop-cadastro-sitemap`.
- Main new code areas:
  - `features/signup/*`
  - `components/forms/*`
  - `components/content/*`
  - `components/navigation/site-map-section.tsx`
  - `lib/navigation/site-map.ts`
  - new pages under `app/como-funciona`, `app/faq`, `app/contato`, `app/creditos-imagens`, `app/termos`, `app/privacidade`, `app/sitemap`, `app/mapa-do-site`.
- Student and teacher signup are local-only presentation flows. Do not connect them to Supabase without an approved backend plan.
- `AppShell` role context is now important. Pass `roleContext="teacher"`, `"guide"` or `"tourist"` when title inference is not enough.
- QA passed locally after final build: routes, responsive widths, student/teacher signup, clear draft, login, player, route interest, reset demo and role context.
- If `npm run build` appears stuck, stop the running `next start` process first.

## Round 9 Handoff
- Current branch: `design/round-9-fonts-panels-signup-final`.
- Main new code areas:
  - `features/signup/guide-signup-flow.tsx`
  - `features/signup/tourist-signup-flow.tsx`
  - `features/signup/multistep-signup-flow.tsx`
  - `components/navigation/site-map-explorer.tsx`
  - `lib/navigation/site-map.ts`
  - `app/sitemap.ts`
  - `app/globals.css`
- Signup remains local-only. Do not connect to Supabase until backend/RLS/LGPD/approval rules are approved.
- Font files for Troika/Lufga were not found locally. The app uses documented fallbacks and CSS variables for later replacement.
- New signup draft keys: `ecotuca:signup:guide` and `ecotuca:signup:tourist`, in addition to student/teacher.
- `lib/navigation/site-map.ts` now controls route status, audience, visibility and indexing. Update it before changing `/sitemap`, footer routes or `/sitemap.xml`.
- `/sitemap.xml` intentionally excludes demo, internal app routes and technical routes.
- Round 9 docs: `docs/progress-reports/STEP_19_ROUND_9_FONTS_PANELS_FORMS.md`, `docs/design/ROUND_9_SITE_AND_PANEL_AUDIT.md`, `docs/forms/GOOGLE_FORMS_REQUIREMENTS.md`, `docs/forms/GOOGLE_FORMS_APPS_SCRIPT.md`, `docs/brand/FONT_USAGE_AND_LICENSE.md`.
- `npm run lint` passed.
- `npm run build` passed with 45 routes.
- Local browser QA passed at 390px and 1440px for the Round 9 routes/interactions.
- Production deploy passed: `dpl_HNxad6ECVdf1cg9BQpn1ZKHtq1wb`, aliased to `https://ecotuca.vercel.app`.
- Production HTTP and mobile browser gut-check passed for the new signup/sitemap/admin surfaces.
