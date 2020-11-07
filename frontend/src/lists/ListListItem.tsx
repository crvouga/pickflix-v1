import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MovieIcon from "@material-ui/icons/Movie";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import React from "react";
import makeImageUrl from "../tmdb/makeImageUrl";
import { ListAggergation } from "./query/types";

type Props = ListItemProps & {
  list: ListAggergation;
  onClick: () => void;
};

export default ({ list, onClick }: Props) => {
  const listItem = list?.listItems?.[0];
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          key={listItem?.listItem.id}
          variant="square"
          src={makeImageUrl(3, {
            posterPath: listItem?.tmdbData.posterPath,
          })}
        >
          <MovieIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={list?.list.title}
        secondary={`${list?.listItemCount || 0} items`}
      />

      <ListItemSecondaryAction>
        {list.list.visibility === "public" && (
          <ListItemIcon>
            <PublicOutlinedIcon />
          </ListItemIcon>
        )}
        {list.list.visibility === "private" && (
          <ListItemIcon>
            <LockOutlinedIcon />
          </ListItemIcon>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
