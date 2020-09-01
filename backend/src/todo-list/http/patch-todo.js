module.exports.buildPatchTodo = ({ editItem, authenticateRequest }) => async (
  request
) => {
  try {
    const {
      pathParams: { id },
      body: { completed, text },
    } = request;

    const user = await authenticateRequest(request);

    const todoInfo = {
      id,
      userId: user.id,
      completed,
      text,
    };

    const editedTodo = await editItem(todoInfo);

    return {
      statusCode: 200,
      body: {
        todo: editedTodo,
      },
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }
};
