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

    const patched = await editItem(todoInfo);

    return {
      body: {
        patched,
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
