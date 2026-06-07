# Presentation Mode

## Rota principal
Abrir `http://localhost:3020/demo`.

## Roteiro de fala para Bruno
1. "Esta é a ECOTUCA, uma escola de ecoturismo conectada à Perifa Ecotour."
2. Abrir home pública e mostrar missão: juventude, território, Agenda 2030, renda e impacto.
3. Abrir `/demo-mobile` e dizer que o produto já nasce mobile-first/PWA.
4. Mostrar roteiro turístico e explicar a ponte entre guia formado e turista.
5. Abrir `Serra da Misericordia` e preencher/enviar interesse.
6. Entrar como aluno e mostrar `Olá, Lucas`, progresso, badges e jornada.
7. Abrir uma trilha e uma aula.
8. Mostrar o video player com retomada: `Voce parou em...`.
9. Entrar como professor e mostrar acompanhamento pedagógico.
10. Entrar como guia e mostrar agenda/roteiros vinculados.
11. Entrar como admin e mostrar aprovações, métricas, gráficos e CSV.
12. Fechar explicando que Supabase real já tem SQL/scripts e que o MVP mantém fallback mock para não quebrar.

## Usuarios demo
Senha de todos: `Demo@123456`.

- Aluno: `aluno@ecotuca.local`
- Professor: `professora@ecotuca.local`
- Guia: `guia@ecotuca.local`
- Turista: `turista@ecotuca.local`
- Admin: `admin@ecotuca.local`
- Super Admin: `bruno@ecotuca.local`
- Pendente: `pendente@ecotuca.local`

## O que dizer sobre real/mock
- Real: app Next.js, rotas, design system, PWA, Supabase env e scripts.
- Mock/local: login, perfil demo, métricas, reservas e progresso localStorage.
- Pendente: aplicar SQL, criar Auth users reais e conectar mutações.

## Ordem mais segura
`/demo` -> `/` -> `/demo-mobile` -> `/roteiros/serra-da-misericordia` -> `/app/aluno` -> `/app/aluno/aulas/aula-guia-01` -> `/app/professor` -> `/app/admin`.

## Atualizacao Rodada 3
- Antes ou depois do fluxo principal, abrir `/demo/status` para mostrar a integracao hibrida sem expor chaves.
- Real: app Next.js, rotas, design system, PWA, Supabase env, scripts, login hibrido e status tecnico.
- Hibrido: login, progresso, reservas, aprovacoes e upload tentam Supabase e caem para fallback.
- Mock/local: dashboards/metricas, IDs mock de aulas/roteiros, videos placeholders e dados de apresentacao.
- Pendente: aplicar SQL revisado, criar Auth users reais e seedar aulas/roteiros com UUIDs reais.
- Ordem sugerida atualizada: `/demo` -> `/demo/status` -> `/` -> `/demo-mobile` -> `/roteiros/serra-da-misericordia` -> `/app/aluno` -> `/app/aluno/aulas/aula-guia-01` -> `/app/professor` -> `/app/admin`.
