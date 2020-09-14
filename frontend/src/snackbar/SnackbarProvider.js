import { makeStyles } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Notifier from "./Notifier";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar - 1,
  },
  anchorOriginBottomCenter: {
    pointerEvents: "none",
    transform: "translate(0px, -42px);", //bottom nav bar
  },
}));

export default ({ children }) => {
  const classes = useStyles();
  return (
    <SnackbarProvider
      classes={classes}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Notifier />
      {children}
    </SnackbarProvider>
  );
};
