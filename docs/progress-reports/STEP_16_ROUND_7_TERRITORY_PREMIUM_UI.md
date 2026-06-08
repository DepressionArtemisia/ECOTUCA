# STEP 16 - Round 7 Territory, Real Images And Premium UI

## Objetivo
Auditar o site publicado, pesquisar territorio, criar banco de imagens licenciadas e aplicar uma camada de UI/UX mais territorial, etica e premium.

## Checkpoint
- Checkpoint criado antes da rodada: `3dd3b40 checkpoint: before deep design territory audit`.
- Branch: `design/territory-real-images-premium-ui`.
- SQL nao foi aplicado.
- Usuarios Auth reais nao foram criados.
- Service role nao foi tocada.

## Pesquisa e imagens
- Pesquisa territorial consolidada em `docs/research/COMPLEXO_ALEMAO_TERRITORY_RESEARCH.md`.
- Imagens reais/licenciadas catalogadas em `lib/mock-data/media-assets.ts`.
- Tipos criados em `types/media.ts`.
- Creditos/licencas documentados em `docs/media/*`.

## Redesign aplicado
- Home: hero com imagem real do Complexo, narrativa ECOTUCA/Perifa e secao Territorio Vivo.
- Demo: central executiva com fundo territorial e fluxo de apresentacao.
- Demo mobile: mockup com status bar, imagens reais nos cards e detalhe.
- Roteiros: cards com status de validacao, imagens reais e textos eticos.
- Detalhe de roteiro: galeria, por que importa, cuidados, acessibilidade e aviso de validacao local.
- Aluno: territorio da semana e texto de progresso menos tecnico.
- Professor: tom de facilitador e banner territorial.
- Guia: protagonismo do territorio e CTA de disponibilidade.
- Turista: orientacoes de preparo e hospitalidade.
- Admin: banner territorial e bloco Indicadores para edital.

## Auditoria
- `docs/design/VERCEL_SITE_DEEP_AUDIT.md` registra o estado do deploy anterior e recomendacoes aplicadas.
- Problemas encontrados: mocks de imagem, alt vazio, linguagem operacional demais e React #418 em paginas hidratadas.
- Correcao provavel do React #418: `DataSourceBadge`/status inicial nao renderiza `localStorageActive` como true no primeiro render.

## Testes
- `npm run lint`: passou no fechamento da rodada.
- `npm run build`: passou no fechamento da rodada, com 36 rotas geradas.
- Browser QA local: 126 combinacoes verificadas, cobrindo 14 rotas obrigatorias em 9 viewports (`320`, `360`, `390`, `414`, `768`, `1024`, `1280`, `1440`, `1920`).
- Resultado do QA: sem overflow horizontal real, sem imagens visiveis quebradas, sem imagens visiveis com `alt` ausente/vazio.
- Interacoes testadas: tema claro/escuro, demo mobile alternando telas, filtro de roteiro, formulario de roteiro, player iniciar/reiniciar, reset demo, login demo e logout.
- Ajuste feito apos QA: `PhoneMockup` recebeu `min-w-0`, titulo menor no menor mobile e frame mais compacto para 320px.
- Deploy Vercel: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`, production alias `https://ecotuca.vercel.app`.
- Verificacao remota: 14 rotas obrigatorias responderam HTTP 200 apos deploy.

## Pendencias
- Validar visualmente com Bruno as escolhas de imagem e se alguma foto deve ser substituida por acervo proprio.
- Conseguir imagem oficial/propria da Serra da Misericordia.
- Adicionar pagina publica de creditos de imagem em uma rodada futura.
