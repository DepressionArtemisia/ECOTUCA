# Presentation Mode

## Rota principal
Abrir `https://ecotuca.vercel.app/demo`.

Backup local: `http://localhost:3020/demo` se a internet da reuniao falhar ou se for necessario apresentar offline.

## QA final - 2026-06-08
- Producao validada em `https://ecotuca.vercel.app`.
- Deploy validado: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.
- 14 rotas obrigatorias responderam HTTP 200 em producao e local.
- Browser QA de producao: 56 checks responsivos sem overflow horizontal real, sem imagem quebrada, sem alt ausente e sem termo proibido em tela de cliente.
- Interacoes testadas: tema, login aluno/admin, logout, player, formulario, filtro, reset, demo mobile e aprovacoes admin.
- `npm run lint` e `npm run build` passaram.

## Freeze Rodada 4
- Comecar em `/demo`.
- Usar o card `Comece por aqui`.
- Se precisar limpar a apresentacao, usar `Limpar apresentacao`, que limpa apenas chaves locais ECOTUCA.
- Evitar terminal, `.env.local`, Supabase keys e DevTools durante compartilhamento.
- Deixar claro: MVP navegavel local, web app/PWA, com base pronta para proxima etapa.

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

## Arquivos de apoio
- `ROTEIRO_DE_APRESENTACAO.md`
- `CHECKLIST_REUNIAO.md`
- `PERGUNTAS_REUNIAO_PRIORITARIAS.md`
- `RELATORIO_PENDENCIAS_POS_REUNIAO.md`
- `TESTE_FINAL_15_MIN.md`
- `PLANO_B_APRESENTACAO.md`
- `RESUMO_EXECUTIVO_MVP.md`

## Atualizacao Rodada 5 - Design
- A apresentacao agora usa `OfficialLogo` com logos reais extraidas do manual correto em `public/brand/official/from-manual/png/`.
- Explicar com cuidado: os assets atuais sao recortes reais do manual e estao aprovados para demo, mas producao ainda deve receber SVG/AI/PDF oficial do designer.
- Comecar por `/demo`, abrir home, mostrar `/demo-mobile`, roteiro, aluno, aula/player e admin.
- O reset da apresentacao agora usa confirmacao inline: `Limpar apresentacao` e depois `Confirmar limpeza`.

## Atualizacao Rodada 3
- Antes ou depois do fluxo principal, abrir `/demo/status` para mostrar a integracao hibrida sem expor chaves.
- Real: app Next.js, rotas, design system, PWA, Supabase env, scripts, login hibrido e status tecnico.
- Hibrido: login, progresso, reservas, aprovacoes e upload tentam Supabase e caem para fallback.
- Mock/local: dashboards/metricas, IDs mock de aulas/roteiros, videos placeholders e dados de apresentacao.
- Pendente: aplicar SQL revisado, criar Auth users reais e seedar aulas/roteiros com UUIDs reais.
- Ordem sugerida atualizada: `/demo` -> `/demo/status` -> `/` -> `/demo-mobile` -> `/roteiros/serra-da-misericordia` -> `/app/aluno` -> `/app/aluno/aulas/aula-guia-01` -> `/app/professor` -> `/app/admin`.
# Round 7 Presentation Note
- Open with the new Home hero and say the app now connects formacao, territorio and ecoturismo with real territorial imagery.
- Explain that routes are intentionally marked as demonstrative/validation mode to avoid promising unvalidated operations.
- Show `/demo-mobile` after Home to prove the MVP can feel like a real installed app.
- Show `/roteiros/serra-da-misericordia` and highlight "Por que este roteiro importa" and "Validacao e cuidado".
- Close in `/app/admin` with "Indicadores para edital".
# Round 8 Presentation Addendum
- Start at `/demo`.
- New recommended sequence: Home, Cadastro Aluno, Demo Mobile, Roteiro, Aluno, Aula, Professor, Guia, Admin, Sitemap.
- Use `/sitemap` as the backup navigation map if the presenter gets lost.
- Use `/cadastro/aluno` and `/cadastro/professor` to show complete onboarding without claiming real account creation.
- Keep `/demo/status` for technical backup only.
