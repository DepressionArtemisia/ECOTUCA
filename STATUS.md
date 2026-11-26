# Status

## VPS e entrega contínua — 26/11/2026

O runbook em [DEPLOY.md](DEPLOY.md) documenta o endereço temporário da Hostinger, o stack Supabase dedicado, a publicação por commit e a troca futura de domínio. Auth exige perfil aprovado. O ensaio na VPS confirmou login HTTPS, revisão auditada, isolamento do Storage e restauração do dump em banco descartável. SMTP e abertura de inscrições seguem a homologação operacional. Evidências em [STEP 26](docs/progress-reports/STEP_26_PUBLICACAO_VPS.md).

## Redesign e preparação para VPS — 24/11/2026

- Home, páginas institucionais, inscrições, roteiros e painéis compartilham uma linguagem visual e editorial. Os temas usam pares de contraste próprios e a navegação interna funciona no celular, inclusive na coordenação.
- O menu móvel público e dos painéis abre de baixo, com ícones, áreas de toque maiores, rota ativa e opções da conta agrupadas.
- Arquivos de marca do manual e fotos territoriais licenciadas. Tipografia local em Archivo Black e DM Sans.
- Inscrições usam validação comum no navegador e no servidor, rascunho opcional e confirmação explícita. A coordenação pode registrar decisões via RPC após aplicar o SQL.
- Login usa o perfil associado à conta Auth. Recuperação aponta para `/nova-senha`. O modo `enforce` protege os painéis na interface e desativa rotas e sessões demonstrativas.
- RLS e revisão com histórico passaram no ensaio isolado. Aplicação em homologação, autenticação real, SMTP e publicação na VPS ainda pendentes.
- Detalhes em [Design system](DESIGN_SYSTEM.md), [roteiro de homologação](docs/production-platform/VPS_SUPABASE_REHEARSAL.md) e [relatório de progresso](docs/progress-reports/STEP_25_REDESIGN_E_ENSAIO_VPS.md).

## Admin Approvals Application Queue
- Data: 2026-06-17.
- Branch: `codex/production-learning-platform-start`.
- Objetivo: fazer o admin entender a nova fila `signup_applications` sem depender de SQL aplicado agora.
- Criado `lib/data/signup-applications.ts` para leitura segura de cadastros publicos pendentes.
- `lib/data/admin.ts` agora retorna fila unificada: `signup_applications` quando disponivel, perfis pendentes/fallback preparado quando nao.
- `features/admin/approval-queue.tsx` mostra origem, telefone, highlight do payload e rótulos `Base conectada`/`Fila preparada`.
- Textos de fila de apresentacao foram removidos da tela de aprovacoes.
- Nenhuma aprovacao real foi gravada e nenhum usuario Auth real foi criado.
- Validacao local: `npm run lint` e `npm run build` passaram.
- Browser QA em `/app/admin/aprovacoes`: desktop/mobile sem overflow, sem imagens quebradas, sem erros de console e sem `apresentacao`/`MVP` visivel.
- Relatorio: `docs/progress-reports/STEP_24_ADMIN_APPROVALS_APPLICATION_QUEUE.md`.

## Signup Server Action Prep
- Data: 2026-06-17.
- Branch: `codex/production-learning-platform-start`.
- Objetivo: preparar envio real de cadastros sem ativar escrita no Supabase por padrao.
- Criada `app/actions/signup-application.ts` com validacao Zod e modo seguro `prepared`.
- `features/signup/multistep-signup-flow.tsx` agora chama a action no envio final.
- Fluxos de aluno, professor, guia e turista passam `applicationRole`.
- `.env.example` ganhou `ENABLE_SUPABASE_SIGNUP_WRITES`.
- SQL versionado ganhou `public.signup_applications`, indices e RLS admin-only.
- `supabase/combined-apply.sql` foi regenerado por `npm run supabase:prepare-sql`; automatic apply continua desligado.
- Nenhum SQL foi aplicado, nenhum usuario Auth real foi criado e nenhuma chave foi editada.
- Validacao local: `npm run supabase:prepare-sql`, `npm run lint` e `npm run build` passaram.
- Browser QA mobile em `/cadastro/aluno`: validacao de obrigatorios, preenchimento da primeira etapa e avanco para `Interesse e vinculo` passaram sem overflow/imagem quebrada/erro de console.
- Smoke test da action retornou `mode: prepared`, sem escrita real.
- Relatorio: `docs/progress-reports/STEP_23_SIGNUP_SERVER_ACTION_PREP.md`.

## Production Auth Gating
- Data: 2026-06-17.
- Branch: `codex/production-learning-platform-start`.
- Objetivo: preparar auth e bloqueio de areas internas para producao sem quebrar o preview local.
- Criados `lib/auth/runtime.ts`, `lib/auth/access-policy.ts` e `features/auth/app-access-guard.tsx`.
- `AuthProvider` agora respeita `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`; quando ativo, nao injeta usuario demonstrativo automaticamente se nao houver sessao Supabase.
- `loginWithSupabaseOrDemo` tambem respeita `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`; nesse modo, fallback demo nao valida login.
- `AppShell` e `AdminShell` agora passam o conteudo pelo `AppAccessGuard`.
- A politica de acesso mapeia `/app/aluno`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin` e areas internas comuns por role/status.
- Preview padrao segue aberto para navegacao local. Para producao, configurar `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true` e `NEXT_PUBLIC_ACCESS_CONTROL_MODE=enforce`.
- `.env.example` documenta as flags sem incluir segredos.
- Nenhum SQL foi aplicado, nenhum usuario Auth real foi criado e nenhuma chave foi editada.
- Validacao local: `npm run lint` passou.
- Validacao local: `npm run build` passou com 52 rotas.
- Validacao de politica: `tsx` confirmou aluno/admin/pending com decisoes esperadas.
- Browser QA em `http://127.0.0.1:3020`: desktop e mobile para `/`, `/app/aluno`, `/app/admin`, `/entrar` e `/sitemap`.
- Resultado browser: sem bloqueio indevido no preview, sem overflow horizontal, sem imagens quebradas, sem erros de console e sem sinais visiveis de demo/MVP/apresentacao nas rotas verificadas.
- Relatorio: `docs/progress-reports/STEP_22_PRODUCTION_AUTH_GATING.md`.

## Production Learning Core Routes
- Data: 2026-06-16.
- Branch: `codex/production-learning-platform-start`.
- Objetivo: completar o mapa V1 da plataforma de ensino com telas centrais que ainda faltavam no nucleo aluno/professor/admin.
- Novas rotas criadas:
  - `/app/aluno/atividades`
  - `/app/professor/avaliacoes`
  - `/app/admin/conteudos`
  - `/app/admin/relatorios`
- Rotas principais reforcadas:
  - `/app/professor/turmas` deixou de ser placeholder e virou acompanhamento de turmas/progresso/alunos.
  - `/app/admin/usuarios` deixou de usar seletor de preview e virou gestao de usuarios/perfis/status.
  - `/app/admin/configuracoes` deixou de ser placeholder e virou tela de governanca.
  - `/sitemap` foi limpo para linguagem de plataforma, com filtros iniciais de publico/pronto.
- Navegacao ajustada:
  - Aluno: Atividades e Certificados entram no lugar de Roteiros como caminho principal.
  - Professor: Avaliacoes entra no menu principal.
  - Admin: Conteudos e Relatorios entram no menu principal.
  - Bottom nav mobile agora aponta para Atividades.
- Dados estruturados adicionados em `types/domain.ts` e `lib/mock-data/ecotuca.ts`: atividades do aluno, avaliacoes do professor, curadoria de conteudo e snapshots/linhas de relatorio.
- Nenhum SQL foi aplicado, nenhum usuario Auth real foi criado e nenhuma chave foi editada.
- Validacao local: `npm run lint` passou.
- Validacao local: `npm run build` passou com 52 rotas.
- Browser QA em `http://localhost:3020`: desktop e mobile para `/app/aluno/atividades`, `/app/professor/turmas`, `/app/professor/avaliacoes`, `/app/admin/usuarios`, `/app/admin/conteudos`, `/app/admin/relatorios`, `/app/admin/configuracoes` e `/sitemap`.
- Resultado browser: sem overflow horizontal, sem imagens quebradas, sem erros de console e sem sinais visiveis de demo/MVP/apresentacao nas rotas verificadas.
- Relatorio: `docs/progress-reports/STEP_21_PRODUCTION_LEARNING_CORE_ROUTES.md`.

## Production Learning Platform Start
- Data: 2026-06-16.
- Branch: `codex/production-learning-platform-start`.
- Objetivo: iniciar a conversao do MVP/demo em plataforma real de ensino, mantendo a documentacao anterior como referencia e deixando `/demo` fora do caminho principal.
- Public navigation reorientada para ensino: `/`, `/como-funciona`, `/#trilhas`, `/cadastro/aluno`, `/cadastro/professor`, `/contato` e `/entrar`.
- Home recriada como funil de aprendizagem ECOTUCA: inscricao, aprovacao, trilhas, professor, admin, certificado e impacto.
- Novas rotas de producao: `/entrar`, `/recuperar-senha` e `/aguardando-aprovacao`.
- `/cadastro` prioriza Aluno e Professor; os textos de cadastro agora falam em analise/aprovacao da coordenacao.
- Login perdeu credenciais pre-preenchidas, recebeu campos obrigatorios, link de recuperacao e copy de conta aprovada.
- Shells internos escondem badges demo por padrao com `NEXT_PUBLIC_SHOW_DEMO_CONTROLS`.
- Admin foi reorientado para ensino, usuarios, trilhas, certificados, turmas, suporte e impacto; textos visiveis de demo foram removidos do painel principal.
- Paginas publicas revisadas: `/como-funciona`, `/contato`, `/faq`, `/termos`, `/privacidade` e 404.
- Dependencias atualizadas para producao: `next@15.5.19`, `eslint-config-next@15.5.19`, `react@19.2.7`, `react-dom@19.2.7`, `@types/react@19.2.17`, `@types/react-dom@19.2.3`.
- `npm audit fix` removeu a vulnerabilidade alta de `esbuild`.
- Residual de seguranca: `npm audit --omit=dev` ainda aponta 2 vulnerabilidades moderadas em `postcss` embutido no `next`; `npm audit fix --force` sugere downgrade quebrado para `next@9.3.3`, entao nao foi aplicado.
- Nenhum SQL foi aplicado, nenhum usuario Auth real foi criado e nenhuma chave foi editada.
- Validacao local: `npm run lint` passou.
- Validacao local: `npm run build` passou com 48 rotas.
- Browser QA em `http://localhost:3020`: desktop e mobile para `/`, `/entrar`, `/recuperar-senha`, `/aguardando-aprovacao`, `/cadastro`, `/cadastro/aluno`, `/cadastro/professor`, `/como-funciona`, `/contato`, `/faq`, `/termos`, `/privacidade`, `/app/aluno`, `/app/professor` e `/app/admin`.
- Resultado browser: sem overflow horizontal, sem imagens quebradas, sem erros de console e sem sinais visiveis de demo nas rotas testadas.
- Preview local ativo: `http://localhost:3020`.
- Relatorio: `docs/progress-reports/STEP_20_PRODUCTION_LEARNING_START.md`.

## Prompt 8 - QA final de producao e reuniao
- Data: 2026-06-08.
- Objetivo: QA final sem novas features, sem SQL, sem usuarios Auth reais e sem mexer em chaves.
- URL final de producao: `https://ecotuca.vercel.app`.
- Deploy validado: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.
- Producao: 14 rotas obrigatorias com HTTP 200.
- Local: 14 rotas obrigatorias com HTTP 200 em `http://localhost:3020`.
- Browser QA producao: 56 checks visuais responsivos, cobrindo 7 rotas prioritarias x 8 viewports (`320`, `360`, `390`, `414`, `768`, `1024`, `1440`, `1920`).
- Browser QA local: 28 checks visuais, cobrindo 7 rotas prioritarias x 4 viewports (`320`, `390`, `1024`, `1440`).
- Resultado visual: sem overflow horizontal real, sem imagem visivel quebrada, sem `alt` ausente/vazio e sem lockup temporario como logo principal.
- Resultado texto/etica: nenhum termo proibido em tela de cliente; `/demo/status` permanece rota tecnica.
- Resultado marca/PWA: favicon, PWA icons, manifest e assets `from-manual` responderam em producao.
- Interacoes testadas em producao: tema, login aluno, logout, login admin, player iniciar/retomar, formulario de roteiro, filtro de roteiros, reset demo, demo mobile e aprovacoes admin.
- `npm run lint`: passou.
- `npm run build`: passou, 36 rotas.
- Documentacao final: `docs/progress-reports/STEP_17_FINAL_PRESENTATION_QA.md`.
- Nenhuma correcao de codigo foi necessaria no Prompt 8.
- Merge local: `design/territory-real-images-premium-ui` foi integrado em `master` por fast-forward.
- Commit final local em `master`: `e9b39c3 chore: final production QA for ECOTUCA meeting`.
- Push nao executado: o repositorio nao tem remote configurado (`git remote -v` vazio) e nenhum URL GitHub foi encontrado nos arquivos do projeto.

## Rodada 7 - Territorio, imagens reais e UI premium
- Branch: `design/territory-real-images-premium-ui`.
- Checkpoint anterior: `3dd3b40 checkpoint: before deep design territory audit`.
- Auditoria do deploy publico documentada em `docs/design/VERCEL_SITE_DEEP_AUDIT.md`.
- Pesquisa territorial documentada em `docs/research/COMPLEXO_ALEMAO_TERRITORY_RESEARCH.md`.
- Banco de imagens criado em `public/media/territory/`, com tipos em `types/media.ts` e dados em `lib/mock-data/media-assets.ts`.
- Creditos e licencas documentados em `docs/media/IMAGE_CREDITS.md` e `docs/media/IMAGE_LICENSES.md`.
- Roteiros revisados em `lib/mock-data/ecotuca.ts` com nomes mais territoriais, status de validacao, cuidado etico e galerias licenciadas.
- Telas ajustadas: `/`, `/demo`, `/demo-mobile`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`.
- Correcao provavel para React #418: `DataSourceBadge` agora inicia com status estavel antes de ler ambiente local.
- `npm run lint` passou no fechamento da rodada.
- `npm run build` passou no fechamento da rodada, com 36 rotas geradas.
- QA browser local passou em 126 combinacoes de rota/viewport: 14 rotas obrigatorias x 9 viewports (`320`, `360`, `390`, `414`, `768`, `1024`, `1280`, `1440`, `1920`), sem overflow horizontal real, sem imagens visiveis quebradas e sem alt ausente.
- Interacoes testadas no browser: tema claro/escuro, demo mobile alternando telas, filtro de roteiro, formulario de roteiro, player iniciar/reiniciar, reset demo, login demo e logout.
- Deploy Vercel da Rodada 7 concluido e alias de producao atualizado para `https://ecotuca.vercel.app`.
- Pendente de identidade/midia: fotos oficiais/proprias da Serra da Misericordia e validacao visual por Bruno/equipe.

## Atualizacao
- Data/hora: 2026-06-07 13:23:22 -03:00
- Workspace: `C:\Users\barbo\OneDrive\Área de Trabalho\PROJETOS\ECOTUCA`
- Rota principal da reuniao: `http://localhost:3020/demo`
- Porta: `3020`, servindo o build de producao com `next start -p 3020` apos a Rodada 6.

## Deploy Vercel
- Projeto: `brunos-projects-0f78c3da/ecotuca`.
- URL de producao: `https://ecotuca.vercel.app`.
- Deployment id: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.
- Status Vercel: Ready.
- Alias tecnico: `https://ecotuca-dek38xah6-brunos-projects-0f78c3da.vercel.app`.
- Rotas remotas verificadas com HTTP 200: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`.
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
- Rodada 7: `npm run lint` passou.
- Rodada 7: `npm run build` passou, 36 rotas.
- Rodada 7 browser: 126 combinacoes de rota/breakpoint testadas em `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`; viewports `320`, `360`, `390`, `414`, `768`, `1024`, `1280`, `1440`, `1920`; sem overflow horizontal real, sem imagem visivel quebrada e sem alt ausente.
- Rodada 7 interacoes: tema claro/escuro, demo mobile alternando telas, filtro de roteiro por busca, formulario de interesse, player iniciar/reiniciar, reset demo, login demo e logout passaram no browser.
- Rodada 7 correcao final: `PhoneMockup` recebeu `min-w-0`, escala menor no titulo mobile e frame mais compacto em 320px.
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

## Round 8 - Desktop, Cadastros e Sitemap
- Branch: `design/round-8-desktop-cadastro-sitemap`.
- Criado `/sitemap`, `/mapa-do-site` e `/sitemap.xml`.
- Criadas paginas institucionais: `/como-funciona`, `/faq`, `/contato`, `/creditos-imagens`, `/termos`, `/privacidade`.
- `/cadastro` virou entrada segmentada premium; `/cadastro/aluno` e `/cadastro/professor` viraram fluxos multi-step com rascunho, salvar, limpar, revisao e confirmar.
- Chaves locais: `ecotuca:signup:student`, `ecotuca:signup:teacher`.
- `/cadastro/guia` e `/cadastro/turista` ganharam formularios e paineis de contexto.
- `PublicShell` ganhou nav/footer completos; `AppShell` ganhou contexto por role e removeu texto do Lucas em professor/guia/turista.
- Home, Sobre, Roteiros, Demo, Demo Mobile, Professor, Guia, Turista e Admin receberam conteudo desktop mais rico.
- Linguagem tecnica foi suavizada fora de `/demo/status`.
- Testes: `npm run lint` passou; `npm run build` passou com 45 rotas; browser QA cobriu rotas, cadastros, login, player, roteiro, reset e viewports 320-1920 sem overflow.
- Observacao: para build no Windows, parar `next start` antes de rodar `next build`.

## Round 9 - Fonts, Panels, Forms
- Branch: `design/round-9-fonts-panels-signup-final`.
- Objetivo: finalizar tipografia, cadastros completos por perfil, paineis por role, sitemap filtravel e docs de Google Forms.
- Fontes Troika/Lufga: arquivos oficiais nao encontrados nos caminhos verificados; fallback documentado em `docs/brand/FONT_USAGE_AND_LICENSE.md` e `public/fonts/README.md`.
- Tokens/classes de tipografia adicionados em `app/globals.css`.
- `/cadastro/aluno`, `/cadastro/professor`, `/cadastro/guia` e `/cadastro/turista` agora usam fluxos multi-step locais com autosave, validacao, revisao e confirmacao visual.
- Chaves locais: `ecotuca:signup:student`, `ecotuca:signup:teacher`, `ecotuca:signup:guide`, `ecotuca:signup:tourist`.
- `/sitemap` virou explorador com filtros por perfil/status e copia de links; `/sitemap.xml` indexa apenas rotas publicas.
- Paineis professor, professor-conteudos, guia, turista e admin-aprovacoes receberam estados operacionais mais claros.
- Docs criados: `docs/progress-reports/STEP_19_ROUND_9_FONTS_PANELS_FORMS.md`, `docs/design/ROUND_9_SITE_AND_PANEL_AUDIT.md`, `docs/forms/GOOGLE_FORMS_REQUIREMENTS.md`, `docs/forms/GOOGLE_FORMS_APPS_SCRIPT.md`.
- `npm run lint`: passou.
- `npm run build`: passou, 45 rotas.
- Browser QA local: passou em 20 combinacoes rota/viewport (`390` e `1440`) para rotas de cadastro, sitemap e paineis; sem overflow horizontal e sem imagens quebradas.
- Interacoes locais: erro de obrigatorios no cadastro de aluno, avanco da primeira etapa preenchida, filtro de guia no sitemap e botoes de copia verificados.
- Deploy Vercel: passou, deployment `dpl_HNxad6ECVdf1cg9BQpn1ZKHtq1wb`, alias `https://ecotuca.vercel.app`.
- Producao HTTP: 12 rotas verificadas com 200, incluindo cadastros, sitemap, paineis novos e `/sitemap.xml`.
- Producao browser: passou em 390px para `/cadastro/guia`, `/cadastro/turista`, `/sitemap` e `/app/admin/aprovacoes`; sem overflow horizontal e sem imagens quebradas visiveis.
- Nenhum SQL foi aplicado, nenhum usuario Auth real foi criado e nenhuma chave foi editada.

## Production Learning Platform Blueprint
- Data: 2026-06-16.
- Branch: `codex/production-learning-platform-blueprint`.
- Objetivo: separar o planejamento do produto real de ensino do MVP/demo/documentacao anterior.
- Pasta criada: `docs/production-platform/`.
- Escopo V1 definido: plataforma de ensino ECOTUCA com funil publico, cadastro/aprovacao real, painel do aluno, painel do professor e painel admin.
- Turismo, guias publicos, reservas e marketplace foram movidos para expansao futura, depois do nucleo de ensino estar estavel.
- Documentos criados: escopo real, mapa de rotas/funil, UX/UI premium, paineis/features, Supabase/Auth/RLS, plano de implementacao e direcao de imagens/assets.
- Nenhuma alteracao funcional de codigo foi feita nesta etapa; e um blueprint de construcao para iniciar a producao.
