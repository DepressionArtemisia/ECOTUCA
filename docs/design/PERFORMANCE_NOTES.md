# Performance Notes

## Kept Lightweight
- No new runtime libraries were added.
- Brand graphics are SVG/PNG assets generated locally and served from `public/brand`.
- Logos use `next/image` through `OfficialLogo`.
- Visual polish relies on Tailwind/CSS utilities, not heavy animation packages.
- Motion is limited to short hover/focus transitions.

## Image Notes
- The PDF extraction previews remain in `docs/brand/extraction/` for documentation, not app runtime.
- Route imagery still uses existing mock images in `public/mock`.
- Logo runtime assets now come from real extracted PNGs under `public/brand/official/from-manual/png/`.
- Temporary Round 5 lockups remain in `public/brand/temporary-lockups/` as fallback only.

## Build Considerations
- If production vector/raster assets are supplied later, optimize before replacing the current files.
- Avoid large background video or heavy blur layers before the presentation build.
