import { Hidden, Container, makeStyles, Paper, Box } from "@material-ui/core";
import React from "react";
import AuthWizard from "./AuthWizard";

const useStyles = makeStyles((theme) => ({
  center: {
    width: "100vw",
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Hidden xsDown>
        <Container className={classes.center} maxWidth="xs">
          <AuthWizard />
        </Container>
      </Hidden>
      <Hidden smUp>
        <AuthWizard />
      </Hidden>
    </React.Fragment>
  );
};
