import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { useDispatch } from "react-redux";
import { authForm } from "./redux/auth-form";
import { SignInMethod, Step } from "./redux/types";
import { GoogleIcon } from "./socialLoginIcons";

export default () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = () => {
    dispatch(authForm.actions.submit({ signInMethod: SignInMethod.Google }));
  };

  const handleSignInWithPassword = () => {
    dispatch(authForm.actions.setStep(Step.email));
  };

  return (
    <List>
      <ListItem divider button onClick={handleSignInWithGoogle}>
        <ListItemIcon>
          <GoogleIcon />
        </ListItemIcon>
        <ListItemText primary="Sign in with Google" />
      </ListItem>
      <ListItem divider button onClick={handleSignInWithPassword}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Sign in with email" />
      </ListItem>
    </List>
  );
};
