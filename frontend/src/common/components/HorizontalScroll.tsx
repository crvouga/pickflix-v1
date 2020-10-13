import { Box, BoxProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: ({ lock }: { lock: boolean }) => (lock ? "hidden" : "scroll"),
    overflowY: "hidden",
    transform: "translateZ(0)",
    "& *": {
      flexShrink: 0,
    },
  },
});

interface Props extends BoxProps {
  lock?: boolean;
}

export default React.forwardRef<Element, Props>(
  ({ lock = false, className, ...props }, ref) => {
    const classes = useStyles({ lock });

    return (
      <Box
        /* 
          https://github.com/mui-org/material-ui/issues/17010 
          ref={ref} does not work in typescript >:|
        */
        {...{ ref }}
        className={clsx(classes.root, className)}
        {...props}
      />
    );
  }
);
