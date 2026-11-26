#!/usr/bin/env bash
set -euo pipefail
umask 077

root=/opt/ecotuca
ref=0ee83da5e5c5c406747ffc35d293c81c144ba61f
host=${1:?usage: bootstrap-vps.sh hostname}
[[ "$host" =~ ^[a-z0-9][a-z0-9.-]+$ ]] || exit 2

install -d -m 0700 "$root" "$root/edge" "$root/releases" "$root/backups"
if [[ ! -d "$root/supabase" ]]; then
  work=$(mktemp -d "$root/supabase-install.XXXXXX")
  git -C "$work" init -q
  git -C "$work" remote add origin https://github.com/supabase/supabase.git
  git -C "$work" sparse-checkout set docker
  git -C "$work" -c protocol.version=2 fetch -q --depth=1 --filter=blob:none origin "$ref"
  git -C "$work" checkout -q --detach FETCH_HEAD
  git -C "$work" rev-parse HEAD > "$work/docker/.upstream-revision"
  # Docker mount consumers run as service users inside their containers.
  find "$work/docker/volumes" -type d -exec chmod a+rx {} +
  find "$work/docker/volumes" -type f -exec chmod a+r {} +
  mv "$work/docker" "$root/supabase"
  rm -rf -- "$work"
fi

cd "$root/supabase"
if [[ ! -f .env ]]; then
  install -m 0600 .env.example .env
  sh utils/generate-keys.sh --update-env >/dev/null
  sed -i \
    -e "s|^SUPABASE_PUBLIC_URL=.*|SUPABASE_PUBLIC_URL=https://$host|" \
    -e "s|^API_EXTERNAL_URL=.*|API_EXTERNAL_URL=https://$host/auth/v1|" \
    -e "s|^SITE_URL=.*|SITE_URL=https://$host|" \
    -e "s|^ADDITIONAL_REDIRECT_URLS=.*|ADDITIONAL_REDIRECT_URLS=https://$host/nova-senha|" \
    -e 's|^API_GW_HTTP_PORT=.*|API_GW_HTTP_PORT=127.0.0.1:8100|' \
    -e 's|^KONG_HTTP_PORT=.*|KONG_HTTP_PORT=127.0.0.1:8100|' \
    -e 's|^DISABLE_SIGNUP=.*|DISABLE_SIGNUP=true|' \
    -e 's|^ENABLE_PHONE_SIGNUP=.*|ENABLE_PHONE_SIGNUP=false|' \
    -e 's|^ENABLE_PHONE_AUTOCONFIRM=.*|ENABLE_PHONE_AUTOCONFIRM=false|' \
    -e 's|^SMTP_HOST=.*|SMTP_HOST=127.0.0.1|' \
    -e 's|^SMTP_PORT=.*|SMTP_PORT=25|' \
    -e 's|^STUDIO_DEFAULT_PROJECT=.*|STUDIO_DEFAULT_PROJECT=ECOTUCA|' .env
  chmod 600 .env
  rm -f .env.old
fi
cat > "$root/supabase/ecotuca.override.yml" <<'YAML'
services:
  api-gw:
    ports: !override
      - "127.0.0.1:8100:8000"
  auth:
    environment:
      GOTRUE_PASSWORD_MIN_LENGTH: 12
  supavisor:
    ports: !reset []
YAML
docker compose -p ecotuca-db -f docker-compose.yml -f docker-compose.kong.yml -f ecotuca.override.yml up -d --wait --wait-timeout 300 api-gw auth rest storage meta

if [[ ! -f "$root/app-runtime.env" ]]; then
  printf '%s\n' 'ENABLE_SUPABASE_SIGNUP_WRITES=false' > "$root/app-runtime.env"
fi
if [[ ! -f "$root/edge/upstream.caddy" ]]; then
  printf '%s\n' 'respond "ECOTUCA em prepara??o" 503' > "$root/edge/upstream.caddy"
fi
printf 'ECOTUCA_HOST=%s\n' "$host" > "$root/host.env"
