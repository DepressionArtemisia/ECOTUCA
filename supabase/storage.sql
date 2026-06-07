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
