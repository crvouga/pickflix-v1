import {UnitOfWorkFake} from '../../unit-of-work/unit-of-work.fake';
import {ListLogic} from './build';
import {buildTmdbLogicFake} from '../../tmdb/logic/build.fake';
import {EventEmitter} from 'events';

export const buildListLogicFake = () => {
  const {tmdbLogic} = buildTmdbLogicFake();
  const listLogic = new ListLogic({
    tmdbLogic,
    unitOfWork: new UnitOfWorkFake(),
  });
  return {listLogic};
};
