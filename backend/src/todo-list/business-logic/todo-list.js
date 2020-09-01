const { makeTodoItem } = require("../business-entities");

const buildTodoList = ({ todoItemsDb }) => {
  const addItem = async (todoInfo) => {
    const todoItem = makeTodoItem(todoInfo);
    await todoItemsDb.insert(todoItem);
    return todoItem;
  };

  const getItems = async ({ userId }) => {
    if (!userId) {
      throw new Error("user id required");
    }
    const todoItems = await todoItemsDb.findAllByUserId({ userId });
    return todoItems;
  };

  const removeItem = async ({ id }) => {
    if (!id) {
      throw new Error("id required");
    }
    await todoItemsDb.remove({ id });
  };

  const editItem = async ({ id, ...changes }) => {
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

  return {
    addItem,
    getItems,
    removeItem,
    editItem,
  };
};

module.exports = { buildTodoList };
