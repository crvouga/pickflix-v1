module.exports.buildRemoveItem = ({ todoItemsDb }) => async ({ id }) => {
  if (!id) {
    throw new Error("id required");
  }
  await todoItemsDb.remove({ id });
};
