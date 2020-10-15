import {LikeRepositoryFake} from '../likes/repositories/like-repository.fake';
import {AutoListRepositoryFake} from '../lists/repositories/auto-list-repository.fake';
import {ListItemRepositoryFake} from '../lists/repositories/list-item-repository.fake';
import {ListRepositoryFake} from '../lists/repositories/list-repository.fake';
import {UserRepositoryFake} from '../users/repositories/user-repository.fake';
import {IUnitOfWork} from './types';

export class UnitOfWorkFake implements IUnitOfWork {
  Lists: ListRepositoryFake;
  ListItems: ListItemRepositoryFake;
  Users: UserRepositoryFake;
  Likes: LikeRepositoryFake;
  AutoLists: AutoListRepositoryFake;

  constructor() {
    this.Lists = new ListRepositoryFake();
    this.ListItems = new ListItemRepositoryFake();
    this.Users = new UserRepositoryFake();
    this.Likes = new LikeRepositoryFake();
    this.AutoLists = new AutoListRepositoryFake();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
