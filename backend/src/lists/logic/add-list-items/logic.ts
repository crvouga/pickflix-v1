import {makeListItem} from '../../models';
import {ListItem} from '../../models/types';
import {ListLogic} from '../build';
import {PartialListItem} from '../../models/make-list-item';

export async function addListItems(
  this: ListLogic,
  listItemInfos: PartialListItem[]
): Promise<ListItem[]> {
  const {
    unitOfWork: {ListItems, Lists, AutoLists},
  } = this;

  const addedListItems = [];

  for (const listItemInfo of listItemInfos) {
    const listItem = makeListItem(listItemInfo);

    const [foundLists, foundAutoLists, foundListItems] = await Promise.all([
      Lists.find({
        id: listItem.listId,
      }),
      AutoLists.find({
        id: listItem.listId,
      }),
      ListItems.find({
        listId: listItem.listId,
        tmdbMediaId: listItem.tmdbMediaId,
        tmdbMediaType: listItem.tmdbMediaType,
      }),
    ]);

    if (foundLists.length === 0 && foundAutoLists.length === 0) {
      throw new Error('list does not exists');
    }

    if (foundListItems.length > 0) {
      // throw new Error('try to add duplicate list item');
      return [];
    }

    const [addedListItem] = await ListItems.add([listItem]);
    addedListItems.push(addedListItem);
  }

  return addedListItems;
}
