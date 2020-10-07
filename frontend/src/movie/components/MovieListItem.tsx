import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import { useDispatch } from "react-redux";
import { toYear } from "../../person/utils";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
type Props = {
  movie: {
    id: string;
    title: string;
    releaseDate: string;
    posterPath?: string;
    backdropPath?: string;
  };
};

export default (props: Props) => {
  const { movie } = props;
  const { title, releaseDate, id, posterPath, backdropPath } = movie;
  const src = makeTMDbImageURL(
    2,
    posterPath ? { posterPath } : { backdropPath }
  );

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${id}` }));
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar variant="square" src={src}>
          <MovieIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={releaseDate ? toYear(releaseDate) : undefined}
      />
      <ListItemSecondaryAction>
        <LaunchIcon />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
