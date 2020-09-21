import {ListLogic} from '../lists/logic';
import {TMDbLogic} from '../TMDb/logic';
import {UserLogic} from '../users/logic';
import {attachCurrentUser} from './middlewares/attach-current-user';

export const dependencies = {
  ListLogic,
  UserLogic,
  TMDbLogic,
  middlewares: {
    attachCurrentUser,
  },
};
