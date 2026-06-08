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
