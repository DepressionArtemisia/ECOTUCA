# Data Auth Supabase Blueprint

## Production Auth Rules
- Supabase Auth is the source of truth.
- Every authenticated user must have a `profiles` row.
- `profiles.status` controls access: pending, approved, rejected, suspended, inactive.
- Middleware/server checks should redirect pending users to `/aguardando-aprovacao`.
- RLS must be active before production data collection.

## Core Tables
- `profiles`
- `student_profiles`
- `teacher_profiles`
- `admin_audit_logs`
- `classes`
- `class_members`
- `learning_tracks`
- `learning_modules`
- `lessons`
- `lesson_resources`
- `lesson_progress`
- `activities`
- `activity_submissions`
- `feedback`
- `certificates`
- `notifications`
- `content_review_requests`
- `impact_metrics`

## Content Model
Track -> Module -> Lesson -> Activity -> Submission -> Feedback -> Certificate.

### Track
- title
- description
- cover image
- status: draft/published/archived
- estimated duration
- certificate requirements

### Lesson
- title
- video URL or uploaded media reference
- transcript
- summary
- resources
- activity requirement
- status

### Activity
- type: reflection, quiz, checklist, file upload, mixed
- instructions
- rubric
- required flag
- review mode: auto/manual

## Storage Buckets
- `avatars`
- `lesson-videos`
- `lesson-materials`
- `activity-submissions`
- `certificates`
- `brand-assets`

## RLS Summary
- Student reads published content assigned to them.
- Student writes own progress and submissions.
- Teacher reads classes assigned to them.
- Teacher writes feedback for assigned class submissions.
- Teacher creates content drafts, not published content directly.
- Admin manages all operational data.
- Public can read only public landing content.

## Submission Flow
1. Student signup inserts `profiles` + `student_profiles` with `pending`.
2. Admin approves profile.
3. System marks profile `approved`.
4. Student receives notification.
5. Student can access assigned learning routes.

## Admin Audit Trail
Every production admin decision must record:
- actor user id,
- target user/content id,
- action,
- previous state,
- next state,
- reason/notes,
- timestamp.

## Migration Plan
1. Review existing `supabase/schema.sql`.
2. Split schema into production migrations.
3. Apply to staging Supabase first.
4. Create admin seed user manually.
5. Run RLS tests.
6. Enable production submissions.

## Security No-Go
- Never expose service role key to client.
- Never commit `.env.local`.
- Never let client choose its own role.
- Never use localStorage as production source of truth.
- Never publish lesson videos/materials without storage policy review.
