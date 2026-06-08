# STEP 18 - Round 8 Desktop, Cadastro And Sitemap

## Scope
- Branch created: `design/round-8-desktop-cadastro-sitemap`.
- No Supabase SQL, Auth user creation, Storage mutation or `.env.local` edit was performed.
- ToolSearch was used for Ruflo discovery; no Ruflo MCP tools were available in this Codex session.

## Implemented
- Added desktop editorial CSS utilities in `app/globals.css`: `desktop-editorial-grid`, `desktop-split-hero`, `desktop-sticky-aside`, `desktop-two-column-flow`, `desktop-feature-wall`, `desktop-sitemap-grid`, `desktop-form-shell`, `desktop-form-aside`, `premium-section`, `premium-page-header`, `premium-context-panel`, `premium-cta-band`.
- Upgraded `PublicShell` with complete nav, mobile details menu and richer footer links.
- Fixed `AppShell` role context so teacher, guide and tourist areas no longer show the Lucas/student context card.
- Added visual sitemap page at `/sitemap`, alias `/mapa-do-site`, and metadata route `/sitemap.xml`.
- Added institutional pages: `/como-funciona`, `/faq`, `/contato`, `/creditos-imagens`, `/termos`, `/privacidade`.
- Rebuilt `/cadastro` with role cards and decision flow.
- Rebuilt `/cadastro/aluno` and `/cadastro/professor` as multi-step client flows with review, confirm, save draft and clear draft.
- Added local draft keys `ecotuca:signup:student` and `ecotuca:signup:teacher`.
- Improved `/cadastro/guia` and `/cadastro/turista` with richer forms and context panels.
- Added richer desktop content to home, about, routes, demo, demo mobile, professor, guide, tourist and admin.
- Softened visible technical language outside `/demo/status`.

## Files Created
- `components/content/*`
- `components/forms/*`
- `components/layout/rich-page-header.tsx`
- `components/navigation/site-map-section.tsx`
- `features/signup/*`
- `lib/navigation/site-map.ts`
- `app/sitemap/page.tsx`
- `app/mapa-do-site/page.tsx`
- `app/sitemap.ts`
- `app/como-funciona/page.tsx`
- `app/faq/page.tsx`
- `app/contato/page.tsx`
- `app/creditos-imagens/page.tsx`
- `app/termos/page.tsx`
- `app/privacidade/page.tsx`
- `docs/design/ROUND_8_DESKTOP_UX_AUDIT.md`
- `docs/forms/SIGNUP_FLOW_SPEC.md`
- `docs/navigation/SITEMAP_STRUCTURE.md`

## Verification
- `npm run lint`: passed.
- `npm run build`: passed, 45 generated routes including `/sitemap.xml`.
- Browser route smoke: 27 required/new routes loaded with no application error, no console error and no horizontal overflow at default viewport.
- Responsive QA: 54 route/breakpoint checks across widths `320`, `360`, `390`, `414`, `768`, `1024`, `1280`, `1440`, `1920`; no horizontal overflow.
- Student signup: filled all steps, advanced, reviewed and confirmed successfully.
- Teacher signup: filled all steps, advanced, reviewed and confirmed successfully.
- Clear draft: `Limpar` returned to first step and cleared visible inputs.
- Login: demo login redirected to `/app/aluno`.
- Player: `Iniciar aula` advanced to `0:05` and changed to continuation state.
- Route interest: `/roteiros/serra-da-misericordia` submitted and showed updated presentation label.
- Demo reset: two-click reset confirmed and message appeared.
- Role context: `/app/professor`, `/app/guia`, `/app/turista` do not show the Lucas student card.

## Notes
- Production still needs official legal review for terms/privacy, final SVG/AI/PDF brand assets and real Supabase activation after approval.
- Build can hang on Windows if `next start` is still serving `.next`; stop the local server before rebuilding.
