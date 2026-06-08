# STEP 15 - Round 6 Real Logo Extraction

## 1. What Was Corrected
- The correct identity manual was confirmed in `docs/brand/`.
- Real ECOTUCA and Perifa Ecotour logos were extracted from rendered PDF pages instead of being recreated manually.
- Round 5 temporary lockups were moved/rebased to fallback-only storage.
- `OfficialLogo` now uses `from-manual` assets as the primary source.

## 2. Manual Pages Used
- Page 4: Perifa Ecotour horizontal and vertical.
- Page 5: ECOTUCA horizontal and vertical, with and without subtitle.
- Page 6: ECOTUCA and Perifa symbols plus chromatic support variants.
- Page 11: negative variants for dark backgrounds.

## 3. Generated Files
- PNGs: `public/brand/official/from-manual/png/`
- WebP: `public/brand/official/from-manual/webp/`
- Source crops: `public/brand/official/from-manual/source-crops/`
- Previews: `public/brand/official/from-manual/previews/`
- Contact sheet: `docs/brand/extraction/logo-contact-sheet.png`
- Manifest: `docs/brand/extraction/extracted-assets.json`
- Preview index: `docs/brand/ASSET_PREVIEW_INDEX.md`

## 4. Temporary Assets Rebaixados
- `public/brand/temporary-lockups/png/`
- `public/brand/temporary-lockups/svg/`

These remain fallback only and should not be treated as official logo artwork.

## 5. Where The Logos Were Applied
- ECOTUCA: public shell, home, demo, login, mobile demo, student app, lesson/player, professor/admin surfaces and PWA icons.
- Perifa Ecotour: route list/detail, guide/tourist contexts and public footer.

## 6. UI Fixes
- Fixed mobile logo sizing by keeping `OfficialLogo` proportion-preserving.
- Fixed 320px overflow in internal shells with a compact `DemoSessionPill`.
- Fixed 320px admin overflow by using `minmax(0, 1fr)` grids and `min-w-0` chart/card containers.
- Changed demo reset from blocking `window.confirm` to inline two-click confirmation.

## 7. Tests
- `npm run lint`: passed.
- `npm run build`: passed, 36 routes.
- Browser QA: 84 route/breakpoint combinations at 320, 390, 414, 768, 1024 and 1440 passed with no overflow, no broken images and `from-manual` logos detected.
- Interaction QA passed before reset refactor: theme toggle, login demo, logout, route interest form, player start and player reset.
- Reset flow was refactored to avoid the native confirm that blocked browser automation; `/demo` serves the inline confirmation flow.

## 8. Remaining Limitations
- Extracted PNGs are approved for demo and meeting presentation.
- Production still needs designer-approved SVG/AI/PDF vector files.
- Troika and Lufga real font files/licenses are still pending.
- Videos remain public placeholders.

## 9. Next Recommendation
Before production launch, request the final vector brand package, replace the extracted PNGs with official SVG/AI/PDF-derived assets, regenerate icons and run a formal visual/contrast pass.

## 10. Summary For Bruno
Rodada 6 corrigiu a identidade: o manual certo foi usado, as logos reais foram extraidas das paginas do PDF, os lockups temporarios viraram fallback, `OfficialLogo` agora usa os assets do manual, PWA/favicon foram atualizados e as telas principais passaram por QA responsivo. Para producao, ainda pedir SVG/AI/PDF oficial ao designer.
