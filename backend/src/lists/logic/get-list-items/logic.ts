import {Id} from '../../../id/types';
import {ListItem} from '../../models/types';
import {Build} from '../types';

export type GetListItems = (_: {listId: Id}) => Promise<ListItem[]>;

export const buildGetListItems: Build<GetListItems> = ({unitOfWork}) => async ({
  listId,
}) => {
  const listItems = await unitOfWork.ListItems.find({listId});
  return listItems;
};
