import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import NavigationBar from "../../navigation/NavigationBar";

const useStyles = makeStyles((theme) => ({
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
    <React.Fragment>
      <NavigationBar />
      <div className={classes.root}>
        <CircularProgress color="inherit" disableShrink size="2em" />
      </div>
    </React.Fragment>
  );
};
