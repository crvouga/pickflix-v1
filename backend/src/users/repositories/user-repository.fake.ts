import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {User} from '../models/make-user';
import {IUserRepository} from './types';

export class UserRepositoryFake
  extends RepositoryFake<User>
  implements IUserRepository {
  constructor() {
    super();
  }
}
