# ECOTUCA / Perifa Ecotour

Professional navigable MVP for an ecotourism school and mobile route showcase connected to youth training, sustainable tourism, Agenda 2030 and impact reporting in the Complexo do Alemao.

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
- `/app/aluno`
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
