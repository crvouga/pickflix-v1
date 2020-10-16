import {User} from '../../../users/models/types';
import {makeAutoList} from '../../models';
import {INITIAL_AUTO_LIST_INFOS} from '../../models/constants';
import {AutoList} from '../../models/types';
import {ListLogic} from '../build';

export async function initializeAutoLists(
  this: ListLogic,
  {user}: {user: User}
): Promise<AutoList[]> {
  for (const {key} of INITIAL_AUTO_LIST_INFOS) {
    const found = await this.unitOfWork.AutoLists.find({
      ownerId: user.id,
      key,
    });

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

  const added = await this.unitOfWork.AutoLists.add(autoLists);

  return added;
}
