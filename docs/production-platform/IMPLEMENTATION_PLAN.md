# Implementation Plan

## Phase 0 - Production Cutover Strategy
Goal: separate the real teaching platform from the demo MVP.

Status on 2026-06-16: started on branch `codex/production-learning-platform-start`.

Tasks:
- Create a production branch.
- Hide or remove demo-first routes from public navigation.
- Keep brand assets and design system.
- Define production route groups.
- Replace demo copy with product copy.
- Confirm whether tourism routes stay hidden for V1.

Acceptance:
- `/` presents ECOTUCA as a real learning platform.
- `/demo` is not the main user path.
- No demo credentials appear in production navigation.

Current result:
- Public navigation no longer routes users to `/demo`.
- Home, login, signup, pending approval, how-it-works, contact, FAQ, terms and privacy now use production teaching-platform language.
- Demo routes still exist, but are no longer the primary public path.

## Phase 1 - Production Design System
Goal: lock the ultra premium visual system.

Tasks:
- Wire licensed Troika/Lufga files when available.
- Create production app shells.
- Refine cards, tables, forms and lesson surfaces.
- Create responsive QA matrix.
- Generate or select hero/learning images.

Acceptance:
- 320, 390, 768, 1024, 1440 and 1920 layouts pass.
- Student, teacher and admin feel cohesive but role-specific.
- Brand palette is used intentionally, not randomly.

## Phase 2 - Auth, Signup And Approval
Goal: real account pipeline.

Tasks:
- Apply reviewed Supabase migrations to staging.
- Implement server-side signup actions.
- Add pending approval pages.
- Add admin approval decisions with audit logs.
- Add e-mail notification plan.
- Add password reset.

Acceptance:
- Student can apply.
- Admin can approve.
- Approved student can log in.
- Pending/rejected/suspended users are correctly gated.

## Phase 3 - Learning Core
Goal: real student learning flow.

Status on 2026-06-16: route skeleton started in `codex/production-learning-platform-start`.

Tasks:
- Build track/module/lesson pages from Supabase.
- Persist lesson progress.
- Add lesson resources.
- Add activity submission.
- Add feedback display.
- Add certificate availability logic.

Acceptance:
- Student can complete a lesson.
- Progress survives reload/device change.
- Teacher/admin can see progress.

Current result:
- `/app/aluno/atividades` exists with activity status, evidence type, feedback and progress.
- `/app/professor/avaliacoes` exists with a teacher feedback queue.
- Data is still mock-based and must be connected to Supabase in the backend slice.

## Phase 4 - Teacher Workspace
Goal: real facilitator workflow.

Status on 2026-06-16: visual workspace expanded.

Tasks:
- Build classes and student progress views.
- Add content draft creation.
- Add material upload.
- Add activity review queue.
- Add feedback flow.

Acceptance:
- Teacher sees assigned class.
- Teacher reviews a student submission.
- Teacher creates a content draft.

Current result:
- `/app/professor/turmas` now shows class progress and students in attention.
- `/app/professor/avaliacoes` now shows submissions to review.
- `/app/professor/conteudos` already supports the visual content creation/upload flow.

## Phase 5 - Admin Command Center
Goal: production operation.

Status on 2026-06-16: visual command-center routes expanded.

Tasks:
- User management.
- Track/module/lesson management.
- Content approval.
- Certificate issuing.
- Reports/export.
- System settings.

Acceptance:
- Admin can run the platform without editing code.
- Reports/export show production data.
- Audit log records critical decisions.

Current result:
- `/app/admin/usuarios` shows users, roles and status without the old preview switcher.
- `/app/admin/conteudos` shows content review/curation state.
- `/app/admin/relatorios` shows report snapshots and monthly rows.
- `/app/admin/configuracoes` shows governance areas.
- Mutations, audit log and real exports still need the Supabase backend slice.

## Phase 6 - Production QA And Deploy
Goal: public launch.

Tasks:
- Full lint/build.
- RLS tests.
- Browser QA at key breakpoints.
- Accessibility pass.
- SEO metadata.
- Vercel production deploy.
- GitHub release checkpoint.

Acceptance:
- Production URL works.
- No demo secrets or fake data labels.
- All core flows pass with real Supabase data.

## Recommended Build Order
1. Production route shell and navigation.
2. Auth/session/middleware.
3. Signup -> approval -> login.
4. Student dashboard and lesson progress.
5. Admin approvals/users/tracks.
6. Teacher classes/reviews/content drafts.
7. Certificates/reports.
8. Final visual polish and launch.

## Estimated Milestones
- M1: Production shell and public funnel.
- M2: Auth and approval.
- M3: Student learning flow.
- M4: Teacher workflow.
- M5: Admin operation.
- M6: Production launch.
