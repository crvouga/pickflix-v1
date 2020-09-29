import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {},
  svg: {
    width: "100%",
    position: "absolute",
  },
  childrenWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

interface Props extends BoxProps {
  ratio: [number, number];
}

export default ({ ratio, children, ...restOfProps }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} {...restOfProps}>
      <svg className={classes.svg} viewBox={[0, 0, ...ratio].join(", ")} />
      <div className={classes.childrenWrapper}>{children}</div>
    </Box>
  );
};
