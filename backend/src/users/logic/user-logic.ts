import {EventEmitter} from 'events';
import {EventTypes} from '../../events/events-types';
import {makeUser} from '../models';
import {User} from '../models/types';
import {IUserRepository} from '../repositories/types';

export class UserLogic {
  userRepository: IUserRepository;
  eventEmitter: EventEmitter;

  constructor({
    userRepository,
    eventEmitter,
  }: {
    userRepository: IUserRepository;
    eventEmitter: EventEmitter;
  }) {
    this.userRepository = userRepository;
    this.eventEmitter = eventEmitter;
  }

  async getById({id, firebaseId}: Partial<User>): Promise<User | undefined> {
    if (id) {
      const [user] = await this.userRepository.find({id});
      return user;
    }
    if (firebaseId) {
      const [user] = await this.userRepository.find({firebaseId});
      return user;
    }
    return undefined;
  }

  async createNew({firebaseId}: Partial<User>): Promise<User> {
    const user = makeUser({firebaseId});

    await this.userRepository.add([user]);

    this.eventEmitter.emit(EventTypes.USER_CREATED, {user});

    return user;
  }

  async getElseCreateNew(userInfo: Partial<User>): Promise<User> {
    const got = await this.getById(userInfo);
    if (got) {
      return got;
    }
    return await this.createNew(userInfo);
  }
}
