-- Run only on an isolated Supabase instance, as the SQL owner. All fixtures roll back.
begin;

insert into auth.users (id, email) values
  ('e0000001-0000-4000-8000-000000000001', 'admin@rehearsal.invalid'),
  ('e0000002-0000-4000-8000-000000000002', 'pending@rehearsal.invalid'),
  ('e0000003-0000-4000-8000-000000000003', 'student@rehearsal.invalid'),
  ('e0000004-0000-4000-8000-000000000004', 'suspended@rehearsal.invalid'),
  ('e0000005-0000-4000-8000-000000000005', 'teacher@rehearsal.invalid');

insert into public.profiles (id, full_name, email, role, status) values
  ('e0000001-0000-4000-8000-000000000001', 'Coordenação de ensaio', 'admin@rehearsal.invalid', 'admin', 'approved'),
  ('e0000002-0000-4000-8000-000000000002', 'Perfil pendente', 'pending@rehearsal.invalid', 'student', 'pending'),
  ('e0000003-0000-4000-8000-000000000003', 'Aluno de ensaio', 'student@rehearsal.invalid', 'student', 'approved'),
  ('e0000004-0000-4000-8000-000000000004', 'Coordenação suspensa', 'suspended@rehearsal.invalid', 'admin', 'suspended'),
  ('e0000005-0000-4000-8000-000000000005', 'Professor de ensaio', 'teacher@rehearsal.invalid', 'teacher', 'approved');

insert into public.signup_applications (id, role, applicant_email, policy_version, consent_version)
values ('e1000001-0000-4000-8000-000000000001', 'student', 'signup@rehearsal.invalid', 'rehearsal', 'rehearsal');

insert into public.learning_tracks (id, title, status)
values ('e2000001-0000-4000-8000-000000000001', 'Trilha de ensaio', 'published');
insert into public.learning_modules (id, track_id, title)
values ('e2000002-0000-4000-8000-000000000001', 'e2000001-0000-4000-8000-000000000001', 'Módulo de ensaio');
insert into public.lessons (id, module_id, title, status) values
  ('e2000003-0000-4000-8000-000000000001', 'e2000002-0000-4000-8000-000000000001', 'Aula publicada', 'published'),
  ('e2000004-0000-4000-8000-000000000001', 'e2000002-0000-4000-8000-000000000001', 'Rascunho', 'draft');

set local role anon;
do $$
begin
  if exists (select 1 from public.lessons where id = 'e2000003-0000-4000-8000-000000000001') then
    raise exception 'Aula apareceu sem perfil aprovado';
  end if;
  if has_table_privilege(current_user, 'public.signup_applications', 'select') then
    raise exception 'A fila está acessível ao visitante';
  end if;
end
$$;

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', 'e0000002-0000-4000-8000-000000000002', true);
do $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and status = 'pending') then
    raise exception 'Perfil pendente não consegue consultar o próprio status';
  end if;
  if public.has_approved_profile() then raise exception 'Perfil pendente foi considerado aprovado'; end if;
  if exists (select 1 from public.signup_applications) then raise exception 'Perfil pendente enxerga a fila'; end if;
end
$$;

select set_config('request.jwt.claim.sub', 'e0000004-0000-4000-8000-000000000004', true);
do $$
begin
  if public.is_admin() then raise exception 'Coordenação suspensa conservou a permissão'; end if;
end
$$;

select set_config('request.jwt.claim.sub', 'e0000003-0000-4000-8000-000000000003', true);
do $$
begin
  if not exists (select 1 from public.lessons where id = 'e2000003-0000-4000-8000-000000000001') then
    raise exception 'Perfil aprovado não lê a aula publicada';
  end if;
  if exists (select 1 from public.lessons where id = 'e2000004-0000-4000-8000-000000000001') then
    raise exception 'Aluno enxerga rascunho';
  end if;
  if has_column_privilege(current_user, 'public.profiles', 'role', 'update')
     or has_column_privilege(current_user, 'public.profiles', 'status', 'update') then
    raise exception 'Permissão de edição de identidade indevida';
  end if;
  update public.profiles set bio = 'Editei meu perfil' where id = auth.uid();
  if not found then raise exception 'Edição de campo permitido falhou'; end if;
  insert into public.lesson_progress (user_id, lesson_id, progress_percent)
  values (auth.uid(), 'e2000003-0000-4000-8000-000000000001', 20);
end
$$;

select set_config('request.jwt.claim.sub', 'e0000005-0000-4000-8000-000000000005', true);
do $$
begin
  if public.current_profile_role() is distinct from 'teacher' then raise exception 'Professor aprovado não identificado'; end if;
  if exists (select 1 from public.lesson_progress where lesson_id = 'e2000003-0000-4000-8000-000000000001') then
    raise exception 'A professora vê progresso sem vínculo com turma';
  end if;
  insert into storage.objects (bucket_id, name) values ('lesson-materials', auth.uid()::text || '/material.pdf');
end
$$;

select set_config('request.jwt.claim.sub', 'e0000001-0000-4000-8000-000000000001', true);
do $$
begin
  if not public.review_signup_application('e1000001-0000-4000-8000-000000000001', 'approved') then
    raise exception 'Coordenação não conseguiu aprovar inscrição';
  end if;
  if public.review_signup_application('e1000001-0000-4000-8000-000000000001', 'rejected') then
    raise exception 'Decisão concorrente sobrescreveu a anterior';
  end if;
  if not exists (select 1 from public.signup_applications where id = 'e1000001-0000-4000-8000-000000000001'
    and status = 'approved' and reviewed_by = auth.uid() and reviewed_at is not null) then
    raise exception 'Registro da decisão ausente';
  end if;
  if not public.review_pending_profile('e0000002-0000-4000-8000-000000000002', 'approved') then
    raise exception 'Coordenação não conseguiu liberar o perfil';
  end if;
  if (select count(*) from public.access_review_events where reviewer_id = auth.uid()
      and subject_id in ('e1000001-0000-4000-8000-000000000001', 'e0000002-0000-4000-8000-000000000002')) <> 2 then
    raise exception 'Histórico de aprovações incompleto';
  end if;
end
$$;

select set_config('request.jwt.claim.sub', 'e0000002-0000-4000-8000-000000000002', true);
do $$ begin
  if not public.has_approved_profile() then raise exception 'Mudança de aprovação não foi aplicada'; end if;
end $$;

reset role;
rollback;
