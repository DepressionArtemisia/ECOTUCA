# Route And Flow Map

## Route Groups

### Public Funnel
- `/`: premium public home focused on enrollment and impact.
- `/sobre`: institution, territory, partners and trust.
- `/como-funciona`: learning journey and approval process.
- `/cadastro`: choose student or teacher interest.
- `/cadastro/aluno`: student application.
- `/cadastro/professor`: teacher/facilitator application.
- `/entrar`: login.
- `/recuperar-senha`: password recovery.
- `/privacidade`: production privacy policy.
- `/termos`: production terms.
- `/acessibilidade`: accessibility statement.

### Account States
- `/aguardando-aprovacao`: pending profile.
- `/cadastro/confirmado`: application received.
- `/convite/[token]`: invited account setup.
- `/app/onboarding`: first approved-user setup.

### Student App
- `/app/aluno`: dashboard.
- `/app/aluno/trilhas`: assigned tracks.
- `/app/aluno/trilhas/[trackId]`: modules and lessons.
- `/app/aluno/aulas/[lessonId]`: lesson player.
- `/app/aluno/atividades`: activities and pending tasks.
- `/app/aluno/atividades/[activityId]`: activity submission.
- `/app/aluno/certificados`: certificates.
- `/app/aluno/comunidade`: announcements and forum.
- `/app/notificacoes`: notifications.
- `/app/perfil`: profile.
- `/app/configuracoes`: account settings.

### Teacher App
- `/app/professor`: dashboard.
- `/app/professor/turmas`: classes.
- `/app/professor/turmas/[classId]`: student list and progress.
- `/app/professor/conteudos`: content library.
- `/app/professor/conteudos/novo`: create lesson/material.
- `/app/professor/conteudos/[contentId]`: edit/review content.
- `/app/professor/avaliacoes`: activity review queue.
- `/app/professor/comunidade`: discussion moderation and announcements.

### Admin App
- `/app/admin`: command center.
- `/app/admin/aprovacoes`: approval queue.
- `/app/admin/usuarios`: users and roles.
- `/app/admin/turmas`: classes.
- `/app/admin/trilhas`: tracks and modules.
- `/app/admin/conteudos`: lesson/content governance.
- `/app/admin/certificados`: certificate issuing.
- `/app/admin/relatorios`: impact and exports.
- `/app/admin/configuracoes`: system settings.

## Main Funnel
1. Visitor lands on `/`.
2. Visitor understands value: formation, territory, certificate, future employability.
3. Visitor opens `/como-funciona`.
4. Visitor chooses `/cadastro/aluno` or `/cadastro/professor`.
5. Form submits to Supabase as `pending`.
6. Admin reviews at `/app/admin/aprovacoes`.
7. Approved user receives notification/e-mail.
8. User logs in at `/entrar`.
9. User completes `/app/onboarding`.
10. Student starts track or teacher sees assigned classes.

## Student Learning Flow
1. Dashboard shows next best action.
2. Student opens current track.
3. Student watches lesson video.
4. Progress is saved.
5. Student downloads or opens resources.
6. Student completes activity/quiz/reflection.
7. Teacher/admin reviews activity if required.
8. Track progress updates.
9. Certificate becomes available after requirements.

## Teacher Flow
1. Teacher opens dashboard.
2. Teacher sees classes needing attention.
3. Teacher reviews activity submissions.
4. Teacher creates or edits content drafts.
5. Admin approves/publishes content.
6. Teacher follows student progress and sends announcements.

## Admin Flow
1. Admin opens command center.
2. Admin approves/rejects profiles.
3. Admin creates tracks, modules and lessons.
4. Admin assigns students to classes/tracks.
5. Admin reviews content status and certificates.
6. Admin exports impact reports.

## Navigation Principles
- Public nav: Inicio, Como funciona, Cadastro, Entrar.
- Student nav: Inicio, Trilhas, Atividades, Certificados, Perfil.
- Teacher nav: Inicio, Turmas, Conteudos, Avaliacoes, Perfil.
- Admin nav: Dashboard, Aprovacoes, Usuarios, Trilhas, Conteudos, Relatorios.
- Mobile app nav must have 4 to 5 items maximum.
