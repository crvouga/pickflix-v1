import {makeUser} from '../models';
import {BuildUserLogic} from './types';

export const buildUserLogic: BuildUserLogic = ({UserStorage}) => {
  return {
    createNew: async ({firebaseId}) => {
      const user = makeUser({firebaseId});
      return await UserStorage.insert(user);
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
