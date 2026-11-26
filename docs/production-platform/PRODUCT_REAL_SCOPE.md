# Product Real Scope

## Product Name
ECOTUCA.

Perifa Ecotour remains the institutional/territorial signature, but the production V1 is the ECOTUCA learning platform.

## One-Sentence Product Definition
ECOTUCA is a responsive learning platform where students enter through approval, study ecotourism tracks, complete lessons and activities, receive certificates, and are managed by teachers and coordinators.

## Primary Users
- Student: young person enrolled in the ECOTUCA formation journey.
- Teacher/facilitator: person who publishes classes, tracks activities and supports students.
- Admin/coordinator: person who approves profiles, manages content, tracks impact and exports reports.

## Secondary Users For Later
- Guide: future role after student formation and validation.
- Tourist/visitor: future route/showcase role.
- Partner/funder: future read-only impact report viewer.

## What Stays From The MVP
- Brand system, palette, official extracted logo assets and theme tokens.
- Next.js App Router, TypeScript and Tailwind.
- Supabase prepared architecture.
- Multi-step signup logic, but with real submission and pending approval.
- Student dashboard concept.
- Teacher dashboard concept.
- Admin approval queue concept.
- Video player with progress.
- Track cards, progress cards, certificates and reporting concepts.

## What Must Be Removed Or Hidden From Production V1
- `/demo` as the public entry.
- Demo user switcher and visible demo credentials.
- Fake data-source badges on user-facing screens.
- Tourist route marketplace as primary product.
- Route booking/favorites as public promise.
- Any copy implying data is fake, mock or local.
- LocalStorage-only submission as production behavior.

## V1 Functional Scope
- Public landing page focused on course value and enrollment.
- Login and password recovery.
- Student signup with approval.
- Teacher/admin-created student profiles when needed.
- Student dashboard with assigned tracks, lessons, progress, tasks and certificates.
- Lesson player with video, text, resources and activity.
- Teacher dashboard with classes, student progress, content drafts and activity review.
- Admin dashboard with approvals, users, tracks, lessons, certificates and impact metrics.
- Notification center.
- Profile/settings.
- Production RLS and audit logging.

## V1 Non-Scope
- Payment.
- Tourist booking.
- Native app store release.
- Public marketplace of guides.
- Advanced gamification store.
- Offline-first video caching.
- Real-time chat.

## Success Criteria
- A real student can be approved, log in, complete lessons and see progress.
- A real teacher can manage a class and review student activities.
- A real admin can approve users and manage published content.
- The app works beautifully from 320px mobile to 1920px desktop.
- No demo credentials, secrets or fake workflow language appear in production.
