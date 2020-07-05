import { makeStyles, Box } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  svg: {
    width: "100%",
    display: "block",
    visibility: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

export default ({ ratio, children, ...props }) => {
  const classes = useStyles();
  const viewBox = [0, 0, ...ratio];

  return (
    <div {...props}>
      <div className={classes.wrapper}>
        <svg className={classes.svg} viewBox={viewBox} />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
