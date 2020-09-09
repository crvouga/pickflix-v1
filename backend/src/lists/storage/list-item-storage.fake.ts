import R from 'ramda';
import {Id} from '../../id/types';
import {ListItem} from '../models/types';
import {ListItemStorage} from './types';

export const buildListItemStorage = (): ListItemStorage => {
  const map = new Map<Id, ListItem>();

  return {
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
