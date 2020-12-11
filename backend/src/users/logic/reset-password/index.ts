import { User } from "../../models";
import {
  CredentialPassword,
  makePasswordHash,
  updateCredential,
} from "../../models/make-credential";
import { UserLogic } from "../logic";
import { castLink, makeResetPasswordEmail } from "./email";
import { decodeToken, encodeToken } from "./token";

export const makeResetPasswordToken = ({
  user,
  passwordCredential,
}: {
  user: User;
  passwordCredential: CredentialPassword;
}) => {
  return encodeToken({
    createdAt: Date.now(),
    passwordVerifiedAt: passwordCredential.verifiedAt,
    passwordHash: passwordCredential.passwordHash,
    emailAddress: user.emailAddress,
    userId: user.id,
  });
};

const makeResetPasswordLink = ({
  redirectUrl,
  token,
  emailAddress,
}: {
  redirectUrl: string;
  token: string;
  emailAddress: string;
}) => {
  const url = new URL(redirectUrl);
  url.searchParams.append("resetPasswordToken", token);
  url.searchParams.append("emailAddress", emailAddress);
  const link = castLink(url.toString());
  return link;
};

export async function getResetPasswordEmail(
  this: UserLogic,
  {
    emailAddress,
    redirectUrl,
  }: {
    emailAddress: string;
    redirectUrl: string;
  }
) {
  const user = await this.getUser({ emailAddress });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  const token = makeResetPasswordToken({
    user,
    passwordCredential,
  });

  const link = makeResetPasswordLink({
    redirectUrl,
    token,
    emailAddress,
  });

  const email = makeResetPasswordEmail({
    user,
    link,
  });

  return email;
}

export async function sendResetPasswordEmail(
  this: UserLogic,
  {
    emailAddress,
    redirectUrl,
  }: {
    emailAddress: string;
    redirectUrl: string;
  }
) {
  const email = await this.getResetPasswordEmail({
    emailAddress,
    redirectUrl,
  });

  await this.emailLogic.sendEmail(email);
}

export async function resetPassword(
  this: UserLogic,
  {
    resetPasswordToken,
    newPassword,
  }: {
    resetPasswordToken: string;
    newPassword: string;
  }
) {
  const tokenData = decodeToken(resetPasswordToken);

  const user = await this.getUser({ id: tokenData.userId });

  const passwordCredential = await this.getPasswordCredential({
    userId: user.id,
  });

  if (tokenData.passwordVerifiedAt < passwordCredential.verifiedAt) {
    throw new Error("User signed in after sending password reset email");
  }

  if (tokenData.passwordHash !== passwordCredential.passwordHash) {
    throw new Error("User already changed password");
  }

  if (tokenData.emailAddress !== user.emailAddress) {
    throw new Error("User is using different email");
  }

  const ONE_DAY = 1000 * 60 * 60 * 60 * 24;
  if (Date.now() - tokenData.createdAt > ONE_DAY) {
    throw new Error("Token expired");
  }

  const passwordHash = await makePasswordHash(newPassword);

  const updatedPasswordCredential = updateCredential(passwordCredential, {
    passwordHash,
  });

  await this.credentialRepository.update(
    updatedPasswordCredential.id,
    updatedPasswordCredential
  );
}
