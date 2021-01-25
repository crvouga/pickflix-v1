import { Email } from "../../email";
import { Link } from "../../../common/utils";
import { User } from "../../models";
import { secrets } from "../../../config";

export const makeResetEmailHtml = (resetPasswordLink: string) =>
  `
  <p>
    You are receiving this because you (or someone else) have requested the reset of the password  for your account.
  </p>
  <p>
    Please click on the following link, or paste this into your browser to complete the process:
  </p>
  <p>
    <a href="${resetPasswordLink}">Reset Your Password</a>
  </p>
  <p>
    If you did not request this, please ignore this email and your password will remain unchanged.
  </p>`;

export const makeResetPasswordEmail = ({
  user,
  link,
}: {
  user: User;
  link: Link;
}): Email => ({
  to: user.emailAddress,
  from: secrets.sendGridRegisteredEmailAddress,
  subject: "Password Reset",
  html: makeResetEmailHtml(link),
});
