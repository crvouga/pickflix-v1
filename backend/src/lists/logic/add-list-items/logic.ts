import {makeListItem} from '../../models';
import {ListItem} from '../../models/types';
import {ListLogic} from '../build';

export async function addListItems(
  this: ListLogic,
  listItemInfos: Partial<ListItem>[]
): Promise<ListItem[]> {
  const {
    unitOfWork: {ListItems, Lists},
  } = this;

  const addedListItems = [];

  for (const listItemInfo of listItemInfos) {
    const listItem = makeListItem(listItemInfo);

    const foundLists = await Lists.find({
      id: listItem.listId,
    });

    if (foundLists.length === 0) {
      throw new Error('list does not exists');
    }

    const foundListItems = await ListItems.find({
      listId: listItem.listId,
      tmdbMediaId: listItem.tmdbMediaId,
      tmdbMediaType: listItem.tmdbMediaType,
    });

    if (foundListItems.length > 0) {
      throw new Error('try to add duplicate list item');
    }

    const [addedListItem] = await ListItems.add([listItem]);
    addedListItems.push(addedListItem);
  }

  return addedListItems;
}
