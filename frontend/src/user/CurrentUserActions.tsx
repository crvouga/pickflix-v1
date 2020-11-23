import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import useModal from "../app/modals/useModal";
import ResponsiveDialogDrawer from "../common/components/ResponsiveDialogDrawer";
import useBoolean from "../common/hooks/useBoolean";
import useReviewForm from "../review/form/review-form/useReviewForm";
import { signOut } from "./auth/query/mutations";
import { UserAggergation } from "./query";

export const OpenCurrentUserActionsModalButton = () => {
  const { open } = useModal("CurrentUserActions");

  return (
    <IconButton onClick={open}>
      <SettingsIcon />
    </IconButton>
  );
};

const useCurrentUserActions = () => {
  const isDialogOpen = useBoolean(false);
  const createListFormModal = useModal("CreateListForm");
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm();
  const editUserFormModal = useModal("EditUserForm");

  const onCreateReview = () => {
    reviewForm.setReview({});
    reviewFormModal.open();
  };

  const onEditUser = () => {
    editUserFormModal.open();
    isDialogOpen.setFalse();
  };

  const onCreateList = () => {
    createListFormModal.open();
  };

  const onSignOut = () => {
    signOut();
  };

  return {
    onEditUser,
    onCreateList,
    onCreateReview,
    onSignOut,
  };
};

export const CurrentUserActionsModal = () => {
  const { isOpen, close } = useModal("CurrentUserActions");

  const {
    onEditUser,
    onCreateList,
    onCreateReview,
    onSignOut,
  } = useCurrentUserActions();

  return (
    <ResponsiveDialogDrawer open={isOpen} onClose={close}>
      <List>
        <ListItem button onClick={onEditUser}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>

        <ListItem button onClick={onCreateList}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create List" />
        </ListItem>

        <ListItem button onClick={onCreateReview}>
          <ListItemIcon>
            <RateReviewOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Create Review" />
        </ListItem>

        <ListItem button onClick={onSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>

        <ListItem button onClick={close}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </ResponsiveDialogDrawer>
  );
};

export default ({}: { currentUser: UserAggergation }) => {
  const { onEditUser, onCreateList, onCreateReview } = useCurrentUserActions();

  return (
    <React.Fragment>
      <Toolbar disableGutters>
        <OpenCurrentUserActionsModalButton />

        <IconButton onClick={onEditUser}>
          <EditOutlinedIcon />
        </IconButton>

        <IconButton onClick={onCreateList}>
          <PlaylistAddIcon />
        </IconButton>

        <IconButton onClick={onCreateReview}>
          <RateReviewOutlinedIcon />
        </IconButton>
      </Toolbar>
    </React.Fragment>
  );
};
