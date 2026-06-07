-- ==================================================
-- supabase/schema.sql
-- ==================================================

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text,
  avatar_url text,
  role text not null check (role in ('visitor','tourist','student','teacher','guide','admin','super_admin')),
  status text not null default 'pending' check (status in ('pending','approved','rejected','suspended','inactive')),
  bio text,
  neighborhood text,
  birth_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  education_level text,
  interests text[] default '{}',
  emergency_contact text,
  approved_by uuid references public.profiles(id),
  approved_at timestamptz
);

create table if not exists public.teacher_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expertise text[] default '{}',
  short_bio text
);

create table if not exists public.guide_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  specialties text[] default '{}',
  certificates text[] default '{}',
  languages text[] default '{}',
  rating numeric default 0,
  available boolean not null default true
);

create table if not exists public.tourist_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  origin_city text,
  origin_country text,
  interests text[] default '{}'
);

create table if not exists public.learning_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_url text,
  category text,
  difficulty text,
  estimated_hours numeric default 0,
  status text not null default 'draft',
  order_index int not null default 0,
  created_by uuid references public.profiles(id)
);

create table if not exists public.learning_modules (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.learning_tracks(id) on delete cascade,
  title text not null,
  description text,
  order_index int not null default 0
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.learning_modules(id) on delete cascade,
  title text not null,
  description text,
  content text,
  video_provider text default 'youtube',
  video_url text,
  video_id text,
  video_duration_seconds int,
  pdf_url text,
  thumbnail_url text,
  duration_minutes int default 0,
  order_index int not null default 0,
  is_required boolean not null default true,
  status text not null default 'draft'
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started',
  progress_percent numeric not null default 0,
  watched_seconds int not null default 0,
  last_position_seconds int not null default 0,
  total_duration_seconds int not null default 0,
  completed_at timestamptz,
  last_watched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.track_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id uuid not null references public.learning_tracks(id) on delete cascade,
  status text not null default 'in_progress',
  progress_percent numeric not null default 0,
  started_at timestamptz default now(),
  completed_at timestamptz,
  unique (user_id, track_id)
);

create table if not exists public.student_activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_type text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id uuid references public.learning_tracks(id),
  certificate_number text unique not null,
  certificate_url text,
  issued_at timestamptz default now()
);

create table if not exists public.student_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_key text not null,
  title text not null,
  description text,
  icon text,
  earned_at timestamptz default now()
);

create table if not exists public.tour_routes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  short_description text,
  location text,
  meeting_point text,
  latitude numeric,
  longitude numeric,
  duration_minutes int,
  difficulty text,
  price numeric,
  max_people int,
  cover_url text,
  gallery_urls text[] default '{}',
  guide_id uuid references public.profiles(id),
  status text not null default 'draft',
  featured boolean not null default false,
  tags text[] default '{}',
  included_items text[] default '{}',
  recommendations text[] default '{}',
  accessibility text,
  best_time text,
  safety_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.route_bookings (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.tour_routes(id) on delete cascade,
  tourist_id uuid references public.profiles(id),
  name text not null,
  email text not null,
  phone text,
  preferred_date date,
  people_count int default 1,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.route_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  route_id uuid not null references public.tour_routes(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, route_id)
);

create table if not exists public.route_reviews (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.tour_routes(id) on delete cascade,
  user_id uuid references public.profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  author_id uuid references public.profiles(id),
  category text,
  status text not null default 'published',
  created_at timestamptz not null default now()
);

create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.forum_topics(id) on delete cascade,
  content text not null,
  author_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text,
  type text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null,
  metric_label text not null,
  metric_value numeric not null default 0,
  metric_period text,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id),
  bucket text not null,
  path text not null,
  file_type text,
  file_size int,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.system_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_status_idx on public.profiles(role, status);
create index if not exists lessons_module_order_idx on public.lessons(module_id, order_index);
create index if not exists lesson_progress_user_idx on public.lesson_progress(user_id);
create index if not exists tour_routes_status_featured_idx on public.tour_routes(status, featured);


-- ==================================================
-- supabase/rls.sql
-- ==================================================

alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.guide_profiles enable row level security;
alter table public.tourist_profiles enable row level security;
alter table public.learning_tracks enable row level security;
alter table public.learning_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.track_enrollments enable row level security;
alter table public.student_activity_logs enable row level security;
alter table public.certificates enable row level security;
alter table public.student_achievements enable row level security;
alter table public.tour_routes enable row level security;
alter table public.route_bookings enable row level security;
alter table public.route_favorites enable row level security;
alter table public.route_reviews enable row level security;
alter table public.forum_topics enable row level security;
alter table public.forum_replies enable row level security;
alter table public.notifications enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.media_assets enable row level security;
alter table public.system_settings enable row level security;

create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() in ('admin', 'super_admin'), false)
$$;

create policy "profiles self select" on public.profiles
for select using (id = auth.uid() or public.is_admin());

create policy "profiles self update" on public.profiles
for update using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "profiles admin insert" on public.profiles
for insert with check (public.is_admin());

create policy "students own or admin" on public.student_profiles
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "teachers own or admin" on public.teacher_profiles
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "guides public select" on public.guide_profiles
for select using (true);

create policy "guides own or admin write" on public.guide_profiles
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "tourists own or admin" on public.tourist_profiles
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "published tracks visible" on public.learning_tracks
for select using (status = 'published' or public.is_admin());

create policy "admin manage tracks" on public.learning_tracks
for all using (public.is_admin()) with check (public.is_admin());

create policy "published modules visible" on public.learning_modules
for select using (
  exists (
    select 1 from public.learning_tracks t
    where t.id = learning_modules.track_id and (t.status = 'published' or public.is_admin())
  )
);

create policy "admin manage modules" on public.learning_modules
for all using (public.is_admin()) with check (public.is_admin());

create policy "published lessons visible" on public.lessons
for select using (status = 'published' or public.is_admin());

create policy "admin teacher manage lessons" on public.lessons
for all using (public.is_admin() or public.current_profile_role() = 'teacher')
with check (public.is_admin() or public.current_profile_role() = 'teacher');

create policy "own lesson progress" on public.lesson_progress
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "own enrollments" on public.track_enrollments
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "own student activity" on public.student_activity_logs
for select using (user_id = auth.uid() or public.is_admin());

create policy "own certificates" on public.certificates
for select using (user_id = auth.uid() or public.is_admin());

create policy "own achievements" on public.student_achievements
for select using (user_id = auth.uid() or public.is_admin());

create policy "published routes visible" on public.tour_routes
for select using (status = 'published' or public.is_admin());

create policy "admin guide manage routes" on public.tour_routes
for all using (public.is_admin() or guide_id = auth.uid())
with check (public.is_admin() or guide_id = auth.uid());

create policy "bookings own or admin" on public.route_bookings
for all using (tourist_id = auth.uid() or public.is_admin())
with check (tourist_id = auth.uid() or public.is_admin() or tourist_id is null);

create policy "favorites own" on public.route_favorites
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "reviews public select" on public.route_reviews
for select using (true);

create policy "reviews own insert" on public.route_reviews
for insert with check (user_id = auth.uid());

create policy "forum published select" on public.forum_topics
for select using (status = 'published' or public.is_admin());

create policy "forum authenticated insert" on public.forum_topics
for insert with check (auth.uid() = author_id);

create policy "replies visible" on public.forum_replies
for select using (true);

create policy "replies authenticated insert" on public.forum_replies
for insert with check (auth.uid() = author_id);

create policy "notifications own" on public.notifications
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "impact admin select" on public.impact_metrics
for select using (public.is_admin());

create policy "media own or admin" on public.media_assets
for all using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

create policy "settings admin" on public.system_settings
for all using (public.is_admin()) with check (public.is_admin());


-- ==================================================
-- supabase/storage.sql
-- ==================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
('avatars', 'avatars', true, 5242880, array['image/png','image/jpeg','image/webp']),
('brand-assets', 'brand-assets', true, 10485760, array['image/png','image/jpeg','image/webp','image/svg+xml']),
('lesson-materials', 'lesson-materials', false, 52428800, array['application/pdf','image/png','image/jpeg','image/webp']),
('route-images', 'route-images', true, 20971520, array['image/png','image/jpeg','image/webp']),
('certificates', 'certificates', false, 10485760, array['application/pdf','image/png','image/jpeg']),
('documents', 'documents', false, 52428800, array['application/pdf','text/plain']),
('video-thumbnails', 'video-thumbnails', true, 10485760, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = excluded.public;

create policy "public brand assets" on storage.objects
for select using (bucket_id in ('avatars', 'brand-assets', 'route-images', 'video-thumbnails'));

create policy "authenticated upload own files" on storage.objects
for insert with check (auth.role() = 'authenticated');

create policy "owner update own files" on storage.objects
for update using (owner = auth.uid());

create policy "owner delete own files" on storage.objects
for delete using (owner = auth.uid());


-- ==================================================
-- supabase/seed.sql
-- ==================================================

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
