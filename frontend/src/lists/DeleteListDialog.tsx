import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  makeStyles,
  Grow,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";
import { TransitionProps } from "@material-ui/core/transitions";

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

  const onDelete = () => {
    dispatch(actions.lists.deleteList(list.id));
  };

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
