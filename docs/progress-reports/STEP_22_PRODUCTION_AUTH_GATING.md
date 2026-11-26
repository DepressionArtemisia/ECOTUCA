# STEP 22 - Production Auth Gating

Data: 2026-06-17.
Branch: `codex/production-learning-platform-start`.

## Objetivo
Preparar a plataforma real de ensino para diferenciar preview local de producao, sem aplicar SQL, sem criar usuarios Auth reais e sem editar chaves.

## Implementado
- Criado `lib/auth/runtime.ts` com flags publicas de ambiente:
  - `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK`
  - `NEXT_PUBLIC_ACCESS_CONTROL_MODE`
  - `NEXT_PUBLIC_ALLOW_DEMO_SESSION_IN_PRODUCTION`
- Criado `lib/auth/access-policy.ts` com regras centralizadas por rota interna:
  - aluno: `/app/aluno`
  - professor: `/app/professor`
  - guia: `/app/guia`
  - turista: `/app/turista`
  - admin: `/app/admin`
  - area interna comum: `/app/perfil`, `/app/configuracoes`, `/app/notificacoes` e similares.
- Criado `features/auth/app-access-guard.tsx`.
- `AppShell` e `AdminShell` agora passam o conteudo interno pelo `AppAccessGuard`.
- `AuthProvider` agora respeita `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`; nesse modo, se nao houver sessao Supabase, o usuario fica nulo em vez de receber automaticamente um usuario demonstrativo.
- `loginWithSupabaseOrDemo` deixa de aceitar fallback demonstrativo quando `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`.
- `.env.example` documenta as flags de producao sem conter segredos.

## Comportamento
- Preview local padrao: continua navegavel com fallback demonstrativo, preservando QA e apresentacao.
- Producao desejada:
  - `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true`
  - `NEXT_PUBLIC_ACCESS_CONTROL_MODE=enforce`
  - `NEXT_PUBLIC_SHOW_DEMO_CONTROLS=false`
- Com `ACCESS_CONTROL_MODE=enforce`, areas internas exibem bloqueio profissional para usuario sem sessao, perfil incorreto, status nao aprovado ou sessao demonstrativa nao permitida.

## Nao feito nesta etapa
- Nenhum SQL foi aplicado.
- Nenhum usuario Supabase Auth real foi criado.
- Nenhuma mutation de signup/aprovacao/atividade foi conectada.
- Nenhum token foi documentado.

## Validacao
- `npm run lint` passou.
- `npm run build` passou com 52 rotas.
- Smoke test local de `getAccessDecision` passou:
  - aluno aprovado acessa `/app/aluno`.
  - aluno aprovado nao acessa `/app/admin`.
  - admin aprovado acessa `/app/admin`.
  - aluno pendente nao acessa `/app/aluno`.
  - aluno pendente acessa `/app/aguardando-aprovacao`.
- Browser QA em `http://127.0.0.1:3020` passou em desktop e mobile para `/`, `/app/aluno`, `/app/admin`, `/entrar` e `/sitemap`.
- Resultado browser: sem bloqueio indevido no preview, sem overflow horizontal, sem imagens quebradas, sem erros de console e sem sinais visiveis de demo/MVP/apresentacao nas rotas verificadas.

## Proximo passo recomendado
Conectar cadastro/aprovacao a server actions Supabase depois de revisar schema, RLS, LGPD e e-mails transacionais.
