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
import { useSelector } from "react-redux";
import auth from "../auth/redux";
import useBoolean from "../common/hooks/useBoolean";
import SettingsDrawer from "./SettingsDrawer";
import Todo from "./Todo";

export default () => {
  const theme = useTheme();
  const user = useSelector(auth.selectors.user);
  const status = useSelector(auth.selectors.status);
  const settingsDrawerOpen = useBoolean();

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

        <ListItem button>
          <ListItemIcon>
            <AddIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: theme.palette.primary.main }}
            primary="Create List"
          />
        </ListItem>
      </List>

      <Todo />
    </React.Fragment>
  );
};
