module.exports.buildTodoItemsDb = () => {
  const map = new Map();

  const insert = async (todoItem) => {
    map.set(todoItem.id, todoItem);
    return todoItem;
  };

  const remove = async ({ id }) => {
    map.delete(id);
  };

  const update = async (todoItem) => {
    const updated = { ...map.get(todoItem.id), ...todoItem };
    map.set(todoItem.id, updated);
    return updated;
  };

  const findById = async ({ id }) => {
    return map.get(id);
  };

  const findAllByUserId = async ({ userId }) => {
    return [...map.values()].filter((_) => _.userId === userId);
  };

  return {
    insert,
    remove,
    update,
    findById,
    findAllByUserId,
  };
};
