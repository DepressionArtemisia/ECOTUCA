# STEP 12 - Round 3 Supabase Integration

## 1. O que foi conectado ao Supabase
- Login em `/login` tenta Supabase Auth antes do fallback demo.
- `AuthProvider` carrega sessao Supabase quando existir e mantem demo localStorage quando nao existir.
- `EcoVideoPlayer` tenta salvar `lesson_progress` quando `user_id` e `lesson_id` sao UUIDs reais.
- `RouteInterestForm` tenta inserir em `route_bookings` quando existe `route_id` real.
- `ApprovalQueue` tenta listar e atualizar `profiles` pendentes.
- Upload professor tenta bucket `lesson-materials`.
- `/demo/status` checa configuracao/reachability sem exibir chaves.

## 2. O que ficou hibrido
- Auth: Supabase primeiro, demo depois.
- Progresso: localStorage sempre, Supabase quando IDs reais permitem.
- Reservas: Supabase quando route_id real existe, localStorage quando o roteiro e mock.
- Aprovacoes: Supabase com sessao admin real, simulacao local quando RLS/sessao bloqueiam.
- Uploads: Storage quando bucket/RLS permitem, simulacao para apresentacao.

## 3. O que ainda e mock
- Dashboards e metricas continuam com `lib/mock-data`.
- Aulas e roteiros atuais usam IDs mock, nao UUIDs reais.
- Videos sao placeholders publicos.
- Logos ainda dependem de assets finais oficiais.
- Persistencia 100% real depende de SQL aplicado, usuarios Auth reais e seed com UUIDs reais.

## 4. Scripts criados/alterados
- `scripts/create-demo-users.ts`: idempotente, com `--dry-run`, confirmacao e perfis especificos.
- `scripts/check-supabase.ts`: mantido como check seguro.
- `scripts/apply-supabase-schema.ts`: mantido para gerar `supabase/combined-apply.sql` sem aplicar automaticamente.

## 5. Como testar
1. Rodar `npm run lint`.
2. Rodar `npm run build`.
3. Rodar `NODE_OPTIONS=--use-system-ca npm run supabase:check`.
4. Rodar `npm run supabase:prepare-sql`.
5. Rodar `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run`.
6. Abrir `http://localhost:3020/demo`.
7. Abrir `/demo/status`.
8. Testar `/login` com aluno, admin e pendente.
9. Testar video em `/app/aluno/aulas/aula-guia-01`.
10. Testar interesse em `/roteiros/serra-da-misericordia`.
11. Testar `/app/turista/reservas`.
12. Testar `/app/admin/aprovacoes`.

Resultado desta rodada: os fluxos acima foram validados no navegador. Mobile 390x844 ficou sem overflow nas telas principais apos ajuste dos headers internos.

## 6. Como aplicar SQL
Nao foi aplicado automaticamente. Bruno deve revisar e aplicar no SQL Editor do Supabase:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/storage.sql`
4. `supabase/seed.sql`, revisando IDs quando necessario

Alternativa: revisar e colar `supabase/combined-apply.sql`.

## 7. Como criar usuarios reais
Depois do schema:

```bash
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users
```

O segundo comando pede para digitar `CRIAR USUARIOS ECOTUCA`. Use `--yes` somente em execucao consciente.

## 8. Riscos
- SQL ainda nao aplicado por seguranca.
- Usuarios Auth reais ainda nao criados.
- Roteiros e aulas precisam de UUIDs reais para sincronizar reservas/progresso no banco.
- RLS pode impedir leitura/mutacao quando nao houver sessao real admin/student/tourist.
- `next`/`postcss` ainda precisam de revisao de vulnerabilidades moderadas antes de deploy publico.

## 9. Proximo prompt recomendado
Aplicar SQL revisado, criar usuarios Auth reais com o script seguro, seedar aulas/roteiros com UUIDs reais e validar login/progresso/reservas 100% Supabase mantendo fallback demo.

## 10. Resumo para Bruno copiar
RESUMO PARA BRUNO COPIAR E ENVIAR AO CHATGPT - RODADA 3

Foi criada uma integracao Supabase hibrida sem quebrar a demo. O app agora tenta Supabase Auth no login e cai para usuarios demo se falhar. O player salva sempre em localStorage e tenta `lesson_progress` com IDs UUID reais. O formulario de roteiro tenta `route_bookings` e cai para localStorage. O admin tenta aprovar/rejeitar via `profiles` e simula localmente se RLS/sessao bloquear. O professor tem upload PDF preparado para `lesson-materials` com fallback de apresentacao.

Criamos `/demo/status`, `DataSourceBadge`, `lib/data/*`, `features/auth/*`, listagem hibrida de reservas e script `scripts/create-demo-users.ts` com `--dry-run`, confirmacao e idempotencia.

SQL nao foi aplicado automaticamente. Usuarios Auth reais nao foram criados. O dry-run de usuarios passou e mostrou que os 7 usuarios seriam criados. Testes executados: `npm run lint`, `npm run build`, `NODE_OPTIONS=--use-system-ca npm run supabase:check`, `npm run supabase:prepare-sql`, `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run` e varredura de tokens versionaveis.

Antes da apresentacao, abrir `http://localhost:3020/demo`, testar `/demo/status`, login demo aluno/admin/pendente, player, formulario de roteiro, reservas turista e aprovacoes admin. O proximo passo e aplicar SQL revisado, criar Auth users reais e seedar aulas/roteiros UUID para validar persistencia 100% Supabase.
