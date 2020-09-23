import {Id} from '../../../id/types';
import {ListLogic} from '../build';

export async function removeLists(
  this: ListLogic,
  {listIds}: {listIds: Id[]}
): Promise<void> {
  const {Lists} = this.unitOfWork;
  try {
    await this.unitOfWork.begin();

    for (const listId of listIds) {
      const [list] = await Lists.find({id: listId});
      if (list.isAutoCreated) {
        throw new Error('can not delete automatically created list');
      }
      await Lists.remove([{id: listId}]);
    }

    await this.unitOfWork.commit();
  } catch (error) {
    await this.unitOfWork.rollback();
    throw error;
  }
}
