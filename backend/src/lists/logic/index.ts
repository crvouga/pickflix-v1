import {tmdbLogic} from '../../tmdb/logic';
import {unitOfWork} from '../../unit-of-work';
import {ListLogic} from './build';

export const listLogic = new ListLogic({
  tmdbLogic,
  unitOfWork,
});
