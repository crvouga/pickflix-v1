import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import BackButton from "../navigation/BackButton";
import SignInWizard from "./auth-form/SignInWizard";
const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" className={classes.bold}>
            Sign In
          </Typography>
        </Toolbar>
      </AppBar>
      <SignInWizard />
    </React.Fragment>
  );
};
