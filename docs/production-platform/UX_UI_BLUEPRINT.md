# UX UI Blueprint

## Visual Principle
The real ECOTUCA platform must look like a premium educational product from the territory, not a generic SaaS dashboard.

Keywords:
- urban,
- educational,
- technological,
- warm,
- colorful,
- organized,
- premium,
- trustworthy.

## Brand Tokens
- Yellow: `#FCC224`
- Coral: `#E9635D`
- Blue: `#335595`
- Orange: `#FE9440`
- Dark brown: `#3A1A16`
- Mint: `#2ACCB5`

## Typography
- Headlines: Troika when licensed files are available.
- Fallback until then: the current `--font-headline` stack.
- Body: Lufga when licensed files are available.
- Fallback until then: the current rounded body stack.
- Implementation target: `next/font/local` with `public/fonts/official/` or an app-local `assets/fonts/official/` folder.

## Layout System

### Mobile 320-480
- Bottom navigation.
- Sticky top context bar.
- One-column cards.
- Lesson player first, then resources/activity.
- Buttons full-width when action is primary.
- Typography large enough but never viewport-scaled.

### Tablet 768-1024
- Two-column dashboards where useful.
- Side panel collapses below content.
- Cards keep fixed rhythm and stable heights.
- Forms show two columns only when labels remain readable.

### Desktop 1280-1920
- App shell with left rail.
- Dashboard grids: command area + right context panel.
- Tables/cards hybrid for admin.
- Teacher/student work surfaces must be dense but not cold.

## Public Home Structure
1. Hero with ECOTUCA logo, strong course promise and real/brand visual.
2. Trust strip: territory, Agenda 2030, certificate, guided formation.
3. Journey section: apply, approval, learn, practice, certify.
4. Track preview: ecotourism, biodiversity, territory, hospitality, entrepreneurship.
5. Student outcome: skills and future paths.
6. Teacher/facilitator participation.
7. Admin/coordination credibility.
8. CTA: apply as student / apply as teacher.

## Student Dashboard UX
- First screen answers: what should I do now?
- Hero card: progress, current track, next lesson.
- Quick actions: continue lesson, view activities, certificates.
- Track progress cards.
- Pending activities.
- Announcements.
- Certificates and achievements.

## Lesson UX
- Video or media area.
- Lesson title, track/module context and completion state.
- Tabs or sections: Conteudo, Materiais, Atividade, Comentarios.
- Progress saved automatically.
- Clear completion CTA.
- Activity submission must support text, file upload and quiz/checklist types.

## Teacher Dashboard UX
- First screen answers: which class needs attention?
- Class cards with progress and alert counts.
- Review queue.
- Content draft/published status.
- Student detail drawer/page.
- Announcements and forum moderation.

## Admin Dashboard UX
- First screen answers: what needs coordination action?
- Approval queue.
- User counts and risk states.
- Content governance.
- Track/class health.
- Certificate issuing.
- Export/report panel.

## UI Components Needed
- Production `PublicShell`.
- Production `AuthShell`.
- Production `LearningShell`.
- Production `TeacherShell`.
- Production `AdminShell`.
- `CourseHero`.
- `JourneyStepper`.
- `TrackProgressCard`.
- `LessonPlayer`.
- `ActivitySubmissionForm`.
- `ReviewQueue`.
- `ApprovalDecisionPanel`.
- `UserStatusBadge`.
- `CertificateCard`.
- `ImpactMetricCard`.
- `ResponsiveDataTable`.
- `MobileActionBar`.

## Motion And Polish
- Use restrained motion: hover lift, progress transitions, panel reveal.
- Avoid decorative blobs/orbs that read generic.
- Prefer brand pattern, territorial image, color strips and real UI depth.
- Buttons must use icon + label for core commands.
- Dashboards should feel like tools, not marketing pages.

## Accessibility
- All interactive controls need visible focus.
- Forms require persistent labels.
- Color must never be the only state indicator.
- All charts need text summaries.
- Video lessons need caption/transcript plan.
- Test keyboard-only navigation before production.
