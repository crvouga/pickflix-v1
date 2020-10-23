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

  async verifyUsernameAndPassword({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const [user] = await this.unitOfWork.Users.find({username});
    const [passwordCredential] = await this.unitOfWork.Credentials.find({
      userId: user.id,
      type: CredentialType.password,
    });

    if (await bcrypt.compare(password, passwordCredential.passwordHash)) {
      return user;
    }
    return null;
  }

  async createUserWithPassword({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const user = makeUser({username, email});

    const passwordHash = await bcrypt.hash(password, 10);

    const passwordCredential = makeCredential({
      userId: user.id,
      passwordHash,
    });

    await Promise.all([
      this.unitOfWork.Credentials.add([passwordCredential]),
      this.unitOfWork.Users.add([user]),
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
