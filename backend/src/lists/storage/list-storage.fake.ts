import R from 'ramda';
import {Id} from '../../id/types';
import {List} from '../models/types';
import {ListStorage} from './types';

type Build = () => ListStorage;

export const buildListStorage: Build = () => {
  const map = new Map<Id, List>();
  return {
    findByUserId: async userId => {
      return Array.from(map.values()).filter(_ => _.userIds.includes(userId));
    },
    add: async item => {
      map.set(item.id, item);
      return item;
    },
    remove: async id => {
      map.delete(id);
      return true;
    },
    findWhereEquals: async props => {
      return Array.from(map.values()).filter(R.whereEq(props));
    },
  };
};
