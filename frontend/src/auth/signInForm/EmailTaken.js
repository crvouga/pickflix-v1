import {
  Box,
  Button,
  CircularProgress,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase";
import form from "./redux";
import { GoogleIcon } from "./socialLoginIcons";

const methodToIcon = {
  [form.SignInMethod.Google]: <GoogleIcon />,
};

const methodToText = {
  [form.SignInMethod.Google]: "Sign in with Google",
};

const SignInMethods = () => {
  const { email } = useSelector(form.selectors.values);
  const query = useQuery(
    ["signInMethods", email],
    () => firebase.auth().fetchSignInMethodsForEmail(email),
    {}
  );
  const dispatch = useDispatch();
  const handleSignIn = (method) => () => {
    dispatch(
      form.actions.submit({
        signInMethod: method,
        customParameters: { login_hint: email },
      })
    );
  };
  if (query.status === "loading")
    return (
      <Box textAlign="center">
        <CircularProgress disableShrink />
      </Box>
    );
  if (query.status === "error") return "error";
  const signInMethods = query.data;
  return (
    <List>
      {signInMethods.map((method) => (
        <ListItem key={method} divider button onClick={handleSignIn(method)}>
          <ListItemIcon>{methodToIcon[method]}</ListItemIcon>
          <ListItemText primary={methodToText[method]} />
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
    <React.Fragment>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in
      </Typography>
      <Typography gutterBottom style={{ fontWeight: "bold" }}>
        You already have an account with the following providers.
      </Typography>

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
    </React.Fragment>
  );
};
