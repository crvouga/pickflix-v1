import {eventEmitter} from '../../events';
import {unitOfWork} from '../../unit-of-work';
import {UserLogic} from './user-logic';

export const userLogic = new UserLogic({eventEmitter, unitOfWork});
