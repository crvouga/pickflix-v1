const db = require("./db");

const create = async ({ appUserId, todoData }) => {
  const { task } = todoData;
  const res = await db.query(
    `INSERT INTO todo(app_user_id, task) 
     VALUES($1, $2) 
     RETURNING *`,
    [appUserId, task]
  );
  return res.rows[0];
};

const get = async ({ appUserId }) => {
  const res = await db.query(
    `SELECT * FROM todo
     WHERE app_user_id=$1`,
    [appUserId]
  );
  return res.rows;
};

const update = async ({ id, todoData }) => {
  const res = await db.query(
    `UPDATE todo
     SET task=$1
     WHERE id=$2
     RETURNING *`,
    [todoData.task, id]
  );
  return res.rows[0];
};

const _delete = async ({ id }) => {
  const res = await db.query(
    `DELETE FROM todo 
     WHERE id=$1`,
    [id]
  );
  return res;
};

module.exports = { get, update, create, delete: _delete };
