import React from "react";
import NavigationBar from "../common/NavigationBar";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import BackButton from "../common/BackButton";
import SignInWizard from "./signInForm/SignInWizard";
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
