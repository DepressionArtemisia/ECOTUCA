# ECOTUCA / Perifa Ecotour

Professional navigable MVP for an ecotourism school and mobile route showcase connected to youth training, sustainable tourism, Agenda 2030 and impact reporting in the Complexo do Alemao.

## Round 7 Territory UI
- Public site audited at `https://ecotuca.vercel.app`.
- Territory research: `docs/research/COMPLEXO_ALEMAO_TERRITORY_RESEARCH.md`.
- Image credits/licensing: `docs/media/IMAGE_CREDITS.md` and `docs/media/IMAGE_LICENSES.md`.
- Media catalog: `lib/mock-data/media-assets.ts`.
- Routes now include validation status and ethical notes before any operation is treated as final.

## Commands
```bash
npm install
npm run dev -- -p 3020
npm run lint
npm run build
```

## Key Routes
- `/`
- `/demo`
- `/demo/status`
- `/demo-mobile`
- `/login`
- `/cadastro`
- `/cadastro/aluno`
- `/cadastro/professor`
- `/cadastro/guia`
- `/cadastro/turista`
- `/sitemap`
- `/mapa-do-site`
- `/como-funciona`
- `/faq`
- `/contato`
- `/creditos-imagens`
- `/termos`
- `/privacidade`
- `/app/aluno`
- `/app/professor`
- `/app/guia`
- `/app/turista`
- `/app/admin`
- `/roteiros/serra-da-misericordia`

## Presentation Freeze
Start at [http://localhost:3020/demo](http://localhost:3020/demo).

Meeting support files:
- `ROTEIRO_DE_APRESENTACAO.md`
- `CHECKLIST_REUNIAO.md`
- `PERGUNTAS_REUNIAO_PRIORITARIAS.md`
- `RELATORIO_PENDENCIAS_POS_REUNIAO.md`
- `TESTE_FINAL_15_MIN.md`
- `PLANO_B_APRESENTACAO.md`
- `RESUMO_EXECUTIVO_MVP.md`

Do not apply SQL or create real Auth users before the meeting. The MVP is frozen for presentation with safe demo fallback.

## Brand
Manual: `docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf`.

Official colors: `#FCC224`, `#E9635D`, `#335595`, `#FE9440`, `#3A1A16`, `#2ACCB5`.

## Local URL
Use [http://localhost:3020/demo](http://localhost:3020/demo) for the guided presentation in this workspace.

## Round 6 Brand Note
Round 6 extracted real ECOTUCA/Perifa logo PNGs from the correct identity manual and wired `OfficialLogo` to prefer `public/brand/official/from-manual/png/`. Round 5 lockups now live in `public/brand/temporary-lockups/` as fallback only. Production should still request designer-approved SVG/AI/PDF vector assets.

## Round 8 Desktop/Cadastro/Sitemap
- Desktop editorial utilities and premium page sections were added.
- Student/teacher signup flows are multi-step, local-only and documented in `docs/forms/SIGNUP_FLOW_SPEC.md`.
- Sitemap structure is documented in `docs/navigation/SITEMAP_STRUCTURE.md`.
- Round report: `docs/progress-reports/STEP_18_ROUND_8_DESKTOP_CADASTRO_SITEMAP.md`.

## Round 9 Fonts/Panels/Forms
- Font fallback strategy for Troika/Lufga is documented in `docs/brand/FONT_USAGE_AND_LICENSE.md`.
- All four signup flows are now multi-step, local-only and documented in `docs/forms/SIGNUP_FLOW_SPEC.md`.
- `/sitemap` now has profile/status filters and copy-link actions; `/sitemap.xml` indexes only public routes.
- Google Forms fallback requirements and Apps Script starter live in `docs/forms/`.
- Round report: `docs/progress-reports/STEP_19_ROUND_9_FONTS_PANELS_FORMS.md`.
