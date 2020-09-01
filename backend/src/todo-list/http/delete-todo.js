module.exports.buildDeleteTodo = ({ removeItem }) => async (request) => {
  try {
    const {
      pathParams: { id },
    } = request;

    await removeItem({ id });

    return {
      statusCode: 200,
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
