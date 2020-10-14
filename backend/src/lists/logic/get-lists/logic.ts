import {List, AutoList, AutoListTitle} from '../../models/types';
import {ListLogic} from '../build';
import {Id} from '../../../id/types';

const aggergateList = <T extends List | AutoList>(
  listLogic: ListLogic
) => async (list: T) => {
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

export async function getAutoLists(
  this: ListLogic,
  listInfo: {ownerId: Id} | {id: Id} | {title: AutoListTitle; ownerId: Id}
) {
  const {
    unitOfWork: {AutoLists},
  } = this;

  const autoLists = await AutoLists.find(listInfo);

  const aggergatedAutoLists = await Promise.all(
    autoLists.map(aggergateList(this))
  );

  return aggergatedAutoLists;
}

export async function getLists(
  this: ListLogic,
  listInfo: {id: Id} | {ownerId: Id}
) {
  const {
    unitOfWork: {Lists},
  } = this;

  const lists = await Lists.find(listInfo);

  const aggergatedLists = await Promise.all(lists.map(aggergateList(this)));

  return aggergatedLists;
}

export async function getListsAndAutoLists(
  this: ListLogic,
  listInfo: {id: Id} | {ownerId: Id}
) {
  const [lists, autoLists] = await Promise.all([
    this.getLists(listInfo),
    this.getAutoLists(listInfo),
  ]);

  const listsAndAutoLists = [...lists, ...autoLists];

  return listsAndAutoLists;
}
