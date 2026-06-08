# Tasks

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
