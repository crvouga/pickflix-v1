import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { GoogleIcon } from "./socialLoginIcons";
import useAuthForm from "./useAuthForm";
import { AuthFormStep } from "./redux/auth-form";

export default () => {
  const authForm = useAuthForm();

  const handleSignInWithGoogle = async () => {};

  const handleSignInWithPassword = async () => {
    authForm.setStep(AuthFormStep.email);
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
