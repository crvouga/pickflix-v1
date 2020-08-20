import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "./redux";

const capitalize = R.pipe(
  R.juxt([R.pipe(R.head, R.toUpper), R.pipe(R.tail, R.toLower)]),
  R.join("")
);

const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));

const errorToTitle = pipeWhileNotNil([
  R.propOr("", "code"),
  R.split("/"),
  R.nth(1),
  R.split("-"),
  R.map(capitalize),
  R.join(" "),
]);

export default () => {
  const error = useSelector(auth.selectors.error);
  const open = Boolean(error);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(auth.actions.setError(null));
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{errorToTitle(error)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{error?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
