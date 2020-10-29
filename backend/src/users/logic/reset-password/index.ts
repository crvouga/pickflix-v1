import { User } from "../../models";
import {
  CredentialPassword,
  makeCredential,
  makePasswordHash,
} from "../../models/make-credential";
import { UserLogic } from "../user-logic";
import { Link, makeResetPasswordEmail } from "./reset-password-email";
import { decodeToken, encodeToken } from "./reset-password-token";

export const makeResetPasswordToken = ({
  user,
  passwordCredential,
}: {
  user: User;
  passwordCredential: CredentialPassword;
}) =>
  encodeToken({
    createdAt: Date.now(),
    passwordVerifiedAt: passwordCredential.verifiedAt,
    passwordHash: passwordCredential.passwordHash,
    emailAddress: user.emailAddress,
    userId: user.id,
  });

export async function getResetPasswordEmail(
  this: UserLogic,
  {
    emailAddress,
    tokenToLink,
  }: {
    emailAddress: string;
    tokenToLink: (token: string) => Link;
  }
) {
  const user = await this.getUser({ emailAddress });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  const token = makeResetPasswordToken({ user, passwordCredential });

  const email = makeResetPasswordEmail({
    user,
    link: tokenToLink(token),
  });

  return email;
}

export async function sendResetPasswordEmail(
  this: UserLogic,
  {
    emailAddress,
    tokenToLink,
  }: {
    emailAddress: string;
    tokenToLink: (token: string) => Link;
  }
) {
  const email = await this.getResetPasswordEmail({
    emailAddress,
    tokenToLink,
  });

  await this.emailService.sendEmail(email);
}

export async function resetPassword(
  this: UserLogic,
  {
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }
) {
  const { Credentials } = this.unitOfWork;

  const tokenData = decodeToken(token);

  const user = await this.getUser({ id: tokenData.userId });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  if (tokenData.passwordVerifiedAt < passwordCredential.verifiedAt) {
    throw new Error("User signed after sending password reset email");
  }

  if (tokenData.passwordHash !== passwordCredential.passwordHash) {
    throw new Error("User already changed password");
  }

  if (tokenData.emailAddress !== user.emailAddress) {
    throw new Error("User is using different email");
  }

  if (Date.now() - tokenData.createdAt > 1000 * 60 * 60 * 60 * 24 /* 1 day */) {
    throw new Error("Token expired");
  }

  const passwordHash = await makePasswordHash(newPassword);

  const updatedPasswordCredential = makeCredential({
    ...passwordCredential,
    passwordHash,
  });

  await Credentials.update([updatedPasswordCredential]);
}
