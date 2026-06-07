# STEP 04 - Database Supabase

## 1. O que foi feito
Schema, seed, RLS, storage e README Supabase criados.

## 2. Arquivos criados/alterados
`supabase/schema.sql`, `supabase/seed.sql`, `supabase/rls.sql`, `supabase/storage.sql`, `supabase/README.md`, `lib/supabase/client.ts`, `lib/supabase/admin.ts`.

## 3. Funcionalidades prontas
Modelagem para perfis, trilhas, aulas, progresso, certificados, roteiros, reservas, forum, notificacoes, metricas, media e configuracoes.

## 4. Funcionalidades mockadas
Frontend ainda consome `lib/mock-data`.

## 5. Funcionalidades conectadas ao Supabase
Clientes preparados, mas sem queries reais em tela.

## 6. Pendencias
Aplicar SQL em ambiente dev, criar Auth users e ajustar seed aos IDs reais.

## 7. Erros encontrados
Nenhum erro de SQL executado porque os scripts nao foram aplicados remotamente.

## 8. Como testar
Revisar scripts e aplicar em Supabase dev na ordem do README.

## 9. Proximo prompt recomendado
Conectar login/cadastro e progresso de aula ao Supabase.

## 10. Resumo curto para Bruno copiar
Banco Supabase esta modelado em SQL, com RLS e buckets prontos para revisao/aplicacao.
