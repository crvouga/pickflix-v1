import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AccountPageNavigationBar from "./AccountPage.NavigationBar";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
  signInButton: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();

  const onSignIn = () => {
    history.push("/signIn");
  };

  return (
    <React.Fragment>
      <AccountPageNavigationBar />
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
