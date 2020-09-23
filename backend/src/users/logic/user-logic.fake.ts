import {EventEmitter} from 'events';
import {UserRepositoryFake} from '../repositories/user-repository.fake';
import {UserLogic} from './user-logic';

export const buildUserLogicFake = ({
  eventEmitter = new EventEmitter(),
} = {}) => {
  const userRepository = new UserRepositoryFake();
  const userLogic = new UserLogic({
    userRepository,
    eventEmitter,
  });
  return {userLogic, userRepository, eventEmitter};
};
