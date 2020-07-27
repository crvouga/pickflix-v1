import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: ({ lock }) => (lock ? "hidden" : "scroll"),
    overflowY: "hidden",
    transform: "translateZ(0)",
  },
});

export default React.forwardRef(({ className, lock, ...props }, ref) => {
  const classes = useStyles({ lock });
  return <Box ref={ref} {...props} className={clsx(className, classes.root)} />;
});
