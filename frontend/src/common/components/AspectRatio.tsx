import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import AbsolutePositionBox from "./AbsolutePositionBox";

const useStyles = makeStyles({
  svg: {
    width: "100%",
    height: "100%",
  },
});

interface Props extends BoxProps {
  ratio: [number, number];
}

export default ({ ratio, children, ...restOfProps }: Props) => {
  const classes = useStyles();
  return (
    <Box position="relative" {...restOfProps}>
      <svg className={classes.svg} viewBox={[0, 0, ...ratio].join(", ")} />
      <AbsolutePositionBox>{children}</AbsolutePositionBox>
    </Box>
  );
};
