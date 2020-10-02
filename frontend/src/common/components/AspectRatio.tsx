import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import AbsolutePositionBox from "./AbsolutePositionBox";

const useStyles = makeStyles({
  svg: {
    width: "100%",
  },
});

type Props = React.PropsWithChildren<{
  ratio: [number, number];
  ContainerProps?: BoxProps;
  ContentProps?: BoxProps;
}>;

export default ({ ratio, ContainerProps, ContentProps, children }: Props) => {
  const classes = useStyles();
  return (
    <Box position="relative" {...ContainerProps}>
      <svg className={classes.svg} viewBox={[0, 0, ...ratio].join(", ")} />
      <AbsolutePositionBox {...ContentProps}>{children}</AbsolutePositionBox>
    </Box>
  );
};
