import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: ({ lock }) => (lock ? "hidden" : "scroll"),
    overflowY: "hidden",
    transform: "translateZ(0)",
    "& *": {
      flexShrink: 0,
    },
  },
});

export default React.forwardRef(({ lock, className, ...props }, ref) => {
  const classes = useStyles({ lock });
  return <Box ref={ref} className={clsx(classes.root, className)} {...props} />;
});
