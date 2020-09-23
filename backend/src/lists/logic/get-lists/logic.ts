import {Id} from '../../../id/types';
import {List} from '../../models/types';
import {ListLogic} from '../build';

const aggergateLists = (listLogic: ListLogic, lists: List[]) => {
  return Promise.all(
    lists.map(async list => {
      const listItemCount = await listLogic.unitOfWork.ListItems.count({
        listId: list.id,
      });

      const listItems = await listLogic.getListItems({listId: list.id});

      return {
        listItems,
        listItemCount,
        ...list,
      };
    })
  );
};

export async function getLists(
  this: ListLogic,
  {listId, ownerId}: {listId?: Id; ownerId?: Id}
) {
  if (listId) {
    const lists = await this.unitOfWork.Lists.find({
      id: listId,
    });
    return aggergateLists(this, lists);
  }

  if (ownerId) {
    const lists = await this.unitOfWork.Lists.find({
      ownerId,
    });
    return aggergateLists(this, lists);
  }

  return [];
}
