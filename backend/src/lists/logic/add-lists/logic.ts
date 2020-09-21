import {makeList} from '../../models';
import {List} from '../../models/types';
import {Build} from '../types';

export type AddLists = (_: Partial<List>[]) => Promise<List[]>;

export const buildAddLists: Build<AddLists> = ({
  unitOfWork,
}) => async listInfos => {
  const lists = listInfos.map(makeList);
  const addedLists = await unitOfWork.Lists.add(lists);
  return addedLists;
};
