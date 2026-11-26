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
