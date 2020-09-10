import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const { handleSubmit, errors, control } = useForm({
    defaultValues: { title: "", description: "" },
  });
  const isOpen = useSelector(selectors.modal.isOpen("CreateListDialog"));
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.modal.close("CreateListDialog"));
  };

  const onSubmit = (data) => {
    console.log({ data });
  };

  return (
    <Dialog classes={classesDialog} open={isOpen} onClose={onClose}>
      <DialogTitle>Create List</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            control={control}
            as={TextField}
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            error={Boolean(errors?.title)}
            helperText={errors?.title?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
