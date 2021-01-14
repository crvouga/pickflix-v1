import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  gutter: theme.mixins.toolbar,
}));

export const AppBarGutter = (props: BoxProps) => {
  const classes = useStyles();
  return <Box className={classes.gutter} {...props} />;
};
