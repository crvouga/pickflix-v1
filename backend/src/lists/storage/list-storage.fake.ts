import R from 'ramda';
import {Id} from '../../id/types';
import {List, ListItem} from '../models/types';
import {ListStorage} from './types';

type Build = () => ListStorage;

export const buildListStorageFake: Build = () => {
  const listMap = new Map<Id, List>();
  const listItemMap = new Map<Id, ListItem>();

  return {
    findById: async listId => {
      return Array.from(listMap.values()).filter(_ => _.id === listId)[0];
    },
    findByUserId: async userId => {
      return Array.from(listMap.values()).filter(_ =>
        _.userIds.includes(userId)
      );
    },
    findBytmdbMediaId: async tmdbMediaId => {
      const lists = Array.from(listMap.values());
      const listItems = Array.from(listItemMap.values());

      return R.innerJoin(
        (list, listItem) =>
          list.id === listItem.listId && listItem.tmdbMediaId === tmdbMediaId,
        lists,
        listItems
      );
    },
    add: async item => {
      listMap.set(item.id, item);
      return item;
    },
    remove: async id => {
      listMap.delete(id);
      return true;
    },
    update: async entity => {
      listMap.set(entity.id, entity);
      return entity;
    },
    findWhereEquals: async props => {
      return Array.from(listMap.values()).filter(R.whereEq(props));
    },
    addListItem: async item => {
      listItemMap.set(item.id, item);
      return item;
    },
    removeListItem: async id => {
      listItemMap.delete(id);
      return true;
    },
    findItemWhereEquals: async columnValues => {
      return Array.from(listItemMap.values()).filter(R.whereEq(columnValues));
    },

    findIntersections: async ({listIds, tmdbMediaIds}) => {
      const toString = (ids: string[]): string =>
        ids.map(_ => `'${_}'`).join(', ');

      const query = `
        SELECT (listId, tmdbMediaId) 
        FROM list_items
        WHERE list_id IN (${toString(listIds)})
        AND tmdb_id IN (${toString(tmdbMediaIds)})`;

      return Array.from(listItemMap.values())
        .map(R.pick(['listId', 'tmdbMediaId']))
        .filter(
          R.where({
            listId: R.includes(R.__, listIds),
            tmdbMediaId: R.includes(R.__, tmdbMediaIds),
          })
        );
    },

    insertListItems: async listItems => {
      for (const listItem of listItems) {
        listItemMap.set(listItem.id, listItem);
      }
      return listItems;
    },

    deleteListItems: async listItemInfos => {
      for (const item of Array.from(listItemMap.values())) {
        for (const itemInfo of listItemInfos) {
          const sameId = itemInfo.id === item.id;
          const sameMovie =
            itemInfo.listId === item.listId &&
            itemInfo.tmdbMediaId === item.tmdbMediaId;

          if (sameId || sameMovie) {
            listItemMap.delete(item.id);
          }
        }
      }
      return true;
    },
  };
};
