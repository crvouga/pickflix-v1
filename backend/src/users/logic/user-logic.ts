import {makeUser} from '../models';
import {BuildUserLogic} from './types';
import {EventTypes} from '../../events/events-types';

export const buildUserLogic: BuildUserLogic = ({eventEmitter, UserStorage}) => {
  return {
    createNew: async ({firebaseId}) => {
      const user = makeUser({firebaseId});
      const inserted = await UserStorage.insert(user);
      eventEmitter.emit(EventTypes.USER_CREATED, user);
      return inserted;
    },
    getById: async ids => {
      return await UserStorage.findByIds(ids);
    },
    getElseCreateNew: async userInfo => {
      const got = await UserStorage.findByIds(userInfo);
      if (got) {
        return got;
      } else {
        const newUser = makeUser(userInfo);
        return await UserStorage.insert(newUser);
      }
    },
  };
};
