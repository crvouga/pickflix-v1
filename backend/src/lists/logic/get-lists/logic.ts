import {Id} from '../../../id/types';
import {List, ListItem} from '../../models/types';
import {Build} from '../types';

export type GetLists = (_: {listId?: Id; ownerId?: Id}) => Promise<List[]>;

export const buildGetLists: Build<GetLists> = ({
  unitOfWork: {Lists, ListItems},
  TMDbLogic,
}) => {
  const aggergateListItem = async (listItem: ListItem) => {
    const tmdbData = await TMDbLogic.request({
      path: `/${listItem.tmdbMediaType}/${listItem.tmdbMediaId}`,
    });
    return {
      ...listItem,
      tmdbData,
    };
  };

  const aggergateListItems = (listItems: ListItem[]) =>
    Promise.all(listItems.map(aggergateListItem));

  const aggergateList = async (list: List) => {
    const listItemCount = await ListItems.count({listId: list.id});
    const listItems = await ListItems.find({listId: list.id});
    const aggergatedListItems = await aggergateListItems(listItems);
    return {
      listItems: aggergatedListItems,
      listItemCount,
      ...list,
    };
  };

  const aggergateLists = (lists: List[]) =>
    Promise.all(lists.map(aggergateList));

  return async ({ownerId, listId}) => {
    if (listId) {
      const lists = await Lists.find({
        id: listId,
      });
      return aggergateLists(lists);
    }

    if (ownerId) {
      const lists = await Lists.find({
        ownerId,
      });
      return aggergateLists(lists);
    }

    return [];
  };
};
