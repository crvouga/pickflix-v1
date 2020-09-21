import {ListItem} from '../../models/types';
import {Build} from '../types';

export type RemoveListItems = (_: Pick<ListItem, 'id'>[]) => Promise<boolean>;

export const buildRemoveListItems: Build<RemoveListItems> = ({
  unitOfWork,
}) => async listItemInfos => {
  await unitOfWork.ListItems.remove(listItemInfos);
  return true;
};
