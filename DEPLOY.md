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
- Production project: `brunos-projects-0f78c3da/ecotuca`.
- Production URL: `https://ecotuca.vercel.app`.
- Latest inspected deployment: `dpl_QiRR8SD3fBTqsMHPEraeE8CE1PF4`.
- Deployment status: Ready.
- Build command: `npm run build`.
- `.vercelignore` excludes docs, PDFs, extraction source crops/previews and other non-runtime files.
- Configure Supabase env vars in the Vercel dashboard if/when the real backend should be used in production. Do not expose service role to client code.

Verified remote routes:
- `https://ecotuca.vercel.app`
- `https://ecotuca.vercel.app/demo`
- `https://ecotuca.vercel.app/roteiros/serra-da-misericordia`

## Future VPS
- Add Dockerfile and Nginx/Traefik config after the MVP.
- Keep Supabase managed unless a future architecture decision changes that.

## Pre-Publish Checklist
- `npm run lint`
- `npm run build`
- Verify `/`, `/demo`, `/demo-mobile`, `/app/aluno`, `/app/admin`, `/roteiros/serra-da-misericordia`.
