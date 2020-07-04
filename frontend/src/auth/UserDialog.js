import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useSnackbar } from "notistack";
import React from "react";

export default () => {
  const { user = {} } = {};
  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = () => {
    close();
    enqueueSnackbar(`${user.displayName} logged out`, {
      variant: "info",
    });
  };
  return (
    <Dialog open={false}>
      <DialogTitle>Account</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user.photo}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.displayName} secondary={user.email} />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
