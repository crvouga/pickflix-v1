import {UserDb} from './UserDb';
import {User} from '../business-entities/user';

type Build = () => UserDb;

export const buildUserDb: Build = () => {
  const map = new Map<string, User>();

  const insert = async (user: User): Promise<User> => {
    map.set(user.id, user);
    return user;
  };

  const findAll = async (): Promise<User[]> => {
    return Array.from(map.values());
  };

  const findById = async (id: string): Promise<User | undefined> => {
    return map.get(id);
  };

  const findByIds = async ({
    firebaseId,
  }: Partial<User>): Promise<User | undefined> => {
    return Array.from(map.values()).filter(v => v.firebaseId === firebaseId)[0];
  };

  const remove = async (id: string): Promise<boolean> => {
    map.delete(id);
    return true;
  };

  return {
    insert,
    findAll,
    findById,
    findByIds,
    remove,
  };
};
