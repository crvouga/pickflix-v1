import { Slide, Zoom } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

export const SlideUp = React.forwardRef((props: TransitionProps, ref) => {
  return <Slide ref={ref} direction="up" {...props} />;
});

export const SlideDown = React.forwardRef((props: TransitionProps, ref) => {
  return <Slide ref={ref} direction="down" {...props} />;
});

export const SlideLeft = React.forwardRef((props: TransitionProps, ref) => {
  return <Slide ref={ref} direction="left" {...props} />;
});

export const SlideRight = React.forwardRef((props: TransitionProps, ref) => {
  return <Slide ref={ref} direction="right" {...props} />;
});

export const ZoomIn = React.forwardRef((props: TransitionProps, ref) => {
  return <Zoom ref={ref} {...props} />;
});
