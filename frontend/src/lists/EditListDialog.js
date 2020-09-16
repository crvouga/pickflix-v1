import {
  AppBar,
  Avatar,
  Box,
  Checkbox,
  Dialog,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as R from "ramda";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as queryConfigs from "./redux/query-configs";

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
  const dispatch = useDispatch();

  const listItemsRequest = queryConfigs.listItemsRequest({ listId: list.id });

  const listItemsQuery = useSelector(selectors.query.query(listItemsRequest));
  const listItems = useSelector(selectors.lists.listItems(list.id));

  const [errors, setErrors] = useState({});
  const inputRefTitle = useRef();
  const inputRefDescription = useRef();
  const [listItemDeletions, setListItemDeletions] = useState({});

  useEffect(() => {
    setListItemDeletions({});
  }, [DialogProps.open]);

  const toggleDeletions = (listItem) => () => {
    setListItemDeletions(
      R.ifElse(
        R.has(listItem.id),
        R.dissoc(listItem.id),
        R.assoc(listItem.id, listItem.id)
      )
    );
  };

  const onClickSaveChanges = async () => {
    const title = inputRefTitle.current.value;
    const description = inputRefDescription.current.value;

    const listInfo = { title, description };

    try {
      dispatch(
        actions.query.mutateAsync(
          queryConfigs.editListMutation({ listId: list.id, ...listInfo })
        )
      );
      dispatch(
        actions.query.mutateAsync(
          queryConfigs.deleteListItemsMutation({
            listId: list.id,
            listItemIds: R.keys(listItemDeletions),
          })
        )
      );
      DialogProps.onClose();
    } catch (error) {
      const errors = JSON.parse(error.response.data.errors);
      console.log({ errors });
    }
  };

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      classes={classesDialog}
      {...DialogProps}
    >
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
