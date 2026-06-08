# Font Usage And License

## Manual Direction
- Headlines: Troika.
- Text/subtext: Lufga.

## Current Repository Status
Round 9 checked:

- `public/fonts/`
- `app/fonts/`
- `assets/fonts/`
- `docs/brand/fonts/`
- `docs/brand/`

No `.ttf`, `.otf`, `.woff` or `.woff2` Troika/Lufga files were found.

## Current Implementation
- The app uses CSS variables in `app/globals.css`.
- `--font-headline` currently falls back to `Impact`, `Arial Black`, `Trebuchet MS`, `sans-serif`.
- `--font-body` currently falls back to `Nunito Sans`, `Aptos`, `Segoe UI`, `system-ui`, `sans-serif`.
- Utility classes are available: `.font-headline`, `.font-body`, `.text-display-xl`, `.text-display-lg`, `.text-section-title`, `.text-card-title`, `.text-body-readable`.

## Production Requirement
Before public launch, request licensed official files from the brand/design owner:

- Troika headline font file and license terms.
- Lufga text family files and license terms.
- Permission scope for web/PWA embedding.
- Whether self-hosting is allowed.

## Future Wiring
When official files arrive:

1. Place files in `public/fonts/` or `app/fonts/`.
2. Create `lib/fonts.ts` or `app/fonts.ts` using `next/font/local`.
3. Map Troika to `--font-headline`.
4. Map Lufga to `--font-body`.
5. Re-run accessibility and responsive QA.

No unlicensed font downloads were used in Round 9.
