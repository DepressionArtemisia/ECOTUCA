# Changelog

## 2026-06-08
- Created checkpoint `3dd3b40` and switched to `design/territory-real-images-premium-ui`.
- Audited `https://ecotuca.vercel.app` and documented route-by-route findings.
- Researched Complexo do Alemao, Serra da Misericordia, Penha, Teleferico memory/reactivation and territorial ethics.
- Added licensed/credited territory images under `public/media/territory/`.
- Added `types/media.ts` and `lib/mock-data/media-assets.ts`.
- Reworked demo route data with validation status, ethical notes, long descriptions, galleries and real image refs.
- Redesigned Home, Demo, Demo Mobile, Roteiros, Route Detail, Student, Lesson, Professor, Guide, Tourist and Admin surfaces with territorial image/storytelling layer.
- Removed public-facing "seguro simulado" language from route data.
- Stabilized `DataSourceBadge` initial status to reduce hydration mismatch risk.
- Ran `npm run lint` successfully after code changes.
- Adjusted `PhoneMockup` for 320px/360px presentation widths after browser QA.
- Ran `npm run build` successfully after final code changes.
- Ran browser QA across 126 route/viewport combinations with no real horizontal overflow, no visible broken images and no visible missing/empty alt text.
- Tested key interactions: theme toggle, demo mobile tabs, route search filter, route interest form, player start/reset, reset demo, login demo and logout.
- Deployed Round 7 to Vercel production as `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`; alias `https://ecotuca.vercel.app` verified with HTTP 200 on all required routes.
- Completed Prompt 8 final production QA: 14 production routes and 14 local routes returned HTTP 200.
- Ran 56 production responsive browser checks and 28 local responsive browser checks without real horizontal overflow, broken visible images or missing visible alt text.
- Validated production interactions for theme, student/admin login, logout, player resume, route form, route filter, reset demo, demo mobile tabs and admin approvals.
- Verified favicon, PWA icons, manifest and `from-manual` logo assets in production.
- Added `docs/progress-reports/STEP_17_FINAL_PRESENTATION_QA.md` and updated meeting docs for production-first presentation.

## 2026-06-07
- Saved local credentials in `.env.local`.
- Protected env files in `.gitignore`.
- Confirmed brand PDF path.
- Read initial full prompt and PDF content.
- Started required documentation base.
- Built Next.js App Router MVP with Tailwind, brand tokens, public pages, demo mode, student area, admin area, mobile mockup and Supabase SQL.
- Ran `npm run lint` and `npm run build` successfully.
- Started dev server on `http://localhost:3020` because port 3000 was already occupied.
- Added hybrid Supabase data layer with fallback in `lib/data/*`.
- Added Supabase-first auth with demo fallback, logout and pending approval route.
- Added `/demo/status` and `DataSourceBadge` for safe data-source visibility.
- Connected video progress, route interest form, tourist bookings, admin approvals and teacher upload to hybrid services.
- Improved `scripts/create-demo-users.ts` with `--dry-run`, confirmation and idempotent profile creation.
- Ran lint, build, Supabase check, SQL prepare, create-demo-users dry-run and secret scan successfully.
- Froze the MVP for presentation with meeting docs, `/demo` guidance cards, safe local reset and client-facing text polish.
- Started Round 5 premium design attack on branch `design/premium-brand-attack`.
- Added `OfficialLogo`, official brand asset folders, extraction report, logo usage strategy and design reports.
- Replaced old visible placeholder logo art with documented temporary palette-faithful lockups during Round 5, before the correct manual was confirmed.
- Polished Home, Demo, Demo Mobile, Login, Routes, Student, Lesson/Player, Professor, Guide, Tourist and Admin surfaces.
- Confirmed the correct identity manual and extracted real ECOTUCA/Perifa logo PNGs from pages 4, 5, 6 and 11.
- Rebased Round 5 temporary lockups to `public/brand/temporary-lockups/` and made `OfficialLogo` prefer `public/brand/official/from-manual/png/`.
- Updated favicon/PWA icons from the extracted ECOTUCA symbol.
- Fixed mobile overflow in internal shells/admin grids and changed demo reset to inline confirmation.
- Added `.vercelignore` and deployed production to `https://ecotuca.vercel.app`.
# Round 8 - Desktop Cadastro Sitemap Polish
- Added premium desktop layout utilities and richer public shell/footer navigation.
- Added `/sitemap`, `/mapa-do-site` and generated `/sitemap.xml`.
- Added institutional pages for how it works, FAQ, contact, image credits, terms and privacy.
- Rebuilt cadastro entry and added student/teacher multi-step signup flows with autosave, save draft, clear, review and confirm.
- Improved guide/tourist cadastro pages.
- Fixed AppShell role context for professor, guide and tourist.
- Added richer desktop content to public and role pages.
- Softened technical language outside `/demo/status`.
- Verified lint, build, browser routes, responsive widths and main interactions locally.
