const TodoModel = require("../data/Todo");

const create = async ({ appUserId, todoData }) => {
  const todo = await TodoModel.create({ appUserId, todoData });
  return todo;
};

const get = async ({ appUserId }) => {
  const results = await TodoModel.get({ appUserId });

  return results;
};

const _delete = async ({ id }) => {
  await TodoModel.delete({ id });
};

const update = async ({ id, todoData }) => {
  const todo = await TodoModel.update({ id, todoData });
  return todo;
};

module.exports = { update, delete: _delete, get, create };
