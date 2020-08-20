const db = require("./db");

const create = async ({ appUserId, listData }) => {
  const { title } = listData;
  const res = await db.query(
    `INSERT INTO list (title) 
     VALUES ($1)
     RETURNING *`,
    [title]
  );
  const listId = res.rows[0].id;
  await db.query(
    `INSERT INTO list_app_user(list_id, app_user_id)
     VALUES ($1, $2)`,
    [listId, appUserId]
  );
  return true;
};

const read = async ({ appUserId }) => {
  return null;
};

module.exports = { create, read };
