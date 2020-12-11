import {
  makeCredential,
  makePasswordHash,
  makeUser,
  passwordHashCompare,
  updateCredential,
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
    const updated = updateCredential(passwordCredential, {
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
  const [foundUsernames, foundEmailAddresses] = await Promise.all([
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

  if (foundUsernames.length > 0) {
    throw new Error("Username taken");
  }

  if (foundEmailAddresses.length > 0) {
    throw new Error("Email address taken");
  }

  const newUser = makeUser({ username, displayName, emailAddress });

  const passwordCredential = makeCredential({
    userId: newUser.id,
    passwordHash: await makePasswordHash(password),
  });

  await Promise.all([
    this.userRepository.add(newUser),
    this.credentialRepository.add(passwordCredential),
  ]);

  this.eventEmitter.emit("UserCreated", newUser);

  return newUser;
}
