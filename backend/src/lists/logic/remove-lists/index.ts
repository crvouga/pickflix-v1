import {Id} from '../../../id/types';
import {ListLogic} from '../build';

export async function removeLists(
  this: ListLogic,
  {listIds}: {listIds: Id[]}
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
