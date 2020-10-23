import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import firebase from "../firebase";
import { authForm } from "./redux/auth-form";
import { SignInMethod } from "./redux/auth-form";
import { GoogleIcon } from "./socialLoginIcons";
import useAuthForm from "./useAuthForm";

const methodToProps = {
  [SignInMethod.Google]: {
    text: "Sign in with Google",
    icon: <GoogleIcon />,
  },
};

const SignInMethods = () => {
  const { email } = useAuthForm();

  const query = useQuery(
    `/sign-in-methods/${email}`,
    () => (email ? firebase.auth().fetchSignInMethodsForEmail(email) : null),
    {}
  );

  const dispatch = useDispatch();

  const handleSignIn = (method: string) => () => {};

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
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
    dispatch(authForm.actions.reset());
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
