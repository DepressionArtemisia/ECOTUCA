# Accessibility Notes

## Improvements
- `EcoButton` now has visible focus outline using brand mint.
- Navigation links and route cards gained `focus-ring-brand` where appropriate.
- Touch targets in mobile bottom navigation and route/action buttons meet a practical 44px minimum.
- Logo component includes meaningful alt text and a fallback text lockup if image loading fails.
- Text over dark hero imagery uses a strong brown overlay and warm/yellow foreground.
- Form inputs in login, route filters and interest form have visible focus border states.

## Contrast Notes
- Dark theme uses `#3A1A16` as the base and warm/yellow/mint accents.
- Light theme uses warm background and dark brown text.
- Dark logo contexts now use extracted negative assets from manual page 11 when available.
- No CSS filter is used to invert or recolor the official logo assets.
- Temporary lockups are fallback only and may receive a warm contrast frame if a from-manual asset fails.

## Remaining Risk
- A formal WCAG audit has not been completed.
- Extracted PNG logos were checked in light/dark demo contexts, but final production vectors should receive a formal contrast and scaling pass.
