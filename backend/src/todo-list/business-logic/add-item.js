const { makeTodoItem } = require("../business-entities");
module.exports.buildAddItem = ({ todoItemsDb }) => async (todoInfo) => {
  const todoItem = makeTodoItem(todoInfo);
  await todoItemsDb.insert(todoItem);
  return todoItem;
};
