import { Dialog, DialogProps, makeStyles } from "@material-ui/core";
import React from "react";
import { SlideUp } from "./TransitionComponents";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: "auto",
      width: "480px",
      maxHeight: "720px",
    },
    [theme.breakpoints.down("xs")]: {
      top: 0,
      left: 0,
      margin: 0,
      marginBottom: "auto",
      minWidth: "100vw",
    },
  },
}));

export default (props: DialogProps) => {
  const classesDialog = useStylesDialog();

  return (
    <Dialog TransitionComponent={SlideUp} classes={classesDialog} {...props} />
  );
};
