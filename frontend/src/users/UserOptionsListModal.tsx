import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useAuth } from "../auth/useAuth";
import ResponsiveDialogDrawer from "../common/components/ResponsiveDialogDrawer";
type Props = {
  open: boolean;
  onClose: () => void;
};

export default ({ open, onClose }: Props) => {
  const auth = useAuth();
  const handleClickSignOut = async () => {
    await auth.signOut();
  };

  return (
    <ResponsiveDialogDrawer open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={handleClickSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </ResponsiveDialogDrawer>
  );
};
