module.exports.buildGetTodo = ({ listItems, authenticateRequest }) => async (
  request
) => {
  try {
    const user = await authenticateRequest(request);

    const todoInfo = {
      userId: user.id,
    };

    const results = await listItems(todoInfo);

    return {
      body: {
        results,
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
