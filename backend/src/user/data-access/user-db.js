const { makeUser } = require("../business-entities");

const toEntity = (row) => {
  if (!row) {
    return null;
  }
  const { id, firebase_id } = row;
  return makeUser({
    id,
    credentials: {
      firebaseId: firebase_id,
    },
  });
};

const buildUserDb = ({ makeDb }) => {
  const insert = async (user) => {
    const { id, credentials } = user;
    const { firebaseId } = credentials;
    const query = `
      INSERT INTO user_identity (id, firebase_id)
      VALUES ('${id}', '${firebaseId}')
      RETURNING *`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(toEntity)[0];
  };

  const findAll = async () => {
    const query = `SELECT * FROM user_identity`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(toEntity);
  };

  const findById = async ({ id }) => {
    const query = `SELECT * FROM user_identity WHERE id='${id}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(toEntity)[0];
  };

  const findByCredentials = async ({ credentials }) => {
    const { firebaseId } = credentials;
    const query = `SELECT * FROM user_identity WHERE firebase_id='${firebaseId}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(toEntity)[0];
  };

  const remove = async ({ id }) => {
    const query = `DELETE FROM user_identity WHERE id='${id}'`;
    const db = await makeDb();
    await db.query(query);
    return true;
  };

  return {
    insert,
    findAll,
    findById,
    findByCredentials,
    remove,
  };
};

module.exports = { buildUserDb };
