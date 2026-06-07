# Brand Asset Extraction Report

## Source Reviewed

- PDF: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf` (3944694 bytes)
- Local extraction folder reviewed: `docs/brand/extracted/`.
- Preview/contact sheet generated in `docs/brand/extraction/`.
- Pages reviewed through text extraction: 1-12.
- Image previews reviewed from `docs/brand/extracted/` and `docs/brand/extraction/previews/`.
- Contact sheet reviewed: `docs/brand/extraction/contact-sheet.png`.

## Extraction Result

The current PDF contains MVP proposal content, Gamma-generated illustrations and UI mockups. It does not contain the official ECOTUCA/Perifa Ecotour logo pages, vector marks, positive/negative logo variants or brand prohibition pages described in the design prompt.

Because of that, no official logo was extracted from the PDF in this round. The generated files below are temporary presentation lockups using the official palette, created only to remove low-quality placeholders from the product UI while keeping future replacement simple.

## Method Used

- Text extracted with local Python/PDF tooling to identify document scope.
- Existing extracted images were reviewed visually.
- JPEG2000 page assets were converted to PNG previews for inspection.
- No clean vector/logo object was found.
- Temporary SVG lockups were created in `public/brand/official/svg/` and rendered to PNG with `scripts/extract-brand-assets.mjs`.
- Existing legacy paths in `public/brand/` were synchronized to the cleaner temporary assets so old placeholder art no longer appears in the UI.

## Generated Temporary Assets

- `public/brand/official/png/ecotuca-horizontal-tagline.png`
- `public/brand/official/png/ecotuca-horizontal.png`
- `public/brand/official/png/ecotuca-vertical-tagline.png`
- `public/brand/official/png/ecotuca-vertical.png`
- `public/brand/official/png/perifa-ecotour-horizontal.png`
- `public/brand/official/png/perifa-ecotour-vertical.png`
- `public/brand/official/png/simbolo-ecotuca.png`
- `public/brand/official/png/simbolo-perifa.png`

## Pending Official Assets

- Official ECOTUCA horizontal logo in SVG and transparent PNG.
- Official ECOTUCA vertical logo in SVG and transparent PNG.
- Official ECOTUCA symbol/PWA mark.
- Official ECOTUCA tagline lockup with approved wording.
- Official Perifa Ecotour horizontal and vertical logos.
- Official Perifa Ecotour symbol.
- Positive and negative variants approved for light and dark backgrounds.

## Usage Recommendation

- Use ECOTUCA as the main app/product brand in headers, login, student area, mobile demo and certificates.
- Use Perifa Ecotour as institutional/territorial signature in footers, public context blocks and route/tourism surfaces.
- Keep all logo images inside proportion-preserving containers. Never stretch, recolor, crop, outline, tilt, add effects or remove elements.
- Use the framed `tone="negative"` presentation in dark sections until official negative logos arrive.
- Do not use the generated temporary lockups for print, public launch, legal material or final brand delivery.
- Replace temporary assets before final public launch or printed material production.
