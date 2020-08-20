const db = require("./db");

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
    `SELECT * FROM app_user 
     WHERE firebase_id=$1
    `,
    [firebaseId]
  );

  const appUser = res.rows[0];
  return appUser;
};

const _delete = async ({ id }) => {
  const res = await db.query(
    `DELETE FROM app_user 
     WHERE id=$1`,
    [id]
  );
  return res;
};

module.exports = {
  delete: _delete,
  create,
  get,
};
