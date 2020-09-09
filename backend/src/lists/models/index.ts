import {isValidId, makeId} from '../../id';
import {buildMakeList} from './make-list';
import {buildMakeListItem} from './make-list-item';

export const makeListItem = buildMakeListItem({
  makeId,
  isValidId,
});
export const makeList = buildMakeList({
  isValidId,
  makeId,
});
