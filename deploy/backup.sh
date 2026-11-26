#!/usr/bin/env bash
set -euo pipefail
umask 077

root=/opt/ecotuca
backup="$root/backups/$(date -u +%Y%m%dT%H%M%SZ)"
exec 9>"$root/backup.lock"
flock -n 9
install -d -m 0700 "$backup"
trap 'rm -f -- "$backup/database.dump.partial" "$backup/storage.tar.gz.partial"' EXIT
docker exec supabase-db pg_dump -U postgres -Fc postgres > "$backup/database.dump.partial"
docker exec -i supabase-db pg_restore --list < "$backup/database.dump.partial" >/dev/null
tar -czf "$backup/storage.tar.gz.partial" -C "$root/supabase/volumes" storage
tar -tzf "$backup/storage.tar.gz.partial" >/dev/null
mv "$backup/database.dump.partial" "$backup/database.dump"
mv "$backup/storage.tar.gz.partial" "$backup/storage.tar.gz"
(cd "$backup" && sha256sum database.dump storage.tar.gz > SHA256SUMS)
find "$root/backups" -mindepth 2 -maxdepth 2 -type f -mtime +14 -delete
find "$root/backups" -mindepth 1 -maxdepth 1 -type d -empty -mtime +14 -delete
