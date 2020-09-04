import {HttpController} from '../../types/http';

type Dependencies = {
  getTodo: HttpController;
  deleteTodo: HttpController;
  patchTodo: HttpController;
  postTodo: HttpController;
};

type Build = (_: Dependencies) => HttpController;

const build: Build = ({
  getTodo,
  deleteTodo,
  patchTodo,
  postTodo,
}) => async request => {
  switch (request.method.toUpperCase()) {
    case 'DELETE':
      return deleteTodo(request);
    case 'GET':
      return getTodo(request);
    case 'POST':
      return postTodo(request);
    case 'PATCH':
      return patchTodo(request);
    default:
      return {
        statusCode: 404,
      };
  }
};

export default build;
