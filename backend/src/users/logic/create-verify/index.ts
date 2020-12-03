import { EventTypes } from "../../../app/events/types";
import {
  makeCredential,
  makePasswordHash,
  makeUser,
  passwordHashCompare,
} from "../../models";
import { UserLogic } from "../logic";

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
  const user = await this.getUser({ emailAddress });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  if (await passwordHashCompare(password, passwordCredential.passwordHash)) {
    const updated = makeCredential({
      ...passwordCredential,
      verifiedAt: Date.now(),
    });
    await this.credentialRepository.update(updated.id, updated);
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
  const [foundUsernames, foundEmails] = await Promise.all([
    this.userRepository.find([
      {
        username,
      },
    ]),
    this.userRepository.find([
      {
        emailAddress,
      },
    ]),
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

  const newUser = makeUser({ username, displayName, emailAddress });

  const passwordCredential = makeCredential({
    userId: newUser.id,
    passwordHash: await makePasswordHash(password),
    verifiedAt: Date.now(),
  });

  await Promise.all([
    this.userRepository.add(newUser),
    this.credentialRepository.add(passwordCredential),
  ]);

  this.eventEmitter.emit("UserCreated", newUser);

  return newUser;
}
