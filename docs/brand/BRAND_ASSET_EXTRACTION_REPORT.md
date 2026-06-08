# Brand Asset Extraction Report

## Date
- 2026-06-07, Round 6.

## Source Reviewed
- Canonical PDF: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`
- Original PDF name: `docs/brand/MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf`
- Contact sheet: `docs/brand/extraction/logo-contact-sheet.png`
- Extraction manifest: `docs/brand/extraction/extracted-assets.json`

## Manual Pages Used
- Page 4: Perifa Ecotour horizontal and vertical signatures.
- Page 5: ECOTUCA horizontal and vertical signatures, including subtitle versions.
- Page 6: ECOTUCA and Perifa symbols plus chromatic support applications.
- Page 11: positive/negative applications for dark backgrounds.

## Method
- The manual pages were rendered visually from the PDF, not recreated manually.
- `scripts/extract-brand-assets.mjs` runs an embedded PyMuPDF/Pillow extraction flow.
- Rendering scale: 4x PDF matrix, stored under `docs/brand/extraction/rendered-pages-hi/`.
- Crop method: relative page coordinates, so the script is independent from screen pixels.
- Transparency method:
  - White-background logo crops remove near-white pixels.
  - Negative crops remove near-black manual background.
  - Chromatic support symbols preserve the crop without recoloring.
- No AI upscale, recolor, CSS filter or manual logo redraw was used.

## Generated From-Manual Assets
| Asset | Source | Status | Recommended Use |
| --- | --- | --- | --- |
| `public/brand/official/from-manual/png/perifa-ecotour-horizontal-from-manual.png` | Page 4 | Approved for demo | Public footer, routes, institutional blocks |
| `public/brand/official/from-manual/png/perifa-ecotour-vertical-from-manual.png` | Page 4 | Approved for demo | Certificates, presentation blocks |
| `public/brand/official/from-manual/png/ecotuca-horizontal-tagline-from-manual.png` | Page 5 | Approved for demo | Home, login, demo, student/app contexts |
| `public/brand/official/from-manual/png/ecotuca-horizontal-logo-only-from-manual.png` | Page 5 | Approved for demo | Compact headers where subtitle becomes small |
| `public/brand/official/from-manual/png/ecotuca-vertical-tagline-from-manual.png` | Page 5 | Approved for demo | Hero, splash, certificate |
| `public/brand/official/from-manual/png/ecotuca-vertical-logo-only-from-manual.png` | Page 5 | Approved for demo | Mobile/PWA/card contexts |
| `public/brand/official/from-manual/png/perifa-symbol-from-manual.png` | Page 6 | Approved for demo | Institutional symbol, pattern support |
| `public/brand/official/from-manual/png/ecotuca-symbol-from-manual.png` | Page 6 | Approved for demo | PWA icon, favicon base, compact app mark |
| `public/brand/official/from-manual/png/perifa-negative-from-manual.png` | Page 11 | Temporary until vector official | Dark-background usage |
| `public/brand/official/from-manual/png/ecotuca-negative-from-manual.png` | Page 11 | Temporary until vector official | Dark-background usage |
| `public/brand/official/from-manual/png/ecotuca-symbol-yellow-brown-from-manual.png` | Page 6 | Support asset | Dark brand accents |
| `public/brand/official/from-manual/png/perifa-symbol-yellow-brown-from-manual.png` | Page 6 | Support asset | Dark brand accents |

Corresponding WebP files were generated under `public/brand/official/from-manual/webp/`. Source crops and previews are under `public/brand/official/from-manual/source-crops/` and `public/brand/official/from-manual/previews/`.

## Legacy Public Paths Updated
- `public/brand/logo-ecotuca-horizontal.png`
- `public/brand/logo-ecotuca-vertical.png`
- `public/brand/logo-perifa-horizontal.png`
- `public/brand/logo-perifa-vertical.png`
- `public/brand/symbol-ecotuca.png`
- `public/brand/symbol-perifa.png`

## PWA Icons
- `public/favicon.ico`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/apple-touch-icon.png`
- `public/brand/icon-192.png`
- `public/brand/icon-512.png`

## Temporary Assets Rebaixados
Round 5 lockups were moved/rebased to:
- `public/brand/temporary-lockups/png/`
- `public/brand/temporary-lockups/svg/`

They are fallback only and should not be presented as official logo artwork.

## Limitations
- The extracted PNGs are suitable for the meeting demo and web preview.
- They are still raster crops from a PDF page, not final production vectors.
- Negative variants are usable for dark UI, but should be replaced by official SVG/AI/PDF files for production.
- Final launch, print, legal documents and high-resolution collateral should use designer-approved vector assets.

## Recommendation
Use the extracted PNGs for the current presentation. Before production, request the final ECOTUCA and Perifa Ecotour brand package in SVG/AI/PDF, including positive, negative, symbol, horizontal and vertical variants.
