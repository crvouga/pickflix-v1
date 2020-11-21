import { Email } from "../../email";
import { User } from "../../models";

export type Link = string & { Link: true };
export const castLink = (link: string): Link => {
  try {
    new URL(link);
    return link as Link;
  } catch (error) {
    throw new Error("Invalid link");
  }
};

const SEND_GRID_REGISTERED_EMAIL_ADDRESS = "pickflix1@gmail.com";

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
  from: SEND_GRID_REGISTERED_EMAIL_ADDRESS,
  subject: "Password Reset",
  html: makeResetEmailHtml(link),
});
