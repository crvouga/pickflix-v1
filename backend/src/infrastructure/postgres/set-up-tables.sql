CREATE TABLE user_identity
(
  id uuid PRIMARY KEY NOT NULL,
  firebase_id TEXT NOT NULL UNIQUE
);

CREATE TABLE user_profile
(
  user_id uuid REFERENCES user_identity(id) UNIQUE,
  watchlist_list_id uuid REFERENCES list(id) UNIQUE,
  liked_list_id uuid REFERENCES list(id) UNIQUE,
);

CREATE TABLE list
(
  id uuid PRIMARY KEY NOT NULL,
  title TEXT NOT NULL
);

CREATE TABLE list_X_user
(
  user_id uuid REFERENCES user_identity(id),
  list_id uuid REFERENCES list(id)
);

-- CREATE TYPE tmdb_media_type AS ENUM
-- ('movie', 'tv', 'person');

CREATE TABLE list_x_tmdb_media
(
  list_id uuid REFERENCES list (id),
  tmdb_media_id VARCHAR(255),
  tmdb_media_type tmdb_media_type
);

-- Test table

CREATE TABLE todo_items
(
  id uuid PRIMARY KEY NOT NULL,
  user_id uuid REFERENCES user_identity(id),
  text_ TEXT,
  completed BOOLEAN,
  created_at TEXT,
  updated_at TEXT
);
