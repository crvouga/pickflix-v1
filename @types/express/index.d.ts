import {User} from '../../src/users/models/make-user';

type AppUser = User;

declare global {
  namespace Express {
    interface User extends AppUser {}
    export interface Request {
      currentUser: AppUser;
    }
  }
}
