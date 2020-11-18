import {
  AppBar,
  Box,
  DialogProps,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
import ErrorBox from "../../../common/components/ErrorBox";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import { useQueryLists } from "../../query";
import useEditListForm from "./useEditListForm";

type Props = DialogProps & {
  listId: string;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ listId, ...DialogProps }: Props) => {
  const editListForm = useEditListForm();
  const refTitle = useRef<HTMLInputElement>();
  const refDescription = useRef<HTMLInputElement>();

  const queryList = useQueryLists({ id: listId });

  useEffect(() => {
    if (DialogProps.open) {
      editListForm.reset();
    }
  }, [DialogProps.open]);

  if (queryList.error) {
    return <ErrorBox />;
  }

  if (queryList.data === undefined) {
    return null;
  }

  const handleClose = () => {
    DialogProps.onClose();
  };

  const list = queryList.data?.[0]?.results?.[0];

  const handleSubmit = async () => {
    try {
      await editListForm.submit({
        listId,
        title: refTitle.current?.value || "",
        description: refDescription.current?.value || "",
        listItemIds: Object.values(editListForm.deletions),
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResponsiveDialog {...DialogProps}>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
          <Typography style={{ flex: 1 }}>Edit List</Typography>
          <IconButton edge="end" onClick={handleSubmit}>
            <CheckOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        {editListForm.errors.map((error) => (
          <Box key={error.message} paddingY={1}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ))}
        <Box marginBottom={2}>
          <TextField
            defaultValue={list.list.title}
            inputRef={refTitle}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
          />
        </Box>
        <TextField
          rowsMax={4}
          defaultValue={list.list.description}
          inputRef={refDescription}
          variant="outlined"
          name="description"
          label="Description"
          placeholder="Give your list a catchy description"
          fullWidth
          multiline
        />
      </Box>
    </ResponsiveDialog>
  );
};
