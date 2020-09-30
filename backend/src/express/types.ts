import {Handler} from 'express';
import {ListLogic} from '../lists/logic/build';
import {MediaLogic} from '../media/logic/build';
import {UserLogic} from '../users/logic/user-logic';

export type Dependencies = {
  listLogic: ListLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    attachCurrentUser: Handler;
  };
};
