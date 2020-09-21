import {Id} from '../../../id/types';
import {ListItem} from '../../models/types';
import {Build} from '../types';

export type GetListItems = (_: {listId: Id}) => Promise<ListItem[]>;

export const buildGetListItems: Build<GetListItems> = ({
  unitOfWork,
  TMDbLogic,
}) => {
  const aggergate = async (listItem: ListItem) => {
    const tmdbData = await TMDbLogic.request({
      path: `/${listItem.tmdbMediaType}/${listItem.tmdbMediaId}`,
    });
    return {
      ...listItem,
      tmdbData,
    };
  };
  return async ({listId}) => {
    const listItems = await unitOfWork.ListItems.find({listId});
    const aggergatedListItems = await Promise.all(listItems.map(aggergate));
    return aggergatedListItems;
  };
};
