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
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as queryConfigs from "./redux/query-configs";

const listsQueryConfig = queryConfigs.listsRequest();

export default () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectors.router.isOpen(ModalName.SaveToList));
  const modalProps = useSelector(selectors.router.props(ModalName.SaveToList));
  const listsQuery = useSelector(selectors.query.queryState(listsQueryConfig));
  const lists = useSelector(selectors.lists.lists);

  const onClose = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  const onClickCreateList = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
    dispatch(actions.router.open({ name: ModalName.CreateList }));
  };

  const tmdbMediaId = modalProps.movieId;

  const handleSaveToList = (listId: string) => async () => {
    dispatch(
      actions.lists.addListItem({
        listId,
        tmdbMediaType: "movie",
        tmdbMediaId,
      })
    );
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  const handleDone = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(actions.query.requestAsync(listsQueryConfig));
    }
  }, [dispatch, isOpen]);

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
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
              key={list?.id}
              divider
              button
              onClick={handleSaveToList(list?.id)}
            >
              <Box marginX={1}>
                <AvatarGroup spacing="small">
                  {R.take(1, list.listItems || []).map((listItem) => (
                    <Avatar
                      key={listItem?.id}
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
