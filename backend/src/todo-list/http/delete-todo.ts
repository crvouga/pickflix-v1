import {AuthenticateRequest} from '../../user/http/authenticate-request';
import {RemoveItem} from '../business-logic/remove-item';
import {HttpController} from '../../types/http';

export type Dependencies = {
  authenticateRequest: AuthenticateRequest;
  removeItem: RemoveItem;
};

export type Build = (_: Dependencies) => HttpController;

const buildDeleteTodo: Build = ({
  authenticateRequest,
  removeItem,
}) => async request => {
  try {
    const id = request.params.id;
    const user = await authenticateRequest(request);
    await removeItem({id, userId: user.id});

    return {};
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }
};

export default buildDeleteTodo;
