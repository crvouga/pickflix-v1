# Pickflix

Explore movies, watch trailers, write reviews, and build collaborative lists.
React/Redux frontend, Express REST API, PostgreSQL persistence.

Production: https://pickflix.chrisvouga.dev

## Ownership and hosting

This repository owns application code, database migrations, the production image,
validation and its publisher workflow. The shared platform at
[crvouga/workspace](https://github.com/crvouga/workspace) provides the database,
Railway hosting, domain/DNS, secret delivery and generic repository policy.
The publisher calls the platform's reusable image build/deploy workflow after
Pickflix's `Required` check passes. The platform must not overwrite this workflow
or reconcile the application's tables.

## Database migrations

Production runs `backend/migrations/*.sql` before accepting requests. A transaction
and advisory lock serialize concurrent startups. `pickflix.schema_migrations`
records filenames and SHA-256 checksums; applied files must never be edited or
removed. Add a numbered SQL file for subsequent changes. The image includes all
migration files. No external schema checkout or Atlas installation is required.

The baseline adopts existing tables in place. The primary-key migration adds
replica identity for published UPDATE/DELETE operations, fixing list creation
when a publication such as `powersync` includes all tables. Null or duplicate IDs
abort the transaction without rewriting data. All DDL is confined to `pickflix`;
application connections use `search_path=pickflix` without a `public` fallback.
The database role must own existing Pickflix tables and have permission to create
its schema and objects. Production currently uses the shared owner credential.

Before the ownership handoff, apply the platform change that forgets the old
schema resources with `destroy = false`; it preserves the schema and all rows.
Do not run the old Atlas desired state after the app's primary keys are installed:
it would attempt to remove them. Application startup then adopts the existing
schema and applies the missing keys. No data export or reset is needed.

## Local development

Use Node 22. Run `npm ci --legacy-peer-deps` in `backend` and `frontend`, then
`npm run dev` at the root. Backend compilation runs after install. The frontend
uses Vite; production serves its `frontend/dist` build.

Provide runtime variables without committing values:

- `DATABASE_URL`: PostgreSQL URL, with ownership permissions for migrations.
- `TMDB_API_READ_ACCESS_TOKEN`, `YOUTUBE_API_KEY`
- `RESEND_API_KEY`; `EMAIL_FROM` must use a verified Resend domain.
- `PICKFLIX_SECRET`, `PICKFLIX_SESSION_SECRET`: independent app/session secrets,
  delivered through the platform's generic secret registry.
- `NODE_ENV=production`, `PORT=9000`, `REPOSITORY_IMPLEMENTATION=postgres`

Development and unit tests retain their disposable database setup helpers.
Email remains behind `IEmailLogic`; production and development select Resend.

## Validation before shipping

Every pull request and merge queue revision runs `Check / Required`: frozen
backend install, TypeScript compilation, backend unit tests, frontend install
and build, and a Docker production test. Run the image test locally with Docker:

```sh
npm run test:hosting
```

The test uses an ephemeral PostgreSQL database and no production credentials or
external APIs. It exercises legacy adoption, null/duplicate rollback, concurrent
migrations, idempotence, and published updates/deletes on all application tables.
A conflicting `public.lists` table remains untouched. It then verifies first-start
bootstrap through the image entrypoint, Node 22, `/health`, the frontend, movie
list/item writes and persistent sessions with a database-wide publication active.
