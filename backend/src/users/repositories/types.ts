import {IRepository} from '../../unit-of-work/types';
import {User} from '../models/types';

export interface IUserRepository extends IRepository<User> {}
