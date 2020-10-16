import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import React from "react";
import { useHistory } from "react-router";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import useAutoList from "../lists/auto-list/useAutoListLogic";
import Lists from "../lists/Lists";
import useModal from "../navigation/modals/useModal";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import RecentlyViewed from "./RecentlyViewed";
import AutoListListItem from "../lists/auto-list/AutoListListItem";

const CreateNewListListItem = () => {
  const theme = useTheme();
  const addListModal = useModal("AddList");
  const handleClick = () => {
    addListModal.open();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: "transparent" }}>
          <AddIcon style={{ color: theme.palette.primary.main }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{ color: theme.palette.primary.main }}
        primary="Create New List"
      />
    </ListItem>
  );
};

export default () => {
  return (
    <React.Fragment>
      <NavigationBarTopLevel />

      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Lists"
          />
        </ListItem>
        <CreateNewListListItem />
        <AutoListListItem autoListKey="watch-next" />
        <AutoListListItem autoListKey="liked" />
        <Lists />
      </List>

      <Divider />

      <Box paddingY={2}>
        <RecentlyViewed />
      </Box>
    </React.Fragment>
  );
};
