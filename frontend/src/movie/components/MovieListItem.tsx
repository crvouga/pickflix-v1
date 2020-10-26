import {
  ListItemProps,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import { useHistory } from "react-router";
import { toYear } from "../../person/utils";
import { useMakeImageUrl } from "../../tmdb/makeTMDbImageURL";

type Props = ListItemProps & {
  movie: {
    id: string;
    title: string;
    releaseDate: string;
    posterPath?: string | null;
    backdropPath?: string | null;
  };
};

export default (props: Props) => {
  const { movie, ...ListItemProps } = props;
  const { title, releaseDate, id, posterPath, backdropPath } = movie;
  const makeImageUrl = useMakeImageUrl();

  const src = makeImageUrl(2, posterPath ? { posterPath } : { backdropPath });

  const history = useHistory();
  const handleClick = () => {
    history.push(`/movie/${id}`);
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
      {/* <ListItemSecondaryAction>
        <LaunchIcon />
      </ListItemSecondaryAction> */}
    </ListItem>
  );
};
