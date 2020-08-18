const R = require("ramda");
const db = require("../db");

const create = async (todoData) => {
  const { appUserId, task } = {
    ...todoData,
    task: R.take(255, R.trim(todoData.task)),
  };

  const res = await db.query(
    `INSERT INTO todo(app_user_id, task) 
     VALUES($1, $2) 
     RETURNING *`,
    [appUserId, task]
  );
  return res.rows[0];
};

const getAll = async ({ appUserId }) => {
  const res = await db.query(
    `SELECT * FROM todo
     WHERE app_user_id=$1`,
    [appUserId]
  );
  return res.rows;
};

const _delete = async ({ id }) => {
  const res = await db.query(
    `DELETE FROM todo 
     WHERE id=$1`,
    [id]
  );
  return true;
};

module.exports = { create, delete: _delete, getAll };
