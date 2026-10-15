// Run only against a disposable database prepared with workspace's Atlas HCL.
const assert = require('assert').strict;
const { randomUUID } = require('crypto');

async function main() {
  const url = process.env.PICKFLIX_SMOKE_DATABASE_URL;
  assert(url && new URL(url).pathname.endsWith('_integration'),
    'PICKFLIX_SMOKE_DATABASE_URL must name a disposable *_integration database');
  Object.assign(process.env, {
    NODE_ENV: 'production', DATABASE_URL: url,
    YOUTUBE_API_KEY: 'test', TMDB_API_READ_ACCESS_TOKEN: 'test',
    RESEND_API_KEY: 're_test', EMAIL_FROM: 'test@example.com',
    PICKFLIX_SECRET: 'smoke-app-secret', PICKFLIX_SESSION_SECRET: 'smoke-session-secret',
  });
  const { buildApp } = require('../build/app/build');
  const { POSTGRES_PRODUCTION_CONFIG } = require('../build/app/build/build-production');
  const { PostgresDatabase } = require('../build/app/persistence/postgres/database.postgres');
  const { buildSessionStorePostgres } = require('../build/app/express/session-store');
  const database = new PostgresDatabase(POSTGRES_PRODUCTION_CONFIG);
  let store;
  const sid = randomUUID();
  try {
    const { app } = await buildApp();
    const response = await require('supertest')(app).get('/health');
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
    const [{ schema }] = await database.query('SELECT current_schema() AS schema');
    assert.equal(schema, 'pickflix');
    const client = await database.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO users (id, username) VALUES ($1, $2)', [sid, 'hosting-smoke']);
      const result = await client.query('SELECT username FROM pickflix.users WHERE id = $1', [sid]);
      assert.equal(result.rows[0].username, 'hosting-smoke');
    } finally {
      await client.query('ROLLBACK');
      client.release();
    }
    store = await buildSessionStorePostgres(database);
    const session = { cookie: { expires: new Date(Date.now() + 60000) }, marker: sid };
    await new Promise((resolve, reject) => store.set(sid, session, err => err ? reject(err) : resolve()));
    const saved = await new Promise((resolve, reject) => store.get(sid, (err, value) => err ? reject(err) : resolve(value)));
    assert.equal(saved.marker, sid);
    console.log('PASS: production builder, health, pickflix CRUD and persistent sessions');
  } finally {
    if (store) {
      await new Promise((resolve, reject) => store.destroy(sid, err => err ? reject(err) : resolve()));
      store.close();
    }
    await database.pool.end();
  }
}
main().then(() => process.exit(0), err => { console.error(err); process.exit(1); });
