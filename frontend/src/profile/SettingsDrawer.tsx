import {
  Box,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import { actions } from "../redux";
import DeleteDialog from "./DeleteDialog";
import { ModalName } from "../redux/router/types";

interface Props {
  DrawerProps: DrawerProps;
}

const close = (DrawerProps: DrawerProps) => () =>
  DrawerProps?.onClose?.({}, "backdropClick");

export default ({ DrawerProps }: Props) => {
  const dispatch = useDispatch();
  const deleteDialogOpen = useBoolean();

  const handleSignOut = () => {
    dispatch(actions.auth.signOut());
    close(DrawerProps);
  };

  const handleSignIn = () => {
    dispatch(actions.router.push({ pathname: "/signIn" }));
    close(DrawerProps);
  };

  const handleDeleteUser = () => {
    dispatch(actions.auth.deleteUser());
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
