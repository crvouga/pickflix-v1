import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import Layer from "./Layer";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: theme.palette.background.paper,
    opacity: "0.8",
    // for some reason opacity(0.8) backdrop filter is not working!!!
    backdropFilter: "blur(5px)",
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Layer {...props} className={clsx(props.className, classes.backdrop)} />
  );
};
