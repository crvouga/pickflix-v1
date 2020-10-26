import bcrypt from 'bcrypt';
import {EventEmitter} from 'events';
import {EventTypes} from '../../events/types';
import {IUnitOfWork} from '../../unit-of-work/types';
import {makeUser} from '../models';
import {CredentialType, makeCredential} from '../models/make-credential';
import {UserId} from '../models/make-user';

export class UserLogic {
  unitOfWork: IUnitOfWork;
  eventEmitter: EventEmitter;

  constructor({
    unitOfWork,
    eventEmitter,
  }: {
    unitOfWork: IUnitOfWork;
    eventEmitter: EventEmitter;
  }) {
    this.unitOfWork = unitOfWork;
    this.eventEmitter = eventEmitter;
  }

  async verifyEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const {Users, Credentials} = this.unitOfWork;

    const [user] = await Users.find({email});

    if (!user) {
      throw new Error('User does not exists.');
    }

    const [passwordCredential] = await Credentials.find({
      userId: user.id,
      type: CredentialType.password,
    });

    if (!passwordCredential) {
      throw new Error('User does not have a password.');
    }

    if (await bcrypt.compare(password, passwordCredential.passwordHash)) {
      return user;
    }

    return null;
  }

  async createUserWithPassword({
    username,
    displayName,
    email,
    password,
  }: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) {
    const {Users, Credentials} = this.unitOfWork;

    const [foundUsernames, foundEmails] = await Promise.all([
      Users.find({
        username,
      }),
      Users.find({
        email,
      }),
    ]);

    const errors = [];
    if (foundUsernames.length > 0) {
      errors.push({key: 'username', message: 'Username taken.'});
    }
    if (foundEmails.length > 0) {
      errors.push({key: 'email', message: 'Email taken.'});
    }
    if (errors.length > 0) {
      throw errors;
    }

    const user = makeUser({username, displayName, email});

    const passwordCredential = makeCredential({
      userId: user.id,
      passwordHash: await bcrypt.hash(password, 10),
    });

    await Promise.all([
      Users.add([user]),
      Credentials.add([passwordCredential]),
    ]);

    this.eventEmitter.emit(EventTypes.USER_CREATED, {user});

    return user;
  }

  async getUser(userInfo: {username: string} | {id: UserId}) {
    const [user] = await this.unitOfWork.Users.find(userInfo);
    return user;
  }

  async getCredentialTypesForEmail({email}: {email: string}) {
    const [user] = await this.unitOfWork.Users.find({email});
    if (!user) {
      return [];
    }
    const credentials = await this.unitOfWork.Credentials.find({
      userId: user.id,
    });
    const credentialTypes = credentials.map(credential => credential.type);
    return credentialTypes;
  }
}
