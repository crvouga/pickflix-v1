import {
  Avatar,
  Box,
  ListItem,
  ListItemProps,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemAvatar,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { IList, IListItem } from "./redux/entities";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

interface Props extends ListItemProps {
  list: IList;
  onClick: () => void;
}

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
