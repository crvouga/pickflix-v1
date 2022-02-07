import { Email } from "../../email";
import { Link } from "../../../common/utils";
import { User } from "../../models";
import { secrets } from "../../../config";

export const makeResetEmailHtml = (resetPasswordLink: string) =>
  `
  <h1>
    This is your pickflix password reset email.
  </h1>
  
  <p>
    <a href="${resetPasswordLink}">
      <button>
      Reset Your Password
      </button>
    </a>
  </p>
`;

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
