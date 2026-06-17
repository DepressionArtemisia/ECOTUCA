# STEP 24 - Admin Approvals Application Queue

Data: 2026-06-17.
Branch: `codex/production-learning-platform-start`.

## Objetivo
Conectar o painel administrativo de aprovacoes ao novo contrato de `signup_applications`, mantendo fallback seguro enquanto o SQL ainda nao foi aplicado.

## Implementado
- Criado `lib/data/signup-applications.ts` para leitura de `public.signup_applications`.
- `lib/data/admin.ts` agora retorna uma fila unificada de aprovacao:
  - primeiro tenta cadastros publicos em `signup_applications`;
  - se nao houver tabela/sessao/RLS, usa perfis pendentes ja existentes como fallback preparado.
- `features/admin/approval-queue.tsx` agora exibe:
  - origem `Cadastro publico` ou `Perfil pendente`;
  - telefone quando existir;
  - resumo/highlight do payload;
  - rótulos `Base conectada` ou `Fila preparada`.
- Textos visiveis antigos de fila de apresentacao foram removidos da tela.
- Acoes de aprovar/rejeitar para `signup_applications` ainda ficam preparadas/simuladas; promocao real para Auth/profile entra na proxima etapa.

## Validacao
- `npm run lint` passou.
- `npm run build` passou com 52 rotas.
- Browser QA em `http://127.0.0.1:3020/app/admin/aprovacoes`:
  - desktop e mobile sem overflow;
  - sem imagens quebradas;
  - sem erros de console;
  - com rótulos `Fila preparada`/`Base conectada` e `Cadastro publico`/`Perfil pendente`;
  - sem termo visivel `apresentacao` ou `MVP`.

## Nao feito nesta etapa
- Nenhuma aprovacao real de `signup_applications` foi gravada.
- Nenhum Auth user foi criado.
- Nenhuma promocao para `profiles` foi executada.

## Proximo passo recomendado
Criar server action administrativa para aprovar/rejeitar `signup_applications`, com audit log e criacao controlada de `auth.users` + `profiles`.
