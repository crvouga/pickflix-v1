const db = require("../db");

const create = async ({ firebaseId }) => {
  const res = await db.query(
    `INSERT INTO app_user (firebase_id) 
     VALUES ($1)
     RETURNING *
    `,
    [firebaseId]
  );
  const appUser = res.rows[0];
  return appUser;
};

const get = async ({ firebaseId }) => {
  const res = await db.query(
    `SELECT id FROM app_user 
     WHERE firebase_id=$1
    `,
    [firebaseId]
  );

  const appUser = res.rows[0];
  return appUser;
};

const getOrCreate = async ({ firebaseId }) => {
  const appUser = await get({ firebaseId });

  if (appUser) {
    return appUser;
  }
  return await create({ firebaseId });
};

module.exports = {
  getOrCreate,
  create,
  get,
};
