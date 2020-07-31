import { Avatar, Box } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { useDispatch } from "react-redux";
import auth from "../redux";
import SignInButton from "./SignInButton";
import { GoogleIcon } from "./socialLoginIcons";

export default () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(auth.actions.signIn({ method: auth.Method.Google }));
  };

  const handleEmailSignIn = () => {
    dispatch(auth.actions.nextFormStep());
  };

  return (
    <React.Fragment>
      <Box marginBottom={4}>
        <Avatar style={{ margin: "auto", width: "100px", height: "100px" }} />
      </Box>
      <SignInButton
        icon={<GoogleIcon />}
        text="Sign in with Google"
        onClick={handleGoogleSignIn}
      />
      <SignInButton
        icon={<EmailIcon />}
        text="Sign in with email"
        onClick={handleEmailSignIn}
      />
    </React.Fragment>
  );
};
