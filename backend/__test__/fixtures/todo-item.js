const { makeId } = require("../../src/id");
const { makeTodoItem } = require("../../src/todo-list/business-entities");

const makeFakeTodoItem = (overrides) => {
  return makeTodoItem({
    id: makeId(),
    userId: makeId(),
    text: "lorem lorem lorem",
    completed: Math.random() > 0.5,
    ...overrides,
  });
};

module.exports = { makeFakeTodoItem };
