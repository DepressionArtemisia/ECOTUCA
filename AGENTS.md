# ECOTUCA / Perifa Ecotour - Agent Instructions

## Mission
Build a professional, navigable MVP for ECOTUCA / Perifa Ecotour: an ecotourism learning platform and mobile-first route showcase connected to the Complexo do Alemao, youth training, Agenda 2030, sustainable tourism and income generation.

## Required Stack
- Next.js App Router, TypeScript and TailwindCSS.
- Local shadcn/ui-style primitives in `components/ui`.
- Supabase Auth, Database, Storage and RLS prepared in `supabase/`.
- React Hook Form, Zod, Lucide React, Recharts and mock fallback data.
- PWA manifest and mobile-first responsive UI.

## Brand Rules
- Mandatory colors: yellow `#FCC224`, coral `#E9635D`, blue `#335595`, orange `#FE9440`, dark brown `#3A1A16`, mint `#2ACCB5`.
- Do not create a generic blue/purple corporate interface.
- Do not distort, recolor, crop or recreate official logos incorrectly.
- If final logo files are not extractable, use documented placeholders and keep `public/brand` ready for official replacements.
- Visual direction: urban, peripheral, educational, technological, welcoming, colorful and premium.
- Headlines target Troika style: strong, urban, irregular and memorable.
- Body text target Lufga style: modern, rounded and readable.

## Code Rules
- Keep components small and feature-oriented.
- Use mock data from `lib/mock-data` when Supabase is unavailable.
- Keep Supabase access centralized through `lib/data/*` services wherever practical.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client components.
- Keep demo-only helpers, especially `DemoUserSwitcher`, restricted to `/demo`, `/login` or development context.
- Use `localStorage` fallback for video progress and session demo state.
- Update `STATUS.md`, `AI_HANDOFF.md`, `TASKS.md` and the relevant progress report after major changes.

## Ruflo Note
The upstream project instruction asks agents to use Ruflo MCP tools for complex multi-file work: `memory_store`, `memory_search`, `hooks_route`, `swarm_init`, `agent_spawn`. In this Codex session ToolSearch returned no Ruflo tools, so work proceeds locally and must stay documented.

## Definition Of Ready For This Round
- `npm run dev` starts the app.
- `/`, `/login`, `/demo`, `/demo-mobile`, `/app/aluno`, `/app/admin` and at least one route detail page render.
- Student journey, route showcase, admin metrics and video player are navigable with mock data.
- Supabase SQL, RLS and storage scripts exist.
- Brand manual is saved in `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.
- Documentation is updated enough for another AI or developer to continue.

## Round 5 Brand Implementation Note
- Use `components/brand/official-logo.tsx` for ECOTUCA/Perifa logo rendering.
- Current files in `public/brand/official/` are temporary lockups because the saved PDF lacks official logo vectors.
- Do not call those temporary lockups final official logos.
- Future agents should replace files in `public/brand/official/png` and `public/brand/official/svg` with approved designer assets while preserving filenames where possible.
