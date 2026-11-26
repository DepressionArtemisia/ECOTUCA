-- Schema and policies only. Fixture data is separate.
BEGIN;

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

create table if not exists public.signup_applications (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('student','teacher','guide','tourist')),
  status text not null default 'pending' check (status in ('pending','approved','rejected','archived')),
  applicant_name text,
  applicant_email text,
  applicant_phone text,
  payload jsonb not null default '{}'::jsonb,
  source text not null default 'public_signup',
  policy_version text not null,
  consent_version text not null,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  review_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.access_review_events (
  id uuid primary key default gen_random_uuid(),
  subject_kind text not null check (subject_kind in ('signup_application', 'profile')),
  subject_id uuid not null,
  decision text not null check (decision in ('approved', 'rejected')),
  reviewer_id uuid references public.profiles(id) on delete set null,
  decided_at timestamptz not null default now()
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
create index if not exists signup_applications_role_status_idx on public.signup_applications(role, status);
create index if not exists signup_applications_email_idx on public.signup_applications(applicant_email);
create index if not exists lessons_module_order_idx on public.lessons(module_id, order_index);
create index if not exists lesson_progress_user_idx on public.lesson_progress(user_id);
create index if not exists tour_routes_status_featured_idx on public.tour_routes(status, featured);


-- ==================================================
-- supabase/rls.sql
-- ==================================================

alter table public.profiles enable row level security;
alter table public.signup_applications enable row level security;
alter table public.access_review_events enable row level security;
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
set search_path = ''
stable
as $$
  select role from public.profiles where id = auth.uid() and status = 'approved'
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select coalesce(public.current_profile_role() in ('admin', 'super_admin'), false)
$$;

create or replace function public.has_approved_profile()
returns boolean
language sql
stable
set search_path = ''
as $$
  select public.current_profile_role() is not null
$$;

revoke execute on function public.current_profile_role(), public.is_admin(), public.has_approved_profile() from public;
grant execute on function public.current_profile_role(), public.is_admin(), public.has_approved_profile() to anon, authenticated, service_role;

revoke all on public.profiles, public.signup_applications, public.access_review_events from anon;
grant select on public.profiles, public.signup_applications, public.access_review_events to authenticated;
revoke insert, update, delete, truncate on public.profiles, public.signup_applications, public.access_review_events from authenticated;
grant update (full_name, phone, avatar_url, bio, neighborhood) on public.profiles to authenticated;
grant all on public.profiles, public.signup_applications, public.access_review_events to service_role;

create or replace function public.review_signup_application(application_id uuid, decision text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() or decision is null or decision not in ('approved', 'rejected') then
    raise exception 'Review not allowed' using errcode = '42501';
  end if;
  update public.signup_applications
     set status = decision, reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now()
   where id = application_id and status = 'pending';
  if not found then return false; end if;
  insert into public.access_review_events (subject_kind, subject_id, decision, reviewer_id)
  values ('signup_application', application_id, decision, auth.uid());
  return true;
end;
$$;

create or replace function public.review_pending_profile(profile_id uuid, decision text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() or decision is null or decision not in ('approved', 'rejected') then
    raise exception 'Review not allowed' using errcode = '42501';
  end if;
  update public.profiles
     set status = decision, updated_at = now()
   where id = profile_id and status = 'pending' and role not in ('admin', 'super_admin');
  if not found then return false; end if;
  insert into public.access_review_events (subject_kind, subject_id, decision, reviewer_id)
  values ('profile', profile_id, decision, auth.uid());
  return true;
end;
$$;

revoke execute on function public.review_signup_application(uuid, text), public.review_pending_profile(uuid, text) from public, anon;
grant execute on function public.review_signup_application(uuid, text), public.review_pending_profile(uuid, text) to authenticated;


drop policy if exists "profiles self select" on public.profiles;
create policy "profiles self select" on public.profiles
for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
for update to authenticated using (id = auth.uid() and public.has_approved_profile())
with check (id = auth.uid() and public.has_approved_profile());

drop policy if exists "profiles admin insert" on public.profiles;

drop policy if exists "signup applications admin manage" on public.signup_applications;
create policy "signup applications admin manage" on public.signup_applications
for select to authenticated using (public.is_admin());

drop policy if exists "admins can read access review events" on public.access_review_events;
create policy "admins can read access review events" on public.access_review_events
for select to authenticated using (public.is_admin());

drop policy if exists "students own or admin" on public.student_profiles;
create policy "students own or admin" on public.student_profiles
for select using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "admins manage student records" on public.student_profiles;
create policy "admins manage student records" on public.student_profiles
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "teachers own or admin" on public.teacher_profiles;
create policy "teachers own or admin" on public.teacher_profiles
for all using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin())
with check ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "guides public select" on public.guide_profiles;
create policy "guides public select" on public.guide_profiles
for select using (true);

drop policy if exists "guides own or admin write" on public.guide_profiles;
create policy "guides own or admin write" on public.guide_profiles
for all using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin())
with check ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "tourists own or admin" on public.tourist_profiles;
create policy "tourists own or admin" on public.tourist_profiles
for all using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin())
with check ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "published tracks visible" on public.learning_tracks;
create policy "published tracks visible" on public.learning_tracks
for select using ((status = 'published' and public.has_approved_profile()) or public.is_admin());

drop policy if exists "admin manage tracks" on public.learning_tracks;
create policy "admin manage tracks" on public.learning_tracks
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "published modules visible" on public.learning_modules;
create policy "published modules visible" on public.learning_modules
for select using (
  exists (
    select 1 from public.learning_tracks t
    where t.id = learning_modules.track_id and ((t.status = 'published' and public.has_approved_profile()) or public.is_admin())
  )
);

drop policy if exists "admin manage modules" on public.learning_modules;
create policy "admin manage modules" on public.learning_modules
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "published lessons visible" on public.lessons;
create policy "published lessons visible" on public.lessons
for select using (
  public.is_admin() or (
    status = 'published' and public.has_approved_profile()
    and exists (select 1 from public.learning_modules m where m.id = lessons.module_id)
  )
);

-- Teacher editing remains an explicit future permission tied to class ownership.

drop policy if exists "admin teacher manage lessons" on public.lessons;
create policy "admin teacher manage lessons" on public.lessons
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "own lesson progress" on public.lesson_progress;
create policy "own lesson progress" on public.lesson_progress
for all using ((user_id = auth.uid() and public.current_profile_role() = 'student') or public.is_admin())
with check (
  public.is_admin() or (
    user_id = auth.uid() and public.current_profile_role() = 'student'
    and exists (select 1 from public.lessons l where l.id = lesson_id)
  )
);

drop policy if exists "own enrollments" on public.track_enrollments;
create policy "own enrollments" on public.track_enrollments
for select using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "admin manage enrollments" on public.track_enrollments;
create policy "admin manage enrollments" on public.track_enrollments
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "own student activity" on public.student_activity_logs;
create policy "own student activity" on public.student_activity_logs
for select using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "own certificates" on public.certificates;
create policy "own certificates" on public.certificates
for select using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "own achievements" on public.student_achievements;
create policy "own achievements" on public.student_achievements
for select using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "published routes visible" on public.tour_routes;
create policy "published routes visible" on public.tour_routes
for select using (status = 'published' or public.is_admin());

drop policy if exists "admin guide manage routes" on public.tour_routes;
create policy "admin guide manage routes" on public.tour_routes
for all using (public.is_admin() or (guide_id = auth.uid() and public.current_profile_role() = 'guide'))
with check (public.is_admin() or (guide_id = auth.uid() and public.current_profile_role() = 'guide' and status <> 'published'));

drop policy if exists "bookings own or admin" on public.route_bookings;
create policy "bookings own or admin" on public.route_bookings
for all using (public.is_admin() or (tourist_id = auth.uid() and public.current_profile_role() = 'tourist'))
with check (public.is_admin() or (tourist_id = auth.uid() and public.current_profile_role() = 'tourist' and status = 'pending'));

drop policy if exists "favorites own" on public.route_favorites;
create policy "favorites own" on public.route_favorites
for all using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin())
with check ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "reviews public select" on public.route_reviews;
create policy "reviews public select" on public.route_reviews
for select using (true);

drop policy if exists "reviews own insert" on public.route_reviews;
create policy "reviews own insert" on public.route_reviews
for insert with check (user_id = auth.uid());

drop policy if exists "forum published select" on public.forum_topics;
create policy "forum published select" on public.forum_topics
for select using ((status = 'published' and public.has_approved_profile()) or public.is_admin());

drop policy if exists "forum authenticated insert" on public.forum_topics;
create policy "forum authenticated insert" on public.forum_topics
for insert with check (auth.uid() = author_id and public.has_approved_profile());

drop policy if exists "replies visible" on public.forum_replies;
create policy "replies visible" on public.forum_replies
for select using (exists (select 1 from public.forum_topics t where t.id = topic_id));

drop policy if exists "replies authenticated insert" on public.forum_replies;
create policy "replies authenticated insert" on public.forum_replies
for insert with check (auth.uid() = author_id and exists (select 1 from public.forum_topics t where t.id = topic_id));

drop policy if exists "notifications own" on public.notifications;
create policy "notifications own" on public.notifications
for all using ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin())
with check ((user_id = auth.uid() and public.has_approved_profile()) or public.is_admin());

drop policy if exists "impact admin select" on public.impact_metrics;
create policy "impact admin select" on public.impact_metrics
for select using (public.is_admin());

drop policy if exists "media own or admin" on public.media_assets;
create policy "media own or admin" on public.media_assets
for all using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

drop policy if exists "settings admin" on public.system_settings;
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
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public brand assets" on storage.objects;
create policy "public brand assets" on storage.objects
for select using (bucket_id in ('avatars', 'brand-assets', 'route-images', 'video-thumbnails'));

drop policy if exists "ECOTUCA private reads" on storage.objects;
create policy "ECOTUCA private reads" on storage.objects
for select to authenticated using (
  bucket_id in ('lesson-materials', 'certificates', 'documents') and (
    public.is_admin()
    or (public.has_approved_profile() and (storage.foldername(name))[1] = auth.uid()::text)
  )
);

drop policy if exists "authenticated upload own files" on storage.objects;
create policy "authenticated upload own files" on storage.objects
for insert to authenticated with check (
  (storage.foldername(name))[1] = auth.uid()::text and (
    (bucket_id = 'avatars' and public.has_approved_profile())
    or (bucket_id = 'lesson-materials' and public.current_profile_role() = 'teacher')
    or (bucket_id in ('lesson-materials', 'certificates', 'documents', 'brand-assets', 'route-images', 'video-thumbnails') and public.is_admin())
  )
);

drop policy if exists "owner update own files" on storage.objects;

drop policy if exists "owner delete own files" on storage.objects;
create policy "owner delete own files" on storage.objects
for delete to authenticated using (
  public.is_admin()
  or (public.has_approved_profile() and (storage.foldername(name))[1] = auth.uid()::text
      and bucket_id in ('avatars', 'lesson-materials'))
);


COMMIT;
