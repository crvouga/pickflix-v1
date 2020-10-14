import {Id} from '../../../id/types';
import {ListItem} from '../../models/types';
import {ListLogic} from '../build';

const aggergateListItem = (listLogic: ListLogic) => async (
  listItem: ListItem
) => {
  const tmdbData = await listLogic.mediaLogic.requestTmdbData({
    path: `/${listItem.tmdbMediaType}/${listItem.tmdbMediaId}`,
  });
  return {
    ...listItem,
    tmdbData,
  };
};

export async function getListItems(
  this: ListLogic,
  {
    listId,
  }: {
    listId: Id;
  }
): Promise<ListItem[]> {
  const listItems = await this.unitOfWork.ListItems.find({listId});
  const aggergatedListItems = await Promise.all(
    listItems.map(aggergateListItem(this))
  );
  return aggergatedListItems;
}
