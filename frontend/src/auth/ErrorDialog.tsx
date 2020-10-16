import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./redux/auth";
import { AuthError } from "./redux/types";
import { capitalize } from "../utils";

const errorToTitle = (error: AuthError) =>
  (error?.code || "").split("/")[0].split("-").map(capitalize).join(" ");

export default () => {
  const error = useSelector(auth.selectors.error);
  const open = Boolean(error);

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(auth.actions.setError(undefined));
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
