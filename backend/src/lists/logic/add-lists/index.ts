import {ListLogic} from '../build';
import {List, ListItem} from '../../models/types';
import {makeList, makeListItem} from '../../models';

type ListInfo = Partial<List> & {listItemInfos?: Partial<ListItem>[]};

export async function addLists(
  this: ListLogic,
  listInfos: ListInfo[]
): Promise<List[]> {
  const {
    unitOfWork: {Lists, ListItems},
  } = this;

  const addedLists = [];

  for (const {listItemInfos, ...listInfo} of listInfos) {
    const list = makeList(listInfo);

    const [addedList] = await Lists.add([list]);

    if (listItemInfos) {
      const listItems = listItemInfos.map(listItemInfo =>
        makeListItem({listId: list.id, ...listItemInfo})
      );
      await ListItems.add(listItems);
    }

    addedLists.push(addedList);
  }

  return addedLists;
}
