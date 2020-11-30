import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import ResponsiveDialogDrawer from "../../../common/components/ResponsiveDialogDrawer";

export type ReviewActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const ReviewActions = ({ onEdit, onDelete }: ReviewActionsProps) => {
  return (
    <React.Fragment>
      <ListItem button onClick={onEdit}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Review" />
      </ListItem>

      <ListItem button onClick={onDelete}>
        <ListItemIcon>
          <DeleteForeverOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Delete Review" />
      </ListItem>
    </React.Fragment>
  );
};

export const ReviewActionsModal = ({
  open,
  onClose,
  ReviewActionsProps,
}: {
  open: boolean;
  onClose?: () => void;
  ReviewActionsProps?: ReviewActionsProps;
}) => {
  return (
    <ResponsiveDialogDrawer open={open} onClose={onClose}>
      <List onClick={onClose}>
        {ReviewActionsProps && <ReviewActions {...ReviewActionsProps} />}

        {onClose && (
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Cancel" />
          </ListItem>
        )}
      </List>
    </ResponsiveDialogDrawer>
  );
};
