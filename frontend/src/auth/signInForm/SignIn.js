import { Avatar, Box } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import form from "./redux";
import SignInButton from "./SignInButton";
import { GoogleIcon } from "./socialLoginIcons";

export default () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = () => {
    dispatch(form.actions.signIn({ method: form.SignInMethod.Google }));
  };

  const handleSignInWithPassword = () => {
    dispatch(form.actions.setStep(form.Step.email));
  };

  return (
    <React.Fragment>
      <Box marginBottom={4}>
        <Avatar style={{ margin: "auto ", width: "100px", height: "100px" }} />
      </Box>
      <SignInButton
        icon={<GoogleIcon />}
        text="Sign in with Google"
        onClick={handleSignInWithGoogle}
      />
      <SignInButton
        icon={<EmailIcon />}
        text="Sign in with email"
        onClick={handleSignInWithPassword}
      />
    </React.Fragment>
  );
};
