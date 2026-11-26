# STEP 23 - Signup Server Action Prep

Data: 2026-06-17.
Branch: `codex/production-learning-platform-start`.

## Objetivo
Preparar o funil de cadastro para producao com uma action server-side comum, mantendo o preview sem escrita real no Supabase.

## Implementado
- Criada action `app/actions/signup-application.ts`.
- O componente `features/signup/multistep-signup-flow.tsx` agora chama a action no envio final.
- Os fluxos de aluno, professor, guia e turista passam `applicationRole` para a action.
- `.env.example` ganhou `ENABLE_SUPABASE_SIGNUP_WRITES`.
- `supabase/schema.sql` ganhou a tabela `public.signup_applications`.
- `supabase/rls.sql` ganhou RLS e policy administrativa para `signup_applications`.
- `supabase/combined-apply.sql` foi regenerado com `npm run supabase:prepare-sql`.

## Comportamento
- Por padrao, `ENABLE_SUPABASE_SIGNUP_WRITES` fica vazio/desligado.
- Nesse modo, a action valida o payload e retorna `mode: prepared`, sem chamar Supabase.
- Para escrita real futura, configurar `ENABLE_SUPABASE_SIGNUP_WRITES=true` em ambiente server-side e aplicar antes o SQL revisado.
- A action usa service role apenas no servidor via `createSupabaseAdminClient`; nada disso roda em client component.

## Validacao
- `npm run supabase:prepare-sql` passou e nao aplicou SQL automaticamente.
- `npm run lint` passou.
- `npm run build` passou com 52 rotas.
- Browser QA em `http://127.0.0.1:3020/cadastro/aluno` no mobile:
  - validacao de campos obrigatorios apareceu ao tentar avancar vazio;
  - primeira etapa preenchida avancou para `Interesse e vinculo`;
  - sem overflow, sem imagens quebradas e sem erros de console.
- Smoke test direto da action retornou `ok: true` e `mode: prepared`, confirmando que nao houve escrita real sem flag.

## Nao feito nesta etapa
- SQL nao foi aplicado no Supabase.
- Nenhum usuario Auth real foi criado.
- Nenhum e-mail transacional foi enviado.
- Admin ainda nao le `signup_applications`; isso fica para a proxima fatia.

## Proximo passo recomendado
Conectar `/app/admin/aprovacoes` a `signup_applications` em modo leitura/curadoria e desenhar a promocao aprovada para `auth.users` + `profiles`.
