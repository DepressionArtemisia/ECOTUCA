# Design System

## Brand Manual
PDF: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.

The PDF confirms the ECOTUCA product story: learning platform, mobile app, student area, teacher/community area, admin dashboard and route showcase. The explicit brand update defines the visual identity tokens below.

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

If final files are not extractable, these are temporary placeholders and must be replaced by official PNG/SVG.

Current status: placeholders were generated in `public/brand` using the official palette and clearly marked as temporary. They are not final logos.

Round 2 update: headers and shells now reserve a clear logo/wordmark area so official PNG/SVG files can replace the placeholders without changing layout. The placeholder should remain typographic and restrained until official assets arrive.

## Usage Rules
- Do not distort the logo.
- Do not recolor official marks.
- Do not remove logo elements.
- Do not add exaggerated shadows, glows or effects to the mark.
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
