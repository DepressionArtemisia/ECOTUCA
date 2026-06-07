# Logo Usage Strategy

## Brand Hierarchy
- ECOTUCA is the main product/app brand because the MVP is the Escola de Ecoturismo platform.
- Perifa Ecotour is the institutional, territorial and tourism signature.
- The current PDF does not include official logo artwork. The app uses temporary palette-faithful lockups until designer-approved files arrive.

## Contexts
- Public header: ECOTUCA horizontal. On narrow/mobile surfaces use the ECOTUCA symbol.
- Home hero: ECOTUCA tagline lockup, with Perifa Ecotour referenced in copy and route sections.
- App/internal area: compact ECOTUCA horizontal in sidebars and ECOTUCA symbol on mobile headers.
- Admin: ECOTUCA in the shell and command-center hero.
- Demo: ECOTUCA as the main app brand, with Perifa Ecotour as the tourism/territory signature.
- Routes: Perifa Ecotour horizontal lockup in the route showcase and detail hero.
- Guide/tourist surfaces: Perifa Ecotour signature plus ECOTUCA route/product actions.
- PWA icon: ECOTUCA symbol.
- Certificates/future documents: ECOTUCA plus Perifa Ecotour in a balanced lockup, never stretched or recolored.

## Light And Dark Use
- Light backgrounds: color lockup directly on warm/off-white surfaces.
- Dark backgrounds: logo is placed inside a warm contrast frame through `OfficialLogo` with `tone="negative"` until official negative assets arrive.
- Never apply glow, outline, skew, rotation, recolor, crop or non-proportional scaling.

## Replacement Path
- Replace files in `public/brand/official/png/` and `public/brand/official/svg/`.
- Keep filenames stable so `components/brand/official-logo.tsx` does not need layout changes.
- After replacement, regenerate icons if the ECOTUCA symbol changes.
