# Round 9 Site And Panel Audit

Date: 2026-06-08.
Branch: `design/round-9-fonts-panels-signup-final`.

## Scope
- Public routes: `/`, `/cadastro`, `/cadastro/aluno`, `/cadastro/professor`, `/cadastro/guia`, `/cadastro/turista`, `/sitemap`.
- Role panels: `/app/aluno`, `/app/professor`, `/app/professor/conteudos`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`.
- Documentation and presentation support files for the meeting handoff.

## Findings Before Round 9
- Official Troika/Lufga font files were not present in `public/fonts`, `app/fonts`, `assets/fonts`, `docs/brand/fonts` or the checked workspace tree.
- Student and teacher signup flows had a good multi-step foundation, but guide and tourist still used simpler one-screen forms.
- `/sitemap` was useful as a list, but did not yet work as a meeting/QA explorer with route status, profile filters or copy actions.
- Role panels were visually strong after Round 8, but needed clearer product state for content drafts, guide readiness, tourist visit status and admin approval governance.

## Improvements Made
- Added documented font fallback strategy in `public/fonts/README.md` and `docs/brand/FONT_USAGE_AND_LICENSE.md`.
- Added CSS typography tokens/classes in `app/globals.css`: `.font-headline`, `.font-body`, `.text-display-xl`, `.text-display-lg`, `.text-section-title`, `.text-card-title`, `.text-body-readable`.
- Expanded `MultistepSignupFlow` with radio fields, checkbox groups, conditional fields, custom analysis copy, autosave, validation messaging and review editing.
- Rebuilt signup flows for all four profiles:
  - Student: richer personal, interest, formation, guardian and LGPD fields.
  - Teacher: pedagogical practice, content/material readiness, availability and authorization.
  - Guide: territorial identity, routes/specialties, operation/availability and community care.
  - Tourist: visitor profile, route interest, preparation/accessibility and conduct/consent.
- Extended `lib/navigation/site-map.ts` with route `status`, `audiences`, `visibility` and `indexable` metadata.
- Replaced the visual sitemap page with `SiteMapExplorer`, including status/profile filters and copy-link actions.
- Adjusted `app/sitemap.ts` so only public/indexable routes are exported to `/sitemap.xml`; demo/internal/technical routes remain navigable in the visual map only.
- Added panel state blocks for teacher content, guide readiness, tourist visit status and admin approval governance.

## Remaining Visual Review
- Confirm whether the fallback headline stack is acceptable for the meeting until licensed Troika/Lufga files are delivered.
- Review final legal wording before connecting signup to Supabase.
- Replace extracted PNG logos with designer-approved vector assets when available.

## Verification Result
- `npm run lint`: passed.
- `npm run build`: passed, 45 routes.
- Local browser QA: passed at 390px and 1440px for 10 priority routes, including signup, sitemap and role panels.
- Local interactions: student signup validation/advance and sitemap guide filter/copy controls passed.
- Production deploy: `dpl_HNxad6ECVdf1cg9BQpn1ZKHtq1wb`, alias `https://ecotuca.vercel.app`.
- Production gut-check: new signup/sitemap/admin surfaces passed at 390px with no horizontal overflow and no visible broken images.

## No-Go Items Preserved
- No SQL was applied.
- No real Auth users were created.
- No `.env.local` or service role key was edited.
- No official logo was redrawn or recolored.
