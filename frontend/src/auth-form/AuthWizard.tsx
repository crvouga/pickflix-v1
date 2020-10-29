import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router";
import { getUsers, queryKeys } from "../auth/query";
import LoadingBox from "../common/components/LoadingBox";
import PickflixLogo from "../common/PickflixLogo";
import CreateAccount from "./CreateAccount";
import Email from "./Email";
import Password from "./Password";
import PasswordForgot from "./PasswordForgot";
import PasswordReset from "./PasswordReset";
import PickUsername from "./PickUsername";

const CurrentStep = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const emailAddress = params.get("emailAddress");
  const username = params.get("username");
  const resetPasswordToken = params.get("resetPasswordToken");
  const forgotPasswordFlag = params.get("forgotPasswordFlag");

  const queryUser = useQuery(queryKeys.user(emailAddress || ""), () =>
    emailAddress ? getUsers({ emailAddress }) : Promise.reject()
  );

  const user = queryUser?.data?.[0];

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

  if (!user) {
    return <LoadingBox />;
  }

  if (user && forgotPasswordFlag) {
    return <PasswordForgot user={user} />;
  }

  if (user) {
    return <Password user={user} />;
  }

  if (!username) {
    return <PickUsername emailAddress={emailAddress} />;
  }

  return <CreateAccount username={username} emailAddress={emailAddress} />;
};

export default () => {
  const history = useHistory();
  return (
    <Box width="100%" component={Paper}>
      <Box paddingTop={4} display="flex" justifyContent="center">
        <PickflixLogo
          scale={1.5}
          onClick={() => {
            history.push("/");
          }}
        />
      </Box>
      <Box p={4}>
        <CurrentStep />
      </Box>
    </Box>
  );
};
