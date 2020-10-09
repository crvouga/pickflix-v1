import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Grow,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import { queryCache, useMutation } from "react-query";

import { deleteList, queryKeys } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const TransitionComponent = (props: TransitionProps) => <Grow {...props} />;

const useStylesDialog = makeStyles({
  paper: {
    width: "80%",
  },
});

type Props = DialogProps & { list: { id: string } };

const close = (props: DialogProps) => () => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

export default (props: Props) => {
  const { list } = props;
  const classesDialog = useStylesDialog();

  const dispatch = useDispatch();

  const onDelete = () => {};

  return (
    <Dialog
      TransitionComponent={TransitionComponent}
      classes={classesDialog}
      {...props}
    >
      <DialogTitle>Delete list?</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={close(props)}>
          Cancel
        </Button>
        <Button color="primary" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
