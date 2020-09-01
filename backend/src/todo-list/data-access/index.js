const { makeDb } = require("../../infrastructure/postgres/makeDb");
const { buildTodoItemsDb } = require("./todo-items-db");

const todoItemsDb = buildTodoItemsDb({ makeDb });

module.exports = {
  todoItemsDb,
};
