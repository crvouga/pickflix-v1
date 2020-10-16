import {Id} from '../../../id/types';
import {ListLogic} from '../build';
import {ListId} from '../../models/types';

export async function removeLists(
  this: ListLogic,
  {listIds}: {listIds: ListId[]}
): Promise<void> {
  const {Lists} = this.unitOfWork;
  try {
    await this.unitOfWork.begin();

    await Lists.remove(listIds.map(listId => ({id: listId})));

    await this.unitOfWork.commit();
  } catch (error) {
    await this.unitOfWork.rollback();
    throw error;
  }
}
