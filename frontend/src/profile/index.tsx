import {
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
  Box,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import Lists from "../lists/Lists";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";
import SettingsDrawer from "./SettingsDrawer";
import NavigationBar from "../common/NavigationBar";
import NavigationBarTopLevel from "../common/NavigationBarTopLevel";
import RecentlyViewed from "./RecentlyViewed";

export default () => {
  const theme = useTheme();
  const user = useSelector(selectors.auth.user);
  const authStatus = useSelector(selectors.auth.authStatus);
  const settingsDrawerOpen = useBoolean();
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
