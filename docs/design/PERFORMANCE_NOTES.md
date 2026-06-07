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
- Temporary logo PNGs should be replaced by optimized official SVG/PNG assets before public launch.

## Build Considerations
- If official assets are much larger, optimize before replacing the current files.
- Avoid large background video or heavy blur layers before the presentation build.
