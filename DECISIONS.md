# Decisions

## 2026-06-07 - Next.js App Router
Chosen because the MVP needs fast route creation, layouts, server/client boundaries, Vercel readiness and future API routes.

## 2026-06-07 - Supabase
Chosen for Auth, Postgres, Storage and RLS with a realistic low-ops path for the project. The frontend uses mock fallback until the database is applied.

## 2026-06-07 - PWA Before Native App
Chosen because the presentation needs a web-deliverable mobile experience now. The PWA path validates UX before native investment.

## 2026-06-07 - Mock Fallback
The MVP must be presentable even without remote auth/database. Mock data lives in `lib/mock-data` and local video progress uses `localStorage`.

## 2026-06-07 - Roles
Roles are string unions in TypeScript and will be enforced by RLS in Supabase. Demo navigation does not represent final security.

## 2026-06-07 - Video Progress
`EcoVideoPlayer` stores current position, duration and percent locally, then can sync with `lesson_progress` later.

## 2026-06-07 - Typography Fallback
Troika and Lufga are target brand fonts. Until official font files/licenses are available, headlines use a strong display fallback stack and body text uses a rounded modern fallback stack. Code is structured with CSS variables so Troika/Lufga can be swapped later without rewriting components.

## 2026-06-07 - Brand Assets
The PDF was saved as required. If official logos are not extractable with production quality, placeholders are generated in the official palette and documented as temporary.

## 2026-06-07 - Round 5 Logo Handling
The current PDF does not contain the official logo assets requested in the design prompt. Decision: do not fake extraction or claim official assets. Generate cleaner temporary palette-faithful lockups, mark them as temporary in docs, centralize usage through `OfficialLogo`, and keep filenames stable for future official replacement.

## 2026-06-07 - Round 5 Design Scope
This round is visual polish only. No SQL application, no real Auth user creation and no major data architecture refactor. Shared components and shells are preferred so presentation routes improve together.
