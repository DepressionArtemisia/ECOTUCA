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
The first PDF checked in Round 5 did not expose the expected identity manual pages, so temporary palette-faithful lockups were generated and documented as non-official. Decision kept: do not fake logo extraction and do not call temporary lockups final assets.

## 2026-06-07 - Round 6 Real Logo Extraction
The correct manual, `MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf`, was confirmed in `docs/brand/` and copied to the canonical path `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`. Real logo images were extracted from rendered PDF pages 4, 5, 6 and 11 using PyMuPDF/Pillow at 4x scale. `OfficialLogo` now prefers `public/brand/official/from-manual/png/`; temporary lockups moved to `public/brand/temporary-lockups/` and are fallback only. Production still needs designer-approved SVG/AI/PDF vector assets.

## 2026-06-07 - Round 5 Design Scope
This round is visual polish only. No SQL application, no real Auth user creation and no major data architecture refactor. Shared components and shells are preferred so presentation routes improve together.
