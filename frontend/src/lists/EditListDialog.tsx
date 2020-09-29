import {
  AppBar,
  Avatar,
  Box,
  Checkbox,
  Dialog,
  DialogProps,
  IconButton,
  LinearProgress,
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
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import { actions, selectors } from "../redux";
import { useDispatch, useSelector } from "../redux/types";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { IList, IListItem } from "./redux/entities";
import * as queryConfigs from "./redux/query-configs";

interface IProps extends DialogProps {
  list: IList;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
}

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default ({ list, ...DialogProps }: IProps) => {
  const classesDialog = useStylesDialog();
  const dispatch = useDispatch();

  const listItemsRequest = queryConfigs.listItemsRequest({ listId: list.id });
  const listItemsQuery = useSelector(
    selectors.query.queryState(listItemsRequest)
  );
  const listItems = useSelector(selectors.lists.listItems(list.id));

  const inputRefTitle = useRef<HTMLInputElement>();
  const inputRefDescription = useRef<HTMLInputElement>();
  const [listItemDeletions, setListItemDeletions] = useState<{
    [id: string]: string;
  }>({});

  useEffect(() => {
    setListItemDeletions({});
  }, [DialogProps.open]);

  const toggleDeletions = (listItem: IListItem) => () => {
    setListItemDeletions(
      R.ifElse(
        R.has(listItem.id),
        R.dissoc(listItem.id),
        R.assoc(listItem.id, listItem.id)
      )
    );
  };

  const onClickSaveChanges = async () => {
    dispatch(
      actions.lists.editList({
        listId: list.id,
        title: inputRefTitle.current?.value || "",
        description: inputRefDescription.current?.value || "",
      })
    );

    dispatch(
      actions.lists.deleteListItem({
        listId: list.id,
        listItemIds: R.values(listItemDeletions),
      })
    );

    DialogProps.onClose();
  };

  return (
    <Dialog fullScreen classes={classesDialog} {...DialogProps}>
      {listItemsQuery.isPending && <LinearProgress />}
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
              onClick={toggleDeletions(listItem)}
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={makeTMDbImageURL(3, listItem.tmdbData)}
                ></Avatar>
              </ListItemAvatar>
              <Box
                color={
                  listItemDeletions[listItem.id]
                    ? "text.primary"
                    : "text.disabled"
                }
              >
                <ListItemText primary={listItem.tmdbData.title} />
              </Box>
              <ListItemSecondaryAction>
                <Checkbox checked={Boolean(listItemDeletions[listItem.id])} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
};
