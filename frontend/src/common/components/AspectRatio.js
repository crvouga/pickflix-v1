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

export default ({ ratio, children, classes = {}, ...props }) => {
  const localClasses = useStyles();
  const viewBox = [0, 0, ...ratio];

  return (
    <Box className={classes.root} {...props}>
      <div className={localClasses.wrapper}>
        <svg className={localClasses.svg} viewBox={viewBox} />
        <div className={clsx(classes.content, localClasses.content)}>
          {children}
        </div>
      </div>
    </Box>
  );
};
