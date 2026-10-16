#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${PICKFLIX_SCHEMA_FILE:?Set PICKFLIX_SCHEMA_FILE to workspace pickflix-schema.hcl}"
test -f "$PICKFLIX_SCHEMA_FILE"
command -v atlas >/dev/null
suffix="$(date +%s)-$$"
network="pickflix-check-$suffix"
postgres="pickflix-postgres-$suffix"
app="pickflix-app-$suffix"
image="pickflix-check:$suffix"
admin_password="$(openssl rand -hex 24)"
runtime_password="$(openssl rand -hex 24)"
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
  -p 127.0.0.1::5432 postgres:17-alpine >/dev/null
for attempt in {1..60}; do
  if docker exec "$postgres" pg_isready -U postgres >/dev/null 2>&1; then break; fi
  sleep 1
done
port="$(docker port "$postgres" 5432/tcp | cut -d: -f2)"
admin="postgres://postgres:$admin_password@127.0.0.1:$port/pickflix_integration?sslmode=disable"
# All DDL here is confined to an ephemeral local test database.
atlas schema apply --url "$admin" --schema pickflix --to "file://$PICKFLIX_SCHEMA_FILE" --auto-approve
docker exec -i "$postgres" psql -U postgres -d pickflix_integration -v ON_ERROR_STOP=1 -v runtime_password="$runtime_password" <<'SQL'
CREATE ROLE runtime LOGIN PASSWORD :'runtime_password';
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
GRANT CONNECT ON DATABASE pickflix_integration TO runtime;
GRANT USAGE ON SCHEMA pickflix TO runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA pickflix TO runtime;
SQL
runtime="postgres://runtime:$runtime_password@$postgres:5432/pickflix_integration?sslmode=disable"
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
docker cp backend/scripts "$app:/app/backend/scripts"
docker exec -e PICKFLIX_SMOKE_DATABASE_URL="$runtime" "$app" node scripts/smoke-hosting.js
