import {EventEmitter} from 'events';
import {UnitOfWorkInMemory} from '../../unit-of-work/unit-of-work.fake';
import {UserLogic} from './user-logic';

export const buildUserLogicFake = ({
  eventEmitter = new EventEmitter(),
} = {}) => {
  const unitOfWork = new UnitOfWorkInMemory();
  const userLogic = new UserLogic({
    unitOfWork,
    eventEmitter,
  });
  return {userLogic, eventEmitter};
};
