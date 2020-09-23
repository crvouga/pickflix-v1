import {Handler} from 'express';
import {ListLogic} from '../lists/logic/build';
import {TmdbLogic} from '../tmdb/logic/build';
import {UserLogic} from '../users/logic/user-logic';

export type Dependencies = {
  listLogic: ListLogic;
  tmdbLogic: TmdbLogic;
  userLogic: UserLogic;
  middlewares: {
    attachCurrentUser: Handler;
  };
};
