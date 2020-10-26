import {ListId, ListItem} from '../../models/types';
import {ListLogic} from '../build';

export async function getListItems(
  this: ListLogic,
  {
    listId,
  }: {
    listId: ListId;
  }
): Promise<ListItem[]> {
  const listItems = await this.unitOfWork.ListItems.find({listId});

  const aggergatedListItems = await Promise.all(
    listItems.map(listItem => this.aggergateListItem(listItem))
  );

  return aggergatedListItems;
}
