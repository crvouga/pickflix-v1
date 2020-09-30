import {ListLogic} from '../build';
import {List} from '../../models/types';
import {User} from '../../../users/models/types';
import {makeList} from '../../models';

export const INITIAL_AUTO_LIST_INFOS: Partial<List>[] = [
  {
    isAutoCreated: true,
    title: 'Watch Next',
    visibility: 'private',
  },
];

export async function addAutoLists(
  this: ListLogic,
  {user}: {user: User}
): Promise<List[]> {
  const addedLists = [];

  for (const autoListInfo of INITIAL_AUTO_LIST_INFOS) {
    const listInfo = {
      ...autoListInfo,
      ownerId: user.id,
    };

    const list = makeList(listInfo);

    const [addedList] = await this.addLists([list]);

    addedLists.push(addedList);
  }

  return addedLists;
}
