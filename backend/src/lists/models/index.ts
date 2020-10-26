import {isValidId, makeId} from '../../id';
import {buildMakeList} from './make-list';
import {buildMakeListItem} from './make-list-item';
import {buildMakeAutoList} from './make-auto-list';

const dependencies = {
  makeId,
  isValidId,
};

export const makeListItem = buildMakeListItem(dependencies);
export const makeList = buildMakeList(dependencies);
export const makeAutoList = buildMakeAutoList(dependencies);
