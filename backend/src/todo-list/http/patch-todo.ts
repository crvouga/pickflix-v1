import {AuthenticateRequest} from '../../user/http/authenticate-request';
import {EditItem} from '../business-logic/edit-item';
import {HttpController} from '../../infrastructure/types/http';

type Build = (dependencies: {
  editItem: EditItem;
  authenticateRequest: AuthenticateRequest;
}) => HttpController;

export const buildPatchTodo: Build = ({
  editItem,
  authenticateRequest,
}) => async request => {
  try {
    const {
      params: {id},
      body: {completed, text},
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
