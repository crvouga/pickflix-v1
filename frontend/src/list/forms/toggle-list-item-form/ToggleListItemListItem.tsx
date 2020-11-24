import {
  Box,
  Button,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router";
import { LinkButton } from "../../../app/snackbar/Snackbar";
import { MediaId } from "../../../media/tmdb/types";
import useToggleListItemMutation from "./useToggleListItemMutation";

export const ToggleListItemListItemSkeleton = () => {
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

export default ({
  listId,
  mediaId,
  title,
  path,
}: {
  listId: string;
  title: string;
  path: string;
  mediaId: MediaId;
}) => {
  const history = useHistory();

  const { status, eventEmitter, mutate } = useToggleListItemMutation({
    listId,
    mediaId,
  });

  return (
    //@ts-ignore
    <ListItem button={status !== "loading"} onClick={mutate}>
      <ListItemIcon>
        {status === "loading" ? (
          <Box color="action.active">
            <CircularProgress
              disableShrink
              size="1.8em"
              style={{
                color: "inherit",
              }}
            />
          </Box>
        ) : status === "added" ? (
          <CheckBoxIcon />
        ) : (
          <CheckBoxOutlineBlankIcon />
        )}
      </ListItemIcon>

      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <LinkButton size="small" path={path} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
