import {
  Avatar,
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import BottomButton from "../common/components/BottomButton";
import CircularProgressBox from "../common/components/CircularProgressBox";
import ErrorBox from "../common/components/ErrorBox";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { fetchLists, queryKeys } from "./data";

const Lists = ({ tmdbMediaId }: { tmdbMediaId?: string }) => {
  const query = useQuery(queryKeys.lists(), () => fetchLists());

  const dispatch = useDispatch();

  const handleSaveToList = (listId: string) => async () => {
    if (tmdbMediaId) {
      dispatch(
        actions.lists.addListItem({
          listId,
          tmdbMediaType: "movie",
          tmdbMediaId,
        })
      );
      dispatch(actions.router.close({ name: ModalName.SaveToList }));
    }
  };

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <CircularProgressBox />;
  }

  const lists = query.data;

  return (
    <List>
      {lists.map((list, index) => (
        <ListItem
          key={list?.id || index}
          divider
          button
          onClick={handleSaveToList(list?.id)}
        >
          <Box marginX={1}>
            <AvatarGroup spacing="small">
              {R.take(1, list.listItems || []).map((listItem, index) => (
                <Avatar
                  key={listItem?.id || index}
                  variant="square"
                  src={makeTMDbImageURL(3, {
                    posterPath: listItem?.tmdbData.posterPath,
                  })}
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
    </List>
  );
};

export default () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectors.router.isOpen(ModalName.SaveToList));
  const modalProps = useSelector(selectors.router.props(ModalName.SaveToList));

  const { movieId: tmdbMediaId } = modalProps;

  const onClose = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  const onClickCreateList = () => {
    if (tmdbMediaId) {
      dispatch(actions.router.close({ name: ModalName.SaveToList }));
      dispatch(
        actions.router.open({
          name: ModalName.CreateList,
          props: {
            listItemInfos: [
              {
                tmdbMediaType: "movie",
                tmdbMediaId,
              },
            ],
          },
        })
      );
    }
  };

  const handleDone = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <ListItem divider>
        <ListItemText primary="Save to..." />
        <Button onClick={onClickCreateList} color="primary">
          Create New
        </Button>
      </ListItem>

      <Lists tmdbMediaId={tmdbMediaId} />

      <BottomButton onClick={handleDone} />
    </Dialog>
  );
};
