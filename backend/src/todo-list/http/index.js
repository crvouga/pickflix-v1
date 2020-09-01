const { authenticateRequest } = require("../../user/http");

const {
  addItem,
  removeItem,
  editItem,
  listItems,
} = require("../business-logic");

const { buildGetTodo } = require("./get-todo");
const { buildPostTodo } = require("./post-todo");
const { buildPatchTodo } = require("./patch-todo");
const { buildDeleteTodo } = require("./delete-todo");
const { buildTodo } = require("./todo");

const deleteTodo = buildDeleteTodo({ authenticateRequest, removeItem });
const postTodo = buildPostTodo({ authenticateRequest, addItem });
const getTodo = buildGetTodo({ authenticateRequest, listItems });
const patchTodo = buildPatchTodo({ authenticateRequest, editItem });

const todo = buildTodo({ deleteTodo, patchTodo, postTodo, getTodo });

module.exports = {
  deleteTodo,
  postTodo,
  getTodo,
  patchTodo,
  todo,
};
