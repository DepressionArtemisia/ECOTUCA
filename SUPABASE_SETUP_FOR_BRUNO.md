# Supabase Setup For Bruno

## Objetivo
Preparar o Supabase real sem quebrar o MVP. O app continua funcionando com mock fallback mesmo antes do banco estar aplicado.

## 1. Verificar variaveis locais
No terminal do projeto:

```bash
npm run supabase:check
```

O comando confirma se `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` existem e se o Auth Admin responde. Ele nao imprime segredos.

## 2. Preparar SQL combinado

```bash
npm run supabase:prepare-sql
```

Esse comando gera:

```text
supabase/combined-apply.sql
```

Ele nao aplica SQL automaticamente. Isso e intencional para evitar mudancas destrutivas.

## 3. Aplicar no SQL Editor do Supabase
No painel Supabase, abra SQL Editor e rode nesta ordem:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/storage.sql`
4. Criar usuarios Auth
5. `supabase/seed.sql`, ajustando IDs se necessario

Alternativa: revisar e colar `supabase/combined-apply.sql`.

## 4. Conferir usuarios Auth demo sem alterar nada
Depois que `schema.sql` ja existir no banco, rode primeiro:

```bash
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run
```

Esse modo lista se cada usuario seria criado ou atualizado. Ele nao cria Auth users, nao altera senha e nao atualiza `profiles`.

## 5. Criar usuarios Auth demo de verdade
Somente depois de revisar o dry-run e confirmar que o schema existe:

```bash
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users
```

O script vai pedir para digitar `CRIAR USUARIOS ECOTUCA`. Em automacao consciente, tambem aceita:

```bash
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --yes
```

Usuarios:
- `admin@ecotuca.local`
- `bruno@ecotuca.local`
- `professora@ecotuca.local`
- `aluno@ecotuca.local`
- `pendente@ecotuca.local`
- `guia@ecotuca.local`
- `turista@ecotuca.local`

Senha demo para todos: `Demo@123456`.

O script e idempotente: se o usuario ja existir, atualiza metadata/profile; se nao existir, cria. Ele tambem cria/atualiza `student_profiles`, `teacher_profiles`, `guide_profiles` e `tourist_profiles` quando aplicavel.

## 6. Seed
O arquivo `supabase/seed.sql` usa UUIDs fixos e pode precisar ser adaptado aos IDs reais criados pelo Auth. O script `npm run supabase:create-demo-users` cria ou atualiza `profiles` com os IDs reais, entao prefira usar esse script para usuarios.

## 7. Verificar
- Rodar `npm run supabase:check`.
- Abrir Supabase Table Editor e confirmar `profiles`.
- Abrir o app em `http://localhost:3020/demo`.
- Abrir `/demo/status` e confirmar que nao ha chaves reais na tela.
- Testar `/login` com os e-mails acima.
- Testar video em `/app/aluno/aulas/aula-guia-01`.
- Testar interesse em `/roteiros/serra-da-misericordia`.

## 8. Erros comuns
- `relation "profiles" does not exist`: rode `schema.sql` antes do script de usuarios.
- `row-level security`: verifique `rls.sql`.
- `bucket already exists`: seguro se o bucket ja foi criado.
- Usuario Auth ja existe: o script tenta reaproveitar o usuario existente.

## 9. O que ja esta hibrido
- Login tenta Supabase Auth e cai para demo.
- Player salva localStorage e tenta `lesson_progress` com IDs UUID reais.
- Formulario de roteiro tenta `route_bookings`, mas roteiros mock sem UUID ficam locais.
- Admin aprovacoes tenta `profiles`, mas depende de sessao real admin/super_admin.
- Upload professor tenta bucket `lesson-materials` e cai para simulacao.

## 10. O que ainda exige dados reais
Para persistencia 100% Supabase, aulas e roteiros precisam existir com UUIDs reais e os usuarios Auth precisam ter `profiles` correspondentes.
