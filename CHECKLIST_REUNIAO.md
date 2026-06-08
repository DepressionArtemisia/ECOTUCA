# Checklist da Reuniao ECOTUCA

## Antes da reuniao
- [ ] Abrir `https://ecotuca.vercel.app/demo`.
- [ ] Deixar `https://ecotuca.vercel.app/demo-mobile` em uma segunda aba.
- [ ] Abrir terminal do projeto apenas se precisar do plano B local.
- [ ] Para plano B local: rodar `npm run start -- -p 3020` ou `npm run dev -- -p 3020`.
- [ ] Confirmar que a porta 3020 esta funcionando se usar local.
- [ ] Abrir `http://localhost:3020/demo` somente como backup.
- [ ] Testar `/demo-mobile`.
- [ ] Testar `/app/aluno`.
- [ ] Testar `/app/admin`.
- [ ] Testar `/roteiros/serra-da-misericordia`.
- [ ] Testar o player em `/app/aluno/aulas/aula-guia-01`.
- [ ] Testar o formulario de interesse.
- [ ] Fechar abas desnecessarias.
- [ ] Nao abrir `.env.local` durante compartilhamento.
- [ ] Deixar DevTools fechado.
- [ ] Deixar navegador em zoom adequado.
- [ ] Deixar `/demo` e `/demo-mobile` carregados como plano B.

## QA final ja realizado
- [x] Producao `https://ecotuca.vercel.app` respondeu em 14 rotas obrigatorias.
- [x] Local `http://localhost:3020` respondeu em 14 rotas obrigatorias.
- [x] Browser QA responsivo passou sem overflow horizontal real.
- [x] Imagens e logos passaram sem quebra critica.
- [x] Interacoes de apresentacao passaram.
- [x] `npm run lint` passou.
- [x] `npm run build` passou.

## Durante a reuniao
- [ ] Nao abrir terminal com secrets.
- [ ] Nao abrir Supabase com keys visiveis.
- [ ] Nao prometer pagamento online antes de validar regra.
- [ ] Nao dizer que app nativo ja esta pronto.
- [ ] Dizer que e web app/PWA em MVP navegavel.
- [ ] Mostrar valor, fluxo e tomada de decisao.
- [ ] Anotar duvidas e decisoes.
- [ ] Usar `/demo/status` apenas se pedirem contexto tecnico.

## Depois da reuniao
- [ ] Atualizar requisitos.
- [ ] Priorizar pendencias.
- [ ] Aplicar SQL se aprovado.
- [ ] Criar usuarios reais.
- [ ] Substituir logos e assets oficiais.
- [ ] Subir deploy temporario.
- [ ] Revisar LGPD, termos e autorizacoes.
# Round 8 Checklist
- [ ] Abrir `/demo`.
- [ ] Mostrar `/cadastro` e explicar perfis.
- [ ] Preencher rapidamente `/cadastro/aluno` ate revisao.
- [ ] Mostrar `/sitemap` como mapa do MVP.
- [ ] Mostrar `/como-funciona` para explicar jornada.
- [ ] Mostrar `/demo-mobile`.
- [ ] Mostrar `/roteiros/serra-da-misericordia` e formulario de interesse.
- [ ] Mostrar `/app/aluno`, aula e progresso.
- [ ] Mostrar `/app/professor`, `/app/guia`, `/app/turista` com contextos corretos.
- [ ] Mostrar `/app/admin` e `/app/admin/aprovacoes`.
- [ ] Fechar com pendencias: Supabase real, legal, operacao, assets finais.

# Round 9 Checklist
- [ ] Abrir `/cadastro` e explicar os quatro perfis.
- [ ] Preencher uma etapa de `/cadastro/aluno`.
- [ ] Mostrar `/cadastro/guia` ou `/cadastro/turista` para comprovar fluxo completo fora do aluno/professor.
- [ ] Abrir `/sitemap`, filtrar por `Reuniao` e copiar/abrir um link.
- [ ] Mostrar `/app/professor/conteudos` com estados de rascunho/curadoria/publicacao.
- [ ] Mostrar `/app/guia` e `/app/turista` com estados operacionais.
- [ ] Reforcar que cadastros ainda sao visuais/locais, sem usuario real e sem escrita no Supabase.
