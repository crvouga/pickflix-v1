import {listLogic} from '../lists/logic';
import {buildEventEmitter} from './build';

export const eventEmitter = buildEventEmitter({
  listLogic,
});
