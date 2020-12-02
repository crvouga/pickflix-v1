import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { MediaId } from "../../../../media/tmdb/types";
import { useToggleFormState } from "../toggle-form";

export const ToggleButtonSkeleton = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckBoxOutlineBlankIcon />
      </ListItemIcon>
      <Skeleton variant="text" width="5em" height="2em" />
      <ListItemSecondaryAction>
        <Skeleton variant="rect">
          <Button size="small" color="primary"></Button>
        </Skeleton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export type ToggleButtonProps = {
  checked?: boolean;
  title?: string;
  onClick?: () => void;
  onSecondaryActionClick?: () => void;
};

export const ToggleButton = ({
  checked,
  title,
  onClick,
  onSecondaryActionClick,
}: ToggleButtonProps) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </ListItemIcon>

      <ListItemText primary={title} />

      <ListItemSecondaryAction>
        <Button size="small" color="primary" onClick={onSecondaryActionClick}>
          View
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const ToggleButtonContainer = ({
  listId,
  mediaId,
  ...props
}: {
  listId: string;
  mediaId: MediaId;
} & ToggleButtonProps) => {
  const { listIds, toggle } = useToggleFormState();

  return (
    <ToggleButton
      checked={listId in listIds}
      onClick={() => {
        toggle({ listId, mediaId });
      }}
      {...props}
    />
  );
};
