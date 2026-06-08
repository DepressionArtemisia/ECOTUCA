# Design System

## Round 7 Territory And Real Image Layer
- Public and route surfaces now use real/licensed territorial images cataloged in `lib/mock-data/media-assets.ts`.
- Image credits and licenses live in `docs/media/IMAGE_CREDITS.md` and `docs/media/IMAGE_LICENSES.md`.
- Route data now carries validation status, ethical notes, `coverAlt`, long narrative and visitor experience fields.
- Mandatory route badge language: `roteiro demonstrativo`, `validacao comunitaria` or `demo premium` until local validation is complete.
- Do not present Teleferico do Alemao as active tourism. It may appear only as memory/mobility context unless operation is officially validated.
- Do not use images of violence, police operations, poverty as visual appeal, or identifiable residents without consent.
- Known asset gap: a specific, licensed, high-quality Serra da Misericordia image still needs to be provided or approved.

## Brand Manual
PDF: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.

The correct manual also exists with its original file name: `docs/brand/MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf`.

Round 6 extracted real logo PNG assets from rendered manual pages:
- Page 4: Perifa Ecotour horizontal and vertical.
- Page 5: ECOTUCA horizontal/vertical, with and without subtitle.
- Page 6: ECOTUCA and Perifa symbols plus chromatic support symbols.
- Page 11: negative variants for dark backgrounds.

## Official Palette
- Brand yellow: `#FCC224`
- Brand coral: `#E9635D`
- Brand blue: `#335595`
- Brand orange: `#FE9440`
- Brand brown: `#3A1A16`
- Brand mint: `#2ACCB5`

## Typography
- Headlines: Troika target style, strong, urban, irregular and high-impact.
- Body/subtext: Lufga target style, modern, rounded and highly readable.
- Temporary fallback: display stack `Impact`, `Arial Black`, `Trebuchet MS`, sans-serif; body stack `Nunito Sans`, `Aptos`, `Segoe UI`, system-ui, sans-serif.
- Decision: no random font substitution. CSS variables allow swapping real Troika/Lufga files later.

## Logo Versions And Symbols
Required public paths:
- `public/brand/logo-perifa-horizontal.png`
- `public/brand/logo-perifa-vertical.png`
- `public/brand/logo-ecotuca-horizontal.png`
- `public/brand/logo-ecotuca-vertical.png`
- `public/brand/symbol-perifa.png`
- `public/brand/symbol-ecotuca.png`

These legacy public paths now point to real PNGs extracted from the manual:
- `public/brand/logo-perifa-horizontal.png`
- `public/brand/logo-perifa-vertical.png`
- `public/brand/logo-ecotuca-horizontal.png`
- `public/brand/logo-ecotuca-vertical.png`
- `public/brand/symbol-perifa.png`
- `public/brand/symbol-ecotuca.png`

Preferred app assets:
- `public/brand/official/from-manual/png/ecotuca-horizontal-tagline-from-manual.png`
- `public/brand/official/from-manual/png/ecotuca-horizontal-logo-only-from-manual.png`
- `public/brand/official/from-manual/png/ecotuca-vertical-tagline-from-manual.png`
- `public/brand/official/from-manual/png/ecotuca-vertical-logo-only-from-manual.png`
- `public/brand/official/from-manual/png/ecotuca-symbol-from-manual.png`
- `public/brand/official/from-manual/png/perifa-ecotour-horizontal-from-manual.png`
- `public/brand/official/from-manual/png/perifa-ecotour-vertical-from-manual.png`
- `public/brand/official/from-manual/png/perifa-symbol-from-manual.png`
- `public/brand/official/from-manual/png/ecotuca-negative-from-manual.png`
- `public/brand/official/from-manual/png/perifa-negative-from-manual.png`

Temporary lockups from Round 5 were rebaixados to `public/brand/temporary-lockups/` and are fallback only. Production should still request official SVG/AI/PDF vector files from the designer.

Round 2 update: headers and shells now reserve a clear logo/wordmark area so official PNG/SVG files can replace the placeholders without changing layout. The placeholder should remain typographic and restrained until official assets arrive.

Round 6 update: `components/brand/official-logo.tsx` centralizes ECOTUCA/Perifa brand usage, sizing, tone handling and fallback UI. It prefers `from-manual` PNGs and only falls back to `temporary-lockups` if an asset fails to load.

## Usage Rules
- Do not distort the logo.
- Do not recolor official marks.
- Do not remove logo elements.
- Do not add exaggerated shadows, glows or effects to the mark.
- Do not use CSS filters to invert, recolor or fake negative logo variants.
- Do not use generic blue/purple SaaS styling.
- Keep the brand colorful, territorial, educational, warm and premium.

## Light Theme
- Warm light background.
- White/off-white cards.
- Dark brown headings.
- Yellow, coral, mint, blue and orange as meaningful accents.

## Dark Theme
- Main background based on `#3A1A16`.
- Dark cards with subtle borders.
- Yellow, mint, coral and orange accents.
- Premium feel without losing peripheral energy.

## Web/App Application
- Public pages use broad brand gradients, territorial patterns and large touch-friendly cards.
- Internal dashboards are dense enough for work but still colorful and welcoming.
- Mobile UI uses bottom navigation, large cards, visible progress and clear route actions.
- Admin UI is professional with warm brand accents rather than cold generic enterprise styling.

## Components
Mandatory identity components: `PublicShell`, `AppShell`, `MobileShell`, `AdminShell`, `PhoneMockup`, `BrandPattern`, `BrandGradient`, `EcoButton`, `PerifaCard`, `TrackCard`, `RouteCard`, `GuideCard`, `StudentDashboard`, `AdminDashboard`, `EcoVideoPlayer`, `ThemeToggle`, `MobileBottomNav`.

## Round 2 Components
- `DemoSessionPill`: shows current demo profile, role, status and logout.
- `StudentJourneyMap`: shows student progress from approval to published route.
- `RouteBrowser`: search/filter route showcase.
- `RouteInterestForm`: localStorage route interest capture.
- `ApprovalQueue`: admin approval simulation with visual status.

## Round 5 Tokens And Utilities
- Brand colors: `brand-yellow`, `brand-coral`, `brand-blue`, `brand-orange`, `brand-brown`, `brand-mint`.
- Backgrounds: `background-warm`, `background-paper`, `background-dark`, `background-dark-soft`.
- Gradients: `gradient-sunrise`, `gradient-territory`, `gradient-forest`, `gradient-night`, `gradient-learning`, `gradient-tourism`.
- Shadows: `shadow-soft`, `shadow-card`, `shadow-premium`, `shadow-floating`, `shadow-mobile`.
- Utilities: `.brand-surface`, `.brand-card`, `.brand-card-hover`, `.brand-gradient-primary`, `.brand-gradient-dark`, `.brand-pattern-soft`, `.premium-glass`, `.mobile-safe-area`, `.touch-card`, `.focus-ring-brand`.

## Round 5 Typography Scale
- Display XL: hero/product statements.
- Display LG: page titles.
- H1/H2/H3: feature and dashboard hierarchy with `brand-display`.
- Eyebrow: uppercase small labels with coral/mint/yellow.
- Body LG/MD/SM: rounded readable body stack.
- Caption/Badge: high-contrast labels, not decorative filler.
