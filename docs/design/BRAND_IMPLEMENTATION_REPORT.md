# Brand Implementation Report

## Round 7 Update - Territory And Images
- Brand manual rules remain mandatory: no recolor, no distortion, no fake logo effects.
- Territorial storytelling was added without changing official logos.
- Real/licensed images now support the brand system in Home, Routes, Demo Mobile and internal dashboards.
- Roteiros now show validation badges so the brand does not overpromise unvalidated operations.
- Image gap: Serra da Misericordia still needs official/proprietary photo coverage.

## Done
- Confirmed the correct manual in `docs/brand/MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf`.
- Copied the manual to `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf` for stable tooling.
- Extracted real ECOTUCA and Perifa Ecotour raster logos from manual pages 4, 5, 6 and 11.
- Generated PNG, WebP, source crop and preview files under `public/brand/official/from-manual/`.
- Generated `docs/brand/extraction/logo-contact-sheet.png` and `docs/brand/extraction/extracted-assets.json`.
- Moved/rebased Round 5 temporary lockups to `public/brand/temporary-lockups/`.
- Updated `components/brand/official-logo.tsx` so from-manual assets are preferred and temporary lockups are fallback only.
- Updated PWA/favicon files from the extracted ECOTUCA symbol.
- Applied ECOTUCA as the product/app brand and Perifa Ecotour as the territorial/institutional signature.

## Screens Using Real Extracted Logos
- `/`
- `/demo`
- `/demo/status`
- `/demo-mobile`
- `/login`
- `/roteiros`
- `/roteiros/serra-da-misericordia`
- `/guias/[id]`
- `/app/aluno`
- `/app/aluno/aulas/aula-guia-01`
- `/app/professor`
- `/app/guia`
- `/app/turista`
- `/app/admin`
- `/app/admin/aprovacoes`

## Asset Reality
The current logos are real assets cropped from the official identity manual pages, not manually recreated lockups. They are approved for the demo and meeting presentation.

They are still raster extractions from a PDF page. Production should use designer-supplied SVG/AI/PDF vector assets for final launch, print material and legal/institutional documents.

## Pending
- Human visual approval of `docs/brand/extraction/logo-contact-sheet.png`.
- Designer-approved vector package for final production.
- Confirm exact Troika and Lufga font licensing/files before bundling real fonts.
- Final WCAG contrast pass after vector assets are supplied.
