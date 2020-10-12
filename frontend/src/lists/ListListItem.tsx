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
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { List } from "./types";

type Props = ListItemProps & {
  list: List;
  onClick: () => void;
};

export default ({ list, onClick }: Props) => {
  const listItem = list?.listItems?.[0];
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          key={listItem?.id}
          variant="square"
          src={makeTMDbImageURL(3, {
            posterPath: listItem?.tmdbData.posterPath,
          })}
        >
          <MovieIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={list?.title}
        secondary={`${list?.listItemCount || 0} items`}
      />

      <ListItemSecondaryAction>
        {list.visibility === "public" && (
          <ListItemIcon>
            <PublicOutlinedIcon />
          </ListItemIcon>
        )}
        {list.visibility === "private" && (
          <ListItemIcon>
            <LockOutlinedIcon />
          </ListItemIcon>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};