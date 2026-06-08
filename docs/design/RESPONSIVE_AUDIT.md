# Responsive Audit

## Breakpoints Reviewed
- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Adjustments Made
- Phone mockup now uses responsive height limits and an internal bottom navigation.
- Mobile bottom nav uses safe-area padding and active state styling.
- Headers keep compact logo mode for constrained widths.
- Cards use stable rounded surfaces, consistent padding and touch-friendly minimum heights.
- Route filters stack on mobile and expand on desktop.
- Hero typography is constrained with responsive Tailwind breakpoints instead of viewport-based font scaling.

## Critical Routes
- `/`
- `/demo`
- `/demo-mobile`
- `/login`
- `/roteiros`
- `/roteiros/serra-da-misericordia`
- `/app/aluno`
- `/app/aluno/aulas/aula-guia-01`
- `/app/admin`
- `/app/admin/aprovacoes`

## Pending Human Review
- Final official logo files may change intrinsic proportions and should be checked on 320px and 390px widths.
- Very long route titles should be reviewed after real content import.

## Round 5 Verification Result
- Desktop 1440px: all required presentation and role routes rendered without horizontal overflow.
- Mobile 390px: critical routes rendered without horizontal overflow.
- Mobile 320px: critical routes rendered without horizontal overflow after fixing responsive logo sizing, display text wrapping and long demo-user e-mail/password strings.
- No broken images detected in the checked routes.

## Round 6 Verification Result
- Checked 84 route/breakpoint combinations: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`.
- Breakpoints: 320, 390, 414, 768, 1024 and 1440.
- Result: no horizontal overflow, no broken images and `from-manual` logos detected.
- Fixes made during the audit: compacted `DemoSessionPill`, added `min-w-0`/mobile padding to brand/admin cards and changed admin chart grids to `minmax(0, 1fr)`.
# Round 7 Responsive Audit

Status: concluido no browser local de producao (`next start -p 3020`) apos `npm run build`.

| Viewport | Paginas testadas | Problemas encontrados | Correcoes feitas | Pendencias |
| --- | --- | --- | --- | --- |
| 320px | 14 rotas obrigatorias | Scanner visual apontou largura fixa no topo de `/demo-mobile`; sem scroll horizontal real | `PhoneMockup` recebeu `min-w-0`, titulo `text-4xl` no mobile e frame max `19rem` | Revisao humana em projetor/celular real |
| 360px | 14 rotas obrigatorias | Mesmo risco visual de `/demo-mobile` | Mesmo ajuste do `PhoneMockup` | Revisao humana |
| 390px | 14 rotas obrigatorias | Mesmo risco visual de `/demo-mobile` | Mesmo ajuste do `PhoneMockup` | Revisao humana |
| 414px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |
| 768px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |
| 1024px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |
| 1280px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |
| 1440px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |
| 1920px | 14 rotas obrigatorias | Nenhum overflow horizontal real | Layout mantido | Revisao humana |

Resultado geral: 126 combinacoes rota/viewport verificadas; sem overflow horizontal real (`scrollWidth` <= viewport), sem imagens visiveis quebradas e sem imagens visiveis com `alt` ausente/vazio. O scanner inicial detectou paths SVG decorativos da Home ultrapassando a viewport visualmente, mas sem gerar scroll horizontal; eles permanecem dentro de containers com overflow controlado.
