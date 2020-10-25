import {RepositoryFileSystem} from '../../unit-of-work/repository.file-system';
import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {List} from '../models/types';
import {IListRepository} from './types';

export class ListRepositoryInMemory
  extends RepositoryInMemory<List>
  implements IListRepository {
  constructor() {
    super();
  }
}

export class ListRepositoryFileSystem
  extends RepositoryFileSystem<List>
  implements IListRepository {
  constructor() {
    super('lists');
  }
}
