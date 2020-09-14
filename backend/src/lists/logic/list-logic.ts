import {makeList, makeListItem} from '../models';
import {BuildListLogic} from './types';

export const buildListLogic: BuildListLogic = ({ListStorage, UserStorage}) => {
  return {
    editList: async ({listId, ...edits}) => {
      const existing = await ListStorage.findById(listId);

      if (!existing) {
        throw new Error('list does not exists');
      }

      const edited = makeList({...existing, ...edits});

      const updated = await ListStorage.update(edited);

      return updated;
    },

    createList: async listInfo => {
      const created = makeList(listInfo);
      return await ListStorage.add(created);
    },

    deleteList: async ({userId, listId}) => {
      const lists = await ListStorage.findWhereEquals({id: listId});

      if (lists.length === 0) {
        throw new Error('list does not exists');
      }

      const list = lists[0];

      if (list.userIds.length > 1) {
        throw new Error(
          'user can not delete list that other users are a part of'
        );
      }

      if (!list.userIds.includes(userId)) {
        throw new Error('user can not delete list they are not part of');
      }

      return await ListStorage.remove(list.id);
    },

    getListsByUser: async ({userId, tmdbMediaIds = []}) => {
      const lists = await ListStorage.findByUserId(userId);

      if (tmdbMediaIds.length === 0) {
        return lists;
      }

      const listIds = lists.map(_ => _.id);

      const intersections = await ListStorage.findIntersections({
        listIds,
        tmdbMediaIds,
      });

      const flaggedLists = lists.map(list => {
        const tmdbMediaIds = intersections
          .filter(_ => _.listId === list.id)
          .map(_ => _.tmdbMediaId);

        if (tmdbMediaIds.length === 0) {
          return list;
        } else {
          return {...list, tmdbMediaIds};
        }
      });

      return flaggedLists;
    },

    addListItems: async listItemInfos => {
      const listItems = listItemInfos.map(makeListItem);
      const insertedListItems = await ListStorage.insertListItems(listItems);
      return insertedListItems;
    },

    removeListItems: async listItemInfos => {
      return await ListStorage.deleteListItems(listItemInfos);
    },

    getListsBytmdbMediaId: async ({tmdbMediaId}) => {
      const listItems = await ListStorage.findBytmdbMediaId(tmdbMediaId);
      return listItems;
    },

    getListItems: async ({listId}) => {
      return await ListStorage.findItemWhereEquals({listId});
    },

    getList: async ({listId}) => {
      const found = await ListStorage.findWhereEquals({id: listId});
      return found[0];
    },
  };
};
