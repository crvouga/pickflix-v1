import {userDb} from '../data-access';

import buildGetByIds from './get-by-ids';
import buildCreateNew from './create-new';
import buildGetElseCreateNew from './get-else-create-new';

export const getByIds = buildGetByIds({userDb});
export const createNew = buildCreateNew({userDb, getByIds});
export const getElseCreateNew = buildGetElseCreateNew({
  getByIds,
  createNew,
});
