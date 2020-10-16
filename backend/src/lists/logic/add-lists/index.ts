import {ListLogic} from '../build';
import {List, ListItem} from '../../models/types';
import {makeList, makeListItem} from '../../models';

export async function addLists(
  this: ListLogic,
  listInfos: Partial<List>[]
): Promise<List[]> {
  const {
    unitOfWork: {Lists, ListItems},
  } = this;

  const lists = listInfos.map(listInfo => makeList(listInfo));
  const added = await Lists.add(lists);

  return added;
}
