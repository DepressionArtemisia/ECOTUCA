# Signup Flow Spec

## Scope
Round 8 implements complete visual signup flows without writing to Supabase.

## Storage Keys
- Student draft: `ecotuca:signup:student`
- Teacher draft: `ecotuca:signup:teacher`

## Student Flow
1. Identidade: name, email, phone, birth date, neighborhood/community, guardian if needed.
2. Formacao: schooling, school/institution, availability, motivation.
3. Territorio: territory experience, preferred theme, accessibility/support needs.
4. Termos: data analysis consent, contact consent, image authorization note.
5. Revisao: review card and visual confirmation.

## Teacher Flow
1. Identidade: name, email, phone, area, organization.
2. Experiencia: bio, class themes, territory experience, portfolio.
3. Turmas: availability, format, resources/materials.
4. Termos: data consent, content curation consent, contact consent.
5. Revisao: review card and visual confirmation.

## Controls
- Autosave on local draft.
- Manual `Salvar rascunho`.
- `Limpar` clears visible draft and returns to first step.
- Required fields gate step advancement.
- Confirming does not create an Auth user and does not write to Supabase.

## Next Integration
- Convert visual confirmation to pending profile creation only after reviewed Supabase Auth/RLS flow is approved.
- Map consent fields to explicit legal copy and versioned policy references.
- Add server-side validation with Zod and React Hook Form when real submission is enabled.
