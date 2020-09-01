const { makeTodoItem } = require("../business-entities");

const rowToEntity = (row) => {
  if (!row) {
    return null;
  }
  const { id, user_id, text_, completed, created_at, updated_at } = row;
  const todoItem = makeTodoItem({
    id,
    userId: user_id,
    text: text_,
    completed,
    createdAt: new Date(Date.parse(created_at)),
    updatedAt: new Date(Date.parse(updated_at)),
  });
  return todoItem;
};

module.exports.buildTodoItemsDb = ({ makeDb }) => {
  const insert = async (todoItem) => {
    const { id, userId, text, completed, createdAt, updatedAt } = todoItem;

    const query = `
      INSERT INTO todo_items 
        (
          id, 
          user_id, 
          text_, 
          completed, 
          created_at, 
          updated_at
        )
      VALUES
        (
          '${id}', 
          '${userId}', 
          '${text}', 
          ${completed},
          '${createdAt.toISOString()}', 
          '${updatedAt.toISOString()}'
        )
      RETURNING *`;

    const db = await makeDb();
    const res = await db.query(query);

    return res.rows.map(rowToEntity)[0];
  };

  const remove = async ({ id }) => {
    const query = `
      DELETE FROM todo_items
      WHERE id='${id}'`;
    const db = await makeDb();
    await db.query(query);
    return true;
  };

  const update = async (todoItem) => {
    const { id, text, completed } = todoItem;

    const query = `
      UPDATE todo_items 
      SET
        text_ = '${text}', 
        completed = ${completed}
      WHERE
        id='${id}'
      RETURNING *`;

    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findById = async ({ id }) => {
    const query = `
      SELECT * FROM todo_items WHERE id='${id}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findAllByUserId = async ({ userId }) => {
    const query = `
      SELECT * FROM todo_items
      WHERE user_id='${userId}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity);
  };

  return {
    insert,
    remove,
    update,
    findById,
    findAllByUserId,
  };
};
