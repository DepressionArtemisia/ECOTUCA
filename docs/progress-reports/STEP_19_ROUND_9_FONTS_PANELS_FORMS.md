# Step 19 - Round 9 Fonts, Panels, Forms

Date: 2026-06-08.
Branch: `design/round-9-fonts-panels-signup-final`.

## Objective
Finalize the MVP presentation layer with font strategy, richer profile signup flows, clearer role panels, a filtered sitemap explorer and handoff documentation for possible Google Forms fallback.

## Completed
- Checked for Troika/Lufga files in the expected font folders and found none.
- Created `public/fonts/README.md` and `docs/brand/FONT_USAGE_AND_LICENSE.md`.
- Added typography variables and utility classes in `app/globals.css`.
- Expanded the shared multi-step signup engine with radio fields, checkbox groups, conditional fields, validation messaging and editable review.
- Reworked `/cadastro` with clearer participation language and explanatory blocks.
- Reworked `/cadastro/aluno`, `/cadastro/professor`, `/cadastro/guia` and `/cadastro/turista` into full local-only multi-step flows.
- Added local draft storage keys:
  - `ecotuca:signup:student`
  - `ecotuca:signup:teacher`
  - `ecotuca:signup:guide`
  - `ecotuca:signup:tourist`
- Extended sitemap data with status, audience, visibility and indexability metadata.
- Replaced `/sitemap` with a filtered route explorer and copy-link buttons.
- Updated `/sitemap.xml` generation to index only public/indexable routes.
- Added more operational state to professor, guide, tourist and admin approval panels.
- Created Google Forms requirements and Apps Script starter documentation.

## Verification
- `npm run lint`: passed.
- `npm run build`: passed, 45 routes generated.
- Browser QA local: passed for 10 priority routes at 390px and 1440px, without horizontal overflow.
- Browser interactions: student signup required-field error, first-step completion/advance and sitemap guide filter/copy actions passed.
- Vercel deploy: passed, production deployment `dpl_HNxad6ECVdf1cg9BQpn1ZKHtq1wb`, alias `https://ecotuca.vercel.app`.
- Production HTTP QA: passed for `/`, `/cadastro`, `/cadastro/aluno`, `/cadastro/professor`, `/cadastro/guia`, `/cadastro/turista`, `/sitemap`, `/app/professor/conteudos`, `/app/guia`, `/app/turista`, `/app/admin/aprovacoes` and `/sitemap.xml`.
- Production browser QA: passed at 390px for `/cadastro/guia`, `/cadastro/turista`, `/sitemap` and `/app/admin/aprovacoes`, with no horizontal overflow and no visible broken images.

## Constraints Preserved
- No Supabase SQL was applied.
- No real users were created.
- No service role key or `.env.local` was changed.
- Signup remains visual/local only until backend, LGPD and approval flow are validated.

## Next Steps
- Review legal copy and consent versioning before real data collection.
- Replace font fallbacks with licensed Troika/Lufga files when supplied.
- Review legal copy and data consent fields with the project team before real submission.
- Replace temporary/fallback font strategy with licensed Troika/Lufga files when supplied.
