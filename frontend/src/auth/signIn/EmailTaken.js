import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../redux";
import { GoogleIcon } from "./socialLoginIcons";
import SignInButton from "./SignInButton";

const methodToIcon = {
  [auth.Method.Google]: <GoogleIcon />,
};

const methodToText = {
  [auth.Method.Google]: "Sign in with Google",
};

export default () => {
  const form = useSelector(auth.selectors.formValues);
  const signInMethods = useSelector(auth.selectors.signInMethods);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(auth.actions.setFormStep(auth.FormStep.signIn));
  };

  const handleSignIn = (method) => () => {
    dispatch(auth.actions.signIn({ method }));
  };

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in
      </Typography>
      <Typography gutterBottom style={{ fontWeight: "bold" }}>
        You already have an account with the following providers.
      </Typography>

      <List>
        {signInMethods.map((method) => (
          <SignInButton
            key={method}
            onClick={handleSignIn(method)}
            icon={methodToIcon[method]}
            text={methodToText[method]}
          />
        ))}
      </List>

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
