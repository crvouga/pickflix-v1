import {IUserRepository} from './types';
import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {User} from '../models/types';

export class UserRepositoryFake
  extends RepositoryFake<User>
  implements IUserRepository {
  constructor() {
    super();
  }
}
