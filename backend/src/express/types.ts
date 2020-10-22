import {ListLogic} from '../lists/logic/build';
import {MediaLogic} from '../media/logic/build';
import {ReviewLogic} from '../reviews/logic/build';
import {
  AttachCurrentUserMiddleware,
  AuthenticateMiddleware,
} from '../users/express/authenticate/build';
import {UserLogic} from '../users/logic/user-logic';

export type Dependencies = {
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    attachCurrentUser: AttachCurrentUserMiddleware;
    authenticate: AuthenticateMiddleware;
  };
};
