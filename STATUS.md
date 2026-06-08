# Status

## Atualizacao
- Data/hora: 2026-06-07 13:23:22 -03:00
- Workspace: `C:\Users\barbo\OneDrive\Área de Trabalho\PROJETOS\ECOTUCA`
- Rota principal da reuniao: `http://localhost:3020/demo`
- Porta: `3020`, servindo o build de producao com `next start -p 3020` apos a Rodada 6.

## Deploy Vercel
- Projeto: `brunos-projects-0f78c3da/ecotuca`.
- URL de producao: `https://ecotuca.vercel.app`.
- Deployment id: `dpl_QiRR8SD3fBTqsMHPEraeE8CE1PF4`.
- Status Vercel: Ready.
- Alias tecnico: `https://ecotuca-n757w3nlk-brunos-projects-0f78c3da.vercel.app`.
- Rotas remotas verificadas com HTTP 200: `/`, `/demo`, `/roteiros/serra-da-misericordia`.
- `.vercelignore` criado para excluir docs, PDFs e previews/crops de extracao que nao sao runtime.

## Rodada 6 - Logo real extraida do manual
- Branch: `design/premium-brand-attack`.
- Manual correto confirmado: `docs/brand/MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf`.
- Copia canonica criada para tooling: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.
- Extracao real feita por renderizacao visual do PDF em alta resolucao, sem redesenhar a marca.
- Paginas usadas: 4 (Perifa horizontal/vertical), 5 (ECOTUCA horizontal/vertical com e sem subtitulo), 6 (simbolos e variacoes cromaticas), 11 (negativos).
- Assets preferenciais gerados em `public/brand/official/from-manual/png/` e `public/brand/official/from-manual/webp/`.
- Lockups temporarios da Rodada 5 rebaixados para `public/brand/temporary-lockups/`.
- `OfficialLogo` agora prioriza `from-manual` e cai para temporario apenas se o asset falhar.
- PWA/favicon atualizados a partir do simbolo ECOTUCA extraido: `public/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`.
- Contact sheet criado: `docs/brand/extraction/logo-contact-sheet.png`.
- Indice de preview criado: `docs/brand/ASSET_PREVIEW_INDEX.md`.
- Public footer recebeu assinatura Perifa Ecotour em negativo real.
- Ajustes responsivos: `DemoSessionPill`, `PerifaCard`, `MetricCard` e grids do `AdminDashboard` para eliminar overflow em 320px.
- Reset da demo mudou de `window.confirm` para confirmacao inline de dois cliques, evitando bloqueio na apresentacao.

## Rodada 5 - Design premium e identidade
- Branch: `design/premium-brand-attack`.
- Checkpoint anterior criado: `67616ab freeze: ECOTUCA MVP presentation ready`.
- Observacao historica: a Rodada 5 analisou um PDF incorreto/incompleto para logo e gerou lockups temporarios. A Rodada 6 substituiu o uso principal por assets reais extraidos do manual correto.
- Criadas pastas `public/brand/official/`, `public/brand/official/png/`, `public/brand/official/svg/`, `public/brand/official/source/` e `docs/brand/extraction/`.
- Criado `scripts/extract-brand-assets.mjs`.
- Gerados lockups temporarios premium para ECOTUCA/Perifa, agora guardados apenas como fallback.
- Criado `components/brand/official-logo.tsx` e aplicado em shells, home, demo, login, roteiros, aluno, professor, guia, turista, admin e player.
- Atualizados tokens Tailwind/CSS e componentes visuais compartilhados.
- Telas ajustadas: `/`, `/demo`, `/demo-mobile`, `/login`, `/roteiros`, detalhe de roteiro, area do aluno, aula/player, professor, guia, turista e admin.
- Proximo passo de identidade: trocar os PNGs extraidos por SVG/AI/PDF oficiais aprovados pelo designer quando chegarem.

## Rodada 4 - Freeze de apresentacao
- Objetivo: congelar o MVP para reuniao, sem aplicar SQL, sem criar usuarios reais e sem refactor grande.
- `/demo` recebeu card `Comece por aqui`, card `Roteiro recomendado`, botao `/demo-mobile`, botao `/demo/status` e reset local seguro da apresentacao.
- Textos visiveis foram suavizados: `mock`, `LocalStorage` e `fallback` sairam das telas de cliente e viraram linguagem de demonstracao.
- Criados documentos de reuniao: `ROTEIRO_DE_APRESENTACAO.md`, `CHECKLIST_REUNIAO.md`, `PERGUNTAS_REUNIAO_PRIORITARIAS.md`, `RELATORIO_PENDENCIAS_POS_REUNIAO.md`, `TESTE_FINAL_15_MIN.md`, `PLANO_B_APRESENTACAO.md`, `RESUMO_EXECUTIVO_MVP.md`.
- `MEETING_QUESTIONS.md` foi reorganizado para decisoes de produto, pedagogico, alunos, professores, guias, roteiros, admin, LGPD e tecnologia.
- O MVP esta congelado para apresentacao: foco em demonstrar valor, jornada e proximas decisoes.

## Rodada 3 - Inicio
- Data/hora de inicio: 2026-06-07 13:40:36 -03:00
- Objetivo: integrar Supabase real de forma progressiva com fallback seguro para demo/localStorage.
- Regra: nao remover o modo demo e nao quebrar as rotas de apresentacao.
- Segurança inicial: `.env.local`, `.env`, `.env.*` e `.vercel` estao ignorados; nenhuma chave real foi encontrada em arquivos versionaveis na varredura inicial.

## Rodada 3 - Integracao Supabase hibrida
- Criada camada `lib/data/*` para auth, profiles, lessons, progress, routes, bookings, admin, uploads e fallback.
- Criados `lib/supabase/is-configured.ts` e `lib/data/data-source-status.ts`.
- `/login` agora tenta Supabase Auth primeiro e cai para usuarios demo quando necessario.
- `AuthProvider`, `use-current-user`, `LogoutButton` e `RoleGuard` mantem sessao real/demo em um ponto central.
- Usuario com status `pending` redireciona para `/app/aguardando-aprovacao`.
- `DataSourceBadge` mostra `Supabase conectado`, `Modo demo` ou `Fallback local` sem expor chaves.
- `EcoVideoPlayer` salva sempre em localStorage e tenta `lesson_progress` quando `user_id` e `lesson_id` forem UUIDs reais.
- `RouteInterestForm` tenta `route_bookings` e salva em localStorage quando o roteiro mock nao tem `route_id` real.
- `/app/turista/reservas` lista Supabase/localStorage/mock em ordem segura.
- `ApprovalQueue` tenta buscar/atualizar `profiles` pendentes e simula localmente se Supabase/RLS falhar.
- `/app/professor/conteudos` ganhou upload PDF preparado para bucket `lesson-materials`, com fallback de apresentacao.
- Criada rota `/demo/status` com diagnostico de Supabase, fallback, localStorage, storage e seguranca.
- `scripts/create-demo-users.ts` ficou idempotente, tem `--dry-run`, exige service role e pede confirmacao antes de escrever.
- `npm run supabase:create-demo-users -- --dry-run` passou e indicou que os 7 usuarios seriam criados; nenhuma mutacao real foi executada.
- `npm run lint`, `npm run build`, `npm run supabase:check` e `npm run supabase:prepare-sql` passaram nesta rodada.
- SQL nao foi aplicado automaticamente e usuarios Auth reais nao foram criados.
- Varredura de tokens em arquivos versionaveis passou sem ocorrencias.

## Rodada 2 - Consolidacao profissional
- `/demo` virou central de apresentacao com cards explicativos, usuarios sugeridos, roteiro de 12 passos e botao de tela cheia.
- `DemoUserSwitcher` agora mostra e-mail, senha, copiar e-mail, copiar senha e usar perfil no modo demo.
- Areas internas mostram perfil atual, role, status, indicador `Demo` e logout visual.
- Area do aluno recebeu jornada visual, card `Continue de onde parou`, atividades recentes, certificado mais forte e trilhas/aulas com status.
- `EcoVideoPlayer` agora usa chave `ecotuca:video-progress:{userId}:{lessonId}` e salva `currentTime`, `duration`, `percent`, `completed`, `lessonId`, `userId`, `updatedAt` em `localStorage`.
- Roteiros receberam busca, filtros por dificuldade/duracao/preco, tags e formulario de interesse com confirmacao salva em `localStorage`.
- Admin recebeu mais metricas, graficos, exportacao CSV local e fila de aprovacoes simulada.
- Professor, guia e turista receberam telas mais convincentes para demo.
- Supabase ganhou scripts seguros e guia `SUPABASE_SETUP_FOR_BRUNO.md`.

## Real
- Next.js App Router, TypeScript, TailwindCSS e PWA manifest.
- Supabase URL/anon/service role existem em `.env.local`.
- `npm run supabase:check` funcionou com `NODE_OPTIONS=--use-system-ca`.
- `profiles` no Supabase respondeu na checagem segura.
- `supabase/combined-apply.sql` foi gerado por `npm run supabase:prepare-sql`.

## Mockado ou local
- Auth frontend e hibrido: tenta Supabase Auth e cai para demo/localStorage.
- Demo users continuam usando `localStorage` para perfil atual quando nao ha sessao real.
- Reservas/interesse de roteiro tentam Supabase, mas roteiros mock ficam em `localStorage`.
- Progresso de video salva sempre em `localStorage`; Supabase depende de IDs UUID reais.
- Aprovar/rejeitar admin tenta Supabase quando houver sessao/role real; caso contrario simula.
- Dashboards usam mock data.
- Uploads de PDF tentam Storage, mas mantem upload simulado quando bucket/RLS nao esta pronto.

## Supabase
- Scripts criados:
  - `scripts/check-supabase.ts`
  - `scripts/apply-supabase-schema.ts`
  - `scripts/create-demo-users.ts`
- Comandos:
  - `npm run supabase:check`
  - `npm run supabase:prepare-sql`
  - `npm run supabase:create-demo-users`
- SQL nao foi aplicado automaticamente.
- Usuarios Auth reais nao foram criados automaticamente.
- Motivo: aplicar SQL/criar usuarios altera o projeto Supabase real; ficou pronto e documentado para execucao consciente.
- Novo caminho seguro: rodar `npm run supabase:create-demo-users -- --dry-run` para conferir, depois `npm run supabase:create-demo-users -- --yes` somente quando o schema ja estiver aplicado.

## Segurança
- `.env.local`, `.env`, `.env.*` e `.vercel` estao no `.gitignore`.
- Nenhum documento deve conter token real.
- `SUPABASE_SERVICE_ROLE_KEY` aparece apenas como nome de variavel em docs/scripts server-side.
- Credenciais reais não foram documentadas nem versionadas.

## Como testar cada role
- Visitante: abrir `/` e `/roteiros`.
- Aluno: abrir `/app/aluno`, `/app/aluno/trilhas`, `/app/aluno/aulas/aula-guia-01`.
- Professor: abrir `/app/professor`, `/app/professor/conteudos`, `/app/professor/turmas`.
- Guia: abrir `/app/guia`, `/app/guia/roteiros`, `/app/guia/agenda`.
- Turista: abrir `/app/turista`, `/app/turista/reservas`, `/roteiros/serra-da-misericordia`.
- Admin: abrir `/app/admin`, `/app/admin/aprovacoes`, `/app/admin/metricas`.

## Testes executados
- Rodada 6: `npm run lint` passou.
- Rodada 6: `npm run build` passou, 36 rotas.
- Rodada 6: `scripts/extract-brand-assets.mjs` gerou 12 PNGs reais extraidos do manual, WebP, source crops, previews, JSON e contact sheet.
- Rodada 6 browser: 84 combinacoes de rota/breakpoint testadas em `320`, `390`, `414`, `768`, `1024` e `1440`; sem overflow horizontal, sem imagens quebradas e com logos `from-manual` detectadas.
- Rodada 6 interacoes: alternar tema, login demo, logout, enviar interesse em roteiro, iniciar player e reiniciar player passaram no navegador.
- Rodada 6 reset: o bloqueio por `window.confirm` foi corrigido com confirmacao inline (`Limpar apresentacao` -> `Confirmar limpeza`); build/static confirmam o novo fluxo sem dialogo nativo.
- Rodada 5: `npm run lint` passou.
- Rodada 5: `npm run build` passou, 36 rotas.
- Rodada 5 browser desktop 1440: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/guias/rafael-silva`, `/app/aluno`, `/app/aluno/trilhas`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/professor/conteudos`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`, `/app/admin/metricas`.
- Rodada 5 browser mobile 320/390: rotas criticas sem overflow horizontal apos ajuste de `OfficialLogo`, textos display e e-mails do seletor de usuarios.
- Rodada 5 interacoes: login apresentacao, sair, alternar tema, enviar interesse de roteiro e iniciar aula/player passaram.
- `npm run lint`: passou.
- `npm run build`: passou, 36 rotas.
- `NODE_OPTIONS=--use-system-ca npm run supabase:check`: passou.
- `npm run supabase:prepare-sql`: passou e nao aplicou SQL automaticamente.
- `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run`: passou sem mutacao real.
- Varredura de tokens em arquivos versionaveis: sem ocorrencias.
- Browser: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/turista/reservas`, `/app/admin/aprovacoes`, `/app/professor`, `/app/guia`, `/app/turista`.
- Login demo: aluno redireciona para `/app/aluno`, admin para `/app/admin`, pendente para `/app/aguardando-aprovacao`; logout volta para `/demo`.
- Player: progresso retomado visualmente com `Voce parou em 00:25`, badge `LocalStorage ativo` e botao `Continuar de onde parei`.
- Roteiro: formulario confirmou `Solicitacao recebida` e `Salvo localmente em modo demo`; `/app/turista/reservas` mostrou a reserva local.
- Admin: aprovar pendente funcionou em simulacao local e marcou `approved`.
- Mobile 390x844: `/demo`, `/demo/status`, `/app/aluno`, `/roteiros/serra-da-misericordia`, `/app/admin/aprovacoes` e `/demo-mobile` sem overflow horizontal apos ajuste dos headers.
- Rodada 4: `/demo` abriu com `Comece por aqui`, `Roteiro recomendado` e reset local seguro.
- Rodada 4: reset local testado com confirmacao e mensagem `Dados locais da apresentacao resetados`.
- Rodada 4: formulario de roteiro confirmou `Solicitacao recebida` e `Salvo para apresentacao`.
- Rodada 4: `/demo-mobile` alternou para tela de guia.
- Rodada 4: mobile 390x844 sem overflow nas rotas principais do freeze.

## Riscos
- `npm audit` ainda aponta 2 vulnerabilidades moderadas em `next`/`postcss`; `npm audit fix --force` sugere mudanca quebrada e nao foi aplicado.
- Logos e simbolos agora sao PNGs reais extraidos do manual e aprovados para demo, mas producao ainda precisa de SVG/AI/PDF oficial do designer.
- Videos sao placeholders publicos e precisam ser substituidos por videos oficiais.
- Supabase real precisa de execucao manual/revisada antes de virar fonte principal do app.

## Proximo prompt recomendado
Aplicar SQL revisado, criar usuarios Auth reais com `--yes`, seedar dados UUID reais de aulas/roteiros e validar login/progresso/reservas 100% Supabase mantendo fallback demo.
