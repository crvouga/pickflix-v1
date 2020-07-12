import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
  },
});

export default (props) => {
  return <div {...props} />;
};
