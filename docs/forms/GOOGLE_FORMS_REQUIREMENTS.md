# Google Forms Requirements

## Purpose
Use Google Forms only as a temporary operational fallback for collecting interest while Supabase Auth/RLS and the production approval flow are finalized.

## Rules
- Do not include service keys, API tokens or private credentials.
- Do not ask for unnecessary sensitive data.
- Do not use Google Forms as the final user account system.
- Add a clear consent intro explaining that the form is for analysis/contact and does not guarantee approval or booking.
- Keep separate forms per profile to avoid mixing legal copy and operational routing.

## Recommended Forms

### Student
- Nome completo.
- Nome social or preferred name.
- E-mail.
- WhatsApp.
- Data de nascimento.
- Cidade/UF.
- Bairro/comunidade.
- Vinculo com o Complexo do Alemao.
- Motivacao.
- Interesse em ser guia.
- Temas de interesse.
- Escolaridade.
- Disponibilidade.
- Acesso a celular/internet.
- Acessibilidade or support needs.
- Menor de idade.
- Guardian fields when minor.
- Contact/data consent.
- Validation awareness.

### Teacher
- Nome completo.
- E-mail.
- WhatsApp.
- Instituicao/organizacao.
- Cidade/UF.
- Mini bio.
- Areas de atuacao.
- Experiencia com jovens.
- Experiencia com territorio/projetos sociais.
- Trilhas where the teacher can contribute.
- Content/material readiness.
- Availability.
- Data/contact/curation consent.

### Guide
- Nome completo.
- Nome publico de guia.
- E-mail.
- WhatsApp.
- Bairro/comunidade de base.
- Vinculo territorial.
- Mini bio.
- Especialidades.
- Roteiros que pode conduzir.
- Roteiro principal proposed.
- Safety/community limits.
- Languages.
- Availability.
- Group size and duration.
- Certificates.
- Community care and validation consent.

### Tourist
- Nome completo.
- E-mail.
- WhatsApp.
- City/state/country of origin.
- Visitor profile.
- Route of interest.
- Desired date.
- Group size.
- Age profile.
- Themes of interest.
- Visit objective.
- Accessibility/restrictions.
- Contact preference.
- Data/contact/territory respect consent.

## Spreadsheet Columns
For every form response, store:
- `created_at`
- `profile_type`
- `status` (`new`, `in_review`, `contacted`, `approved`, `rejected`, `archived`)
- `assigned_to`
- `notes`
- `source` (`google_forms`)
- `consent_version`
- original response columns

## Review Workflow
1. New response lands in a profile-specific sheet.
2. Coordinator reviews required fields and consent.
3. Coordinator marks status and adds notes.
4. Approved profiles are migrated manually or through a reviewed script into the production system.
5. Real Auth user creation happens only after the production policy is approved.

## Copy Requirements
- Use plain language.
- Make it clear that student/teacher/guide participation depends on approval.
- Make it clear that tourist submission is an interest request, not a confirmed booking.
- Add image authorization as a later/separate document unless the legal copy is finalized.
