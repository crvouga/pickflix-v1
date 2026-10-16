-- Published UPDATE/DELETE operations need a replica identity on every table.
DO $$
DECLARE
  table_name text;
  key_columns text[];
BEGIN
  FOREACH table_name IN ARRAY ARRAY['auto_lists', 'list_items', 'lists', 'permissions',
      'tmdb_discover_tags', 'reviews', 'review_votes', 'credentials', 'users']
  LOOP
    SELECT array_agg(a.attname::text ORDER BY k.position) INTO key_columns
      FROM pg_constraint c
      CROSS JOIN LATERAL unnest(c.conkey) WITH ORDINALITY AS k(attnum, position)
      JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = k.attnum
      WHERE c.conrelid = format('pickflix.%I', table_name)::regclass AND c.contype = 'p';
    IF key_columns IS NULL THEN
      -- Null or duplicate IDs fail the transaction; no data is rewritten.
      EXECUTE format('ALTER TABLE pickflix.%I ADD PRIMARY KEY (id)', table_name);
    ELSIF key_columns <> ARRAY['id']::text[] THEN
      RAISE EXCEPTION 'Unexpected primary key on pickflix.%', table_name;
    END IF;
  END LOOP;
END
$$;
