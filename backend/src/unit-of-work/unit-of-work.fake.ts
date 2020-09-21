import {ListItemRepositoryFake} from '../lists/repositories/list-item-repository.fake';
import {ListRepositoryFake} from '../lists/repositories/list-repository.fake';
import {IUnitOfWork} from './types';

export class UnitOfWorkFake implements IUnitOfWork {
  Lists: ListRepositoryFake;
  ListItems: ListItemRepositoryFake;

  constructor() {
    this.Lists = new ListRepositoryFake();
    this.ListItems = new ListItemRepositoryFake();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
