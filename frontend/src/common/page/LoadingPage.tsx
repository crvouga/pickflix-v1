import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import Page from "./Page";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80vh",
    color: "text.secondary",
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.root}>
        <CircularProgress color="inherit" disableShrink />
      </div>
    </Page>
  );
};
