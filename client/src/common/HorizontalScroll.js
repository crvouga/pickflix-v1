import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    transform: "translateZ(0)",
  },
}));

export default ({ className, ...props }) => {
  const classes = useStyles();
  return <div {...props} className={clsx(className, classes.root)} />;
};
