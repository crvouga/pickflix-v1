import {HttpController} from '../../infrastructure/types/http';
import {AuthenticateRequest} from '../../user/http/authenticate-request';
import {AddItem} from '../business-logic/add-item';

type Build = (dependencies: {
  addItem: AddItem;
  authenticateRequest: AuthenticateRequest;
}) => HttpController;

export const buildPostTodo: Build = ({
  addItem,
  authenticateRequest,
}) => async request => {
  try {
    const {
      body: {text},
    } = request;

    const user = await authenticateRequest(request);

    const todoInfo = {
      userId: user.id,
      text,
    };

    const posted = await addItem(todoInfo);

    return {
      body: {
        posted,
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
