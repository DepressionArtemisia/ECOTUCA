# Accessibility Notes

## Improvements
- `EcoButton` now has visible focus outline using brand mint.
- Navigation links and route cards gained `focus-ring-brand` where appropriate.
- Touch targets in mobile bottom navigation and route/action buttons meet a practical 44px minimum.
- Logo component includes meaningful alt text and a fallback text lockup if image loading fails.
- Text over dark hero imagery uses a strong brown overlay and warm/yellow foreground.
- Form inputs in login, route filters and interest form have visible focus border states.

## Contrast Notes
- Dark theme uses `#3A1A16` as the base and warm/yellow/mint accents.
- Light theme uses warm background and dark brown text.
- Dark logo contexts now use extracted negative assets from manual page 11 when available.
- No CSS filter is used to invert or recolor the official logo assets.
- Temporary lockups are fallback only and may receive a warm contrast frame if a from-manual asset fails.

## Remaining Risk
- A formal WCAG audit has not been completed.
- Extracted PNG logos were checked in light/dark demo contexts, but final production vectors should receive a formal contrast and scaling pass.
# Round 7 Accessibility Notes

## Melhorias feitas
- Imagens principais de Home, Roteiros, Detalhe, Demo Mobile, Aluno, Professor, Guia, Turista e Admin receberam `alt` descritivo.
- Cards de roteiro agora mostram status textual, nao apenas cor.
- Botao/links principais mantem foco visual via `focus-ring-brand`.
- Texto em cima de imagem usa overlay marrom/brand para contraste.
- Formulario de interesse mantem labels visiveis.
- QA visual final confirmou 126 combinacoes rota/viewport sem imagens visiveis com `alt` ausente/vazio.
- Interacoes principais foram acionadas por controles acessiveis no browser: tema, filtros, formulario, player, reset, login e logout.

## Pendencias
- Fazer teste manual completo de teclado em `/demo`, `/roteiros`, detalhe, formulario, player e reset.
- Criar pagina publica de creditos quando o projeto sair de MVP.
- Revisar contraste final apos validacao visual de Bruno.
