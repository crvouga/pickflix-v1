import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router";
import { getUsers, queryKeys } from "../auth/query";
import LoadingBox from "../common/components/LoadingBox";
import PickflixLogo from "../common/PickflixLogo";
import Email from "./Email";
import PickUsername from "./PickUsername";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const CurrentStep = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const emailAddress = params.get("emailAddress");

  const username = params.get("username");
  const queryUser = useQuery(queryKeys.user(emailAddress || ""), () =>
    emailAddress ? getUsers({ emailAddress }) : Promise.reject()
  );

  if (!emailAddress) {
    return <Email />;
  }

  if (!queryUser.data) {
    return <LoadingBox />;
  }

  const users = queryUser.data;

  if (users.length > 0) {
    return <SignIn user={users[0]} />;
  }

  if (!username) {
    return <PickUsername emailAddress={emailAddress} />;
  }

  return <SignUp username={username} emailAddress={emailAddress} />;
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
