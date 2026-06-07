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
