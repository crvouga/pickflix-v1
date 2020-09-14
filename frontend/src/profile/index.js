import {
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import { selectors, actions } from "../redux";
import SettingsDrawer from "./SettingsDrawer";
import Lists from "../lists/Lists";

export default () => {
  const theme = useTheme();
  const user = useSelector(selectors.auth.user);
  const status = useSelector(selectors.auth.status);
  const settingsDrawerOpen = useBoolean();
  const dispatch = useDispatch();
  const onClickCreateNewList = () => {
    dispatch(actions.modal.open("CreateListDialog"));
  };
  return (
    <React.Fragment>
      <SettingsDrawer
        DrawerProps={{
          open: settingsDrawerOpen.value,
          onClose: settingsDrawerOpen.setFalse,
        }}
      />
      {status === "loading" && <LinearProgress />}
      <List>
        <ListItem divider button onClick={settingsDrawerOpen.setTrue}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "white" }} src={user.photoURL} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} secondary={user.email} />
        </ListItem>

        <ListItem button divider onClick={onClickCreateNewList}>
          <ListItemIcon>
            <AddIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: theme.palette.primary.main }}
            primary="Create New List"
          />
        </ListItem>
      </List>
      <Lists />
    </React.Fragment>
  );
};
