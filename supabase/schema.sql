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
