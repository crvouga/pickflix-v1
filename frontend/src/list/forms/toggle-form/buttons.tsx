import {
  Box,
  Button,
  ButtonBaseProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DoneIcon from "@material-ui/icons/Done";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import {
  LabeledIconButton,
  LabeledIconButtonProps,
} from "../../../common/components/LabeledIconButton";
import AutoListIcon from "../../auto-lists/AutoListIcon";
import { AutoListKeys, toAutoListName } from "../../query";

export const CreateListButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon color="inherit">
        <Box color="primary.main">
          <AddIcon color="inherit" />
        </Box>
      </ListItemIcon>
      <Box color="primary.main">
        <ListItemText
          primaryTypographyProps={{ color: "inherit" }}
          primary="Create New List"
        />
      </Box>
    </ListItem>
  );
};

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

export const AutoListToggleButton = ({
  checked,
  autoListKey,
  ...props
}: {
  checked?: boolean;
  autoListKey: AutoListKeys;
} & ButtonBaseProps) => {
  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      icon={<AutoListIcon autoListKey={autoListKey} filled={checked} />}
      {...props}
    />
  );
};

export const ToggleFormModalButton = ({
  checked,
  ...props
}: { checked?: boolean } & LabeledIconButtonProps) => {
  return (
    <LabeledIconButton
      label="Lists"
      icon={Boolean(checked) ? <PlaylistAddCheckIcon /> : <ListIcon />}
      {...props}
    />
  );
};

export const DoneButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Paper>
      <List>
        <ListItem button onClick={onClick}>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Done"
          />
        </ListItem>
      </List>
    </Paper>
  );
};
