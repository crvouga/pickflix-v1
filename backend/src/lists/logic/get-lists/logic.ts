import {List} from '../../models/types';
import {ListLogic} from '../build';

const aggergateList = (listLogic: ListLogic) => async (list: List) => {
  const listItemCount = await listLogic.unitOfWork.ListItems.count({
    listId: list.id,
  });

  const listItems = await listLogic.getListItems({listId: list.id});

  return {
    listItems,
    listItemCount,
    ...list,
  };
};

export async function getLists(this: ListLogic, listInfo: Partial<List>) {
  const {
    unitOfWork: {Lists},
  } = this;

  const lists = await Lists.find(listInfo);

  const aggergatedLists = await Promise.all(lists.map(aggergateList(this)));

  return aggergatedLists;
}
