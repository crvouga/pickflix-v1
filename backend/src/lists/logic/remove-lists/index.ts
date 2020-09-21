import {Id} from '../../../id/types';
import {Build} from '../types';

export type RemoveLists = (_: {listIds: Id[]}) => Promise<void>;

export const buildRemoveLists: Build<RemoveLists> = ({unitOfWork}) => async ({
  listIds,
}) => {
  try {
    await unitOfWork.begin();
    await unitOfWork.Lists.remove(listIds.map(listId => ({id: listId})));
    await unitOfWork.commit();
  } catch (error) {
    await unitOfWork.rollback();
    throw error;
  }
};
