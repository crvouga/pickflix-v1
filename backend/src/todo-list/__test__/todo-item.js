const { makeId } = require("../../id");
const { makeTodoItem } = require("../business-entities");

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
