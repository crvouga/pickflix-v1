import { Avatar, AvatarProps } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import makeImageUrl from "../../media/tmdb/makeImageUrl";

type Props = AvatarProps & {
  movie: {
    posterPath?: string | null;
  };
};

export default ({ movie, ...props }: Props) => {
  return (
    <Avatar variant="square" src={makeImageUrl(1, movie)} {...props}>
      <MovieIcon />
    </Avatar>
  );
};
