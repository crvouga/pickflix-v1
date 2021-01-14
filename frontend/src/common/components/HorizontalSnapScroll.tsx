import { Box, BoxProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    overflowY: "hidden",
    transform: "translateZ(0)",
    "& *": {
      flexShrink: 0,
    },
    scrollSnapType: "x mandatory",
  },
  childWrapper: {
    scrollSnapAlign: "start",
  },
});

export default ({ className, children, ...props }: BoxProps) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...props}>
      {React.Children.map(children, (child) => (
        <Box className={classes.childWrapper}>{child}</Box>
      ))}
    </Box>
  );
};
