import {ListItemRepositoryFake} from '../lists/repositories/list-item-repository.fake';
import {ListRepositoryFake} from '../lists/repositories/list-repository.fake';
import {IUnitOfWork} from './types';
import {UserRepositoryFake} from '../users/repositories/user-repository.fake';

export class UnitOfWorkFake implements IUnitOfWork {
  Lists: ListRepositoryFake;
  ListItems: ListItemRepositoryFake;
  Users: UserRepositoryFake;

  constructor() {
    this.Lists = new ListRepositoryFake();
    this.ListItems = new ListItemRepositoryFake();
    this.Users = new UserRepositoryFake();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
