import {makeList, makeListItem} from '../models';
import {BuildListLogic} from './types';

export const buildListLogic: BuildListLogic = ({
  ListItemStorage,
  ListStorage,
}) => ({
  createList: async info => {
    const created = makeList(info);
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

  getListsByUser: async ({userId}) => {
    return await ListStorage.findByUserId(userId);
  },

  addItem: async listItemInfo => {
    const results = await ListItemStorage.findWhereEquals({
      tmdbMediaType: listItemInfo.tmdbMediaType,
      tmdbId: listItemInfo.tmdbId,
      listId: listItemInfo.listId,
    });

    if (results.length > 0) {
      return results[0];
    }

    const item = makeListItem(listItemInfo);
    const inserted = await ListItemStorage.add(item);
    return inserted;
  },

  removeItem: async ({id}) => {
    return await ListItemStorage.remove(id);
  },

  getItems: async ({listId}) => {
    return await ListItemStorage.findWhereEquals({listId});
  },

  getList: async ({listId}) => {
    const found = await ListStorage.findWhereEquals({id: listId});
    return found[0];
  },
});
