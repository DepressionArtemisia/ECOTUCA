# Signup Flow Spec

## Scope
Round 9 keeps signup as a local-only presentation flow. It does not write to Supabase, does not create Auth users and does not bypass future approval.

## Shared Behavior
- Engine: `features/signup/multistep-signup-flow.tsx`.
- Autosave: browser `localStorage`.
- Controls: continue, back, save draft, clear draft, edit review and submit visual confirmation.
- Field types: text, email, tel, date, textarea, select, radio, checkbox group and consent.
- Validation: required fields gate step advancement; email fields must include `@`.
- Conditional fields: supported through `showWhen` and `requiredWhen`.
- Review: values are shown before final visual confirmation.

## Storage Keys
- Student draft: `ecotuca:signup:student`.
- Teacher draft: `ecotuca:signup:teacher`.
- Guide draft: `ecotuca:signup:guide`.
- Tourist draft: `ecotuca:signup:tourist`.

## Student Flow
1. Dados pessoais: name, social name, preferred name, email, phone, birth date, city, community and territorial link.
2. Interesse e vinculo: motivation, guide interest, themes and project/community participation.
3. Formacao e disponibilidade: schooling, study status, schedule, digital access, previous experience and accessibility needs.
4. Responsavel e LGPD: minor status, conditional guardian fields, contact consent, data consent, image follow-up note and validation awareness.
5. Revisao/envio: summary and local visual confirmation.

## Teacher Flow
1. Identificacao: name, email, phone, institution, city and mini bio.
2. Atuacao pedagogica: areas, youth experience, territory experience, tracks and contribution formats.
3. Conteudos e materiais: content offer, video/PDF readiness, recording support, forum, evaluation and class support.
4. Disponibilidade e autorizacao: schedule, format, data consent, validation awareness and contact consent.
5. Revisao/envio: summary and local visual confirmation.

## Guide Flow
1. Identificacao territorial: name, public guide name, contact, city, base community, territorial link and mini bio.
2. Roteiros e especialidades: specialties, route types, main route proposal, safety limits and preferred audience.
3. Operacao e disponibilidade: schedule, languages, group size, duration, value reference, certificates and operational needs.
4. Autorizacoes e cuidado comunitario: contact/data consent, publication validation, image/privacy/community safety commitment and final notes.
5. Revisao/envio: summary and local visual confirmation.

## Tourist Flow
1. Dados do visitante: name, contact, origin, visitor profile and organization.
2. Interesse de roteiro: route interest, desired date, group size, age profile, themes and visit objective.
3. Preparo e cuidados: accessibility, restrictions, prior favela/periphery route experience, contact preference and logistics notes.
4. Consentimentos: contact/data consent, reservation awareness, territory respect and final message.
5. Revisao/envio: summary and local visual confirmation.

## Backend Mapping Later
- Create a server-side Zod schema per role before real submission.
- Store submitted signups as pending records tied to policy/consent versions.
- Create Auth users only after approval, or create locked accounts with explicit pending status if approved by the product/legal flow.
- Keep RLS role rules separate for student, teacher, guide, tourist and admin.
- Do not send sensitive data to Google Forms or Supabase before final LGPD copy is approved.
