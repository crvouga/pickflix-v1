module.exports.buildTodo = ({
  getTodo,
  deleteTodo,
  patchTodo,
  postTodo,
}) => async (request) => {
  const handler = {
    DELETE: deleteTodo,
    GET: getTodo,
    POST: postTodo,
    PATCH: patchTodo,
  }[request.method];

  if (!handler) {
    return {
      statusCode: 404,
    };
  }

  const response = await handler(request);

  return response;
};
