import {EventEmitter} from 'events';
import {User} from '../users/models/types';
import {ListLogic} from '../lists/logic/build';
import {List} from '../lists/models/types';
import {EventTypes} from './events-types';

export class EventHandlers {
  listLogic: ListLogic;

  constructor({
    eventEmitter,
    listLogic,
  }: {
    eventEmitter: EventEmitter;
    listLogic: ListLogic;
  }) {
    this.listLogic = listLogic;
    eventEmitter.on(EventTypes.USER_CREATED, this.onUserCreated);
  }

  async onUserCreated({user}: {user: User}) {
    const autoListInfos: Partial<List>[] = ListLogic.AUTO_LIST_TITLES.map(
      title => ({
        title,
        ownerId: user.id,
        isAutoCreated: true,
        visibility: 'private',
      })
    );

    await this.listLogic.addLists(autoListInfos);
  }
}
