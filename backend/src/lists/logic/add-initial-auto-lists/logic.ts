import {User} from '../../../users/models/types';
import {makeAutoList} from '../../models';
import {AutoList, AutoListTitle, AutoListTitleEnum} from '../../models/types';
import {ListLogic} from '../build';

export const INITIAL_AUTO_LIST_INFOS: {title: AutoListTitle}[] = [
  {
    title: AutoListTitleEnum.WatchNext,
  },
];

export async function addInitialAutoLists(
  this: ListLogic,
  {user}: {user: User}
): Promise<AutoList[]> {
  const {
    unitOfWork: {AutoLists},
  } = this;

  for (const {title} of INITIAL_AUTO_LIST_INFOS) {
    const found = await AutoLists.find({ownerId: user.id, title});
    if (found.length > 0) {
      throw new Error('auto lists already initialized');
    }
  }

  const autoLists = INITIAL_AUTO_LIST_INFOS.map(info =>
    makeAutoList({
      ...info,
      ownerId: user.id,
    })
  );

  const added = await AutoLists.add(autoLists);

  return added;
}
