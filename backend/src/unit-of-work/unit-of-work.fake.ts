import {ListItemRepositoryFake} from '../lists/repositories/list-item-repository.fake';
import {ListRepositoryFake} from '../lists/repositories/list-repository.fake';
import {IUnitOfWork} from './types';
import {UserRepositoryFake} from '../users/repositories/user-repository.fake';
import {LikesRepositoryFake} from '../media/repositories/likes-repository.fake';

export class UnitOfWorkFake implements IUnitOfWork {
  Lists: ListRepositoryFake;
  ListItems: ListItemRepositoryFake;
  Users: UserRepositoryFake;
  Likes: LikesRepositoryFake;

  constructor() {
    this.Lists = new ListRepositoryFake();
    this.ListItems = new ListItemRepositoryFake();
    this.Users = new UserRepositoryFake();
    this.Likes = new LikesRepositoryFake();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
