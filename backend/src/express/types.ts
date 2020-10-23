import {Handler} from 'express';
import {ListLogic} from '../lists/logic/build';
import {MediaLogic} from '../media/logic/build';
import {ReviewLogic} from '../reviews/logic/build';
import {UserLogic} from '../users/logic/user-logic';

export type ExpressAppDependencies = {
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    attachUser: Handler;
    protected: Handler;
  };
};
