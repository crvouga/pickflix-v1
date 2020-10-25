import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import BackButton from "../../navigation/BackButton";
import AuthWizard from "./AuthWizard";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <BackButton />
        <Typography variant="h6" className={classes.bold}>
          Sign In
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <AuthWizard />
    </React.Fragment>
  );
};
