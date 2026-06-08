# Vercel Site Deep Audit - Round 7

Base auditada: https://ecotuca.vercel.app

Data: 2026-06-08

## Resumo executivo
- O site publicado renderizava as rotas obrigatorias e a navegacao principal estava funcional.
- A identidade visual da Rodada 6 ja usava logos reais extraidos do manual.
- O principal risco de apresentacao era visual: muitas telas ainda pareciam depender de imagens mock e narrativa generica.
- Problemas objetivos encontrados: imagens sem `alt`, uso de `/mock/*` em roteiros/home/mobile, e erro de console React #418 em paginas hidratadas.
- Correcao planejada/aplicada localmente: imagens licenciadas, dados territoriais, cards com status de validacao, textos mais eticos e estabilizacao do `DataSourceBadge`.

## Auditoria por rota

| Rota | Classificacao antes da rodada | Problemas principais | Recomendacao aplicada |
| --- | --- | --- | --- |
| `/` | Boa, mas precisa de imagem real | Hero ainda usava imagem mock; mensagem boa, mas pouco territorial | Hero com imagem real do Complexo, CTA e badge de MVP navegavel |
| `/demo` | Funcional, mas generica | Parecia central de dev em alguns pontos; sem imagem territorial | Central executiva com fundo do territorio e fluxo narrativo |
| `/demo-mobile` | Boa, mas precisa de imagem real | Cards pequenos usavam mocks e alt vazio | PhoneMockup com imagens reais/licenciadas, status bar e alt |
| `/login` | Funcional | Login rapido bom para reuniao, mas sem contexto territorial | Mantido; sem mudanca estrutural nesta rodada |
| `/roteiros` | Funcional, mas generica | Cards com imagens mock, alt vazio, pouca validacao etica | Hero territorial, filtros, selos de validacao e imagens licenciadas |
| `/roteiros/serra-da-misericordia` | Precisa redesenho forte | Detalhe tinha galeria pequena, pouco contexto e linguagem operacional forte demais | Nova narrativa, galeria, por que importa, cuidados, acessibilidade e aviso etico |
| `/app/aluno` | Boa | Tela valiosa, mas faltava territorio real de apoio | Incluido territorio da semana e texto de progresso menos tecnico |
| `/app/aluno/aulas/aula-guia-01` | Boa | Player funcional, mas apoio pouco territorial | Texto virou aprendizado aplicado ao territorio |
| `/app/professor` | Funcional, mas generica | Professor parecia administrador de conteudo | Banner territorial e tom de facilitador |
| `/app/guia` | Funcional, mas generica | Guia precisava parecer protagonista do territorio | Banner territorial, badge e CTA de disponibilidade |
| `/app/turista` | Funcional, mas generica | Turista precisava de orientacao de hospitalidade/preparo | Banner real, cards de orientacao e preparo |
| `/app/admin` | Boa | Admin denso, mas podia ficar mais executivo | Banner territorial e bloco de indicadores para edital |
| `/app/admin/aprovacoes` | Funcional | Estado de carregamento simples; sem redesign completo nesta rodada | Mantido para nao arriscar fluxo |
| `/demo/status` | Boa para tecnico | Erro React #418 e labels tecnicos inevitaveis | Mantida discreta; status inicial estabilizado para hidracao |

## Problemas visuais encontrados
- Dependencia de `/mock/route-*.png` nas telas publicas e mobile.
- Algumas imagens com `alt=""` em cards relevantes.
- Roteiros pareciam publicados/operacionais demais para algo ainda demonstrativo.
- Admin e paginas internas tinham boa base, mas faltava imagem editorial discreta.

## Problemas de conteudo encontrados
- "Seguro simulado" aparecia em roteiro publico, o que podia quebrar confianca.
- Textos como "progresso salvo nesta demo" e "LocalStorage" ainda apareciam em superficie de cliente.
- Falta de aviso claro de validacao comunitaria para rotas sensiveis.

## Correcoes feitas localmente
- `RouteCard`, lista e detalhe agora usam `coverAlt`, status de validacao e imagens licenciadas.
- `TourRoute` ganhou narrativa longa, status, notas eticas, experiencia do visitante e cuidados.
- Home, demo, demo-mobile, aluno, professor, guia, turista e admin receberam imagens reais ou contexto territorial.
- `DataSourceBadge` deixou de renderizar `localStorageActive` como true no primeiro render, reduzindo risco de React #418.

## Pendencias
- Validar visualmente com Bruno em tela grande de apresentacao.
- Substituir qualquer imagem provisoria por fotos proprias/oficiais quando o projeto fornecer acervo.

## Verificacao pos-deploy da Rodada 7
- Deploy de producao: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.
- Alias publicado: `https://ecotuca.vercel.app`.
- Rotas verificadas com HTTP 200 apos deploy: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`.
- QA visual local antes do deploy: 126 combinacoes rota/viewport sem overflow horizontal real, sem imagem visivel quebrada e sem `alt` visivel ausente/vazio.
