import {buildListLogicFake} from '../lists/logic/build.fake';
import {buildTmdbLogicFake} from '../tmdb/logic/build.fake';
import {buildAttachCurrentUserFake} from '../users/express/attach-current-user/build.fake';
import {buildUserLogicFake} from '../users/logic/user-logic.fake';

const {userLogic} = buildUserLogicFake();
const {listLogic} = buildListLogicFake();
const {tmdbLogic} = buildTmdbLogicFake();
const {attachCurrentUser, currentUser} = buildAttachCurrentUserFake();

export const dependenciesFake = {
  currentUser,
  listLogic,
  userLogic,
  tmdbLogic,
  middlewares: {
    attachCurrentUser,
  },
};
