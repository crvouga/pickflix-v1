import { Slide, Zoom } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

export const SlideUp = React.forwardRef((props: TransitionProps, ref) => {
  return <Slide ref={ref} direction="up" {...props} />;
});

export const ZoomIn = React.forwardRef((props: TransitionProps, ref) => {
  return <Zoom ref={ref} {...props} />;
});
