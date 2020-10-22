import {
  AppBar,
  Avatar,
  Box,
  Checkbox,
  Dialog,
  DialogProps,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useRef, useEffect } from "react";
import ErrorBox from "../common/components/ErrorBox";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { useQueryList, useQueryListItems } from "./hooks/query";
import useEditListForm from "./hooks/useEditListForm";
import { Alert } from "@material-ui/lab";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

type Props = DialogProps & {
  listId: string;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ listId, ...DialogProps }: Props) => {
  const classesDialog = useStylesDialog();

  const editListForm = useEditListForm({ listId });
  const refTitle = useRef<HTMLInputElement>();
  const refDescription = useRef<HTMLInputElement>();

  const queryList = useQueryList({ listId });
  const queryListItems = useQueryListItems({ listId });

  useEffect(() => {
    if (DialogProps.open) {
      editListForm.reset();
    }
  }, [DialogProps.open]);

  if (queryList.error || queryListItems.error) {
    return <ErrorBox />;
  }

  if (!queryList.data || !queryListItems.data) {
    return null;
  }

  const handleClose = () => {
    DialogProps.onClose();
  };

  const list = queryList.data;
  const listItems = queryListItems.data;

  const handleSubmit = async () => {
    try {
      await editListForm.submit({
        title: refTitle.current?.value || "",
        description: refDescription.current?.value || "",
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullScreen classes={classesDialog} {...DialogProps}>
      <React.Fragment>
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
              defaultValue={list.title}
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
            defaultValue={list.description}
            inputRef={refDescription}
            variant="outlined"
            name="description"
            label="Description"
            placeholder="Give your list a catchy description"
            fullWidth
            multiline
          />
        </Box>
        <Box
          color={
            Object.entries(editListForm.deletions).length === 0
              ? "text.disabled"
              : "text.primary"
          }
        >
          <List>
            <ListItem divider>
              <ListItemIcon style={{ color: "inherit" }}>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Deletions ${
                  Object.entries(editListForm.deletions).length
                }`}
              />
            </ListItem>
            {listItems.map((listItem) => (
              <ListItem
                divider
                key={listItem.id}
                button
                onClick={() => editListForm.toggleDeletion(listItem)}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={makeTMDbImageURL(3, listItem?.tmdbData)}
                  />
                </ListItemAvatar>
                <Box
                  color={
                    editListForm.deletions[listItem.id]
                      ? "text.primary"
                      : "text.disabled"
                  }
                >
                  <ListItemText primary={listItem?.tmdbData?.title} />
                </Box>
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={Boolean(editListForm.deletions[listItem.id])}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </React.Fragment>
    </Dialog>
  );
};