#!/usr/bin/env bash
set -euo pipefail
umask 077

root=/opt/ecotuca
source "$root/host.env"
origin="https://$ECOTUCA_HOST"
exec 9>"$root/deploy.lock"
flock -w 900 9
route="$root/edge/upstream.caddy"
state="$root/current"
previous="$root/previous"
health() { curl -fsS --max-time 5 "$1/api/health"; }
has_release() { health "$1" | grep -Fq "\"release\":\"$2\""; }
reload_edge() { docker exec ecotuca-edge caddy reload --config /etc/ecotuca/Caddyfile --adapter caddyfile; }

activate() {
  local port="$1" sha="$2" old
  old=$(cat "$route")
  printf 'reverse_proxy 127.0.0.1:%s\n' "$port" > "$route.new"
  mv "$route.new" "$route"
  if ! reload_edge || ! has_release "$origin" "$sha"; then
    printf '%s\n' "$old" > "$route.new"
    mv "$route.new" "$route"
    reload_edge
    echo "Public health check failed; restored previous route" >&2
    return 1
  fi
  [[ ! -f "$state" ]] || cp "$state" "$previous"
  printf '%s %s\n' "$port" "$sha" > "$state.new"
  mv "$state.new" "$state"
  printf '%s %s %s\n' "$(date -u +%FT%TZ)" "$sha" "$port" >> "$root/releases.log"
  printf 'Published %s at %s\n' "$sha" "$origin"
}

if [[ ${1:-} == rollback ]]; then
  [[ $# == 1 && -f "$previous" ]] || exit 2
  read -r port sha < "$previous"
  has_release "http://127.0.0.1:$port" "$sha"
  activate "$port" "$sha"
  exit
fi

[[ ${1:-} == release && $# == 3 && $2 =~ ^[0-9a-f]{40}$ && $3 =~ ^[0-9a-f]{64}$ ]] || exit 2
sha="$2"
digest="$3"
if [[ -f "$state" ]]; then
  read -r current_port current_sha < "$state"
  if [[ "$current_sha" == "$sha" && ${ECOTUCA_REBUILD:-0} != 1 ]]; then
    cat >/dev/null
    has_release "$origin" "$sha"
    exit
  fi
else
  current_port=3101
fi
port=3101
[[ "$current_port" == 3101 ]] && port=3102
name="ecotuca-app-$port"

work=$(mktemp -d "$root/releases/incoming.XXXXXX")
cleanup() { rm -rf -- "$work"; }
trap cleanup EXIT
head -c 250000001 > "$work/source.tar.gz"
[[ $(stat -c %s "$work/source.tar.gz") -le 250000000 ]] || exit 2
printf '%s  %s\n' "$digest" "$work/source.tar.gz" | sha256sum --check --status
mkdir "$work/source"
python3 - "$work/source.tar.gz" "$work/source" <<'PY'
import pathlib, sys, tarfile
with tarfile.open(sys.argv[1], "r:gz") as archive:
    entries = archive.getmembers()
    if len(entries) > 20000 or sum(member.size for member in entries) > 700_000_000:
        raise SystemExit("Unexpected source archive size")
    for member in entries:
        name = pathlib.PurePosixPath(member.name)
        if name.is_absolute() or ".." in name.parts or not (member.isdir() or member.isfile()):
            raise SystemExit("Unexpected source entry")
    archive.extractall(sys.argv[2], members=entries, filter="data")
PY

anon_key=$(sed -n 's/^ANON_KEY=//p' "$root/supabase/.env")
[[ -n "$anon_key" ]]
docker build --label "org.opencontainers.image.revision=$sha" --tag "ecotuca-app:$sha" \
  --build-arg "NEXT_PUBLIC_SITE_URL=$origin" \
  --build-arg "NEXT_PUBLIC_SUPABASE_URL=$origin" \
  --build-arg "NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon_key" "$work/source"

if docker container inspect "$name" >/dev/null 2>&1; then
  docker rm -f "$name" >/dev/null
fi
docker run -d --name "$name" --restart unless-stopped --init \
  --security-opt no-new-privileges --cap-drop ALL \
  --log-opt max-size=10m --log-opt max-file=3 \
  -p "127.0.0.1:$port:3000" --env-file "$root/app-runtime.env" \
  -e "ECOTUCA_RELEASE=$sha" "ecotuca-app:$sha" >/dev/null

for attempt in {1..40}; do
  if has_release "http://127.0.0.1:$port" "$sha" 2>/dev/null; then
    activate "$port" "$sha"
    exit 0
  fi
  sleep 2
done
echo "New container failed its health check; active route was kept" >&2
docker logs --tail 20 "$name" >&2
exit 1
