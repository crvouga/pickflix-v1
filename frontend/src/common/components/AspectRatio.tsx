import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import AbsolutePositionBox from "./AbsolutePositionBox";
import clsx from "clsx";

const useStyles = makeStyles({
  svg: {
    width: "100%",
  },
});

type Props = BoxProps & {
  ratio: [number, number];
  ContainerProps?: BoxProps;
  ContentProps?: BoxProps;
  SVGProps?: Omit<React.SVGProps<SVGElement>, "ref">;
};

export default ({
  ratio,
  SVGProps,
  ContainerProps,
  ContentProps,
  children,
  ...props
}: Props) => {
  const classes = useStyles();
  return (
    <Box position="relative" {...ContainerProps} {...props}>
      <svg
        viewBox={[0, 0, ...ratio].join(", ")}
        className={clsx(classes.svg, SVGProps?.className)}
        {...SVGProps}
      />
      <AbsolutePositionBox {...ContentProps}>{children}</AbsolutePositionBox>
    </Box>
  );
};
