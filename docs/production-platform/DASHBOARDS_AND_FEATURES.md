# Dashboards And Features

## Student Panel

### Required Widgets
- Welcome and current status.
- Current track and next lesson.
- Overall progress.
- Pending activities.
- Recent feedback.
- Certificates.
- Announcements.
- Learning calendar.

### Required Actions
- Continue lesson.
- Submit activity.
- Download material.
- Mark resource as read.
- View teacher feedback.
- Update profile.

### Student States
- Pending approval.
- Approved, no track assigned.
- Active.
- Behind schedule.
- Completed track.
- Certificate available.

## Teacher Panel

### Required Widgets
- Classes summary.
- Students needing attention.
- Activity review queue.
- Content drafts.
- Published lessons.
- Forum/questions.
- Announcements.

### Required Actions
- Review activity.
- Send feedback.
- Create/edit content draft.
- Upload PDF/material.
- View class progress.
- Send class announcement.

### Teacher States
- Pending approval.
- Approved, no class assigned.
- Active with classes.
- Content awaiting admin review.

## Admin Panel

### Required Widgets
- Approval queue.
- Active users by role/status.
- Track completion.
- Pending activities/reviews.
- Content status.
- Certificate queue.
- Impact metrics.
- Export center.

### Required Actions
- Approve/reject/suspend user.
- Assign role/status.
- Create class.
- Assign students to class/track.
- Create/edit/publish track.
- Approve teacher content.
- Issue certificate.
- Export CSV/PDF.

### Admin States
- Normal operation.
- Many pending approvals.
- Content awaiting review.
- Certificate issuing pending.
- Data/reporting gap.

## Feature Matrix

| Feature | Student | Teacher | Admin |
| --- | --- | --- | --- |
| Login | yes | yes | yes |
| Signup | yes | yes | invited/manual |
| Approval | view status | view status | manage |
| Tracks | consume | view class | manage |
| Lessons | consume | create draft | approve/publish |
| Progress | own | class | all |
| Activities | submit | review | audit |
| Certificates | view/download | view class | issue/manage |
| Reports | no | class-level | full |
| Settings | own | own | system |

## Production Quality Bar
- No dead buttons.
- Empty states for every dashboard.
- Loading and error states for every data fetch.
- Optimistic UI only where rollback is defined.
- Audit trail for admin decisions.
- Role-gated routes both server-side and with RLS.
