# Status

## Atualizacao
- Data/hora: 2026-06-07 13:23:22 -03:00
- Workspace: `C:\Users\barbo\OneDrive\Área de Trabalho\PROJETOS\ECOTUCA`
- Rota principal da reuniao: `http://localhost:3020/demo`
- Porta: `3020`, porque `localhost:3000` estava ocupado por outro projeto local.

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
- Logos e simbolos continuam placeholders temporarios.
- Videos sao placeholders publicos e precisam ser substituidos por videos oficiais.
- Supabase real precisa de execucao manual/revisada antes de virar fonte principal do app.

## Proximo prompt recomendado
Aplicar SQL revisado, criar usuarios Auth reais com `--yes`, seedar dados UUID reais de aulas/roteiros e validar login/progresso/reservas 100% Supabase mantendo fallback demo.
