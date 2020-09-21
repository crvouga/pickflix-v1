import {makeList} from '../../models';
import {List} from '../../models/types';
import {Build} from '../types';

export type EditLists = (
  _: Array<Partial<List> & Pick<List, 'id'>>
) => Promise<List[]>;

export const buildEditLists: Build<EditLists> = ({
  unitOfWork,
}) => async listInfos => {
  try {
    await unitOfWork.begin();

    const editedLists = [];

    for (const {id, ...listInfo} of listInfos) {
      const foundLists = await unitOfWork.Lists.find({id});

      if (foundLists.length === 0) {
        throw new Error('try to edit list that does not exists');
      }

      const existingList = foundLists[0];

      const editedList = makeList({
        ...existingList,
        ...listInfo,
      });

      await unitOfWork.Lists.update([editedList]);

      editedLists.push(editedList);
    }

    await unitOfWork.commit();

    return editedLists;
  } catch (error) {
    await unitOfWork.rollback();
    throw error;
  }
};
