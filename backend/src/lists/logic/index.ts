import {TMDbLogic} from '../../TMDb/logic';
import {unitOfWork} from '../../unit-of-work';
import {buildListLogic} from './build';

export const ListLogic = buildListLogic({
  TMDbLogic,
  unitOfWork,
});
