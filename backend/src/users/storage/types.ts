import {Id} from '../../id/types';
import {User} from '../models/types';

export type UserStorage = {
  insert: (_: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findById: (_: string) => Promise<User | undefined>;
  findByIds: (_: {id?: Id; firebaseId?: string}) => Promise<User | undefined>;
  remove: (_: Id) => Promise<boolean>;
};
