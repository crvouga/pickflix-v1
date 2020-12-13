import { castLink, Link } from "../../../utils";
import { EmailAddress } from "../../models";
import {
  makePasswordHash,
  Password,
  updateCredential,
} from "../../models/make-credential";
import { UserLogic } from "../logic";
import { makeResetPasswordEmail } from "./email";
import { decodeToken, makeResetPasswordToken } from "./token";

const makeResetPasswordLink = ({
  redirectUrl,
  token,
  emailAddress,
}: {
  redirectUrl: Link;
  token: string;
  emailAddress: EmailAddress;
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
    emailAddress: EmailAddress;
    redirectUrl: Link;
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
    emailAddress: EmailAddress;
    redirectUrl: Link;
  }
) {
  const email = await this.getResetPasswordEmail({
    emailAddress,
    redirectUrl,
  });

  await this.emailLogic.sendEmail(email);
}

export const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 60 * 24;

export async function resetPassword(
  this: UserLogic,
  {
    resetPasswordToken,
    newPassword,
  }: {
    resetPasswordToken: string;
    newPassword: Password;
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

  if (Date.now() - tokenData.createdAt > ONE_DAY_IN_MILLISECONDS) {
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
