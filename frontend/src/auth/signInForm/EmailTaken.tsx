import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase";
import form from "./redux";
import { SignInMethod } from "./redux/types";
import { GoogleIcon } from "./socialLoginIcons";

const methodToProps = {
  [SignInMethod.Google]: {
    text: "Sign in with Google",
    icon: <GoogleIcon />,
  },
};

const SignInMethods = () => {
  const { email } = useSelector(form.selectors.values);
  const query = useQuery(
    ["signInMethods", email],
    () => firebase.auth().fetchSignInMethodsForEmail(email),
    {}
  );

  const dispatch = useDispatch();

  const handleSignIn = (method: string) => () => {
    dispatch(
      form.actions.submit({
        signInMethod: method as SignInMethod,
        customParameters: { login_hint: email },
      })
    );
  };

  if (query.status === "loading") {
    return (
      <Box textAlign="center">
        <CircularProgress disableShrink />
      </Box>
    );
  }

  if (query.status === "error") {
    return null;
  }

  const signInMethods = query.data;

  return (
    <List>
      {Object.entries(methodToProps)
        .filter(([method, props]) => signInMethods.includes(method))
        .map(([method, { text, icon }]) => (
          <ListItem key={method} divider button onClick={handleSignIn(method)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
    </List>
  );
};

export default () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(form.actions.reset());
  };

  return (
    <Box paddingY={4} paddingX={2}>
      <Box paddingX={2}>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
          Sign in
        </Typography>
        <Typography gutterBottom style={{ fontWeight: "bold" }}>
          You already have an account with the following providers.
        </Typography>
      </Box>
      <SignInMethods />

      <Box textAlign="right">
        <Box display="inline-block" marginRight={2}>
          <Button
            color="primary"
            onClick={handleCancel}
            style={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
