# Logo Usage Strategy

## Round 7 Note
- Keep official logos from `public/brand/official/from-manual/png/` as the only preferred logo source.
- Territory photos must support the logo, not compete with it: use overlays from brand brown/yellow/mint and keep logo contrast high.
- Do not place the logo over busy photo areas without a dark/light contrast layer.
- Do not recolor logos to match photos.

## Brand Hierarchy
- ECOTUCA is the main product/app brand for the learning platform, login, student area, dashboards, video player and PWA.
- Perifa Ecotour is the institutional, territorial and tourism signature for routes, guides, tourist surfaces, public footer and territory storytelling.
- Use assets from `public/brand/official/from-manual/png/` first. Temporary Round 5 lockups in `public/brand/temporary-lockups/` are fallback only.

## Contexts
- Public header: ECOTUCA horizontal logo-only when space is tight; tagline version can be used in hero or larger brand blocks.
- Home hero: ECOTUCA with subtitle, plus Perifa Ecotour as institutional/territorial support.
- App/internal area: ECOTUCA compact signature in shells, with the symbol on constrained mobile surfaces.
- Admin: ECOTUCA as small product signature; content hierarchy should prioritize the operational panel.
- Demo: ECOTUCA as the app brand; Perifa Ecotour appears in route/tourism blocks.
- Routes: Perifa Ecotour horizontal logo in list/detail surfaces.
- Guide/tourist surfaces: Perifa Ecotour signature with ECOTUCA learning/product actions.
- PWA icon: ECOTUCA symbol extracted from page 6.

## Light And Dark Use
- Light backgrounds: use the color extracted logo directly on warm/off-white surfaces.
- Dark backgrounds: use extracted negative assets from page 11 when available.
- If a negative asset fails, `OfficialLogo` may fall back to a temporary lockup inside a warm contrast frame.
- Never apply CSS filters, artificial inversion, recoloring, glow, outline, skew, rotation, crop or non-proportional scaling to the official mark.

## Component Rules
- Use `components/brand/official-logo.tsx` for ECOTUCA and Perifa logo rendering.
- Keep `object-contain`, intrinsic dimensions and proportion-preserving containers.
- Use `tagline={true}` or `variant="tagline"` only when the subtitle remains readable.
- Use logo-only variants for compact headers and mobile shells.

## Replacement Path
- Preferred current source: `public/brand/official/from-manual/png/`.
- Fallback source: `public/brand/temporary-lockups/`.
- Legacy public paths in `public/brand/` are synchronized for compatibility.
- For production, replace raster crops with designer-approved SVG/AI/PDF vector files and regenerate PWA icons if the ECOTUCA symbol changes.
