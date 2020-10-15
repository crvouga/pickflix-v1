import {Id} from '../../../id/types';
import {ListLogic} from '../build';
import {TmdbMediaType} from '../../../media/models/types';

export async function getListsAndAutoLists(
  this: ListLogic,
  listItemInfo: {tmdbMediaId: string; tmdbMediaType: TmdbMediaType}
) {
  const listItems = await this.unitOfWork.ListItems.find(listItemInfo);
  const listIds = listItems.map(listItem => listItem.id);
}
