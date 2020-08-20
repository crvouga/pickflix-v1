import { Drawer, Box, List, ListItem, ListItemText } from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import auth from "../auth/redux";
import useBoolean from "../common/hooks/useBoolean";
import DeleteDialog from "./DeleteDialog";

export default ({ DrawerProps }) => {
  const dispatch = useDispatch();
  const deleteDialogOpen = useBoolean();

  const handleSignOut = () => {
    dispatch(auth.actions.signOut());
    DrawerProps.onClose();
  };

  const handleSignIn = () => {
    dispatch(push("/signIn"));
  };

  const handleDeleteUser = () => {
    dispatch(auth.actions.deleteUser());
    deleteDialogOpen.setFalse();
  };

  return (
    <React.Fragment>
      <DeleteDialog
        DialogProps={{
          open: deleteDialogOpen.value,
          onClose: deleteDialogOpen.setFalse,
        }}
        onDelete={handleDeleteUser}
      />
      <Drawer anchor="bottom" {...DrawerProps}>
        <List>
          <ListItem button onClick={handleSignIn}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button onClick={handleSignOut} divider>
            <ListItemText primary="Sign Out" />
          </ListItem>
          <Box color="error.main">
            <ListItem button onClick={deleteDialogOpen.setTrue}>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </Box>
        </List>
      </Drawer>
    </React.Fragment>
  );
};
