# ECOTUCA Production Learning Platform

This folder defines the real production product, separated from the presentation MVP.

## Product Direction
The production site must focus on the teaching platform:
- student learning journey,
- teacher/facilitator workflow,
- admin/coordinator operation,
- approvals, content, progress, certificates and impact.

Tourism, guide and route marketplace features stay as future expansion context. They should not dominate the first production release.

## Documents
- `PRODUCT_REAL_SCOPE.md`: what the real product is, what stays, what leaves the MVP.
- `ROUTE_AND_FLOW_MAP.md`: full route map and product funnel.
- `UX_UI_BLUEPRINT.md`: premium responsive visual direction and screen system.
- `DASHBOARDS_AND_FEATURES.md`: student, teacher and admin panel requirements.
- `DATA_AUTH_SUPABASE_BLUEPRINT.md`: production data, auth, RLS and storage model.
- `IMPLEMENTATION_PLAN.md`: construction phases, milestones and acceptance gates.
- `IMAGE_AND_ASSET_DIRECTION.md`: visual assets, image generation prompts and brand usage rules.

## Production Rule
Do not ship demo-only surfaces (`/demo`, `/demo-mobile`, demo user switcher, local-only fake approvals) as the primary production experience. They may remain in a hidden internal preview branch, but the public product must be a clean learning platform.

## Core Routes For V1
- `/`
- `/entrar`
- `/cadastro`
- `/aguardando-aprovacao`
- `/app/aluno`
- `/app/aluno/trilhas`
- `/app/aluno/trilhas/[trackId]`
- `/app/aluno/aulas/[lessonId]`
- `/app/aluno/atividades`
- `/app/aluno/certificados`
- `/app/professor`
- `/app/professor/turmas`
- `/app/professor/conteudos`
- `/app/professor/avaliacoes`
- `/app/admin`
- `/app/admin/aprovacoes`
- `/app/admin/usuarios`
- `/app/admin/trilhas`
- `/app/admin/conteudos`
- `/app/admin/relatorios`

## North Star
ECOTUCA should feel like a serious, beautiful, mobile-first school platform made for the territory: urban, colorful, premium, educational, warm, organized and trustworthy.
