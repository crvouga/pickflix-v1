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
import Lists from "../lists/Lists";
import useModal from "../navigation/modals/useModal";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import RecentlyViewed from "./RecentlyViewed";

export default () => {
  const theme = useTheme();
  const addListModal = useModal("AddList");

  const onClickCreateNewList = () => {
    addListModal.open();
  };

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box paddingY={2}>
        <RecentlyViewed />
      </Box>
      <Divider />

      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Lists"
          />
        </ListItem>
        <ListItem button onClick={onClickCreateNewList}>
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
        <Lists />
      </List>
    </React.Fragment>
  );
};
