# Implementation Plan

## Phase 0 - Production Cutover Strategy
Goal: separate the real teaching platform from the demo MVP.

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

## Phase 4 - Teacher Workspace
Goal: real facilitator workflow.

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

## Phase 5 - Admin Command Center
Goal: production operation.

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
