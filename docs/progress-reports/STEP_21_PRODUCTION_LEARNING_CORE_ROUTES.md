# STEP 21 - Production Learning Core Routes

Date: 2026-06-16  
Branch: `codex/production-learning-platform-start`

## Goal
Complete the V1 teaching-platform route skeleton after the first production cutover slice.

This step focuses on the real learning platform: activities, teacher feedback, admin content curation, reports, users and governance.

## Implemented
- Added `/app/aluno/atividades`.
- Added `/app/professor/avaliacoes`.
- Added `/app/admin/conteudos`.
- Added `/app/admin/relatorios`.
- Reworked `/app/professor/turmas` into an operational class/progress page.
- Reworked `/app/admin/usuarios` into a user management page and removed the preview user switcher from that route.
- Reworked `/app/admin/configuracoes` into a governance/settings page.
- Updated student app navigation to include Atividades and Certificados.
- Updated teacher app navigation to include Avaliacoes.
- Updated admin navigation to include Conteudos and Relatorios.
- Updated mobile bottom navigation to point to Atividades instead of the tourism route showcase.
- Updated `/sitemap` copy and default filters for production platform navigation.
- Changed internal sitemap status from `demo` to `preview`.

## Data Contracts Added
- `StudentActivity`
- `TeacherEvaluation`
- `ContentReviewItem`
- `AdminReportSnapshot`
- `AdminReportRow`

The current implementation uses structured mock data in `lib/mock-data/ecotuca.ts`. The shape is ready to be replaced by Supabase-backed services once schema, RLS and approval rules are finalized.

## Verification
- `npm run lint`: passed.
- `npm run build`: passed with 52 routes.
- Local production preview: `http://localhost:3020`.
- Browser QA checked desktop and mobile for:
  - `/app/aluno/atividades`
  - `/app/professor/turmas`
  - `/app/professor/avaliacoes`
  - `/app/admin/usuarios`
  - `/app/admin/conteudos`
  - `/app/admin/relatorios`
  - `/app/admin/configuracoes`
  - `/sitemap`
- Result: no horizontal overflow, no broken images, no console errors and no visible demo/MVP/presentation terms in the verified routes.

## Not Changed
- No Supabase SQL was applied.
- No real Supabase Auth users were created.
- No secrets were read into docs or committed.
- Activity submission, teacher feedback, content approval and report export remain visual contracts until the backend slice.

## Next Build Slice
1. Add production route gating and role/status checks for app pages.
2. Create Supabase-safe server actions for signup and approval.
3. Add real activity submission and feedback mutations.
4. Replace mock learning datasets with UUID-backed tracks, modules, lessons, activities and reports.
