import {UserStorage} from '../storage';
import {buildUserLogic} from './user-logic';
import {eventEmitter} from '../../events/event-emitter';

export const UserLogic = buildUserLogic({UserStorage, eventEmitter});
