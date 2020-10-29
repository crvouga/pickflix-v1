import { Email } from "../../../email";
import { User } from "../../../users/models";

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

export const RESET_EMAIL_HTML_LINK_DOM_ID = "link";
export const makeResetEmailHtml = (resetPasswordLink: string) =>
  `You are receiving this because you (or someone else) have requested the reset of the password for your account. 
  Please click on the following link, or paste this into your browser to complete the process:

  <a id="${RESET_EMAIL_HTML_LINK_DOM_ID}" href="${resetPasswordLink}">Reset Your Password</a>
  
  If you did not request this, please ignore this email and your password will remain unchanged.`;

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
