import {HttpController} from '../../types/http';
import {AddItem} from '../business-logic/add-item';
import {AuthenticateRequest} from '../../user/http/authenticate-request';

type Dependencies = {
  addItem: AddItem;
  authenticateRequest: AuthenticateRequest;
};

type Build = (_: Dependencies) => HttpController;

const build: Build = ({addItem, authenticateRequest}) => async request => {
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

export default build;
