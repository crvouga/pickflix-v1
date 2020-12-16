import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import React from "react";
import { useHistory } from "react-router";
import useModal from "../../../app/modals/useModal";
import LoadingDialog from "../../../common/components/LoadingDialog";
import {
  DoneButton,
  ResponsiveDialog,
} from "../../../common/components/ResponsiveDialog";
import ResponsiveDialogDrawer from "../../../common/components/ResponsiveDialogDrawer";
import {
  SlideUp,
  ZoomIn,
} from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import WithAuthentication from "../../../user/auth/WithAuthentication";
import AvatarUser from "../../../user/components/AvatarUser";
import { User } from "../../../user/query";
import { makeUserPageRoute } from "../../../user/UserPage";
import {
  ListAggergation,
  useDeleteEditorsMutation,
  useTransferOwnershipMutation,
} from "../../query";

const EditorListItem = ({
  list,
  editor,
}: {
  list: ListAggergation;
  editor: User;
}) => {
  const history = useHistory();
  const isOptionsOpen = useBoolean(false);
  const isRemoveDialogOpen = useBoolean(false);

  const isTransfering = useBoolean(false);
  const isTransferOwnershipDialogOpen = useBoolean(false);

  const deleteEditorsMutation = useDeleteEditorsMutation();
  const transferOwnershipMutation = useTransferOwnershipMutation();

  const handleRemove = async () => {
    isRemoveDialogOpen.setFalse();

    await deleteEditorsMutation({
      listId: list.list.id,
      editorIds: [editor.id],
    });
  };

  const handleTransferOwnership = async () => {
    try {
      isTransfering.setTrue();
      await transferOwnershipMutation({
        listId: list.list.id,
        editorId: editor.id,
      });
      isTransferOwnershipDialogOpen.setFalse();
    } catch (error) {
    } finally {
      isTransfering.setFalse();
    }
  };

  return (
    <React.Fragment key={editor.id}>
      <Dialog
        TransitionComponent={ZoomIn}
        open={isRemoveDialogOpen.value}
        onClose={isRemoveDialogOpen.setFalse}
      >
        <DialogTitle>Remove?</DialogTitle>
        <DialogActions>
          <Button size="large" onClick={isRemoveDialogOpen.setFalse}>
            Cancel
          </Button>
          <Button size="large" onClick={handleRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        TransitionComponent={ZoomIn}
        open={isTransferOwnershipDialogOpen.value}
        onClose={isTransferOwnershipDialogOpen.setFalse}
      >
        <DialogTitle>Make this person the owner?</DialogTitle>
        <DialogContent>
          <DialogContentText color="textSecondary">
            Once you make this person the owner you could be removed from the
            list without notice and the list could be deleted without your
            constent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={isTransferOwnershipDialogOpen.setFalse}>
            No
          </Button>
          <Button size="large" onClick={handleTransferOwnership}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <LoadingDialog
        open={isTransfering.value}
        ListItemTextProps={{ primary: "Transfering" }}
      />

      <ResponsiveDialogDrawer
        open={isOptionsOpen.value}
        onClose={isOptionsOpen.setFalse}
      >
        <List>
          <WithAuthentication
            renderAuthenticated={(currentUser) =>
              currentUser.user.id === list.owner.id && (
                <ListItem
                  button
                  onClick={() => {
                    isTransferOwnershipDialogOpen.setTrue();
                    isOptionsOpen.setFalse();
                  }}
                >
                  <ListItemIcon>
                    <SwapHorizIcon />
                  </ListItemIcon>
                  <ListItemText primary="Make Owner" />
                </ListItem>
              )
            }
          />

          <ListItem
            button
            onClick={() => {
              isRemoveDialogOpen.setTrue();
              isOptionsOpen.setFalse();
            }}
          >
            <ListItemIcon>
              <DeleteForeverOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItem>

          <ListItem button onClick={isOptionsOpen.setFalse}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </ResponsiveDialogDrawer>

      <ListItem
        button
        onClick={() => {
          history.push(makeUserPageRoute({ userId: editor.id }));
        }}
      >
        <ListItemAvatar>
          <AvatarUser user={editor} />
        </ListItemAvatar>
        <ListItemText
          primary={editor.username}
          secondary={editor.displayName}
        />

        <ListItemSecondaryAction>
          <IconButton onClick={isOptionsOpen.setTrue}>
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );
};

export const PermissionForm = ({ list }: { list: ListAggergation }) => {
  const history = useHistory();
  const addPermissionFormModal = useModal("AddPermissionForm");
  return (
    <List>
      {/* <ListCard list={list} /> */}

      {/* <Divider /> */}

      <ListItem
        button
        onClick={() => {
          addPermissionFormModal.open();
        }}
      >
        <ListItemIcon>
          <GroupAddOutlinedIcon style={{ color: "inherit" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Add Users"
        />
      </ListItem>

      <Divider />

      <ListItem
        button
        onClick={() => {
          history.push(makeUserPageRoute({ userId: list.owner.id }));
        }}
      >
        <ListItemAvatar>
          <AvatarUser user={list.owner} />
        </ListItemAvatar>
        <ListItemText
          primary={list.owner.username}
          secondary={list.owner.displayName}
        />

        <ListItemSecondaryAction>
          <Typography color="textSecondary" style={{ fontStyle: "italic" }}>
            Owner
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>

      {list.editors.map((editor) => (
        <EditorListItem key={editor.id} list={list} editor={editor} />
      ))}
    </List>
  );
};

export const PermissionFormModal = ({ list }: { list: ListAggergation }) => {
  const { isOpen, close } = useModal("PermissionForm");

  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={isOpen}
      onClose={close}
    >
      <PermissionForm list={list} />
      <Hidden smUp>
        <Box position="fixed" bottom={0} width="100%">
          <Divider />
          <DoneButton onClick={close} />
        </Box>
      </Hidden>
    </ResponsiveDialog>
  );
};
