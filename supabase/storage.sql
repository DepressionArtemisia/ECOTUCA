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
