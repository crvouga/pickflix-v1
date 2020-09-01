module.exports.buildGetTodo = ({ listItems, authenticateRequest }) => async (
  request
) => {
  try {
    const user = await authenticateRequest(request);

    const todoInfo = {
      userId: user.id,
    };

    const todos = await listItems(todoInfo);

    return {
      body: {
        todos,
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
