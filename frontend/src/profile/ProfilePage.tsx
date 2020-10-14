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
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import Lists from "../lists/Lists";
import { getWatchNextList, queryKeys } from "../lists/query";
import useModal from "../navigation/modals/useModal";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import RecentlyViewed from "./RecentlyViewed";
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

const WatchNextListListItem = () => {
  const history = useHistory();
  const theme = useTheme();
  const query = useQuery(queryKeys.watchNextList(), () => getWatchNextList());

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <ListItemSkeleton />;
  }

  const watchNextList = query.data;

  const handleClick = () => {
    history.push(`/watch-next`);
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: "transparent" }}>
          <BookmarkIcon style={{ color: theme.palette.text.primary }} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={watchNextList.title}
        secondary={`${watchNextList.listItemCount} items`}
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
        <WatchNextListListItem />
        <Lists />
      </List>

      <Divider />

      <Box paddingY={2}>
        <RecentlyViewed />
      </Box>
    </React.Fragment>
  );
};
