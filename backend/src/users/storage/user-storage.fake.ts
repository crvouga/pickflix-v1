import {User} from '../models/types';
import {UserStorage} from './types';

type Build = () => UserStorage;

export const buildUserStorage: Build = () => {
  const map = new Map<string, User>();

  return {
    insert: async user => {
      map.set(user.id, user);
      return user;
    },

    findAll: async () => {
      return Array.from(map.values());
    },

    findById: async id => {
      return map.get(id);
    },

    findByIds: async ({id, firebaseId}) => {
      return Array.from(map.values()).filter(
        v => v.id === id || v.firebaseId === firebaseId
      )[0];
    },

    remove: async id => {
      map.delete(id);
      return true;
    },
  };
};
