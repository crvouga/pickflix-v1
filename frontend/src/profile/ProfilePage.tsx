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
import React from "react";
import ListList from "../lists/ListList";
import useModal from "../navigation/modals/useModal";

import RecentlyViewed from "./RecentlyViewed";
import NavBar from "../navigation/NavBar";

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
      <NavBar />

      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Lists"
          />
        </ListItem>
        <CreateNewListListItem />

        <ListList />
      </List>

      <Divider />

      <Box paddingY={2}>
        <RecentlyViewed />
      </Box>
    </React.Fragment>
  );
};
