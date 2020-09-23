import {makeListItem} from '../../models';
import {ListItem} from '../../models/types';
import {ListLogic} from '../build';

export async function addListItems(
  this: ListLogic,
  listItemInfos: Partial<ListItem>[]
): Promise<ListItem[]> {
  try {
    await this.unitOfWork.begin();

    const addedListItems = [];

    for (const listItemInfo of listItemInfos) {
      const listItem = makeListItem(listItemInfo);

      const foundLists = await this.unitOfWork.Lists.find({
        id: listItem.listId,
      });

      if (foundLists.length === 0) {
        throw new Error('list does not exists');
      }

      const foundListItems = await this.unitOfWork.ListItems.find({
        listId: listItem.listId,
        tmdbMediaId: listItem.tmdbMediaId,
        tmdbMediaType: listItem.tmdbMediaType,
      });

      if (foundListItems.length > 0) {
        throw new Error('try to add duplicate list item');
      }

      const [addedListItem] = await this.unitOfWork.ListItems.add([listItem]);
      addedListItems.push(addedListItem);
    }

    await this.unitOfWork.commit();
    return addedListItems;
  } catch (error) {
    await this.unitOfWork.rollback();
    throw error;
  }
}
