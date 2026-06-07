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
