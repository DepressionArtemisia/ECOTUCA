# Tasks

## Production Auth Gating
- [x] Add environment-controlled preview auth fallback.
- [x] Add centralized access policy for internal app routes.
- [x] Add shell-level app access guard.
- [x] Document production auth flags in `.env.example`.
- [x] Update status, handoff and progress report.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run browser QA on preview mode after the guard.
- [x] Smoke-test access policy decisions for student/admin/pending.
- [ ] Test enforced access mode with real Supabase users after staging Auth is ready.

## Production Learning Core Routes
- [x] Add student activities route.
- [x] Add teacher evaluations route.
- [x] Add admin content curation route.
- [x] Add admin reports route.
- [x] Upgrade teacher classes from placeholder to operational view.
- [x] Upgrade admin users from preview switcher to user-management view.
- [x] Upgrade admin settings from placeholder to governance view.
- [x] Update app/admin/mobile navigation to the V1 teaching paths.
- [x] Update sitemap data and page language for production platform.
- [x] Add structured mock data/types for activities, evaluations, content review and reports.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run browser QA on new/edited core routes.
- [ ] Replace these mock datasets with Supabase-backed services after schema/RLS approval.
- [ ] Add real activity submission and teacher feedback mutations.
- [ ] Add real CSV/PDF report export.

## Production Learning Platform Start
- [x] Create branch `codex/production-learning-platform-start`.
- [x] Reorient public navigation away from `/demo`.
- [x] Rebuild home as a real teaching-platform funnel.
- [x] Add `/entrar`, `/recuperar-senha` and `/aguardando-aprovacao`.
- [x] Remove pre-filled demo credentials from login.
- [x] Prioritize student and teacher signup in `/cadastro`.
- [x] Hide demo status controls from app/admin shells by default.
- [x] Recut admin dashboard to education-first indicators.
- [x] Clean public pages that still used demo/presentation language.
- [x] Update Next/React dependencies inside the current major-safe path.
- [x] Run `npm audit fix` for non-breaking fixes.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run browser QA on local production preview.
- [x] Document the round in `STATUS.md`, `AI_HANDOFF.md` and progress report.
- [ ] Connect signup, approval and password reset to reviewed Supabase server actions.
- [ ] Replace mock learning data with Supabase-backed tracks/modules/lessons/submissions.
- [x] Prepare app route gating with env-controlled session/role/status validation.
- [ ] Enable app route gating in production after real Auth users are ready.
- [ ] Resolve residual Next/PostCSS audit warning when the upstream patched package is available.

## Round 7 - Territorio e imagens
- [x] Criar checkpoint e branch `design/territory-real-images-premium-ui`.
- [x] Auditar o deploy publico por rotas principais.
- [x] Pesquisar territorio Complexo do Alemao / Serra da Misericordia / Penha.
- [x] Criar banco de imagens licenciadas e creditos.
- [x] Revisar roteiros com status demonstrativo/validacao comunitaria.
- [x] Aplicar camada visual em Home, Demo, Mobile, Roteiros, Aluno, Professor, Guia, Turista e Admin.
- [x] Rodar `npm run lint`.
- [x] Rodar `npm run build`.
- [x] Fazer QA browser final.
- [x] Fazer redeploy Vercel da Rodada 7.
- [ ] Bruno/equipe validar imagens e substituir por acervo oficial quando houver.

## P0 - Antes da reuniao
- [x] Manter MVP rodando em `localhost:3020`.
- [x] Melhorar `/demo` como central guiada.
- [x] Melhorar `/demo-mobile`.
- [x] Melhorar area do aluno e player.
- [x] Melhorar roteiros e formulario de interesse.
- [x] Melhorar admin como centro de comando.
- [x] Criar scripts/guia Supabase.
- [x] Criar `/demo/status`.
- [x] Criar camada Supabase/fallback sem quebrar demo.
- [x] Criar roteiro, checklist, plano B, perguntas prioritarias e resumo executivo.
- [x] Adicionar reset local seguro na central `/demo`.
- [x] Suavizar textos tecnicos visiveis para cliente.
- [x] Rodar lint/build.
- [x] Remover placeholders visiveis antigos com lockups temporarios premium.
- [x] Extrair logos reais do manual correto para a demo.
- [ ] Substituir PNGs extraidos por SVG/AI/PDF oficiais para producao.

## P0 - Rodada 5 design premium
- [x] Criar branch `design/premium-brand-attack`.
- [x] Analisar PDF salvo em `docs/brand/`.
- [x] Criar estrutura `public/brand/official`.
- [x] Criar `scripts/extract-brand-assets.mjs`.
- [x] Criar `OfficialLogo`.
- [x] Aplicar identidade em shells e telas principais.
- [x] Criar relatorios de marca/design.
- [x] Rodar build final da rodada.
- [x] Fazer QA visual/browser da rodada.

## P0 - Rodada 6 logo real
- [x] Confirmar manual correto em `docs/brand`.
- [x] Renderizar paginas 4, 5, 6 e 11 em alta resolucao.
- [x] Gerar PNG/WebP/source crops/previews/contact sheet.
- [x] Mover lockups temporarios para fallback.
- [x] Atualizar `OfficialLogo` para priorizar assets `from-manual`.
- [x] Atualizar favicon/PWA icons.
- [x] Corrigir overflow mobile apos logo real.
- [x] Rodar lint/build.
- [x] Fazer QA browser em 320, 390, 414, 768, 1024 e 1440.

## P1 - MVP funcional
- [ ] Aplicar SQL no Supabase.
- [ ] Criar Auth users reais.
- [x] Conectar login ao Supabase Auth com fallback demo.
- [x] Preparar persistencia hibrida de `lesson_progress`.
- [x] Preparar persistencia hibrida de `route_bookings`.
- [x] Preparar uploads Supabase Storage com fallback.
- [ ] Seedar aulas e roteiros reais com UUIDs para persistencia 100% Supabase.
- [ ] Criar validacao E2E com usuarios Auth reais.

## P2 - Pos-reuniao
- [ ] Refinar acessibilidade e microinteracoes.
- [ ] Criar relatorios reais.
- [ ] Deploy Vercel.
- [ ] Revisao de vulnerabilidades `next`/`postcss`.

## Proximo foco recomendado
Depois da reuniao, aplicar SQL revisado se aprovado, criar Auth users reais com o script seguro e validar login/progresso/reservas com dados UUID reais.
# Round 8 Completed
- [x] Create branch `design/round-8-desktop-cadastro-sitemap`.
- [x] Add desktop/premium CSS utilities.
- [x] Rework public shell navigation/footer.
- [x] Create sitemap data, visual pages and XML route.
- [x] Create institutional pages.
- [x] Rework cadastro entry.
- [x] Build student and teacher multi-step signup flows.
- [x] Improve guide/tourist signup pages.
- [x] Fix AppShell role context.
- [x] Update client-facing language.
- [x] Run lint/build and browser QA.

# Round 8 Follow-Ups
- [ ] Review legal text for `/termos` and `/privacidade`.
- [ ] Connect signup to Supabase only after SQL/Auth/RLS approval.
- [ ] Replace extracted raster logos with final designer-approved vector assets when available.
- [ ] Redeploy and repeat production route QA.

# Round 9 Completed / In Progress
- [x] Create branch `design/round-9-fonts-panels-signup-final`.
- [x] Check for Troika/Lufga font files.
- [x] Document font fallback and create `public/fonts/README.md`.
- [x] Add CSS typography tokens/classes.
- [x] Expand student and teacher signup fields.
- [x] Build guide and tourist multi-step signup flows.
- [x] Improve `/cadastro` context blocks.
- [x] Add profile/status metadata to sitemap data.
- [x] Replace `/sitemap` with filtered explorer.
- [x] Exclude demo/internal/technical routes from `/sitemap.xml`.
- [x] Add state blocks to professor, guide, tourist and approval panels.
- [x] Create Google Forms requirements and Apps Script docs.
- [x] Run `npm run lint`.
- [x] Run final `npm run build`.
- [x] Run final browser QA.
- [x] Deploy Round 9 to Vercel if verification passes.

# Production Learning Platform Blueprint
- [x] Create separated production blueprint folder.
- [x] Define real teaching-platform scope.
- [x] Map production routes and funnels.
- [x] Specify student, teacher and admin panels.
- [x] Specify production UX/UI direction.
- [x] Specify Supabase/Auth/RLS production model.
- [x] Specify image and asset direction.
- [x] Specify implementation phases and acceptance gates.
- [ ] Create production app branch from this blueprint.
- [ ] Hide/remove demo-first routes from production navigation.
- [ ] Implement production auth/signup/approval against staging Supabase.
- [ ] Build real student learning flow.
- [ ] Build teacher workspace.
- [ ] Build admin command center.
