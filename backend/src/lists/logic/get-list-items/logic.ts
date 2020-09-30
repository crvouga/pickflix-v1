import {Id} from '../../../id/types';
import {ListItem} from '../../models/types';
import {ListLogic} from '../build';

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
    listItems.map(async listItem => {
      const tmdbData = await this.mediaLogic.requestTmdbData({
        path: `/${listItem.tmdbMediaType}/${listItem.tmdbMediaId}`,
      });
      return {
        ...listItem,
        tmdbData,
      };
    })
  );
  return aggergatedListItems;
}
