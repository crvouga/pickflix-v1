const { makeTodoItem } = require("../business-entities");
module.exports.buildEditItem = ({ todoItemsDb }) => async ({
  id,
  ...changes
}) => {
  if (!id) {
    throw new Error("id required");
  }

  if (!changes.text && !changes.completed) {
    throw new Error("changes required");
  }

  const existing = await todoItemsDb.findById({ id });

  if (!existing) {
    throw new Error("can not edit item that does not exist");
  }

  const edited = makeTodoItem({ ...existing, ...changes });

  await todoItemsDb.update(edited);

  return edited;
};
