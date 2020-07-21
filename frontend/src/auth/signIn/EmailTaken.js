import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import signIn from "./redux/signIn";

const methodToName = {
  "google.com": "Google",
};

const methodToProvider = {
  "google.com": "google",
};

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  const firebase = useFirebase();
  const form = useSelector(signIn.selectors.form);
  const signInMethods = useSelector(signIn.selectors.methods);
  const method = signInMethods[0];
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(signIn.actions.setStep("signIn"));
  };

  const handleSignIn = (method) => () => {
    const provider = methodToProvider[method];
    firebase
      .login({ provider, type: "popup" })
      .then((result) => {
        enqueueSnackbar(`${result.user.email} signed in`, {
          variant: "info",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Paper>
      <Box padding={4} maxWidth="360px" m="auto" marginTop={6}>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
          Sign in
        </Typography>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
          You already have an account
        </Typography>
        <Typography gutterBottom variant="body1">
          You’ve already used <b>{form.email}</b>. Sign in with{" "}
          {methodToName[method]} to continue.
        </Typography>
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
          <Button
            onClick={handleSignIn(method)}
            color="primary"
            variant="contained"
          >
            Sign in with {methodToName[method]}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
