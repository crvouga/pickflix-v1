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
import { useDispatch } from "react-redux";
import NavigationBarTopLevel from "../common/NavigationBarTopLevel";
import Lists from "../lists/Lists";
import { actions } from "../redux";
import { ModalName } from "../redux/router/types";
import RecentlyViewed from "./RecentlyViewed";

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onClickCreateNewList = () => {
    dispatch(actions.router.open({ name: ModalName.CreateList }));
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
