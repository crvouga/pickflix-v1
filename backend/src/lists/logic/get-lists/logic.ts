import {Id} from '../../../id/types';
import {List} from '../../models/types';
import {Build} from '../types';

export type GetLists = (_: {listId?: Id; ownerId?: Id}) => Promise<List[]>;

export const buildGetLists: Build<GetLists> = ({
  unitOfWork: {Lists, ListItems},
  TMDbLogic,
}) => {
  return async ({ownerId, listId}) => {
    if (listId) {
      const lists = await Lists.find({
        id: listId,
      });
      return lists;
    }

    const lists = await Lists.find({
      ownerId,
    });

    return lists;
  };
};
