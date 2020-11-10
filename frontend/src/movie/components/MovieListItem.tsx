import {
  ListItemProps,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  CardActionArea,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import { useHistory } from "react-router";
import { toYear } from "../../person/utils";
import makeImageUrl from "../../tmdb/makeImageUrl";

type Props = Omit<ListItemProps, "button"> & {
  noLink?: boolean;
  onClick?: () => void;
  movie: {
    id: string;
    title: string;
    releaseDate?: string | null;
    posterPath?: string | null;
    backdropPath?: string | null;
  };
};

export default (props: Props) => {
  const { disabled = false, movie, onClick, ...ListItemProps } = props;
  const { title, releaseDate, id, posterPath, backdropPath } = movie;

  const src = makeImageUrl(2, posterPath ? { posterPath } : { backdropPath });

  const history = useHistory();
  const handleClick = () => {
    history.push(`/movie/${id}`);
  };

  return (
    <CardActionArea disabled={disabled} onClick={onClick || handleClick}>
      <ListItem {...ListItemProps}>
        <ListItemAvatar>
          <Avatar variant="square" src={src}>
            <MovieIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={releaseDate ? toYear(releaseDate) : undefined}
        />
      </ListItem>
    </CardActionArea>
  );
};
