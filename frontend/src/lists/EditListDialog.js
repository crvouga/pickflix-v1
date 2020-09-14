import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import React, { useRef, useState } from "react";
import backendAPI from "../backendAPI";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default ({ list, ...DialogProps }) => {
  const classesDialog = useStylesDialog();

  const [errors, setErrors] = useState({});
  const inputRefTitle = useRef();
  const inputRefDescription = useRef();

  const onClickSaveChanges = async () => {
    const title = inputRefTitle.current.value;
    const description = inputRefDescription.current.value;

    const formData = { title, description };
    try {
      const response = await backendAPI.patch(
        `/api/lists/${list.id}`,
        formData
      );
      const patchedList = response.data;
      DialogProps.onClose();
    } catch (error) {
      const errors = JSON.parse(error.response.data.errors);
      console.log({ errors });
    }
  };

  console.log("RENDER");

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      classes={classesDialog}
      {...DialogProps}
    >
      <AppBar color="default" position="sticky">
        <Toolbar>
          <IconButton onClick={DialogProps.onClose}>
            <CloseOutlinedIcon />
          </IconButton>
          <Typography style={{ flex: 1 }}>Edit List</Typography>
          <IconButton onClick={onClickSaveChanges}>
            <CheckOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Box marginBottom={2}>
          <TextField
            defaultValue={list.title}
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
        <TextField
          defaultValue={list.description}
          inputRef={inputRefDescription}
          variant="outlined"
          name="description"
          label="Description"
          placeholder="Give your list a catchy description"
          fullWidth
          multiline
          error={Boolean(errors?.description)}
          helperText={errors?.description?.message}
        />
      </Box>
    </Dialog>
  );
};
