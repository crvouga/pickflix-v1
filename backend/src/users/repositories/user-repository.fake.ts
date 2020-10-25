import {RepositoryFileSystem} from '../../unit-of-work/repository.file-system';
import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {User} from '../models/make-user';
import {IUserRepository} from './types';

export class UserRepositoryFileSystem
  extends RepositoryFileSystem<User>
  implements IUserRepository {
  constructor() {
    super('users');
  }
}

export class UserRepositoryInMemory
  extends RepositoryInMemory<User>
  implements IUserRepository {
  constructor() {
    super();
  }
}
