import {User} from '../business-entities/user';

export interface UserDb {
  insert(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByIds(_: {id?: string; firebaseId?: string}): Promise<User | undefined>;
  remove(id: string): Promise<boolean>;
}
