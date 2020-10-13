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
import React from "react";
import LoadingBox from "../common/components/LoadingBox";
import ErrorBox from "../common/components/ErrorBox";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import useEditListLogic from "./useEditListLogic";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

type Props = DialogProps & {
  listId: string;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
};

const DialogBody = ({
  listId,
  onClose,
}: {
  listId: string;
  onClose: () => void;
}) => {
  const {
    inputRefTitle,
    inputRefDescription,
    listItemDeletions,
    //
    toggleListItemDeletions,
    onSaveChanges,
    //
    queryList,
    queryListItems,
  } = useEditListLogic(listId);

  const handleSaveChanges = () => {
    onSaveChanges();
    onClose();
  };

  if (queryList.error || queryListItems.error) {
    return <ErrorBox />;
  }

  if (!queryList.data || !queryListItems.data) {
    return <LoadingBox />;
  }

  const list = queryList.data;
  const listItems = queryListItems.data;

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
          <Typography style={{ flex: 1 }}>Edit List</Typography>
          <IconButton onClick={handleSaveChanges}>
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
        />
      </Box>
      <Box
        color={
          Object.entries(listItemDeletions).length === 0
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
              primary={`Deletions ${Object.entries(listItemDeletions).length}`}
            />
          </ListItem>
          {listItems.map((listItem) => (
            <ListItem
              divider
              key={listItem.id}
              button
              onClick={toggleListItemDeletions(listItem)}
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={makeTMDbImageURL(3, listItem?.tmdbData)}
                />
              </ListItemAvatar>
              <Box
                color={
                  listItemDeletions[listItem.id]
                    ? "text.primary"
                    : "text.disabled"
                }
              >
                <ListItemText primary={listItem?.tmdbData?.title} />
              </Box>
              <ListItemSecondaryAction>
                <Checkbox checked={Boolean(listItemDeletions[listItem.id])} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </React.Fragment>
  );
};

export default ({ listId, ...DialogProps }: Props) => {
  const classesDialog = useStylesDialog();
  const handleClose = () => {
    DialogProps.onClose();
  };
  return (
    <Dialog fullScreen classes={classesDialog} {...DialogProps}>
      <DialogBody listId={listId} onClose={handleClose} />
    </Dialog>
  );
};
