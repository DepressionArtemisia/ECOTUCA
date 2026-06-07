# Deploy

## Local
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev -- -p 3020`
3. Open `http://localhost:3020/demo`

Port 3000 was occupied by another local project during verification, so 3020 is the current working port.

## Environment
Use `.env.local` locally and `.env.example` as documentation. Required public variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Server-only:
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ACCESS_TOKEN`
- deployment/provider tokens as needed.

## Vercel
- Import the repository.
- Configure env vars without exposing service role to client.
- Run `npm run build`.

## Future VPS
- Add Dockerfile and Nginx/Traefik config after the MVP.
- Keep Supabase managed unless a future architecture decision changes that.

## Pre-Publish Checklist
- `npm run lint`
- `npm run build`
- Verify `/`, `/demo`, `/demo-mobile`, `/app/aluno`, `/app/admin`, `/roteiros/serra-da-misericordia`.
