module.exports.buildPostTodo = ({ addItem, authenticateRequest }) => async (
  request
) => {
  try {
    const {
      body: { text },
    } = request;

    const user = await authenticateRequest(request);

    const todoInfo = {
      userId: user.id,
      text,
    };

    const todo = await addItem(todoInfo);

    return {
      body: {
        todo,
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
