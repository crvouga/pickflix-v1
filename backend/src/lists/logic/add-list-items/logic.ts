import {makeListItem} from '../../models';
import {ListItem} from '../../models/types';
import {Build} from '../types';

export type AddListItems = (
  listItemInfos: Partial<ListItem>[]
) => Promise<ListItem[]>;

export const buildAddListItems: Build<AddListItems> = ({
  unitOfWork,
}) => async listItemInfos => {
  try {
    await unitOfWork.begin();

    const addedListItems = [];

    for (const listItemInfo of listItemInfos) {
      const listItem = makeListItem(listItemInfo);

      const foundLists = await unitOfWork.Lists.find({
        id: listItem.listId,
      });

      if (foundLists.length === 0) {
        throw new Error('list does not exists');
      }

      const foundListItems = await unitOfWork.ListItems.find({
        listId: listItem.listId,

        tmdbMediaId: listItem.tmdbMediaId,
        tmdbMediaType: listItem.tmdbMediaType,
      });

      if (foundListItems.length > 0) {
        throw new Error('try to add duplicate list item');
      }

      const [addedListItem] = await unitOfWork.ListItems.add([listItem]);
      addedListItems.push(addedListItem);
    }

    await unitOfWork.commit();
    return addedListItems;
  } catch (error) {
    await unitOfWork.rollback();
    throw error;
  }
};
