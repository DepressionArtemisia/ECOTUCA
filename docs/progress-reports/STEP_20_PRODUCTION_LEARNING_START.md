# STEP 20 - Production Learning Platform Start

Date: 2026-06-16  
Branch: `codex/production-learning-platform-start`

## Goal
Start the real ECOTUCA teaching platform from the production blueprint, separate from the demo-first presentation path.

This round did not delete the older demo routes. It changed the primary public experience so the product now reads as a production learning platform focused on students, teachers and admin operation.

## Implemented
- Rebuilt the home page as a learning-platform funnel: inscription, approval, tracks, teacher workflow, admin operation and certification.
- Updated the public navigation in `PublicShell` to prioritize `/`, `/como-funciona`, `/#trilhas`, `/cadastro/aluno`, `/cadastro/professor`, `/contato` and `/entrar`.
- Added `/entrar` as the production login alias.
- Added `/recuperar-senha` as the production password recovery surface.
- Added `/aguardando-aprovacao` as the public pending-approval page.
- Removed pre-filled demo credentials from the login form.
- Added required validation to login e-mail/password fields.
- Redirected pending users to `/aguardando-aprovacao`.
- Reworked `/cadastro` copy to prioritize student and teacher entry.
- Cleaned public copy in `/como-funciona`, `/contato`, `/faq`, `/termos`, `/privacidade`, 404 and signup role pages.
- Hid demo status controls in `AppShell` and `AdminShell` unless `NEXT_PUBLIC_SHOW_DEMO_CONTROLS=true`.
- Recut `AdminDashboard` from demo/tourism metrics to education-first indicators: teaching, users, tracks, classes, certificates, support and impact.
- Updated admin shell heading and navigation language.
- Updated mock admin metric data to remove visible demo labels from the production-facing admin page.

## Dependency Update
- Updated `next` from `15.1.3` to `15.5.19`.
- Updated `eslint-config-next` to `15.5.19`.
- Updated `react` and `react-dom` to `19.2.7`.
- Updated React type packages to current 19.x.
- Ran `npm audit fix`; this removed the high-severity `esbuild` finding.

Residual:
- `npm audit --omit=dev` still reports 2 moderate vulnerabilities through `postcss` inside `next`.
- `npm audit fix --force` suggests a breaking downgrade to `next@9.3.3`, so it was not applied.

## Verification
- `npm run lint`: passed.
- `npm run build`: passed with 48 routes.
- Local production preview: `http://localhost:3020`.
- Browser QA checked desktop and mobile routes:
  - `/`
  - `/entrar`
  - `/recuperar-senha`
  - `/aguardando-aprovacao`
  - `/cadastro`
  - `/cadastro/aluno`
  - `/cadastro/professor`
  - `/como-funciona`
  - `/contato`
  - `/faq`
  - `/termos`
  - `/privacidade`
  - `/app/aluno`
  - `/app/professor`
  - `/app/admin`
- Result: no horizontal overflow, no broken visible images, no console errors and no visible demo signals in tested production routes.

## Not Changed
- No Supabase SQL was applied.
- No real Supabase Auth users were created.
- No secrets were read into documentation or committed.
- Demo routes still exist for internal comparison and historical presentation use.

## Next Build Slice
1. Add server-side signup actions for student and teacher.
2. Connect pending approval to Supabase profiles and RLS.
3. Add production route gating for app pages based on session, role and status.
4. Replace mock learning data with Supabase-backed tracks, modules, lessons, submissions and progress.
5. Build real admin user approval and audit log flow.
