import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    overflowY: "hidden",
    transform: "translateZ(0)",
  },
});

export default ({ className, ...props }) => {
  const classes = useStyles();
  return <Box {...props} className={clsx(className, classes.root)} />;
};
