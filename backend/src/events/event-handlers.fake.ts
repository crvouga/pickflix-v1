import {buildListLogicFake} from '../lists/logic/build.fake';
import {EventHandlers} from './event-handlers';
import {EventEmitter} from 'events';

export const buildEventHandlersFake = ({
  eventEmitter = new EventEmitter(),
} = {}) => {
  const {listLogic} = buildListLogicFake();
  const eventHandlers = new EventHandlers({eventEmitter, listLogic});
  return {listLogic, eventHandlers, eventEmitter};
};
