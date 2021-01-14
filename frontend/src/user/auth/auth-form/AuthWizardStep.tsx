import React from "react";
import { useLocation } from "react-router";
import ErrorBox from "../../../common/components/ErrorBox";
import LoadingBox from "../../../common/components/LoadingBox";
import { useQueryUsers } from "../../query";
import CreateAccount from "./CreateAccount";
import Email from "./Email";
import Password from "./Password";
import PasswordForgot from "./PasswordForgot";
import PasswordReset from "./PasswordReset";
import UsernameAndName from "./UsernameAndName";

export default () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const emailAddress = params.get("emailAddress") || "";
  const displayName = params.get("displayName") || "";
  const username = params.get("username");

  const resetPasswordToken = params.get("resetPasswordToken");
  const forgotPasswordFlag = params.get("forgotPasswordFlag");

  const queryUsers = useQueryUsers({ emailAddress });

  if (!emailAddress) {
    return <Email />;
  }

  if (emailAddress && resetPasswordToken) {
    return (
      <PasswordReset
        emailAddress={emailAddress}
        resetPasswordToken={resetPasswordToken}
      />
    );
  }

  if (queryUsers.error) {
    return <ErrorBox />;
  }

  if (!queryUsers.data) {
    return <LoadingBox />;
  }

  const users = queryUsers.data.results.map((_) => _.user);

  if (users.length === 0 && !username) {
    return <UsernameAndName emailAddress={emailAddress} />;
  }

  if (users.length === 0 && username) {
    return (
      <CreateAccount
        username={username}
        emailAddress={emailAddress}
        displayName={displayName}
      />
    );
  }

  const user = users[0];

  if (user && forgotPasswordFlag) {
    return <PasswordForgot user={user} />;
  }

  if (user) {
    return <Password user={user} />;
  }

  throw new Error("invalid auth wizard step");
};
