import {userRepository} from '../repositories';
import {UserLogic} from './user-logic';
import {eventEmitter} from '../../events';

export const userLogic = new UserLogic({eventEmitter, userRepository});
