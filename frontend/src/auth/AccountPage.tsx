import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LoadingPage from "../common/page/LoadingPage";
import BackButton from "../navigation/BackButton";
import { selectors } from "../redux";
import SignedInAccountPage from "./SignedInAccountPage";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
  signInButton: {
    color: theme.palette.text.primary,

    fontWeight: "bold",
  },
  backgroundColorWhite: {
    backgroundColor: "white",
  },
  warning: {
    color: theme.palette.warning.main,
  },
  danger: {
    color: theme.palette.error.main,
  },
}));

export const NavigationBar = () => {
  const classes = useStyles();
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <BackButton />
        <Typography variant="h6" className={classes.bold}>
          Account
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const SignedOut = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSignIn = () => {
    history.push("/signIn");
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <Box p={2} textAlign="center">
        <Typography variant="h6" className={classes.bold}>
          You are not signed in
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          className={classes.bold}
        >
          Signing in lets you use all the features!
        </Typography>

        <Button
          className={classes.signInButton}
          variant="contained"
          color="primary"
          onClick={onSignIn}
        >
          Sign In
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default () => {
  const authStatus = useSelector(selectors.auth.authStatus);

  switch (authStatus) {
    case "loading":
      return <LoadingPage />;
    case "signedIn":
      return <SignedInAccountPage />;
    case "signedOut":
      return <SignedOut />;
  }
};
