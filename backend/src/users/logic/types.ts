import {EventEmitter} from 'events';
import {Id} from '../../id/types';
import {User} from '../models/types';
import {UserStorage} from '../storage/types';

export interface UserLogic {
  createNew(_: {firebaseId?: string}): Promise<User>;
  getById(_: {firebaseId?: string; id?: Id}): Promise<User | undefined>;
  getElseCreateNew(_: {firebaseId?: string; id?: Id}): Promise<User>;
}

export type BuildUserLogic = (_: {
  UserStorage: UserStorage;
  eventEmitter: EventEmitter;
}) => UserLogic;
