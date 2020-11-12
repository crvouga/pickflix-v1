import { EventTypes } from "../../../events";
import {
  makeCredential,
  makePasswordHash,
  makeUser,
  passwordHashCompare,
} from "../../models";
import { UserLogic } from "../user-logic";

export async function verifyEmailAddressAndPassword(
  this: UserLogic,
  {
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }
) {
  const { Credentials } = this.unitOfWork;

  const user = await this.getUser({ emailAddress });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  if (await passwordHashCompare(password, passwordCredential.passwordHash)) {
    await Credentials.update(
      makeCredential({
        ...passwordCredential,
        verifiedAt: Date.now(),
      })
    );
    return user;
  }

  throw new Error("Incorrect Password");
}

export async function createUserWithPassword(
  this: UserLogic,
  {
    username,
    displayName,
    emailAddress,
    password,
  }: {
    username: string;
    displayName?: string;
    emailAddress: string;
    password: string;
  }
) {
  const { Users, Credentials } = this.unitOfWork;

  const [foundUsernames, foundEmails] = await Promise.all([
    Users.find({
      username,
    }),
    Users.find({
      emailAddress,
    }),
  ]);

  const errors = [];

  if (foundUsernames.length > 0) {
    errors.push({ key: "username", message: "Username taken." });
  }

  if (foundEmails.length > 0) {
    errors.push({ key: "emailAddress", message: "Email taken." });
  }

  if (errors.length > 0) {
    throw errors;
  }

  const user = makeUser({ username, displayName, emailAddress });

  const passwordCredential = makeCredential({
    userId: user.id,
    passwordHash: await makePasswordHash(password),
    verifiedAt: Date.now(),
  });

  await Promise.all([Users.add([user]), Credentials.add([passwordCredential])]);

  this.eventEmitter.emit(EventTypes.USER_CREATED, { user });

  return user;
}
