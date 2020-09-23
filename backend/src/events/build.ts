import {EventEmitter} from 'events';
import {ListLogic} from '../lists/logic/build';
import {List} from '../lists/models/types';
import {User} from '../users/models/types';
import {EventTypes} from './types';

type Dependencies = {listLogic: ListLogic};

export const buildCreateAutoLists = ({listLogic}: Dependencies) => async ({
  user,
}: {
  user: User;
}) => {
  const autoListInfos: Partial<List>[] = ListLogic.AUTO_LIST_TITLES.map(
    title => ({
      title,
      ownerId: user.id,
      isAutoCreated: true,
      visibility: 'private',
    })
  );
  await listLogic.addLists(autoListInfos);
};

export const buildEventEmitter = (dependencies: Dependencies) => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on(EventTypes.USER_CREATED, buildCreateAutoLists(dependencies));

  return eventEmitter;
};
