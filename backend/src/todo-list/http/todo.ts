import {HttpController} from '../../infrastructure/types/http';

type Build = (dependencies: {
  getTodo: HttpController;
  deleteTodo: HttpController;
  patchTodo: HttpController;
  postTodo: HttpController;
}) => HttpController;

export const buildTodo: Build = ({
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
