import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import BackButton from "../navigation/BackButton";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
}));

export default () => {
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
