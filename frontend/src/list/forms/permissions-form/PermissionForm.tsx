import {
  Box,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import useModal from "../../../app/modals/useModal";
import {
  DoneButton,
  ResponsiveDialog,
} from "../../../common/components/ResponsiveDialog";
import {
  SlideUp,
  SlideLeft,
  ZoomIn,
} from "../../../common/components/TransitionComponents";
import AvatarUser from "../../../user/components/AvatarUser";
import ListCard from "../../lists/card/ListCard";
import { ListAggergation } from "../../query";
import { useHistory } from "react-router";
import { makeUserPageRoute } from "../../../user/UserPage";
import { AutoCompeleteUsersContainer } from "./AutoCompleteUserSearch";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";

export const PermissionForm = ({ list }: { list: ListAggergation }) => {
  const history = useHistory();
  const addPermissionFormModal = useModal("AddPermissionForm");
  return (
    <List>
      <ListCard list={list} />

      <Divider />

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
        <ListItem key={editor.id}>
          <ListItemAvatar>
            <AvatarUser user={editor} />
          </ListItemAvatar>
          <ListItemText
            primary={editor.username}
            secondary={editor.displayName}
          />
          <ListItemSecondaryAction>
            <Typography color="textSecondary" style={{ fontStyle: "italic" }}>
              Editor
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export const AddPermissionFormModal = ({ list }: { list: ListAggergation }) => {
  const { isOpen, close } = useModal("AddPermissionForm");

  return (
    <NonFullscreenResponsiveDialog
      TransitionComponent={SlideLeft}
      open={isOpen}
      onClose={close}
    >
      <Box p={2}>
        <AutoCompeleteUsersContainer />
        <Box paddingTop={2} display="flex" justifyContent="space-between">
          <Button size="large" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </NonFullscreenResponsiveDialog>
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
