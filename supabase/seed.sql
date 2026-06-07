-- Demo seed uses fixed UUIDs for profiles. Create matching auth users manually or via Supabase Admin API before relying on auth references.

insert into public.profiles (id, full_name, email, role, status, bio, neighborhood)
values
('00000000-0000-0000-0000-000000000001', 'Coordenacao ECOTUCA', 'admin@ecotuca.local', 'admin', 'approved', 'Coordena aprovacao, metricas e prestacao de contas.', 'Complexo do Alemao'),
('00000000-0000-0000-0000-000000000002', 'Bruno Copque', 'bruno@ecotuca.local', 'super_admin', 'approved', 'Controle tecnico e operacional.', 'Rio de Janeiro'),
('00000000-0000-0000-0000-000000000003', 'Prof. Mariana Costa', 'professora@ecotuca.local', 'teacher', 'approved', 'Educadora ambiental e facilitadora.', 'Complexo do Alemao'),
('00000000-0000-0000-0000-000000000004', 'Lucas Oliveira', 'aluno@ecotuca.local', 'student', 'approved', 'Aluno em formacao de guia local.', 'Complexo do Alemao'),
('00000000-0000-0000-0000-000000000005', 'Ana Beatriz Santos', 'pendente@ecotuca.local', 'student', 'pending', 'Cadastro aguardando aprovacao.', 'Complexo do Alemao'),
('00000000-0000-0000-0000-000000000006', 'Rafael Silva', 'guia@ecotuca.local', 'guide', 'approved', 'Guia local em destaque.', 'Complexo do Alemao'),
('00000000-0000-0000-0000-000000000007', 'Camila Ferreira', 'turista@ecotuca.local', 'tourist', 'approved', 'Turista interessada em roteiros comunitarios.', 'Niteroi')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role, status = excluded.status;

insert into public.learning_tracks (id, title, description, category, difficulty, estimated_hours, status, order_index, created_by)
values
('10000000-0000-0000-0000-000000000001', 'Formacao de Guia Local', 'Conducao segura, leitura do territorio e hospitalidade.', 'Ecoturismo', 'intermediario', 18, 'published', 1, '00000000-0000-0000-0000-000000000003'),
('10000000-0000-0000-0000-000000000002', 'Meio Ambiente e Biodiversidade', 'Ecologia urbana, Serra da Misericordia e cuidados ambientais.', 'Ambiental', 'basico', 14, 'published', 2, '00000000-0000-0000-0000-000000000003'),
('10000000-0000-0000-0000-000000000003', 'Agenda 2030 e Empreendedorismo', 'ODS, renda local e turismo responsavel.', 'Impacto', 'intermediario', 16, 'published', 3, '00000000-0000-0000-0000-000000000003')
on conflict (id) do nothing;

insert into public.learning_modules (id, track_id, title, description, order_index)
values
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Primeiros passos do guia', 'Seguranca, narrativa e acolhimento.', 1)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, title, description, content, video_provider, video_id, duration_minutes, order_index, status)
values
('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Como contar o territorio com seguranca', 'Primeiros passos para conduzir visitantes.', 'Roteirize paradas, combine regras e valorize memorias locais.', 'youtube', 'ScMzIvxBSi4', 18, 1, 'published')
on conflict (id) do nothing;

insert into public.track_enrollments (user_id, track_id, status, progress_percent)
values
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'in_progress', 64)
on conflict (user_id, track_id) do update set progress_percent = excluded.progress_percent;

insert into public.lesson_progress (user_id, lesson_id, status, progress_percent, watched_seconds, last_position_seconds, total_duration_seconds, last_watched_at)
values
('00000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001', 'in_progress', 72, 778, 222, 1080, now())
on conflict (user_id, lesson_id) do update set progress_percent = excluded.progress_percent, last_position_seconds = excluded.last_position_seconds;

insert into public.tour_routes (id, title, slug, description, short_description, location, meeting_point, duration_minutes, difficulty, price, max_people, cover_url, guide_id, status, featured, tags, included_items, recommendations, accessibility, best_time, safety_notes)
values
('40000000-0000-0000-0000-000000000001', 'Serra da Misericordia', 'serra-da-misericordia', 'Vivencia territorial que conecta biodiversidade, historia local, mirantes e educacao ambiental.', 'Trilha de natureza, memoria e leitura ambiental.', 'Complexo do Alemao, Rio de Janeiro', 'Base Perifa Ecotour', 180, 'moderada', 85, 12, '/mock/route-serra.png', '00000000-0000-0000-0000-000000000006', 'published', true, array['biodiversidade','mirante','territorio'], array['Guia local','Material educativo'], array['Levar agua','Usar tenis fechado'], 'Trechos de subida e solo irregular.', 'Manha', 'Grupo acompanhado por guia local.')
on conflict (id) do nothing;

insert into public.impact_metrics (metric_key, metric_label, metric_value, metric_period)
values
('students_registered', 'Jovens inscritos', 128, '2026-05'),
('lessons_completed', 'Aulas concluidas', 842, '2026-05'),
('routes_published', 'Roteiros publicados', 6, '2026-05')
on conflict do nothing;
