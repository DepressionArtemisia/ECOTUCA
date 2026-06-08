# Changelog

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
