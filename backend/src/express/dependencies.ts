import {listLogic} from '../lists/logic';
import {tmdbLogic} from '../tmdb/logic';
import {userLogic} from '../users/logic';
import {attachCurrentUser} from './middlewares/attach-current-user';

export const dependencies = {
  listLogic,
  userLogic,
  tmdbLogic,
  middlewares: {
    attachCurrentUser,
  },
};
