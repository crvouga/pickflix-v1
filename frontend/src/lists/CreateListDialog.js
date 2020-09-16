import * as R from "ramda";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
  TextField,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { queryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import backendAPI from "../backendAPI";
import * as queryConfigs from "./redux/query-configs";
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

  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.modal.isOpen("CreateListDialog"));
  const props = useSelector(selectors.modal.props("CreateListDialog"));
  const onClose = () => {
    dispatch(actions.modal.close("CreateListDialog"));
  };

  const [errors, setErrors] = useState({});
  const inputRefTitle = useRef();

  const onClickCreate = async () => {
    const listInfo = {
      title: inputRefTitle.current.value,
    };
    try {
      dispatch(
        actions.query.mutateAsync(queryConfigs.createListMutation(listInfo))
      );
      dispatch(
        actions.snackbar.enqueueSnackbar({
          message: "Successfully created list",
          options: {
            variant: "info",
          },
        })
      );
    } catch (error) {
    } finally {
      onClose();
    }
  };

  return (
    <Dialog classes={classesDialog} open={isOpen} onClose={onClose}>
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            inputRef={inputRefTitle}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            error={Boolean(errors?.title)}
            helperText={errors?.title?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={onClickCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
