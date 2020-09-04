import {ListItems} from '../business-logic/list-items';
import {HttpController} from '../../infrastructure/types/http';
import {AuthenticateRequest} from '../../user/http/authenticate-request';

type Build = (dependencies: {
  authenticateRequest: AuthenticateRequest;
  listItems: ListItems;
}) => HttpController;

export const buildGetTodo: Build = ({
  authenticateRequest,
  listItems,
}) => async request => {
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
