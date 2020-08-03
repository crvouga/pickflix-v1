import { Collapse, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import * as R from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import form from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
}));

const capitalize = R.pipe(
  R.juxt([R.pipe(R.head, R.toUpper), R.pipe(R.tail, R.toLower)]),
  R.join("")
);

const codeToTitle = R.pipe(
  R.split("/"),
  R.last,
  R.split("-"),
  R.map(capitalize),
  R.join(" ")
);

export default () => {
  const classes = useStyles();
  const error = useSelector(form.selectors.error);

  return (
    <Collapse in={Boolean(error)}>
      <Alert classes={classes} severity="error" variant="outlined">
        <AlertTitle>{codeToTitle(error?.code || "")}</AlertTitle>
        {error?.message || ""}
      </Alert>
    </Collapse>
  );
};
