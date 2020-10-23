import * as EmailValidator from 'email-validator';
import {isValidId, makeId} from '../../id';
import {Id} from '../../id/types';
import {ErrorList} from '../../utils';

const hasWhiteSpace = (s: string) => s.indexOf(' ') >= 0;

export type UserId = Id & {UserId: true};

export type User = {
  type: 'user';
  id: UserId;
  username: string;
  email: string;
};

const MAX_USERNAME_LENGTH = 100;
const MIN_USERNAME_LENGTH = 2;

export const makeUser = (partial: {
  id?: UserId;
  username: string;
  email: string;
}): User => {
  const id = partial.id || (makeId() as UserId);
  const email = partial.email.trim();
  const username = partial.username.trim();

  const errors = [];

  if (!EmailValidator.validate(email)) {
    errors.push({message: 'Invalid email.'});
  }

  if (!isValidId(id)) {
    errors.push({message: 'Invalid user id.'});
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    errors.push({
      message: `Username can NOT be less than ${MIN_USERNAME_LENGTH} characters long.`,
    });
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    errors.push({
      message: `Usernane can NOT be more than ${MAX_USERNAME_LENGTH} characters long.`,
    });
  }

  if (hasWhiteSpace(username)) {
    errors.push({
      message: `Usernane can NOT have whitespace`,
    });
  }

  if (errors.length > 0) {
    throw new ErrorList(errors);
  }

  return Object.freeze({
    type: 'user',
    id,
    username,
    email,
  });
};
