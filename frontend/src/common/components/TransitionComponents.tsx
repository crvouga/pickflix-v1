import { Slide, Zoom } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

export const SlideUp = (props: TransitionProps) => {
  return <Slide direction="up" {...props} />;
};

export const ZoomIn = (props: TransitionProps) => {
  return <Zoom {...props} />;
};
