module.exports.buildListItems = ({ todoItemsDb }) => async ({ userId }) => {
  if (!userId) {
    throw new Error("user id required");
  }
  const todoItems = await todoItemsDb.findAllByUserId({ userId });
  return todoItems;
};
