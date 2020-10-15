import {buildMakeLike} from './make-like';
import {makeId, isValidId} from '../../id';

const dependencies = {
  isValidId,
  makeId,
};

export const makeLike = buildMakeLike(dependencies);
