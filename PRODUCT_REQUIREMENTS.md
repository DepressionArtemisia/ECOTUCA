# Product Requirements

## Functional Requirements
- Public visitors can see home, about, routes, route details, guide profiles, login, registration and demo pages.
- Tourists can browse routes, favorite routes, submit interest and see simulated reservations.
- Students can access a dashboard, learning tracks, lessons, video player, certificates, community and notifications.
- Teachers can view classes, student progress, content publishing surfaces and forum topics.
- Guides can view route assignments, profile highlights and simulated agenda.
- Admins can approve users, manage routes/tracks/users, view impact metrics and export/report simulated data.
- Super admins have full operational access.

## User Roles
`visitor`, `tourist`, `student`, `teacher`, `guide`, `admin`, `super_admin`.

## User Status
`pending`, `approved`, `rejected`, `suspended`, `inactive`.

## Required Routes
Public: `/`, `/sobre`, `/roteiros`, `/roteiros/[slug]`, `/guias/[id]`, `/login`, `/cadastro`, `/cadastro/aluno`, `/cadastro/professor`, `/cadastro/guia`, `/cadastro/turista`, `/demo`, `/demo-mobile`.

Authenticated/demo: `/app`, `/app/aluno`, `/app/aluno/trilhas`, `/app/aluno/trilhas/[id]`, `/app/aluno/aulas/[id]`, `/app/aluno/certificados`, `/app/aluno/comunidade`, `/app/professor`, `/app/professor/conteudos`, `/app/professor/turmas`, `/app/professor/comunidade`, `/app/admin`, `/app/admin/usuarios`, `/app/admin/aprovacoes`, `/app/admin/trilhas`, `/app/admin/roteiros`, `/app/admin/metricas`, `/app/admin/configuracoes`, `/app/guia`, `/app/guia/roteiros`, `/app/guia/agenda`, `/app/turista`, `/app/turista/reservas`, `/app/notificacoes`, `/app/perfil`, `/app/configuracoes`.

## Non-Functional Requirements
- Mobile-first and responsive.
- Theme light/dark with brand tokens.
- Accessible color contrast and focus states.
- Fast enough for screen-share demo.
- Mock fallback when Supabase is not configured.
- No real secrets in committed files.
- Clear documentation and progress reports after major steps.

## Round 5 Design Requirements
- Use ECOTUCA as the primary product/app brand.
- Use Perifa Ecotour as institutional/territorial tourism signature.
- Prefer real assets from `public/brand/official/from-manual/png/`.
- Keep temporary lockups in `public/brand/temporary-lockups/` as fallback only.
- Do not apply SQL or create real users during design-only rounds.
- Preserve `/demo`, `/demo-mobile`, student journey, route interest form and admin metrics while polishing UI.
# Round 7 Product Requirements
- Routes must display validation status before being treated as real operations.
- Public route pages must not expose sensitive final meeting points without team confirmation.
- Territorial imagery must have source, author, license and alt text.
- Student, tourist, guide, professor and admin surfaces must connect learning/operations back to territory and impact.
- Demo mode and local fallback must remain available.
