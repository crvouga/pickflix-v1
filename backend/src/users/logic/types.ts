import {Id} from '../../id/types';
import {User} from '../models/types';

export interface IUserLogic {
  createNew(_: {firebaseId?: string}): Promise<User>;
  getById(_: {firebaseId?: string; id?: Id}): Promise<User | undefined>;
  getElseCreateNew(_: {firebaseId?: string; id?: Id}): Promise<User>;
}
