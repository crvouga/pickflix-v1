import { Email } from "../../email";
import { Link } from "../../../common/utils";
import { User } from "../../models";
import { secrets } from "../../../config";

export const makeResetEmailHtml = (resetPasswordLink: string) => `
  <div style="text-align: center; color: white; background-color: #0F0F0F; padding: 2em;">
    <h1>
      This is your <span style="font-weight: black; color: #28B4E4;">Pickflix</span> password reset email.
    </h1>
    
    <p>
      <a href="${resetPasswordLink}">
        <button style="padding: 1em; font-size: 1em; font-weight: bold; background-color: #28B4E4; color: white; border: none; border-radius: 0.5em; cursor: pointer;">
          RESET PASSWORD
        </button>
      </a>
    </p>
  </div>
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
  subject: "Pickflix Password Reset",
  html: makeResetEmailHtml(link),
});
