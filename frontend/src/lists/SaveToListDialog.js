import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as queryConfigs from "./redux/query-configs";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default () => {
  const dispatch = useDispatch();

  // modal

  const isOpen = useSelector(selectors.modal.isOpen("SaveToListDialog"));
  const modalProps = useSelector(selectors.modal.props("SaveToListDialog"));

  const onClose = () => {
    dispatch(actions.modal.close("SaveToListDialog"));
  };
  const onClickCreateList = () => {
    dispatch(actions.modal.close("SaveToListDialog"));
    dispatch(actions.modal.open("CreateListDialog"));
  };

  // lists

  const tmdbMediaId = modalProps.movieId;

  const listsQueryConfig = queryConfigs.listsRequest();
  useEffect(() => {
    if (isOpen) {
      dispatch(actions.query.requestAsync(listsQueryConfig));
    }
  }, [dispatch, listsQueryConfig, isOpen]);

  const listsQuery = useSelector(selectors.query.query(listsQueryConfig));
  const lists = useSelector(selectors.lists.lists);

  const handleSaveToList = (listId) => async () => {
    dispatch(
      actions.lists.addListItem({
        listId,
        tmdbMediaType: "movie",
        tmdbMediaId,
      })
    );
    dispatch(actions.modal.close("SaveToListDialog"));
  };

  const handleDone = () => {
    dispatch(actions.modal.close("SaveToListDialog"));
  };

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={isOpen}
      onClose={onClose}
    >
      {listsQuery.isPending && <LinearProgress />}
      <ListItem divider>
        <ListItemText primary="Save to..." />
        <Button onClick={onClickCreateList} color="primary">
          Create New
        </Button>
      </ListItem>
      <List>
        <React.Fragment>
          {lists.map((list) => (
            <ListItem
              divider
              key={list.id}
              button
              onClick={handleSaveToList(list.id)}
            >
              <Box marginX={1}>
                <AvatarGroup spacing="small">
                  {R.take(3, list.listItems || []).map((listItem) => (
                    <Avatar
                      variant="square"
                      src={makeTMDbImageURL(3, listItem?.tmdbData)}
                    >
                      <MovieIcon />
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box>
              {/* <ListItemIcon>
                  <Checkbox checked={isChecked(list.id)} />
                </ListItemIcon> */}
              <ListItemText
                primary={list.title}
                secondary={`${list?.listItemCount || 0} items`}
              />
            </ListItem>
          ))}
        </React.Fragment>

        <Divider />
        <ListItem button onClick={handleDone}>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Done" />
        </ListItem>
      </List>
    </Dialog>
  );
};
