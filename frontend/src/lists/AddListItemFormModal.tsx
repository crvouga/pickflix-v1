import {
  Avatar,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import BottomButton from "../common/components/BottomButton";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import useModal from "../navigation/modals/useModal";
import makeImageUrl from "../tmdb/makeImageUrl";
import { useQueryLists } from "./hooks/query";
import useAddListForm from "./hooks/useAddListForm";
import useAddListItemForm from "./hooks/useAddListItemForm";

const Lists = ({ onClick }: { onClick: (listId: string) => void }) => {
  const query = useQueryLists();

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const lists = query.data;

  return (
    <List>
      {lists.map((list, index) => (
        <ListItem
          key={list?.id || index}
          divider
          button
          onClick={() => onClick(list?.id)}
        >
          <ListItemAvatar>
            <Avatar
              key={list.listItems[0]?.id || index}
              variant="square"
              src={makeImageUrl(1, {
                posterPath: list.listItems[0]?.tmdbData.posterPath,
              })}
            >
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>

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
  const addListItemForm = useAddListItemForm();

  const addListModal = useModal("AddList");
  const addListForm = useAddListForm();

  const handleClose = () => {
    addListItemForm.reset();
    addListItemModal.close();
  };

  const handleClickCreate = () => {
    addListForm.setItemInfos(addListItemForm.itemInfos);
    handleClose();
    addListModal.open();
  };

  const handleClickList = async (listId: string) => {
    await addListItemForm.submit(listId);
    handleClose();
  };

  return (
    <Dialog fullScreen open={addListItemModal.isOpen} onClose={handleClose}>
      <ListItem divider>
        <ListItemText primary="Save to..." />
        <Button onClick={handleClickCreate} color="primary">
          Create New
        </Button>
      </ListItem>
      <Lists onClick={handleClickList} />
      <BottomButton onClick={handleClose} />
    </Dialog>
  );
};
