import {IRepository} from '../../unit-of-work/types';
import {User} from '../models/make-user';
import {Credential} from '../models/make-credential';

export interface IUserRepository extends IRepository<User> {}
export interface ICredentialRepository extends IRepository<Credential> {}
