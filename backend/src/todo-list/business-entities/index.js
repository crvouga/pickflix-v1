const { makeId, isValidId } = require("../../id");
const { buildMakeTodoItem } = require("./todo-item");
const makeTodoItem = buildMakeTodoItem({ makeId, isValidId });
module.exports = { makeTodoItem };
