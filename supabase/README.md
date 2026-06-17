# Supabase Setup

## Order
1. Review and run `schema.sql`.
2. Review and run `rls.sql`.
3. Review and run `storage.sql`.
4. Create Auth users with the emails listed in `DEMO_USERS.md`.
5. Run `seed.sql` after Auth users exist or adjust profile UUIDs to match created users.

## Environment
Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional production write flags:
- `ENABLE_SUPABASE_SIGNUP_WRITES=true` enables `app/actions/signup-application.ts` to insert pending rows into `public.signup_applications` after the reviewed SQL is applied.

## Security Notes
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- RLS policies are an MVP starting point and must be reviewed before production.
- Demo data mirrors app mock data but is not a substitute for full migration testing.
- Signup writes are disabled by default. Do not enable `ENABLE_SUPABASE_SIGNUP_WRITES` until `signup_applications` schema/RLS and LGPD copy are reviewed.
