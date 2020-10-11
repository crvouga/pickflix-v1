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
import { useQuery, useQueryCache } from "react-query";

import BottomButton from "../common/components/BottomButton";
import CircularProgressBox from "../common/components/CircularProgressBox";
import ErrorBox from "../common/components/ErrorBox";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import {
  getLists,
  queryKeys,
  addListItemMutation,
  addListMutation,
} from "./query";
import useModal from "../navigation/modals/useModal";
import { useSelector, useDispatch } from "../redux/react-redux";
import { addListItemsForm } from "./redux/add-list-items-form";
import { snackbar } from "../snackbar/redux/snackbar";
import { ViewListButton } from "../snackbar/Snackbar";
import { useMutation } from "react-query";
import { List as IList } from "./types";

const Lists = ({ onClick }: { onClick: (listId: string) => void }) => {
  const query = useQuery(queryKeys.lists(), getLists);

  const handleClick = (listId: string) => () => onClick(listId);

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
          onClick={handleClick(list?.id)}
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
  const addListItemModal = useModal("AddListItem");
  const addListModal = useModal("AddList");
  const queryCache = useQueryCache();
  const dispatch = useDispatch();

  const listItemInfos = useSelector(
    (state) => state.addListItemsForm.listItemInfos
  );

  const handleClickList = async (listId: string) => {
    const listItemInfo = listItemInfos[0];
    const lists = queryCache.getQueryData<IList[]>(queryKeys.lists());
    const list = lists?.find((list) => list.id === listId);
    try {
      await addListItemMutation({
        ...listItemInfo,
        listId,
      });

      dispatch(
        snackbar.actions.display({
          message: list ? `Added to "${list.title}"` : "Added to list",
          action: <ViewListButton listId={listId} />,
        })
      );
    } catch (error) {
    } finally {
      addListItemModal.close();
    }
  };

  const onClose = () => {
    addListItemModal.close();
  };

  const onClickCreateList = () => {
    addListItemModal.close();
    addListModal.open();
  };

  const handleDone = () => {
    addListItemModal.close();
  };

  return (
    <Dialog fullScreen open={addListItemModal.isOpen} onClose={onClose}>
      <ListItem divider>
        <ListItemText primary="Save to..." />
        <Button onClick={onClickCreateList} color="primary">
          Create New
        </Button>
      </ListItem>

      <Lists onClick={handleClickList} />

      <BottomButton onClick={handleDone} />
    </Dialog>
  );
};
