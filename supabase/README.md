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

## Security Notes
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- RLS policies are an MVP starting point and must be reviewed before production.
- Demo data mirrors app mock data but is not a substitute for full migration testing.
