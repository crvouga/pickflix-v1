import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import Layer from "./Layer";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: theme.palette.background.paper,
    opacity: ({ opacity }) => opacity,
    // for some reason opacity(0.8) backdrop filter is not working!!!
    backdropFilter: ({ blur }) => `blur(${blur})`,
  },
}));

export default ({ className, opacity = 0.8, blur = "5px", ...props }) => {
  const classes = useStyles({ opacity, blur });
  return <Layer {...props} className={clsx(className, classes.backdrop)} />;
};
