import {UnitOfWorkFake} from '../../unit-of-work/unit-of-work.fake';
import {ListLogic} from './build';
import {buildMediaLogicFake} from '../../media/logic/build.fake';
import {EventEmitter} from 'events';

export const buildListLogicFake = () => {
  const {mediaLogic} = buildMediaLogicFake();
  const listLogic = new ListLogic({
    mediaLogic,
    unitOfWork: new UnitOfWorkFake(),
  });
  return {listLogic};
};
