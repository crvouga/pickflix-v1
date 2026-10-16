-- Adopt existing tables in place; never replace or truncate application data.
CREATE TABLE IF NOT EXISTS pickflix.auto_lists (
  "id" text,
  "auto_list_key" text,
  "owner_id" text
);

CREATE TABLE IF NOT EXISTS pickflix.list_items (
  "id" text,
  "user_id" text,
  "list_id" text,
  "created_at" bigint,
  "media_id" text
);

CREATE TABLE IF NOT EXISTS pickflix.lists (
  "id" text,
  "title" text,
  "description" text,
  "created_at" bigint,
  "updated_at" bigint,
  "owner_id" text
);

CREATE TABLE IF NOT EXISTS pickflix.permissions (
  "permission_type" text,
  "id" text,
  "user_id" text,
  "list_id" text,
  "created_at" bigint
);

CREATE TABLE IF NOT EXISTS pickflix.tmdb_discover_tags (
  "id" text,
  "tags_by_id" text,
  "key" text,
  "user_id" text,
  "created_at" bigint
);

CREATE TABLE IF NOT EXISTS pickflix.reviews (
  "id" text,
  "author_id" text,
  "content" text,
  "rating" bigint,
  "media_id" text,
  "created_at" bigint,
  "updated_at" bigint
);

CREATE TABLE IF NOT EXISTS pickflix.review_votes (
  "id" text,
  "user_id" text,
  "review_id" text,
  "vote_value" text
);

CREATE TABLE IF NOT EXISTS pickflix.credentials (
  "id" text,
  "user_id" text,
  "credential_type" text,
  "password_hash" text,
  "verified_at" bigint
);

CREATE TABLE IF NOT EXISTS pickflix.users (
  "id" text,
  "username" text,
  "email_address" text,
  "display_name" text
);

CREATE TABLE IF NOT EXISTS pickflix.session (
  "sid" varchar(255) NOT NULL,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  PRIMARY KEY (sid)
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON pickflix.session (expire);
