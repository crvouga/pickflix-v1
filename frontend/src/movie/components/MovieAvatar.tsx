import { Avatar, AvatarProps } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import makeImageUrl from "../../tmdb/makeImageUrl";

type Props = AvatarProps & {
  movie: {
    posterPath?: string;
  };
};

export default ({ movie, ...props }: Props) => {
  return (
    <Avatar variant="square" src={makeImageUrl(2, movie)} {...props}>
      <MovieIcon />
    </Avatar>
  );
};
