import {ListItems} from '../business-logic/list-items';
import {HttpController} from '../../types/http';
import {AuthenticateRequest} from '../../user/http/authenticate-request';

type Dependencies = {
  authenticateRequest: AuthenticateRequest;
  listItems: ListItems;
};
type Build = (_: Dependencies) => HttpController;

const build: Build = ({authenticateRequest, listItems}) => async request => {
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

export default build;
