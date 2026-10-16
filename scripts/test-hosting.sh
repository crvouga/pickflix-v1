#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
suffix="$(date +%s)-$$"
network="pickflix-check-$suffix"
postgres="pickflix-postgres-$suffix"
app="pickflix-app-$suffix"
image="pickflix-check:$suffix"
admin_password="$(openssl rand -hex 24)"
cleanup() {
  docker logs "$app" 2>/dev/null || true
  docker rm -f "$app" "$postgres" >/dev/null 2>&1 || true
  docker network rm "$network" >/dev/null 2>&1 || true
  docker image rm "$image" >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker build -t "$image" .
docker network create "$network" >/dev/null
docker run -d --name "$postgres" --network "$network" \
  -e POSTGRES_PASSWORD="$admin_password" -e POSTGRES_DB=pickflix_integration \
  -p 127.0.0.1::5432 postgres:17-alpine -c wal_level=logical >/dev/null
for attempt in {1..60}; do
  if docker exec "$postgres" pg_isready -h 127.0.0.1 -U postgres >/dev/null 2>&1; then break; fi
  sleep 1
done
runtime="postgres://postgres:$admin_password@$postgres:5432/pickflix_integration?sslmode=disable"
docker run --rm --network "$network" -e PICKFLIX_SMOKE_DATABASE_URL="$runtime" \
  "$image" node scripts/test-migrations.js
docker run -d --name "$app" --network "$network" \
  -p 127.0.0.1::9000 \
  -e DATABASE_URL="$runtime" \
  -e YOUTUBE_API_KEY=test -e TMDB_API_READ_ACCESS_TOKEN=test \
  -e RESEND_API_KEY=re_test -e EMAIL_FROM=test@example.com \
  -e PICKFLIX_SECRET=ci-app-secret -e PICKFLIX_SESSION_SECRET=ci-session-secret \
  "$image" >/dev/null
app_port="$(docker port "$app" 9000/tcp | cut -d: -f2)"
ready=false
for attempt in {1..60}; do
  if curl --fail --silent "http://127.0.0.1:$app_port/health" > /dev/null; then
    ready=true
    break
  fi
  if [ "$(docker inspect -f '{{.State.Running}}' "$app")" != true ]; then break; fi
  sleep 1
done
[ "$ready" = true ]
curl --fail --silent "http://127.0.0.1:$app_port/" | python3 -c 'import sys; assert "<html" in sys.stdin.read().lower()'
docker exec "$app" node -e 'require("assert").strict.equal(process.versions.node.split(".")[0], "22")'
docker exec "$postgres" psql -U postgres -d pickflix_integration -v ON_ERROR_STOP=1 \
  -c 'CREATE PUBLICATION powersync FOR ALL TABLES'
docker exec -e PICKFLIX_SMOKE_DATABASE_URL="$runtime" "$app" node scripts/smoke-hosting.js
