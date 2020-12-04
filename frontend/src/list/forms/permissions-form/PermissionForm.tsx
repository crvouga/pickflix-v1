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
  IconButton,
} from "@material-ui/core";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import { useHistory } from "react-router";
import useModal from "../../../app/modals/useModal";
import {
  DoneButton,
  ResponsiveDialog,
} from "../../../common/components/ResponsiveDialog";
import { SlideUp } from "../../../common/components/TransitionComponents";
import AvatarUser from "../../../user/components/AvatarUser";
import { makeUserPageRoute } from "../../../user/UserPage";
import ListCard from "../../lists/card/ListCard";
import { ListAggergation } from "../../query";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
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
        <Box paddingX={4}>
          <Typography color="textSecondary" style={{ fontStyle: "italic" }}>
            Owner
          </Typography>
        </Box>
        <ListItemSecondaryAction>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      {list.editors.map((editor) => (
        <ListItem
          key={editor.id}
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
          <Box paddingX={4}>
            <Typography color="textSecondary" style={{ fontStyle: "italic" }}>
              Editor
            </Typography>
          </Box>

          <ListItemSecondaryAction>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
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
